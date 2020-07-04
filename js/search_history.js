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
            "flex-row",
            "justify-content-between",
        ]);

        const searResultListAnchorElement = createHTMLElement("a", [], {
            href: `/#`,
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

        searResultListLIElement.appendChild(searResultListAnchorElement);
        searResultListULElement.appendChild(searResultListLIElement);
    }
};

async function showResults() {
    const searches = await getSearchHistory();
    return renderResults(searches);
}

showResults();