const eduCompanyDataHandling = {};
const eduCompanyRequestsHandling = {};
const eduCompanyPageHandling = {};

eduCompanyRequestsHandling.queryString = new URLSearchParams(
    window.location.search
);
eduCompanyRequestsHandling.queryStringSymbol = eduCompanyRequestsHandling.queryString.get(
    "symbol"
);
eduCompanyRequestsHandling.URL = `https://financialmodelingprep.com`;
eduCompanyRequestsHandling.PATH_COMPANY_PROFILE = `api/v3/company/profile/${eduCompanyRequestsHandling.queryStringSymbol}`;
eduCompanyRequestsHandling.PATH_HISTORIC_PRICE = `api/v3/historical-price-full/${eduCompanyRequestsHandling.queryStringSymbol}?serietype=l
ine`;
eduCompanyRequestsHandling.API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
eduCompanyRequestsHandling.loadSpinner = document.getElementById("loadSpinner");

eduCompanyDataHandling.companyLogo = document.getElementById("companyLogo");
eduCompanyDataHandling.comapanyName = document.getElementById("companyName");
eduCompanyDataHandling.companySymbol = document.getElementById("companySymbol");
eduCompanyDataHandling.companyPrice = document.getElementById("companyPrice");
eduCompanyDataHandling.companyBeta = document.getElementById("companyBeta");
eduCompanyDataHandling.companyDescription = document.getElementById(
    "companyDescription"
);
eduCompanyDataHandling.companyPriceChanges = document.getElementById(
    "companyPriceChanges"
);

eduCompanyRequestsHandling.fetchCompanyData = async function() {
    const response = await fetch(
        `${eduCompanyRequestsHandling.URL}/${eduCompanyRequestsHandling.PATH_COMPANY_PROFILE}?${eduCompanyRequestsHandling.API_KEY}`
    );
    const company = (await response.json()).profile;
    return company;
};

eduCompanyDataHandling.createHTMLElemenst = function(company) {
    companySymbol.textContent = eduCompanyRequestsHandling.queryStringSymbol;
    const { image, companyName, price, beta, description, changes } = company;
    companyLogo.src = image;
    companyName.textContent = `Company name: ${companyName}`;
    companyPrice.textContent = `Current price: $${price}`;
    companyPriceChanges.textContent = `(${changes})`;
    companyBeta.textContent = `beta: ${beta}`;
    companyDescription.textContent = description;
    if (changes >= 0) {
        companyPriceChanges.classList.add("positive-change");
        companyPriceChanges.classList.remove("negative-change");
    } else {
        companyPriceChanges.classList.remove("positive-change");
        companyPriceChanges.classList.add("negative-change");
    }
};

eduCompanyRequestsHandling.fetchCompanyHistoricalPrice = async function() {
    loadSpinner.classList.remove("invisible");
    const response = await fetch(
        `${eduCompanyRequestsHandling.URL}/${eduCompanyRequestsHandling.PATH_HISTORIC_PRICE}&${eduCompanyRequestsHandling.API_KEY}`
    );
    const object = await response.json();
    const historicalData = await object.historical;
    loadSpinner.classList.add("invisible");
    return historicalData;
};

eduCompanyDataHandling.createHistoricalChart = function(data) {
    let ctx = document.getElementById("companyPriceGraph").getContext("2d");
    let xLabels = [];
    let historicalData = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
        xLabels.push(data[i].date);
        historicalData.push(data[i].close);
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
};
eduCompanyPageHandling.loadPage = async function() {
    loadSpinner.classList.remove("invisible");
    const company = await eduCompanyRequestsHandling.fetchCompanyData();
    eduCompanyDataHandling.createHTMLElemenst(company);
    const historicalPrices = await eduCompanyRequestsHandling.fetchCompanyHistoricalPrice();
    eduCompanyDataHandling.createHistoricalChart(historicalPrices);
    loadSpinner.classList.add("invisible");
};

eduCompanyPageHandling.loadPage();