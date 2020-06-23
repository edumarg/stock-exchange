function Marquee(element) {
    this.element = element;

    this.fetchMarqueeData = async function() {
        const MARQUEE_DATA_PATH = `api/v3/quotes/nasdaq`;
        const response = await fetch(`${URL}/${MARQUEE_DATA_PATH}?${API_KEY}`);
        const company = await response.json();
        return company;
    };

    this.createMarquee = async function() {
        console.log("create marquee");
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

    this.loopOverDatatoCreateMarqueeList = function(company, marqueeULElement) {
        console.log("loop over data");
        for (let i = 0; i < 200; i++) {
            const marqueLIElement = document.createElement("li");
            marqueLIElement.classList.add("list-group-item", "mr-2", "ml-2");
            marqueLIElement.innerText = `${company[i].symbol} $${company[i].price} (${company[i].change})`;
            marqueeULElement.appendChild(marqueLIElement);
        }
    };
}