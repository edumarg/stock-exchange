class CompareBar {
    constructor(element, company) {
        this.element = element;
        this.company = company;
        this.comperBar = this.createCompareBar();
    }

    createCompareBar = function() {
        const compareBar = this.element;
        const companiesToCompareBar = createHTMLElement(
            "div", ["col-9", "d-flex", "border", "border-dark"], { id: "companiesToCompareBar" }
        );

        const compareButtonDiv = createHTMLElement("div", [
            "col-3",
            "border",
            "border-primary",
            "d-flex",
            "justify-content-center",
        ]);
        const compareButtonAnchor = createHTMLElement(
            "a", ["d-block"], {
                id: "compareButtonAnchor",
                href: `/compare.html?symbol=`,
            },
            `Compare  compamies`
        );

        compareButtonDiv.appendChild(compareButtonAnchor);
        appendChildrenElementsToFather(
            compareBar,
            companiesToCompareBar,
            compareButtonDiv
        );
    };
}