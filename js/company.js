class CompanyInfo {
    constructor(element, symbol) {
        this.element = element;
        this.symbol = symbol;
        this.URL = `https://financialmodelingprep.com`;
        this.API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
    }

    fetchCompanyInfo = async function() {
        const PATH_COMPANY_PROFILE = `api/v3/company/profile/${this.symbol}`;
        const response = await fetch(
            `${this.URL}/${PATH_COMPANY_PROFILE}?${this.API_KEY}`
        );
        const company = (await response.json()).profile;
        return company;
    };

    fetchCompanyHistoricalPrice = async function() {
        const PATH_HISTORIC_PRICE = `api/v3/historical-price-full/${this.symbol}?serietype=line`;
        const response = await fetch(
            `${this.URL}/${PATH_HISTORIC_PRICE}&${this.API_KEY}`
        );
        const object = await response.json();
        const historicalData = await object.historical;

        return historicalData;
    };

    changeColorOfPriceChanges = function(changes) {
        companyPriceChanges = document.getElementById("companyPriceChanges");
        if (changes >= 0) {
            companyPriceChanges.classList.add("positive-change");
            companyPriceChanges.classList.remove("negative-change");
        } else {
            companyPriceChanges.classList.remove("positive-change");
            companyPriceChanges.classList.add("negative-change");
        }
    };

    createHTMLElement = function(
        element,
        classes = [],
        attributes = {},
        text = ""
    ) {
        const createElement = document.createElement(element);
        for (let i = 0; i < classes.length; i++) {
            createElement.classList.add(classes[i]);
        }

        for (let key in attributes) {
            createElement.setAttribute(key, attributes[key]);
        }
        createElement.textContent = text;
        return createElement;
    };

    appendChildrenElementsToFather = function(father, ...children) {
        for (let child of children) {
            father.appendChild(child);
        }
    };

    createPage = function(company) {
        const { image, companyName, price, beta, description, changes } = company;
        const compInfo = this.element;
        const maintitleRow = this.createHTMLElement("div", ["row"], {
            id: "mainTitleRow",
        });
        const mainTitleCol = this.createHTMLElement(
            "div", ["col-lx-12", "d-flex", "flex", "align-items", "flex-nowrap", "m-5"], { id: "mainTitleCol" }
        );

        const mainTitle = this.createHTMLElement(
            "h1", ["display-3"], { id: "mainTitle" },
            "Financial Summary"
        );

        const loadSpinner = this.createHTMLElement(
            "div", ["spinner-border", "invisible", "mr-3", "mt-5", "text-center"], { id: "loadSpinner", role: "status" }
        );

        const spinerSpan = this.createHTMLElement(
            "span", ["sr-only"], { id: "spinerSpan" },
            "Loading..."
        );

        loadSpinner.appendChild(spinerSpan);
        this.appendChildrenElementsToFather(mainTitleCol, mainTitle, loadSpinner);
        maintitleRow.appendChild(mainTitleCol);

        const companyInfoRow = this.createHTMLElement("div", ["row"], {
            id: "companyInfoRow",
        });
        const companyInfoCol = this.createHTMLElement("div", ["col-xl-12"], {
            id: "companyInfoCol",
        });
        companyInfoRow.appendChild(companyInfoCol);

        const companyTitlerow = this.createHTMLElement("div", ["row"], {
            id: "companyTitlerow",
        });
        const companyTitleCol = this.createHTMLElement(
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

        const companyLogoDiv = this.createHTMLElement("div", ["none"], {
            id: "companyLogoDiv",
        });
        const companyLogoImg = this.createHTMLElement("img", ["none"], {
            id: "companyLogoImg",
            src: image,
        });
        companyLogoDiv.appendChild(companyLogoImg);

        const companyNameP = this.createHTMLElement(
            "p", ["ml-5", "mr-5"], { id: "companyNameP" },
            `Company name: ${companyName}`
        );
        const companySymbol = this.createHTMLElement(
            "p", ["none"], {},
            `(${this.symbol})`
        );
        this.appendChildrenElementsToFather(
            companyTitleCol,
            companyLogoDiv,
            companyNameP,
            companySymbol
        );

        const companyFinancialNumbersRow = this.createHTMLElement("div", ["row"], {
            id: "companyFinancialNumbersRow",
        });
        const companyFinancialNumbersCol = this.createHTMLElement(
            "div", ["col-xl-12", "d-flex", "align-items", "flex-nowrap"], { id: "companyFinancialNumbersCol" }
        );
        companyFinancialNumbersRow.appendChild(companyFinancialNumbersCol);

        const companyPrice = this.createHTMLElement(
            "p", ["ml-5", "mr-5"], { id: "companyPrice" },
            `Current price: $${price}`
        );
        const companyPriceChanges = this.createHTMLElement(
            "p", ["ml-5", "mr-5"], {
                id: "companyPriceChanges",
            },
            `(${changes})`
        );
        const companyBeta = this.createHTMLElement(
            "p", ["none"], { id: "companyBeta" },
            `beta: ${beta}`
        );

        this.appendChildrenElementsToFather(
            companyFinancialNumbersCol,
            companyPrice,
            companyPriceChanges,
            companyBeta
        );

        const companyDescriptionRow = this.createHTMLElement("div", ["row"], {
            id: "companyDescriptionRow",
        });
        const companyDescriptionCol = this.createHTMLElement("div", ["col-xl-12"], {
            id: "companyDescriptionCol",
        });
        companyDescriptionRow.appendChild(companyDescriptionCol);
        const companyDescription = this.createHTMLElement(
            "p", ["m-5"], { id: "companyDescriptionRow" },
            description
        );
        companyDescriptionCol.appendChild(companyDescription);

        this.appendChildrenElementsToFather(
            companyInfoCol,
            companyTitlerow,
            companyFinancialNumbersRow,
            companyDescriptionRow
        );

        const chartRow = this.createHTMLElement("div", ["row"], {
            id: "chartRow",
        });
        const chartCol = this.createHTMLElement("div", ["col-xl-12"], {
            id: "chartCol",
        });
        chartRow.appendChild(chartCol);
        const companyPriceGraph = this.createHTMLElement("canvas", ["none"], {
            id: "companyPriceGraph",
            width: "1400",
            "min-height": "500",
        });
        chartCol.appendChild(companyPriceGraph);

        this.appendChildrenElementsToFather(
            compInfo,
            maintitleRow,
            companyInfoRow,
            companyFinancialNumbersRow,
            companyDescriptionRow,
            chartRow
        );
        this.changeColorOfPriceChanges(changes);
    };

    load = async function() {
        const company = await this.fetchCompanyInfo();
        this.createPage(company);
        loadSpinner.classList.remove("invisible");
    };

    createHistoricalChart = async function() {
        const historicalPrices = await this.fetchCompanyHistoricalPrice();
        let ctx = document.getElementById("companyPriceGraph").getContext("2d");
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
        loadSpinner.classList.add("invisible");
    };
}