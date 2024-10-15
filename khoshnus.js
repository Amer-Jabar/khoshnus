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
        strokeDashoffset: 50
    },
    "Sevillana": {
        name: "Sevillana",
        strokeDashoffset: 50
    },
    "Pinyon Script": {
        name: "Pinyon Script",
        strokeDashoffset: 60
    },
}

const initSvgStyle = ({ font, fontSize }) => {
    if (!FONT_MATRIX[font]) throw new Error("Font is not supported.")
    const fontStyle = `
    #${KHOSHNUS_SVG_ID} * {
        stroke-dasharray: ${FONT_MATRIX[font].strokeDashoffset};
        stroke-dashoffset: ${FONT_MATRIX[font].strokeDashoffset};
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

const bnasena = ({ font = FONT_MATRIX["Pinyon Script"].name, fontSize = "12px" }) => {
    initSvgStyle({ font, fontSize });
    initKeyframes();
}

const checkDeclaration = () => {
    const svg = document.getElementById(KHOSHNUS_SVG_ID);
    if (!svg) throw new Error("Khosnus SVG not initiated.")
}

const defaultTextProperties = { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "12px" }

const bnus = (nusraw, textProperties = defaultTextProperties) => {
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
    textElement.textContent = nusraw;

    svg.appendChild(textElement);
}