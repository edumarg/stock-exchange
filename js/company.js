const CompanyDataHandling = {};
const CompanyRequestsHandling = {};
const CompanyPageHandling = {};

CompanyRequestsHandling.queryString = new URLSearchParams(
    window.location.search
);
CompanyRequestsHandling.queryStringSymbol = CompanyRequestsHandling.queryString.get(
    "symbol"
);
CompanyRequestsHandling.URL = `https://financialmodelingprep.com`;
CompanyRequestsHandling.PATH_COMPANY_PROFILE = `api/v3/company/profile/${CompanyRequestsHandling.queryStringSymbol}`;
CompanyRequestsHandling.PATH_HISTORIC_PRICE = `api/v3/historical-price-full/${CompanyRequestsHandling.queryStringSymbol}?serietype=l
ine`;
CompanyRequestsHandling.API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
CompanyRequestsHandling.loadSpinner = document.getElementById("loadSpinner");

CompanyDataHandling.companyLogo = document.getElementById("companyLogo");
CompanyDataHandling.comapanyName = document.getElementById("companyName");
CompanyDataHandling.companySymbol = document.getElementById("companySymbol");
CompanyDataHandling.companyPrice = document.getElementById("companyPrice");
CompanyDataHandling.companyBeta = document.getElementById("companyBeta");
CompanyDataHandling.companyDescription = document.getElementById(
    "companyDescription"
);
CompanyDataHandling.companyPriceChanges = document.getElementById(
    "companyPriceChanges"
);

// ---------------------------------------------- Fetch company Data -------------------------------------------------------
CompanyRequestsHandling.fetchCompanyData = async function() {
    const response = await fetch(
        `${CompanyRequestsHandling.URL}/${CompanyRequestsHandling.PATH_COMPANY_PROFILE}?${CompanyRequestsHandling.API_KEY}`
    );
    const company = (await response.json()).profile;
    return company;
};

//--------------------------------------- Change color of changes acording to gain or looses -----------------------------
CompanyDataHandling.changeColorOfPriceChanges = function(changes) {
    if (changes >= 0) {
        companyPriceChanges.classList.add("positive-change");
        companyPriceChanges.classList.remove("negative-change");
    } else {
        companyPriceChanges.classList.remove("positive-change");
        companyPriceChanges.classList.add("negative-change");
    }
};

// ------------------------------------ Populate the HTML page elements with data fetch from server -------------------
CompanyDataHandling.createHTMLElemenst = function(company) {
    companySymbol.textContent = CompanyRequestsHandling.queryStringSymbol;
    const { image, companyName, price, beta, description, changes } = company;
    companyLogo.src = image;
    companyName.textContent = `Company name: ${companyName}`;
    companyPrice.textContent = `Current price: $${price}`;
    companyPriceChanges.textContent = `(${changes})`;
    companyBeta.textContent = `beta: ${beta}`;
    companyDescription.textContent = description;
    CompanyDataHandling.changeColorOfPriceChanges(changes);
};

//--------------------------------- Fetch the comapny historical prices to created the chart -----------------------------
CompanyRequestsHandling.fetchCompanyHistoricalPrice = async function() {
    loadSpinner.classList.remove("invisible");
    const response = await fetch(
        `${CompanyRequestsHandling.URL}/${CompanyRequestsHandling.PATH_HISTORIC_PRICE}&${CompanyRequestsHandling.API_KEY}`
    );
    const object = await response.json();
    const historicalData = await object.historical;
    loadSpinner.classList.add("invisible");
    return historicalData;
};

//----------------------------------------- Create the historical price chart -------------------------------------
CompanyDataHandling.createHistoricalChart = function(data) {
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

// ---------------------------------------- call all the function on page load -------------------------------------
CompanyPageHandling.loadPage = async function() {
    loadSpinner.classList.remove("invisible");
    const company = await CompanyRequestsHandling.fetchCompanyData();
    CompanyDataHandling.createHTMLElemenst(company);
    const historicalPrices = await CompanyRequestsHandling.fetchCompanyHistoricalPrice();
    CompanyDataHandling.createHistoricalChart(historicalPrices);
    loadSpinner.classList.add("invisible");
};

CompanyPageHandling.loadPage();