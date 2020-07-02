class CompareInfo {
    constructor(element, symbols) {
        this.element = element;
        this.symbols = symbols;
        this.loadpage = this.load();
    }

    fetchCompanyInfo = async function(symbol) {
        const PATH_COMPANY_PROFILE = `api/v3/company/profile/${symbol}`;
        const response = await fetch(`${URL}/${PATH_COMPANY_PROFILE}?${API_KEY}`);
        const company = (await response.json()).profile;
        return company;
    };

    fetchCompanyHistoricalPrice = async function(symbol) {
        const PATH_HISTORIC_PRICE = `api/v3/historical-price-full/${symbol}?serietype=line`;
        const response = await fetch(`${URL}/${PATH_HISTORIC_PRICE}&${API_KEY}`);
        const object = await response.json();
        const historicalData = await object.historical;

        return historicalData;
    };

    createPage = function(company, index, symbol) {
        const { image, companyName, price, beta, description, changes } = company;
        const compareInfo = this.element;
        const companyColumn = createHTMLElement("div", [
            "card",
            "m-5",
            "border",
            "border-secondary",
            "rounded",
            "shadow",
            "p-3",
            "mb-5",
            "bg-white",
        ]);

        const maintitleRow = createHTMLElement("div", ["row"], {
            id: "mainTitleRow",
        });
        const mainTitleCol = createHTMLElement(
            "div", ["col-lx-12", "d-flex", "flex", "align-items", "flex-nowrap", "m-5"], { id: "mainTitleCol" }
        );

        const mainTitle = createHTMLElement(
            "h1", ["display-3"], { id: "mainTitle" },
            "Financial Summary"
        );

        appendChildrenElementsToFather(mainTitleCol, mainTitle);
        maintitleRow.appendChild(mainTitleCol);

        const companyInfoRow = createHTMLElement("div", ["row"], {
            id: "companyInfoRow",
        });
        const companyInfoCol = createHTMLElement(
            "div", ["col-3", "border", "border-danger"], {
                id: "companyInfoCol",
            }
        );
        companyInfoRow.appendChild(companyInfoCol);

        const companyTitlerow = createHTMLElement("div", ["row"], {
            id: "companyTitlerow",
        });
        const companyTitleCol = createHTMLElement(
            "div", [
                "col-xl-12",
                "d-flex",
                "align-items-center",
                "flex-nowrap",
                "ml-5",
                "mb-3",
            ], { id: "companyTitleCol" }
        );
        companyTitlerow.appendChild(companyTitleCol);

        const companyLogoDiv = createHTMLElement("div", ["none"], {
            id: "companyLogoDiv",
        });
        const companyLogoImg = createHTMLElement("img", ["none"], {
            id: "companyLogoImg",
            src: image,
        });
        companyLogoDiv.appendChild(companyLogoImg);

        const companyNameP = createHTMLElement(
            "p", ["ml-5", "mr-5"], { id: "companyNameP" },
            `Company name: ${companyName}`
        );
        const companySymbol = createHTMLElement("p", ["none"], {}, `(${symbol})`);
        appendChildrenElementsToFather(
            companyTitleCol,
            companyLogoDiv,
            companyNameP,
            companySymbol
        );

        const companyFinancialNumbersRow = createHTMLElement("div", ["row"], {
            id: "companyFinancialNumbersRow",
        });
        const companyFinancialNumbersCol = createHTMLElement(
            "div", ["col-xl-12", "d-flex", "align-items", "flex-nowrap"], { id: "companyFinancialNumbersCol" }
        );
        companyFinancialNumbersRow.appendChild(companyFinancialNumbersCol);

        const companyPrice = createHTMLElement(
            "p", ["ml-5", "mr-5"], { id: "companyPrice" },
            `Current price: $${price}`
        );
        const companyPriceChanges = createHTMLElement(
            "p", ["ml-5", "mr-5"], {
                id: "companyPriceChanges",
            },
            `(${changes})`
        );
        const companyBeta = createHTMLElement(
            "p", ["none"], { id: "companyBeta" },
            `beta: ${beta}`
        );

        appendChildrenElementsToFather(
            companyFinancialNumbersCol,
            companyPrice,
            companyPriceChanges,
            companyBeta
        );

        const companyDescriptionRow = createHTMLElement("div", ["row"], {
            id: "companyDescriptionRow",
        });
        const companyDescriptionCol = createHTMLElement("div", ["col-xl-12"], {
            id: "companyDescriptionCol",
        });
        companyDescriptionRow.appendChild(companyDescriptionCol);
        const companyDescription = createHTMLElement(
            "p", ["m-5"], { id: "companyDescriptionRow" },
            description
        );
        companyDescriptionCol.appendChild(companyDescription);

        appendChildrenElementsToFather(
            companyInfoCol,
            companyTitlerow,
            companyFinancialNumbersRow,
            companyDescriptionRow
        );

        const chartRow = createHTMLElement("div", ["row"], {
            id: "chartRow",
        });
        const chartCol = createHTMLElement("div", ["col-xl-12"], {
            id: "chartCol",
        });
        chartRow.appendChild(chartCol);
        const companyPriceGraph = createHTMLElement("canvas", ["none"], {
            id: `companyPriceGraph${index}`,
            width: "1400",
            "min-height": "500",
        });
        chartCol.appendChild(companyPriceGraph);

        appendChildrenElementsToFather(
            companyColumn,
            maintitleRow,
            companyInfoRow,
            companyFinancialNumbersRow,
            companyDescriptionRow,
            chartRow
        );
        compareInfo.appendChild(companyColumn);
        changeColorOfPriceChange(changes, companyPriceChanges);
    };

    createHistoricalChart = async function(symbol, index) {
        const historicalPrices = await this.fetchCompanyHistoricalPrice(symbol);
        let ctx = document
            .getElementById(`companyPriceGraph${index}`)
            .getContext("2d");
        let xLabels = [];
        let historicalData = [];
        for (let i = 0; i < Object.keys(historicalPrices).length; i++) {
            xLabels.push(historicalPrices[i].date);
            historicalData.push(historicalPrices[i].close);
        }
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "line",
            // The data for our dataset
            data: {
                labels: xLabels,
                datasets: [{
                    label: "Historical Stock Prices. ",
                    data: historicalData,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                }, ],
            },
            // Configuration options go here
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks.
                            callback: function(value, index, values) {
                                return "$" + value;
                            },
                        },
                    }, ],
                },
            },
        });
    };

    load = async function() {
        const symbolsArray = this.symbols.split(",");
        for (let i in symbolsArray) {
            const company = await this.fetchCompanyInfo(symbolsArray[i]);
            this.createPage(company, i, symbolsArray[i]);
            this.createHistoricalChart(symbolsArray[i], i);
        }
    };
}