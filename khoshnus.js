const bnus = (nusraw) => {
    const svg = document.querySelector("svg");
    
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", "50%");
    textElement.setAttribute("y", "50%");
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("font-size", "10px");
    textElement.textContent = nusraw;

    svg.appendChild(textElement);
}