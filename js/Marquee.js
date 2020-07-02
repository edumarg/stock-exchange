class Marquee {
    constructor(element) {
        this.element = element;
    }

    fetchMarqueeData = async function() {
        const MARQUEE_DATA_PATH = `api/v3/quotes/nasdaq`;
        const response = await fetch(`${URL}/${MARQUEE_DATA_PATH}?${API_KEY}`);
        const company = await response.json();
        return company;
    };

    loopOverDatatoCreateMarqueeList = function(company, marqueeULElement) {
        for (let i = 0; i < 100; i++) {
            const marqueLIElement = createHTMLElement("li", [
                "list-group-item",
                "mr-2",
                "ml-2",
            ]);

            const marqueSymbolElement = createHTMLElement(
                "span", ["mr-1"], {},
                `${company[i].symbol}`
            );

            const marquePriceElement = createHTMLElement(
                "span", ["mr-1", "text-primary"], {},
                `$${company[i].price}`
            );

            const marqueChangeElement = createHTMLElement(
                "span", [], {},
                `(${company[i].change})`
            );

            changeColorOfPriceChange(company[i].change, marqueChangeElement);
            appendChildrenElementsToFather(
                marqueLIElement,
                marqueSymbolElement,
                marquePriceElement,
                marqueChangeElement
            );
            marqueeULElement.appendChild(marqueLIElement);
        }
    };

    createMarquee = async function() {
        const company = await this.fetchMarqueeData();
        const marqueeList = this.element;
        const marqueeULElement = document.createElement("ul");
        marqueeList.appendChild(marqueeULElement);
        marqueeULElement.classList.add(
            "list-group",
            "list-group-horizontal",
            "stocks-marquee"
        );
        this.loopOverDatatoCreateMarqueeList(company, marqueeULElement);
    };
}