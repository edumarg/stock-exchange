const searchInput = document.getElementById("searchInput");
let whatToSearch;
const URL = "https://financialmodelingprep.com";
const API_KEY = `&apikey=ea12a6445627535f77bf1b31041d6831`;
const searchButton = document.getElementById("searchButton");
const searchResultList = document.getElementById("searchResultList");
const searchSpinner = document.getElementById("searchSpinner");

async function fetchSearchData() {
    searchSpinner.classList.remove("invisible");
    whatToSearch = searchInput.value;
    const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
    const COMPLEATE_URL = `${URL}/${TICKER_SEARCH_PATH}${API_KEY}`;
    const response = await fetch(`${URL}/${TICKER_SEARCH_PATH}${API_KEY}`);
    const data = await response.json();
    console.log(data, "length", data.length);
    updateSearchResultsList(data);
    searchSpinner.classList.add("invisible");
}

function updateSearchResultsList(data) {
    console.log("update data");
    searchResultList.innerHTML = "";
    for (let i = 0; i < Object.keys(data).length; i++) {
        console.log(i);
        console.log(`${data[i].name} (${data[i].symbol})`);
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        let anchorLink = document.createElement("a");
        anchorLink.setAttribute("href", `/company.html?symbol=${data[i].symbol}`);
        anchorLink.innerText = `${data[i].name} (${data[i].symbol})`;
        listItem.appendChild(anchorLink);
        searchResultList.appendChild(listItem);
    }
}

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetchSearchData();
});