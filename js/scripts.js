const ScriptRequestHandling = {};
const ScriptDataHandling = {};
const ScriptPageHandling = {};
ScriptRequestHandling.URL = "https://financialmodelingprep.com";
ScriptRequestHandling.API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
ScriptPageHandling.stocksMarquee = document.getElementById("stocksMarquee");
ScriptPageHandling.searchBarElement = document.getElementById("searchBar");

// ---------------------------------------------- call the marquee -------------------------------------------------

ScriptPageHandling.marquee = new Marquee(ScriptPageHandling.stocksMarquee);
ScriptPageHandling.marquee.createMarquee();

//---------------------------------- Call the search Bar---------------------------------
ScriptPageHandling.searchBar = new SearchBar(
    ScriptPageHandling.searchBarElement
);

ScriptPageHandling.searchBar.createSearchBar();

//------------ handle the search-----------------

ScriptDataHandling.searchSpinner = document.getElementById("searchSpinner");
ScriptPageHandling.searchButton = document.getElementById("searchButton");

ScriptDataHandling.searchInput = document.getElementById("searchInput");
ScriptDataHandling.whatToSearch;
ScriptDataHandling.searchResultList = document.getElementById(
    "searchResultList"
);

//  ---------------------------------------- Fetch Search data from the server ----------------------------------------
ScriptRequestHandling.fetchSearchData = async function() {
    whatToSearch = searchInput.value;
    const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
    const response = await fetch(
        `${ScriptRequestHandling.URL}/${TICKER_SEARCH_PATH}&${ScriptRequestHandling.API_KEY}`
    );
    const companies = await response.json();
    return companies;
};

//  ----------------------------------------After fetching search data ,
//                  search for the company information to extract the symbol and change values --------------------------
ScriptRequestHandling.fetchCompanyInfo = async function(symbol) {
    const companySymbol = symbol;
    const COMPANY_PROFILE_PATH = `api/v3/company/profile/${companySymbol}`;
    const response = await fetch(
        `${ScriptRequestHandling.URL}/${COMPANY_PROFILE_PATH}?${ScriptRequestHandling.API_KEY}`
    );
    const information = await response.json();
    return information;
};

// ---------------------------------  Change color of changes acording to gain or looses ---------------------------------

ScriptDataHandling.changeColorOfPriceChanges = function(changes, element) {
    if (changes >= 0) {
        element.classList.add("positive-change");
        element.classList.remove("negative-change");
    } else {
        element.classList.remove("positive-change");
        element.classList.add("negative-change");
    }
};

// --------------------------- When creating HTML element append children tags to its Father -------------------------
ScriptPageHandling.appendChildrenElementsToFather = function(
    father,
    ...children
) {
    for (child of children) {
        father.appendChild(child);
    }
};

// -----------------------  Create the result list items with the logo, symbol, changes  ---------------------------------
ScriptPageHandling.createListItem = function(
    image,
    symbol,
    name,
    changes,
    searResultListULElement
) {
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
    ScriptDataHandling.changeColorOfPriceChanges(
        changes,
        searResultListSpanElement
    );
    ScriptPageHandling.appendChildrenElementsToFather(
        searResultListLIElement,
        searResultListImgElement,
        searResultListAnchorElement,
        searResultListSpanElement
    );
    ScriptPageHandling.appendChildrenElementsToFather(
        searResultListULElement,
        searResultListLIElement
    );
};

// -------------- Create the search result windows after fetchng the data and creating the list of elements  ------------

ScriptPageHandling.searchResults = async function(event) {
    ScriptDataHandling.searchResultList.textContent = "";
    event.preventDefault();
    searchSpinner.classList.remove("invisible");
    fetchedData = await ScriptRequestHandling.fetchSearchData();
    const searResultListULElement = document.createElement("ul");
    ScriptDataHandling.searchResultList.appendChild(searResultListULElement);
    searResultListULElement.classList.add("list-group-flush");
    fetchedData.map(async(company) => {
        company.companyInfo = (
            await ScriptRequestHandling.fetchCompanyInfo(company.symbol)
        ).profile;
        const { image, changes } = company.companyInfo;
        const { symbol, name } = company;
        ScriptPageHandling.createListItem(
            image,
            symbol,
            name,
            changes,
            searResultListULElement
        );
    });
    searchSpinner.classList.add("invisible");
};

// -----------------------------------Run the search after pressing the button------------------------------
console.log(ScriptPageHandling);
ScriptPageHandling.searchButton.addEventListener(
    "click",
    ScriptPageHandling.searchResults
);