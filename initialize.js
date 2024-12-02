export const KHOSHNUS_SVG_ID = "khoshnus";
export const INCORRECT_CONFIGURATION_PROVIDED_ERROR_MESSAGE = "Provided configuration must be valid!"
export const checkConfigurationValidity = (predicate, configuration, errorMessage) => {
    if (!predicate(configuration)) throw new Error(errorMessage || INCORRECT_CONFIGURATION_PROVIDED_ERROR_MESSAGE);
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

const initializeDrawKeyframesCss = ({
    svgId,
    start: {
        startStrokeDashoffset,
        startStrokeWidth,
        startStroke,
        startFill
    }, end: {
        endStrokeDashoffset,
        endStrokeWidth,
        endStroke,
        endFill
    }
}) => `
@keyframes draw-stroke-dashoffset-${svgId} {
    from {
        stroke-dasharray: ${startStrokeDashoffset};
        stroke-dashoffset: ${startStrokeDashoffset};
    }

    to {
        stroke-dasharray: ${startStrokeDashoffset};
        stroke-dashoffset: ${endStrokeDashoffset};
    }
}

@keyframes draw-stroke-width-${svgId} {
    from {
        stroke-width: ${startStrokeWidth};
    }

    to {
        stroke-width: ${endStrokeWidth};
    }
}

@keyframes draw-stroke-${svgId} {
    from {
        stroke: ${startStroke};
    }

    to {
        stroke: ${endStroke};
    }
}

@keyframes draw-fill-${svgId} {
    from {
        fill: ${startFill};
    }

    to {
        fill: ${endFill};
    }
}
`

const initializeEraseKeyframesCss = ({
    svgId,
    start: {
        startStrokeDashoffset,
        startStrokeWidth,
        startStroke,
        startFill
    }, end: {
        endStrokeDashoffset,
        endStrokeWidth,
        endStroke,
        endFill
    }
}) => `
@keyframes erase-stroke-dashoffset-${svgId} {
    from {
        stroke-dasharray: ${startStrokeDashoffset};
        stroke-dashoffset: ${endStrokeDashoffset};
    }

    to {
        stroke-dasharray: ${startStrokeDashoffset};
        stroke-dashoffset: ${startStrokeDashoffset};
    }
}

@keyframes erase-stroke-width-${svgId} {
    0% {
        stroke-width: ${startStrokeWidth};
    }

    25% {
        stroke-width: ${endStrokeWidth};
    }

    67.5% {
        stroke-width: ${endStrokeWidth};
    }

    100% {
        stroke-width: ${startStrokeWidth};
    }
}

@keyframes erase-stroke-${svgId} {
    0% {
        stroke: ${endStroke};
    }

    80% {
        stroke: ${startStroke};
    }

    100% {
        stroke: ${endStroke};
    }
}

@keyframes erase-fill-${svgId} {
    from {
        fill: ${endFill};
    }

    50% {
        fill: ${startFill};
    }
}
`;

const initializeKeyframes = (initializationConfiguration) => {
    const style = document.querySelector("style");
    style.innerHTML = style.innerHTML.concat(initializeDrawKeyframesCss({ svgId: initializationConfiguration.svgId, start: initializationConfiguration.start, end: initializationConfiguration.end }));
    style.innerHTML = style.innerHTML.concat(initializeEraseKeyframesCss({ svgId: initializationConfiguration.svgId, start: initializationConfiguration.start, end: initializationConfiguration.end }));
}

export const defaultInitializationConfiguration = {
    svgId: KHOSHNUS_SVG_ID,
    font: FONT_MATRIX["Pinyon Script"].name,
    fontSize: "16px",
    start: {
        startStrokeDashoffset: FONT_MATRIX["Pinyon Script"].strokeDashoffset,
        startStroke: "black",
        startStrokeWidth: 0.0000000001,
        startFill: "transparent",
    },
    end: {
        endStrokeDashoffset: 0,
        endStroke: "transparent",
        endStrokeWidth: 0.3,
        endFill: "black",
    },
    durations: {
        strokeDashoffsetDuration: 3500,
        strokeWidthDuration: 2500,
        strokeDuration: 2500,
        fillDuration: 4000,
    },
}

const isFontConfigurationValid = (initializationConfiguration) => {
    return initializationConfiguration.font
        && initializationConfiguration.fontSize
}

export const initialize = (initializationConfiguration = defaultInitializationConfiguration) => {
    checkConfigurationValidity(
        () => typeof initializationConfiguration === "object",
        initializationConfiguration,
        "Provided configuration must be of type object!"
    );
    checkConfigurationValidity(
        () => isFontConfigurationValid(initializationConfiguration),
        initializationConfiguration,
        "Provided configuration have must valid font properties!"
    );
    const fullInitializationConfiguration = initializationConfiguration ? {
        ...defaultInitializationConfiguration,
        font: initializationConfiguration.font,
        fontSize: initializationConfiguration.fontSize,
        start: {
            ...defaultInitializationConfiguration.start,
            ...initializationConfiguration.start,
        },
        end: {
            ...defaultInitializationConfiguration.end,
            ...initializationConfiguration.end,
        },
        durations: {
            ...defaultInitializationConfiguration.durations,
            ...initializationConfiguration.durations,
        },
    } : defaultInitializationConfiguration;
    initializeKeyframes(fullInitializationConfiguration);
    return fullInitializationConfiguration;
}
