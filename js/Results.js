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
        for (let company of companies) {
            const { name, image, symbol, changes } = company;
            const searResultListULElement = document.createElement("ul");
            searchResultList.appendChild(searResultListULElement);
            searResultListULElement.classList.add("list-group-flush");
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
            searResultListAnchorElement.innerHTML = `${this.highLightText(
        name
      )} (${this.highLightText(symbol)})`;

            const searResultListSpanElement = document.createElement("span");
            searResultListSpanElement.textContent = `(${changes})`;
            this.changeColorOfPriceChanges(changes, searResultListSpanElement);
            this.appendChildrenElementsToFather(
                searResultListLIElement,
                searResultListImgElement,
                searResultListAnchorElement,
                searResultListSpanElement
            );
            this.appendChildrenElementsToFather(
                searResultListULElement,
                searResultListLIElement
            );
        }
    };
}