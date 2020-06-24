function SearchBar(element) {
    this.element = element;

    /// ---------------- Setting Multiple attibutes to one element-----------------------
    this.setElementAttributes = function(element, attributes) {
        for (key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    };

    // ----------------------- Appending multiple children to one parent----------------------
    this.appendChildrenElementsToFather = function(father, ...children) {
        for (child of children) {
            father.appendChild(child);
        }
    };

    // ------------------ Create Search Bar----------------------
    this.createSearchBar = function() {
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
        const searchBarDiv = document.createElement("div");
        const searchBarForm = document.createElement("form");
        searchBarForm.classList.add(
            "form-inline",
            "my-2",
            "my-lg-0",
            "d-flex",
            "flex",
            "align-items",
            "flex-nowrap"
        );
        searchBarDiv.appendChild(searchBarForm);
        const searchBarInput = document.createElement("input");
        searchBarInput.classList.add("form-control", "mr-sm-2");
        this.setElementAttributes(searchBarInput, {
            id: "searchInput",
            type: "search",
            placeholder: "Search",
            "aria-label": "Search",
        });
        const searchBarButton = document.createElement("button");
        searchBarButton.classList.add(
            "btn",
            "btn-outline-success",
            "my-2",
            "my-sm-0"
        );
        searchBarButton.setAttribute("id", "searchButton");
        searchBarButton.textContent = "Search";
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
            searchBarButton,
            searchBarDivforSpiner
        );
        searchBarDiv.appendChild(searchBarForm); //append form to the division
        searchBarNavItem.appendChild(searchBarDiv); //append al the componnent to the bar
        searchBar.appendChild(searchBarNavItem); // append all the navbad to her divisio on the HTML
    };
}