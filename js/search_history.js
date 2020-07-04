async function getSearchHistory() {
    const data = await fetch("http://localhost:3000/search-history");
    const history = await data.json();
    return history;
}

renderResults = function(searches) {
    const searResultListULElement = createHTMLElement("ul", ["list-group-flush"]);
    searchResultList.appendChild(searResultListULElement);
    for (let search of searches) {
        const { symbol, date } = search;

        const searResultListLIElement = createHTMLElement("li", [
            "list-group-item",
            "d-flex",
            "justify-content-between",
        ]);

        const searResultListAnchorElement = createHTMLElement("a", [], {
            href: `/index.html?symbol=${symbol}`,
        });
        const searResultSymbolSpanElement = createHTMLElement(
            "span", ["symbol", "mr-2"], {},
            `Searched item: "${symbol}"`
        );
        const searResultDateSpanElement = createHTMLElement(
            "span", ["date"], {},
            `at: ${new Date(date)}`
        );
        appendChildrenElementsToFather(
            searResultListAnchorElement,
            searResultSymbolSpanElement,
            searResultDateSpanElement
        );

        const searchResultDeleteButtonDiv = createHTMLElement("div", ["mr-3"]);
        const searchResultDeleteButton = createHTMLElement(
            "button", ["delete-button", "btn", "btn-primary", "ml-2"], {},
            "Delete"
        );

        searchResultDeleteButtonDiv.appendChild(searchResultDeleteButton);
        appendChildrenElementsToFather(
            searResultListLIElement,
            searResultListAnchorElement,
            searchResultDeleteButtonDiv
        );
        searResultListULElement.appendChild(searResultListLIElement);
    }
};

async function showResults() {
    const searches = await getSearchHistory();
    return renderResults(searches);
}

showResults();