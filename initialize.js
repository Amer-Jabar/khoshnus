export const KHOSHNUS_SVG_ID = "khoshnus";
export const INCORRECT_CONFIGURATION_PROVIDED_ERROR_MESSAGE = "Provided configuration must be of type object!"
export const checkConfigurationValidity = (predicate, configuration) => {
    if (!predicate(configuration)) throw new Error(INCORRECT_CONFIGURATION_PROVIDED_ERROR_MESSAGE);
}

export const FONT_MATRIX = {
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

const createLetterStyle = (initializationConfiguration) => {
    const {
        font,
        fontSize,
        startStrokeDashoffset,
        startStrokeWidth,
        startFill,
        startStroke,
        strokeDashoffsetDuration,
        strokeDuration,
        fillDuration
    } = initializationConfiguration;
    return `#${KHOSHNUS_SVG_ID} text tspan {
        stroke-dasharray: ${startStrokeDashoffset || FONT_MATRIX[font].startStrokeDashoffset};
        stroke-dashoffset: ${startStrokeDashoffset || FONT_MATRIX[font].startStrokeDashoffset};
        animation:
            draw-stroke-dashoffset ${strokeDashoffsetDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
            draw-stroke ${strokeDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
            draw-fill ${fillDuration}ms cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards;
        animation-direction: normal;
        stroke: ${startStroke};
        stroke-width: ${startStrokeWidth};
        fill: ${startFill};
        font-size: ${fontSize};
        font-family: ${font};
    }`
}

const initializeLetterStyle = (initializationConfiguration) => {
    if (!FONT_MATRIX[initializationConfiguration.font]) throw new Error("Font is not supported.")
    const letterStyle = createLetterStyle(initializationConfiguration)

    let style = document.querySelector("style");
    if (!style) {
        style = document.createElement("style");
        style.innerHTML = letterStyle;
    } else {
        style.innerHTML = (style.innerHTML || "").concat(letterStyle);
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}

const initializeDrawKeyframesCss = ({ endStrokeDashoffset, endStrokeWidth, endFill, endStroke }) => `
@keyframes draw-stroke-dashoffset {
    to {
        stroke-dashoffset: ${endStrokeDashoffset};
    }
}

@keyframes draw-stroke {
    to {
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

const initializeEraseKeyframesCss = ({ startStrokeDashoffset, startStrokeWidth, startStroke, startFill, endStrokeDashoffset, endStrokeWidth, endStroke, endFill }) => `
@keyframes erase-stroke-dashoffset {
    from {
        stroke-dashoffset: ${endStrokeDashoffset};
    }

    to {
        stroke-dashoffset: ${startStrokeDashoffset};
    }
}

@keyframes erase-stroke {
    from {
        stroke-width: ${startStrokeWidth};
        stroke: ${endStroke};
    }

    to {
        stroke-width: ${startStrokeWidth};
        stroke: ${startStroke};
    }
}

@keyframes erase-fill {
    from {
        fill: ${endFill};
    }

    to {
        fill: ${startFill};
    }
}
`;

const initializeKeyframes = (initializationConfiguration) => {
    const style = document.querySelector("style");
    style.innerHTML = style.innerHTML.concat(initializeDrawKeyframesCss(initializationConfiguration));
    style.innerHTML = style.innerHTML.concat(initializeEraseKeyframesCss(initializationConfiguration));
}

/**
 * baseAnimationDuration - the duration of strokes animation. This controls how fast does it take for the edges to animate.
 * textFillExtraAnimationDuration - the duration of the text fillings animation. It is advised to have this equal to or more than baseAnimationDuration.
 */
export const defaultInitializationConfiguration = {
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
    strokeDashoffsetDuration: 2500,
    strokeDuration: 2500,
    fillDuration: 3000,
    totalWaitTimeForFinalization: -1
}

export const initialize = (initializationConfiguration = defaultInitializationConfiguration) => {
    checkConfigurationValidity(() => typeof initializationConfiguration === "object", initializationConfiguration);
    const fullInitializationConfiguration = initializationConfiguration ? { ...defaultInitializationConfiguration, ...initializationConfiguration } : defaultInitializationConfiguration;
    initializeLetterStyle(fullInitializationConfiguration);
    initializeKeyframes(fullInitializationConfiguration);
    return fullInitializationConfiguration;
}
