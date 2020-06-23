const eduScriptRequestHandling = {};
const eduScriptDataHandling = {};
const eduScriptPageHandling = {};

eduScriptDataHandling.searchInput = document.getElementById("searchInput");
eduScriptDataHandling.whatToSearch;
eduScriptRequestHandling.URL = "https://financialmodelingprep.com";
eduScriptRequestHandling.API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
eduScriptDataHandling.searchButton = document.getElementById("searchButton");
eduScriptDataHandling.searchResultList = document.getElementById(
    "searchResultList"
);
eduScriptDataHandling.searchSpinner = document.getElementById("searchSpinner");
eduScriptDataHandling.stocksMarquee = document.getElementById("stocksMarquee");

// Fetch Search data from the server
eduScriptRequestHandling.fetchSearchData = async function() {
    whatToSearch = searchInput.value;
    const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
    const response = await fetch(
        `${eduScriptRequestHandling.URL}/${TICKER_SEARCH_PATH}&${eduScriptRequestHandling.API_KEY}`
    );
    const companies = await response.json();
    return companies;
};

// After fetching search data , search for the company information to extract the symbol and change values
eduScriptRequestHandling.fetchCompanyInfo = async function(symbol) {
    const companySymbol = symbol;
    const COMPANY_PROFILE_PATH = `api/v3/company/profile/${companySymbol}`;
    const response = await fetch(
        `${eduScriptRequestHandling.URL}/${COMPANY_PROFILE_PATH}?${eduScriptRequestHandling.API_KEY}`
    );
    const information = await response.json();
    return information;
};

// Create the list items with the logo, symbol, changes
eduScriptPageHandling.createListItem = function(
    image,
    symbol,
    name,
    changes,
    searResultListULElement
) {
    console.log("create list elements");
    const searResultListLIElement = document.createElement("li");
    searResultListLIElement.classList.add("list-group-item");
    const searResultListImgElement = document.createElement("img");
    searResultListImgElement.setAttribute("src", `${image}`);
    searResultListImgElement.classList.add("search-img", "ml-2");
    const searResultListAnchorElement = document.createElement("a");
    searResultListAnchorElement.setAttribute(
        "href",
        `/company.html?symbol=${symbol}`
    );
    searResultListAnchorElement.classList.add("ml-2");
    searResultListAnchorElement.textContent = `${name} (${symbol})`;
    const searResultListSpanElement = document.createElement("span");
    searResultListSpanElement.textContent = `(${changes})`;
    if (changes >= 0) {
        searResultListSpanElement.classList.add("positive-change");
        searResultListSpanElement.classList.remove("negative-change");
    } else {
        searResultListSpanElement.classList.remove("positive-change");
        searResultListSpanElement.classList.add("negative-change");
    }
    searResultListLIElement.appendChild(searResultListImgElement);
    searResultListLIElement.appendChild(searResultListAnchorElement);
    searResultListLIElement.appendChild(searResultListSpanElement);
    searResultListULElement.appendChild(searResultListLIElement);
};

// Create the search result windows after fetchng the data and creating the list of elements

eduScriptPageHandling.searchResults = async function(event) {
    eduScriptDataHandling.searchResultList.textContent = "";
    event.preventDefault();
    searchSpinner.classList.remove("invisible");
    fetchedData = await eduScriptRequestHandling.fetchSearchData();
    const searResultListULElement = document.createElement("ul");
    eduScriptDataHandling.searchResultList.appendChild(searResultListULElement);
    searResultListULElement.classList.add("list-group-flush");
    fetchedData.map(async(company) => {
        company.companyInfo = (
            await eduScriptRequestHandling.fetchCompanyInfo(company.symbol)
        ).profile;
        const { image, changes } = company.companyInfo;
        const { symbol, name } = company;
        eduScriptPageHandling.createListItem(
            image,
            symbol,
            name,
            changes,
            searResultListULElement
        );
    });
    searchSpinner.classList.add("invisible");
};

// call teh marquee

eduScriptPageHandling.marquee = new Marquee(
    eduScriptDataHandling.stocksMarquee
);
eduScriptPageHandling.marquee.createMarquee();

// Run the search after pressing the button
eduScriptDataHandling.searchButton.addEventListener(
    "click",
    eduScriptPageHandling.searchResults
);