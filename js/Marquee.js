class Marquee {
    constructor(element) {
        this.element = element;
    }

    async function fetchMarqueeDataFetch() {
        const MARQUEE_DATA_PATH = `api/v3/quotes/nasdaq`;
        const response = await fetch(`${URL}/${MARQUEE_DATA_PATH}?${API_KEY}`);
        const company = await response.json();
        return company;
    }

    async function createMarquee() {
        const company = await fetchMarqueeDataFetch();
        const marqueeList = this.element;
        const marqueeULElement = document.createElement("ul");
        marqueeULElement.classList.add(
            "list-group list-group-horizontal stocks-marquee"
        );
        loopOverDatatoCreateList(company)

        marqueeList.appendChild(marqueeULElement);
    }

    loopOverDatatoCreateList(company) {
        for (let i = 0; i < 200; i++) {
            const marqueElement = document.createElement("li");
            marqueElement.classList.add("list-group-item", "mr-2", "ml-2");
            marqueElement.innerText = `${company[i].symbol} $${company[i].price} (${company[i].change})`;
            marqueeULElement.appendChild(marqueElement);
        }

    }


}