const queryString = new URLSearchParams(window.location.search);
const queryStringSymbol = queryString.get("symbol");
const URL_COMPANY_PROFILE = `https://financialmodelingprep.com/api/v3/company/profile/${queryStringSymbol}`;
const URL_HISTORIC_PRICE = `https://financialmodelingprep.com/api/v3/historical-price-full/${queryStringSymbol}?serietype=l
ine`;
const API_KEY = `apikey=c0fe037c8bad4c70956398698a2cfdb2`;
// const API_KEY = `apikey=ea12a6445627535f77bf1b31041d6831`;
const companyLogo = document.getElementById("companyLogo");
const comapanyName = document.getElementById("companyName");
const companySymbol = document.getElementById("companySymbol");
const companyPrice = document.getElementById("companyPrice");
const companyBeta = document.getElementById("companyBeta");
const companyDescription = document.getElementById("companyDescription");
const companyPriceChanges = document.getElementById("companyPriceChanges");
const loadSpinner = document.getElementById("loadSpinner");

fetchCompanyData();
fetchCompanyHistoricalPrice();

async function fetchCompanyData() {
    loadSpinner.classList.remove("invisible");
    const response = await fetch(`${URL_COMPANY_PROFILE}?${API_KEY}`);
    const object = await response.json();

    companySymbol.innerText = object.symbol;
    const {
        image,
        companyName,
        price,
        beta,
        description,
        changes,
    } = object.profile;
    companyLogo.src = image;
    comapanyName.innerText = `Comany name: ${companyName}`;
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
    loadSpinner.classList.add("invisible");
}

async function fetchCompanyHistoricalPrice() {
    loadSpinner.classList.remove("invisible");
    const response = await fetch(`${URL_HISTORIC_PRICE}&${API_KEY}`);
    const object = await response.json();
    const historicalData = await object.historical;
    console.log("historical", historicalData);
    createHistoricalChart(historicalData);
    loadSpinner.classList.add("invisible");
}

function createHistoricalChart(data) {
    let ctx = document.getElementById("companyPriceGraph").getContext("2d");
    let xLabels = [];
    let historicalData = [];
    console.log("object key length", Object.keys(data).length);
    console.log("data length", historicalData.length);
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