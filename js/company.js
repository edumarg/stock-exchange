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
        // loadSpinner.classList.remove("invisible");
        const PATH_HISTORIC_PRICE = `api/v3/historical-price-full/${this.symbol}?serietype=line`;
        const response = await fetch(
            `${this.URL}/${PATH_HISTORIC_PRICE}&${this.API_KEY}`
        );
        const object = await response.json();
        const historicalData = await object.historical;
        // loadSpinner.classList.add("invisible");
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

    setElementAttributes = function(element, attributes) {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    };

    appendChildrenElementsToFather = function(father, ...children) {
        for (let child of children) {
            father.appendChild(child);
        }
    };

    createHTMLElemenst = function(company) {
        const { image, companyName, price, beta, description, changes } = company;
        const compInfo = this.element;
        const maintitleRow = document.createElement("div");
        maintitleRow.classList.add("row");
        maintitleRow.setAttribute("id", "mainTitleRow");
        const mainTitleCol = document.createElement("div");
        mainTitleCol.classList.add(
            "col-lx-12",
            "d-flex",
            "flex",
            "align-items",
            "flex-nowrap",
            "m-5"
        );
        const mainTitle = document.createElement("h1");
        mainTitle.classList.add("display-3");
        mainTitle.textContent = "Financial Summary";
        const loadSpinner = document.createElement("div");
        loadSpinner.classList.add(
            "spinner-border",
            "invisible",
            "mr-3",
            "mt-5",
            "text-center"
        );
        this.setElementAttributes(loadSpinner, {
            id: "loadSpinner",
            role: "status",
        });
        const spinerSpan = document.createElement("span");
        spinerSpan.classList.add("sr-only");
        spinerSpan.textContent = "Loading...";
        loadSpinner.appendChild(spinerSpan);
        this.appendChildrenElementsToFather(mainTitleCol, mainTitle, loadSpinner);
        maintitleRow.appendChild(mainTitleCol);

        const companyInfoRow = document.createElement("div");
        companyInfoRow.classList.add("row");
        const companyInfoCol = document.createElement("div");
        companyInfoCol.classList.add("col-xl-12");
        companyInfoRow.appendChild(companyInfoCol);

        const companyTitlerow = document.createElement("div");
        companyTitlerow.classList.add("row");
        const companyTitleCol = document.createElement("div");
        companyTitleCol.classList.add(
            "col-xl-12",
            "d-flex",
            "align-items-center",
            "flex-nowrap",
            "ml-5",
            "mb-3"
        );
        companyTitlerow.appendChild(companyTitleCol);

        const companyLogoDiv = document.createElement("div");
        const companyLogoImg = document.createElement("img");
        companyLogoImg.src = image;
        companyLogoDiv.appendChild(companyLogoImg);
        const companyNameP = document.createElement("p");
        companyNameP.classList.add("ml-5", "mr-5");
        companyNameP.textContent = `Company name: ${companyName}`;
        const companySymbol = document.createElement("p");
        companySymbol.textContent = `(${this.symbol})`;
        this.appendChildrenElementsToFather(
            companyTitleCol,
            companyLogoDiv,
            companyNameP,
            companySymbol
        );

        const companyFinancialNumbersRow = document.createElement("div");
        companyFinancialNumbersRow.classList.add("row");
        const companyFinancialNumbersCol = document.createElement("div");
        companyFinancialNumbersCol.classList.add(
            "col-xl-12",
            "d-flex",
            "align-items",
            "flex-nowrap"
        );
        companyFinancialNumbersRow.appendChild(companyFinancialNumbersCol);
        const companyPrice = document.createElement("p");
        companyPrice.classList.add("ml-5", "mr-5");
        companyPrice.textContent = `Current price: $${price}`;
        const companyPriceChanges = document.createElement("p");
        companyPriceChanges.setAttribute("id", "companyPriceChanges");
        companyPriceChanges.classList.add("ml-5", "mr-5");
        companyPriceChanges.textContent = `(${changes})`;
        const companyBeta = document.createElement("p");
        companyBeta.textContent = `beta: ${beta}`;

        this.appendChildrenElementsToFather(
            companyFinancialNumbersCol,
            companyPrice,
            companyPriceChanges,
            companyBeta
        );

        const companyDescriptionRow = document.createElement("div");
        companyDescriptionRow.classList.add("row");
        const companyDescriptionCol = document.createElement("div");
        companyDescriptionCol.classList.add("col-xl-12");
        companyDescriptionRow.appendChild(companyDescriptionCol);
        const companyDescription = document.createElement("p");
        companyDescription.classList.add("m-5");
        companyDescription.textContent = description;
        companyDescriptionCol.appendChild(companyDescription);

        this.appendChildrenElementsToFather(
            companyInfoCol,
            companyTitlerow,
            companyFinancialNumbersRow,
            companyDescriptionRow
        );

        const chartRow = document.createElement("div");
        chartRow.classList.add("row");
        const chartCol = document.createElement("div");
        chartCol.classList.add("col-xl-12");
        chartRow.appendChild(chartCol);
        const companyPriceGraph = document.createElement("canvas");
        this.setElementAttributes(companyPriceGraph, {
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
        this.createHTMLElemenst(company);
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
                            // Include a dollar sign in the ticks
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