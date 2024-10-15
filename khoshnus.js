const KHOSHNUS_SVG_ID = "khoshnus";

const FONT_MATRIX = {
    "BlackCherry": {
        name: "BlackCherry",
        strokeDashoffset: 80
    },
    "Celtic": {
        name: "Celtic",
        strokeDashoffset: 50
    },
    "Eutemia": {
        name: "Eutemia",
        strokeDashoffset: 60
    },
    "Kingthings": {
        name: "Kingthings",
        strokeDashoffset: 40
    },
    "Ruritania": {
        name: "Ruritania",
        strokeDashoffset: 280
    },
    "VTKS": {
        name: "VTKS",
        strokeDashoffset: 150
    },
    "Parisienne": {
        name: "Parisienne",
        strokeDashoffset: 80
    },
    "Sevillana": {
        name: "Sevillana",
        strokeDashoffset: 120
    },
    "Pinyon Script": {
        name: "Pinyon Script",
        strokeDashoffset: 100
    },
}

const initSvgStyle = ({ font, fontSize, strokeDashoffset }) => {
    if (!FONT_MATRIX[font]) throw new Error("Font is not supported.")
    const fontStyle = `
    #${KHOSHNUS_SVG_ID} text tspan {
        stroke-dasharray: ${strokeDashoffset || FONT_MATRIX[font].strokeDashoffset};
        stroke-dashoffset: ${strokeDashoffset || FONT_MATRIX[font].strokeDashoffset};
        animation: draw-stroke 2.75s cubic-bezier(0.215, 0.610, 0.355, 1) forwards, draw-fill 3s cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards;
        stroke: black;
        stroke-width: 0.01;
        fill: transparent;
        font-size: ${fontSize};
        font-family: ${font};
    }
    `

    var style = document.createElement("style");
    style.innerHTML = fontStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
}

const keyframes = `
@keyframes draw-stroke {
    to {
        stroke-dashoffset: 0;
        stroke-width: 0.1;
    }
}

@keyframes draw-fill {
    to {
        fill: black;
    }
}
`

const initKeyframes = () => {
    var style = document.querySelector("style");
    style.innerHTML = style.innerHTML.concat(keyframes);
}

const bnasena = ({ font = FONT_MATRIX["Pinyon Script"].name, fontSize = "12px", strokeDashoffset }) => {
    initSvgStyle({ font, fontSize, strokeDashoffset });
    initKeyframes();
}

const checkDeclaration = () => {
    const svg = document.getElementById(KHOSHNUS_SVG_ID);
    if (!svg) throw new Error("Khosnus SVG not initiated.")
}


const defaultLetterProperties = {
    delay: 0.25
}

const writeLetters = (textElement, letters, letterProperties) => {
    [...letters].forEach((letter, index) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
        tspan.textContent = letter;
        tspan.style.animationDelay = `${(index + 1) * letterProperties.delay}s`;
        textElement.appendChild(tspan);
    });
}

const defaultTextProperties = { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "12px" }

const bnus = (nusraw, textProperties = defaultTextProperties, letterProperties = defaultLetterProperties) => {
    checkDeclaration();
    const svg = document.getElementById(KHOSHNUS_SVG_ID);

    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", textProperties.x);
    textElement.setAttribute("y", textProperties.y);
    textElement.setAttribute("text-anchor", textProperties.textAnchor);
    textElement.setAttribute("dominant-baseline", textProperties.dominantBaseline);
    if (textProperties.fontSize) {
        textElement.setAttribute("font-size", textProperties.fontSize);
    }
    writeLetters(textElement, nusraw, letterProperties);

    svg.appendChild(textElement);
}