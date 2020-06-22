const searchInput = document.getElementById("searchInput");
let whatToSearch;
const URL = "https://financialmodelingprep.com";
const API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
const searchButton = document.getElementById("searchButton");
const searchResultList = document.getElementById("searchResultList");
const searchSpinner = document.getElementById("searchSpinner");

async function searchResults(event) {
    event.preventDefault();
    searchSpinner.classList.remove("invisible");
    fetchedData = await fetchSearchData();
    fetchedData.map(async(company) => {
        company.companyInfo = (await fetchCompanyInfo(company.symbol)).profile;
        const { image, changes } = company.companyInfo;
        const { symbol, name } = company;
        createListItem(image, symbol, name, changes);
    });
    searchSpinner.classList.add("invisible");
}

async function fetchSearchData() {
    whatToSearch = searchInput.value;
    const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
    const response = await fetch(`${URL}/${TICKER_SEARCH_PATH}&${API_KEY}`);
    const companies = await response.json();
    return companies;
}

async function fetchCompanyInfo(symbol) {
    const companySymbol = symbol;
    const COMPANY_PROFILE_PATH = `api/v3/company/profile/${companySymbol}`;
    const response = await fetch(`${URL}/${COMPANY_PROFILE_PATH}?${API_KEY}`);
    const information = await response.json();
    return information;
}

function createListItem(image, symbol, name, changes) {
    let listItem = `<li class="list-group-item"><img src="${image}" class="search-img"/><a href="/company.html?symbol=${symbol}"> ${name} (${symbol})</a><span>(${changes})</span></li>`;
    searchResultList.innerHTML += listItem;
}

searchButton.addEventListener("click", searchResults);