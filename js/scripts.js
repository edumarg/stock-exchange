const searchInput = document.getElementById("searchInput");
let whatToSearch;
const URL = "https://financialmodelingprep.com";
const API_KEY = `apikey=c0fe037c8bad4c70956398698a2cfdb2`;
// const API_KEY = `apikey=ea12a6445627535f77bf1b31041d6831`;
const searchButton = document.getElementById("searchButton");
const searchResultList = document.getElementById("searchResultList");
const searchSpinner = document.getElementById("searchSpinner");

async function fetchSearchData() {
    searchSpinner.classList.remove("invisible");
    whatToSearch = searchInput.value;
    const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
    const response = await fetch(`${URL}/${TICKER_SEARCH_PATH}&${API_KEY}`);
    const data = await response.json();
    updateSearchResultsList(data);
    searchSpinner.classList.add("invisible");
}

function updateSearchResultsList(data) {
    searchResultList.innerHTML = "";
    console.log("object key length", Object.keys(data).length);
    console.log("data length", data.length);
    for (let i = 0; i < Object.keys(data).length; i++) {
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