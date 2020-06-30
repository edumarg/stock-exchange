const createHTMLElement = function(
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

const appendChildrenElementsToFather = function(father, ...children) {
    for (let child of children) {
        father.appendChild(child);
    }
};

const changeColorOfPriceChange = function(changes, element) {
    if (changes >= 0) {
        element.classList.add("positive-change");
        element.classList.remove("negative-change");
    } else {
        element.classList.remove("positive-change");
        element.classList.add("negative-change");
    }
};