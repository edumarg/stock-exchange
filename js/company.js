const queryString = new URLSearchParams(window.location.search);
const queryStringSymbol = queryString.get("symbol");
const URL_COMPANY_PROFILE = `https://financialmodelingprep.com/api/v3/company/profile/${queryStringSymbol}`;
const URL_HISTORIC_PRICE = `https://financialmodelingprep.com/api/v3/historical-price-full/${queryStringSymbol}?serietype=l
ine`;
const API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;

const companyLogo = document.getElementById("companyLogo");
const comapanyName = document.getElementById("companyName");
const companySymbol = document.getElementById("companySymbol");
const companyPrice = document.getElementById("companyPrice");
const companyBeta = document.getElementById("companyBeta");
const companyDescription = document.getElementById("companyDescription");
const companyPriceChanges = document.getElementById("companyPriceChanges");
const loadSpinner = document.getElementById("loadSpinner");

loadPage();

async function loadPage() {
    loadSpinner.classList.remove("invisible");
    const company = await fetchCompanyData();
    createHTMLElemenst(company);
    const historicalPrices = await fetchCompanyHistoricalPrice();
    createHistoricalChart(historicalPrices);
    loadSpinner.classList.add("invisible");
}

async function fetchCompanyData() {
    const response = await fetch(`${URL_COMPANY_PROFILE}?${API_KEY}`);
    const company = (await response.json()).profile;
    return company;
}

function createHTMLElemenst(company) {
    companySymbol.innerText = queryStringSymbol;
    const { image, companyName, price, beta, description, changes } = company;
    companyLogo.src = image;
    comapanyName.innerText = `Company name: ${companyName}`;
    companyPrice.innerText = `Current price: $${price}`;
    companyPriceChanges.innerText = `(${changes})`;
    companyBeta.innerText = `beta: ${beta}`;
    companyDescription.innerText = description;
    if (changes >= 0) {
        companyPriceChanges.classList.add("positive-change");
        companyPriceChanges.classList.remove("negative-change");
    } else {
        companyPriceChanges.classList.remove("positive-change");
        companyPriceChanges.classList.add("negative-change");
    }
}

async function fetchCompanyHistoricalPrice() {
    loadSpinner.classList.remove("invisible");
    const response = await fetch(`${URL_HISTORIC_PRICE}&${API_KEY}`);
    const object = await response.json();
    const historicalData = await object.historical;
    loadSpinner.classList.add("invisible");
    return historicalData;
}

function createHistoricalChart(data) {
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
}