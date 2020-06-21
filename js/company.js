const queryString = new URLSearchParams(window.location.search);
const queryStringSymbol = queryString.get("symbol");
const URL_COMPANY_PROFILE = `https://financialmodelingprep.com/api/v3/company/profile/${queryStringSymbol}`;
const URL_HISTORIC_PRICE = `https://financialmodelingprep.com/api/v3/historical-price-full/${queryStringSymbol}?serietype=l
ine`;
const API_KEY = `apikey=ea12a6445627535f77bf1b31041d6831`;
const companyLogo = document.getElementById("companyLogo");
const comapanyName = document.getElementById("companyName");
const companySymbol = document.getElementById("companySymbol");
const companyPrice = document.getElementById("companyPrice");
const companyBeta = document.getElementById("companyBeta");
const companyDescription = document.getElementById("companyDescription");
const companyPriceChanges = document.getElementById("companyPriceChanges");
const loadSpinner = document.getElementById("loadSpinner");

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
    companyPriceChanges.innerText = `Changes: ${changes}`;
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
    console.log("historical", object);

    // let ctx = document.getElementById("companyPriceGraph").getContext("2d");
    // let chart = new Chart(ctx, {
    //     // The type of chart we want to create
    //     type: "line",

    //     // The data for our dataset
    //     data: {
    //         labels: ["January", "February", "March", "April", "May", "June", "July"],
    //         datasets: [{
    //             label: "My First dataset",
    //             backgroundColor: "rgb(255, 99, 132)",
    //             borderColor: "rgb(255, 99, 132)",
    //             data: [0, 10, 5, 2, 20, 30, 45],
    //         }, ],
    //     },

    //     // Configuration options go here
    //     options: {},
    // });

    loadSpinner.classList.add("invisible");
}

fetchCompanyData();