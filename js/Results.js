class Results {
    constructor(companies) {
        this.companies = companies;
        this.companiesForCompare = [];
    }

    highLightText = function(string) {
        const textToHighlight = RegExp(searchInput.value, "i");
        if (!string.match(textToHighlight)) return string;
        const matchStartPosition = string.match(textToHighlight).index;
        const matchEndPosition =
            matchStartPosition + string.match(textToHighlight)[0].toString().length;
        const originalTextFoundByRegex = string.substring(
            matchStartPosition,
            matchEndPosition
        );
        const replacedString = string.replace(
            textToHighlight,
            `<mark class="m-0 p-0 bg-warning">${originalTextFoundByRegex}</mark>`
        );
        return replacedString;
    };

    renderResults = function(companies) {
        const searResultListULElement = createHTMLElement("ul", [
            "list-group-flush",
        ]);
        searchResultList.appendChild(searResultListULElement);
        console.log(companies);
        for (let company of companies) {
            const { name, image, symbol, changes } = company;

            const searResultListLIElement = createHTMLElement("li", [
                "list-group-item",
                "d-flex",
                "flex-row",
                "justify-content-between",
            ]);

            const searResultCompanyInfoDiv = createHTMLElement("div");

            const searResultListImgElement = createHTMLElement(
                "img", ["search-img", "ml-2"], { src: `${image}` }
            );

            const searResultListAnchorElement = createHTMLElement("a", ["ml-2"], {
                href: `/company.html?symbol=${symbol}`,
            });
            const searResultNameSpanElement = createHTMLElement("span", ["name"]);
            const searResultSymbolSpanElement = createHTMLElement("span", ["symbol"]);
            searResultNameSpanElement.innerHTML = `${this.highLightText(name)}`;
            searResultSymbolSpanElement.innerHTML = `(${this.highLightText(symbol)})`;

            appendChildrenElementsToFather(
                searResultListAnchorElement,
                searResultNameSpanElement,
                searResultSymbolSpanElement
            );

            const searResultListSpanElement = createHTMLElement(
                "span", ["ml-2"], {},
                `(${changes})`
            );

            changeColorOfPriceChange(changes, searResultListSpanElement);

            const searResultCompareButtonoDiv = createHTMLElement("div");

            const searchResultCompareButton = createHTMLElement(
                "button", ["compare-button", "btn", "btn-primary", "ml-2"], {},
                "Compare"
            );

            appendChildrenElementsToFather(
                searResultCompanyInfoDiv,
                searResultListImgElement,
                searResultListAnchorElement,
                searResultListSpanElement
            );
            appendChildrenElementsToFather(
                searResultCompareButtonoDiv,
                searchResultCompareButton
            );

            appendChildrenElementsToFather(
                searResultListLIElement,
                searResultCompanyInfoDiv,
                searResultCompareButtonoDiv
            );

            appendChildrenElementsToFather(
                searResultListULElement,
                searResultListLIElement
            );
        }
        this.compareButtonsEventListener();
    };

    compareButtonsEventListener = function(callback) {
        const comparebuttons = document.querySelectorAll(".compare-button");
        const companySymbols = document.querySelectorAll(".symbol");
        comparebuttons.forEach((button, index) => {
            button.addEventListener("click", (event) => {
                this.addCompaniesToCompare(
                    companySymbols[index].textContent.replace("(", "").replace(")", "")
                );
            });
        });
    };

    addCompaniesToCompare = function(company) {
        if (
            this.companiesForCompare.indexOf(company) === -1 &&
            this.companiesForCompare.length < 3
        ) {
            this.companiesForCompare.push(company);

            const companyToCompareButton = createHTMLElement(
                "button", ["company-to-compare", "mr-3", "btn", "btn-primary"], {},
                `${company} x`
            );
            companiesToCompareBar.appendChild(companyToCompareButton);
            let symbolsForHref = this.companiesForCompare.join();
            let CompareCompaniesButtonHref = `/compare.html?symbol=${symbolsForHref}`;
            compareButtonAnchor.setAttribute("href", CompareCompaniesButtonHref);
            companyToCompareButton.addEventListener("click", (event) => {
                let symbolToRemove = event.target.textContent;
                symbolToRemove = symbolToRemove.replace(" x", "");
                let indextoRemove = this.companiesForCompare.indexOf(symbolToRemove);
                this.companiesForCompare.splice(indextoRemove, 1);
                symbolsForHref = this.companiesForCompare.join();
                CompareCompaniesButtonHref = `/compare.html?symbol=${symbolsForHref}`;
                compareButtonAnchor.setAttribute("href", CompareCompaniesButtonHref);
                event.target.remove();
            });
        }
    };
}