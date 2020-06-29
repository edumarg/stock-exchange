class Results {
    constructor(companies) {
        this.companies = companies;
    }

    appendChildrenElementsToFather = function(father, ...children) {
        for (let child of children) {
            father.appendChild(child);
        }
    };

    changeColorOfPriceChanges = function(changes, element) {
        if (changes >= 0) {
            element.classList.add("positive-change");
            element.classList.remove("negative-change");
        } else {
            element.classList.remove("positive-change");
            element.classList.add("negative-change");
        }
    };

    createHTMLElement = function(
        element,
        classes = [],
        attributes = {},
        text = ""
    ) {
        const createElement = document.createElement(element);
        for (let i = 0; i < classes.length; i++) {
            createElement.classList.add(classes[i]);
        }

        for (let key in attributes) {
            createElement.setAttribute(key, attributes[key]);
        }
        createElement.textContent = text;
        return createElement;
    };

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
        const searResultListULElement = this.createHTMLElement("ul", [
            "list-group-flush",
        ]);
        searchResultList.appendChild(searResultListULElement);

        for (let company of companies) {
            const { name, image, symbol, changes } = company;

            const searResultListLIElement = this.createHTMLElement("li", [
                "list-group-item",
                "d-flex",
                "flex-row",
                "justify-content-between",
            ]);

            const searResultCompanyInfoDiv = this.createHTMLElement("div");

            const searResultListImgElement = this.createHTMLElement(
                "img", ["search-img", "ml-2"], { src: `${image}` }
            );

            const searResultListAnchorElement = this.createHTMLElement(
                "a", ["ml-2"], {
                    href: `/company.html?symbol=${symbol}`,
                }
            );
            searResultListAnchorElement.innerHTML = `${this.highLightText(
        name
      )} (${this.highLightText(symbol)})`;

            const searResultListSpanElement = this.createHTMLElement(
                "span", ["ml-2"], {},
                `(${changes})`
            );

            this.changeColorOfPriceChanges(changes, searResultListSpanElement);

            const searResultCompareButtonoDiv = this.createHTMLElement("div");

            const searchResultsCompareButton = this.createHTMLElement(
                "button", ["btn", "btn-primary", "compare-button", "ml-2"], {},
                "Compare"
            );

            searchResultsCompareButton.addEventListener("click", () => {
                this.printCompanyForCompare(company);
            });

            this.appendChildrenElementsToFather(
                searResultCompanyInfoDiv,
                searResultListImgElement,
                searResultListAnchorElement,
                searResultListSpanElement
            );
            this.appendChildrenElementsToFather(
                searResultCompareButtonoDiv,
                searchResultsCompareButton
            );

            this.appendChildrenElementsToFather(
                searResultListLIElement,
                searResultCompanyInfoDiv,
                searResultCompareButtonoDiv
            );

            this.appendChildrenElementsToFather(
                searResultListULElement,
                searResultListLIElement
            );
        }
    };
}