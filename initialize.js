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
    0% {
        stroke-width: ${startStrokeWidth};
        stroke: ${endStroke};
    }

    75% {
        stroke-width: ${endStrokeWidth};
        stroke: ${startStroke};
    }

    100% {
        stroke-width: ${startStrokeWidth};
        stroke: ${endStroke};
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
    initializeKeyframes(fullInitializationConfiguration);
    return fullInitializationConfiguration;
}
