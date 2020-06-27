class SearchBar {
    constructor(element) {
        this.element = element;
        this.htmlCreation = this.createSearchBar();
        this.URL = "https://financialmodelingprep.com";
        this.API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
    }

    fetchSearchData = async function() {
        let whatToSearch = searchInput.value;
        const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
        const response = await fetch(
            `${this.URL}/${TICKER_SEARCH_PATH}&${this.API_KEY}`
        );
        const companies = await response.json();
        return companies;
    };

    fetchCompanyInfo = async function(symbol) {
        const companySymbol = symbol;
        const COMPANY_PROFILE_PATH = `api/v3/profile/${companySymbol}`;
        const response = await fetch(
            `${this.URL}/${COMPANY_PROFILE_PATH}?${this.API_KEY}`
        );

        const information = await response.json();

        return information;
    };

    createListItem = function(image, symbol, name, changes) {
        const company = {
            image: image,
            symbol: symbol,
            name: name,
            changes: changes,
        };
        return company;
    };

    searchResults = async function(callback) {
        searchInput.addEventListener("input", async(event) => {
            searchResultList.textContent = "";
            searchSpinner.classList.remove("invisible");
            const companies = await this.fetchSearchData();
            const mapedCompanies = await Promise.all(
                companies.map(async(company) => {
                    company = await this.fetchCompanyInfo(company.symbol);

                    const { companyName, image, changes, symbol } = company[0];
                    return this.createListItem(image, symbol, companyName, changes);
                })
            );
            callback(mapedCompanies);
            searchSpinner.classList.add("invisible");
        });
    };

    setElementAttributes = function(element, attributes) {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    };

    appendChildrenElementsToFather = function(father, ...children) {
        for (let child of children) {
            father.appendChild(child);
        }
    };

    createSearchBar = function() {
        const searchBar = this.element;
        const searchBarNavItem = document.createElement("nav");
        searchBarNavItem.classList.add(
            "navbar",
            "navbar-expand-lg",
            "navbar-light",
            "bg-light",
            "col-xl-12",
            "d-flex",
            "justify-content-center"
        );
        searchBar.appendChild(searchBarNavItem);

        const searchBarForm = document.createElement("form");
        searchBarForm.classList.add(
            "input-group",
            "my-2",
            "my-lg-0",
            "d-flex",
            "flex",
            "align-items",
            "flex-nowrap"
        );

        const searchBarInput = document.createElement("input");
        searchBarInput.classList.add("form-control", "mr-sm-2");
        this.setElementAttributes(searchBarInput, {
            id: "searchInput",
            type: "search",
            placeholder: "Search",
            "aria-label": "Search",
        });
        const searchButton = document.createElement("button");
        searchButton.classList.add("btn", "btn-outline-success", "my-sm-0", "m-0");
        searchButton.setAttribute("id", "searchButton");
        searchButton.textContent = "Search";
        const searchBarDivforSpiner = document.createElement("div");
        searchBarDivforSpiner.classList.add("spinner-border", "invisible", "ml-3");
        this.setElementAttributes(searchBarDivforSpiner, {
            role: "status",
            id: "searchSpinner",
        });
        const searchBarSpinner = document.createElement("span");
        searchBarSpinner.classList.add("sr-only");
        searchBarSpinner.textContent = "Loading...";
        searchBarDivforSpiner.appendChild(searchBarSpinner);
        this.appendChildrenElementsToFather(
            // append input, button and spinner to the form
            searchBarForm,
            searchBarInput,
            searchButton,
            searchBarDivforSpiner
        );

        searchBarNavItem.appendChild(searchBarForm); //append al the componnent to the bar
        searchBar.appendChild(searchBarNavItem); // append all the navbad to her divisio on the HTML
    };
}