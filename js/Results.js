class Results {
    constructor(companies) {
        this.companies = companies;
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

    printCompanyForCompare = function(company) {
        console.log(company);
    };

    renderResults = function(companies) {
        const searResultListULElement = createHTMLElement("ul", [
            "list-group-flush",
        ]);
        searchResultList.appendChild(searResultListULElement);

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
            searResultListAnchorElement.innerHTML = `${this.highLightText(
        name
      )} (${this.highLightText(symbol)})`;

            const searResultListSpanElement = createHTMLElement(
                "span", ["ml-2"], {},
                `(${changes})`
            );

            changeColorOfPriceChange(changes, searResultListSpanElement);

            const searResultCompareButtonoDiv = createHTMLElement("div");

            const searchResultsCompareButton = createHTMLElement(
                "button", ["btn", "btn-primary", "compare-button", "ml-2"], {},
                "Compare"
            );

            searchResultsCompareButton.addEventListener("click", () => {
                this.printCompanyForCompare(company);
            });

            appendChildrenElementsToFather(
                searResultCompanyInfoDiv,
                searResultListImgElement,
                searResultListAnchorElement,
                searResultListSpanElement
            );
            appendChildrenElementsToFather(
                searResultCompareButtonoDiv,
                searchResultsCompareButton
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
    };
}