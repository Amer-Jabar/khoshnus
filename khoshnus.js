const KHOSHNUS_SVG_ID = "khoshnus";
const INCORRECT_CONFIGURATION_PROVIDED_ERROR_MESSAGE = "Provided configuration must be of type object!"
const checkConfigurationValidity = (predicate, configuration) => {
    if (!predicate(configuration)) throw new Error(INCORRECT_CONFIGURATION_PROVIDED_ERROR_MESSAGE);
}

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
        strokeDashoffset: 100
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

const initSvgStyle = ({ font, fontSize, startStrokeDashoffset, startStrokeWidth, startFill, startStroke, baseAnimationDuration, textFillExtraAnimationDuration }) => {
    if (!FONT_MATRIX[font]) throw new Error("Font is not supported.")
    const fontStyle = `
    #${KHOSHNUS_SVG_ID} text tspan {
        stroke-dasharray: ${startStrokeDashoffset || FONT_MATRIX[font].startStrokeDashoffset};
        stroke-dashoffset: ${startStrokeDashoffset || FONT_MATRIX[font].startStrokeDashoffset};
        animation: draw-stroke ${baseAnimationDuration}s cubic-bezier(0.215, 0.610, 0.355, 1) forwards, draw-fill ${textFillExtraAnimationDuration}s cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards;
        stroke: ${startStroke};
        stroke-width: ${startStrokeWidth};
        fill: ${startFill};
        font-size: ${fontSize};
        font-family: ${font};
    }
    `

    const style = document.createElement("style");
    style.innerHTML = fontStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
}

const initializeKeyframesCss = ({ endStrokeDashoffset, endStrokeWidth, endFill, endStroke }) => `
@keyframes draw-stroke {
    to {
        stroke-dashoffset: ${endStrokeDashoffset};
        stroke-width: ${endStrokeWidth};
        stroke: ${endStroke};
    }
}

@keyframes draw-fill {
    to {
        fill: ${endFill};
    }
}
`

const initializeKeyframes = (initializationConfiguration) => {
    const style = document.querySelector("style");
    style.innerHTML = style.innerHTML.concat(initializeKeyframesCss(initializationConfiguration));
}

/**
 * baseAnimationDuration - the duration of strokes animation. This controls how fast does it take for the edges to animate.
 * textFillExtraAnimationDuration - the duration of the text fillings animation. It is advised to have this equal to or more than baseAnimationDuration.
 */
const defaultInitializationConfiguration = {
    font: FONT_MATRIX["Pinyon Script"].name,
    fontSize: "16px",
    startStrokeDashoffset: FONT_MATRIX["Pinyon Script"].strokeDashoffset,
    startStrokeWidth: 0.001,
    startFill: "transparent",
    endFill: "black",
    startStroke: "black",
    endStrokeDashoffset: 0,
    endStrokeWidth: 0.3,
    endStroke: "transparent",
    baseAnimationDuration: 2.5,
    textFillExtraAnimationDuration: 3,
}

const initialize = (initializationConfiguration = defaultInitializationConfiguration) => {
    checkConfigurationValidity(() => typeof initializationConfiguration === "object", initializationConfiguration);
    initSvgStyle(initializationConfiguration ? { ...defaultInitializationConfiguration, ...initializationConfiguration } : defaultInitializationConfiguration);
    initializeKeyframes(initializationConfiguration ? { ...defaultInitializationConfiguration, ...initializationConfiguration } : defaultInitializationConfiguration);
}

const checkDeclaration = () => {
    const svg = document.getElementById(KHOSHNUS_SVG_ID);
    if (!svg) throw new Error("Khoshnus SVG not initiated.")
}

const writeLetters = (textElement, letters, letterConfiguration) => {
    [...letters].forEach((letter, index) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
        tspan.textContent = letter;
        tspan.style.animationDelay = `${(index + 1) * letterConfiguration.delay}s`;
        textElement.appendChild(tspan);
    });
}

const defaultTextConfiguration = { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "12px" }

const defaultLetterConfiguration = {
    delay: 0.25
}

const defaultWritingConfiguration = {
    textConfiguration: defaultTextConfiguration,
    letterConfiguration: defaultLetterConfiguration,
}

const write = (text, writingConfiguration = defaultWritingConfiguration) => {
    checkDeclaration();
    const svg = document.getElementById(KHOSHNUS_SVG_ID);

    checkConfigurationValidity(() => {
        const { textConfiguration, letterConfiguration } = writingConfiguration;
        return [textConfiguration, letterConfiguration].find(config => typeof config === "object")
    }, writingConfiguration);
    const { textConfiguration, letterConfiguration } = {
        textConfiguration: { ...defaultTextConfiguration, ...writingConfiguration.textConfiguration },
        letterConfiguration: { ...defaultLetterConfiguration, ...writingConfiguration.letterConfiguration }
    };

    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", textConfiguration.x);
    textElement.setAttribute("y", textConfiguration.y);
    textElement.setAttribute("text-anchor", textConfiguration.textAnchor);
    textElement.setAttribute("dominant-baseline", textConfiguration.dominantBaseline);
    if (textConfiguration.fontSize) {
        textElement.setAttribute("font-size", textConfiguration.fontSize);
    }
    writeLetters(textElement, text, letterConfiguration);

    svg.appendChild(textElement);
}

module.exports = { initialize, write, FONT_MATRIX, defaultInitializationConfiguration, defaultWritingConfiguration }