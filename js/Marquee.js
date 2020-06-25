function Marquee(element) {
    this.element = element;

    // -------------------------------------- Fetch data to display on the marque -------------------------------------
    let fetchMarqueeData = async function() {
        const URL = "https://financialmodelingprep.com";
        const API_KEY = `apikey=ed93f3e229380c530b7a0e7663f86b99`;
        const MARQUEE_DATA_PATH = `api/v3/quotes/nasdaq`;
        const response = await fetch(`${URL}/${MARQUEE_DATA_PATH}?${API_KEY}`);
        const company = await response.json();
        return company;
    };

    // ------------------------- Change color of changes acording to gain or looses -------------------------------
    let changeColorOfPriceChange = function(changes, element) {
        if (changes >= 0) {
            element.classList.add("positive-change");
            element.classList.remove("negative-change");
        } else {
            element.classList.remove("positive-change");
            element.classList.add("negative-change");
        }
    };

    // ---------------  append multiple  children tags to one parrent------------------
    let appendChildrenElementsToFather = function(father, ...children) {
        for (child of children) {
            father.appendChild(child);
        }
    };

    // -------------- Create the UL element for with the data of the Marquee --------------
    let loopOverDatatoCreateMarqueeList = function(company, marqueeULElement) {
        for (let i = 0; i < 100; i++) {
            const marqueLIElement = document.createElement("li");
            marqueLIElement.classList.add("list-group-item", "mr-2", "ml-2");
            const marqueSymbolElement = document.createElement("span");
            marqueSymbolElement.classList.add("mr-1");
            marqueSymbolElement.textContent = `${company[i].symbol}`;
            const marquePriceElement = document.createElement("span");
            marquePriceElement.classList.add("mr-1", "text-primary");
            marquePriceElement.textContent = `$${company[i].price}`;
            const marqueChangeElement = document.createElement("span");
            marqueChangeElement.textContent = `(${company[i].change})`;
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

    //  ------------------  Create the MArquee with the data fetch and the element creation ------------------
    this.createMarquee = async function() {
        const company = await fetchMarqueeData();
        const marqueeList = this.element;
        const marqueeULElement = document.createElement("ul");
        marqueeList.appendChild(marqueeULElement);
        marqueeULElement.classList.add(
            "list-group",
            "list-group-horizontal",
            "stocks-marquee"
        );
        loopOverDatatoCreateMarqueeList(company, marqueeULElement);
    };
}