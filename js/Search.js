class SearchBar {
    constructor(element) {
        this.element = element;
        this.htmlCreation = this.createSearchBar();
    }

    fetchSearchData = async function() {
        let whatToSearch = searchInput.value;
        const TICKER_SEARCH_PATH = `api/v3/search?query=${whatToSearch}&limit=10&exchange=NASDAQ`;
        const response = await fetch(`${URL}/${TICKER_SEARCH_PATH}&${API_KEY}`);
        const companies = await response.json();
        return companies;
    };

    fetchCompanyInfo = async function(symbol) {
        const companySymbol = symbol;
        const COMPANY_PROFILE_PATH = `api/v3/profile/${companySymbol}`;
        const response = await fetch(`${URL}/${COMPANY_PROFILE_PATH}?${API_KEY}`);
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
        searchButton.addEventListener("click", async(event) => {
            event.preventDefault();
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

    createSearchBar = function() {
        const searchBar = this.element;
        const searchBarNavItem = createHTMLElement("nav", [
            "navbar",
            "navbar-expand-lg",
            "navbar-light",
            "bg-light",
            "col-xl-12",
            "d-flex",
            "justify-content-center",
        ]);
        searchBar.appendChild(searchBarNavItem);

        const searchBarForm = createHTMLElement("form", [
            "input-group",
            "my-2",
            "my-lg-0",
            "d-flex",
            "flex",
            "align-items",
            "flex-nowrap",
        ]);

        const searchBarInput = createHTMLElement(
            "input", ["form-control", "mr-sm-2"], {
                id: "searchInput",
                type: "search",
                placeholder: "Search",
                "aria-label": "Search",
            }
        );

        const searchButton = createHTMLElement(
            "button", ["btn", "btn-outline-success", "my-sm-0", "m-0"], { id: "searchButton" },
            "Search"
        );

        const searchBarDivforSpiner = createHTMLElement(
            "div", ["spinner-border", "invisible", "ml-3"], {
                role: "status",
                id: "searchSpinner",
            }
        );

        const searchBarSpinner = createHTMLElement(
            "span", ["sr-only"], {},
            "Loading..."
        );
        searchBarDivforSpiner.appendChild(searchBarSpinner);

        appendChildrenElementsToFather(
            searchBarForm,
            searchBarInput,
            searchButton,
            searchBarDivforSpiner
        );

        searchBarNavItem.appendChild(searchBarForm);
        searchBar.appendChild(searchBarNavItem);
    };
}