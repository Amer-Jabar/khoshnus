import { checkConfigurationValidity, FONT_MATRIX, KHOSHNUS_SVG_ID } from "../initialize";

export const checkDeclaration = () => {
    const svg = document.getElementById(KHOSHNUS_SVG_ID);
    if (!svg) throw new Error("Khoshnus SVG not initiated.")
}

// ------------------------------------------------------------------------------------------------------------------------

const defaultTextElementAttributes = { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "12px" }

const defaultLetterConfiguration = {
    eachLetterDelay: 250
}

export const defaultWritingConfiguration = {
    textElementAttributes: defaultTextElementAttributes,
    letterConfiguration: defaultLetterConfiguration,
}

const validateAndReturnConfiguration = (writingConfiguration) => {
    checkConfigurationValidity(() => {
        const { textElementAttributes, letterConfiguration } = writingConfiguration;
        return [textElementAttributes, letterConfiguration].filter(configuration => configuration).every(config => typeof config === "object")
    }, writingConfiguration);
    return {
        textElementAttributes: { ...defaultTextElementAttributes, ...writingConfiguration.textElementAttributes },
        letterConfiguration: { ...defaultLetterConfiguration, ...writingConfiguration.letterConfiguration }
    };
}

const createTextElement = (textElementAttributes) => {
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const textId = crypto.randomUUID()
    textElement.id = textId;
    textElement.setAttribute("x", textElementAttributes.x);
    textElement.setAttribute("y", textElementAttributes.y);
    textElement.setAttribute("text-anchor", textElementAttributes.textAnchor);
    textElement.setAttribute("dominant-baseline", textElementAttributes.dominantBaseline);
    if (textElementAttributes.fontSize) {
        textElement.setAttribute("font-size", textElementAttributes.fontSize);
    }
    return textElement;
}


const setLetterStyle = (letter, initializationConfiguration) => {
    const {
        font,
        fontSize,
        start: {
            startStrokeDashoffset,
            startStroke,
            startStrokeWidth,
            startFill,
        },
        durations: {
            strokeDashoffsetDuration,
            strokeWidthDuration,
            strokeDuration,
            fillDuration,
        }
    } = initializationConfiguration;
    letter.style.fontSize = fontSize;
    letter.style.fontFamily = font;

    letter.style.strokeDashoffset = startStrokeDashoffset;
    letter.style.strokeWidth = startStrokeWidth;
    letter.style.stroke = startStroke;
    letter.style.fill = startFill;
    letter.style.animation = `
    draw-stroke-dashoffset ${strokeDashoffsetDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
    draw-stroke-width ${strokeWidthDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
    draw-stroke ${strokeDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
    draw-fill ${fillDuration}ms cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards
    `;
}

const writeLetters = (textElement, letters, letterConfiguration, initializationConfiguration) => {
    [...letters].forEach((letterToWrite, index) => {
        const letterElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
        letterElement.textContent = letterToWrite;
        setLetterStyle(letterElement, initializationConfiguration);
        letterElement.style.animationDelay = `${(index + 1) * letterConfiguration.eachLetterDelay}ms`;
        textElement.appendChild(letterElement);
    });
}

const setTotalWaitTimeForFinalization = (textElement, letterConfiguration, initializationConfiguration) => {
    const { durations: { strokeDashoffsetDuration, fillDuration } } = initializationConfiguration;
    const largestDuration = Math.max(strokeDashoffsetDuration, fillDuration)
    const waitTimeUntilLetterStyleFinalization = (textElement.childNodes.length - 1) + largestDuration;
    initializationConfiguration.totalWaitTimeForFinalization = waitTimeUntilLetterStyleFinalization
}

export const write = (text, initializationConfiguration, writingConfiguration = defaultWritingConfiguration) => {
    checkDeclaration();
    const svg = document.getElementById(KHOSHNUS_SVG_ID);

    const { textElementAttributes, letterConfiguration } = validateAndReturnConfiguration(writingConfiguration);
    const textElement = createTextElement(textElementAttributes);
    writeLetters(textElement, text, letterConfiguration, initializationConfiguration);
    setTotalWaitTimeForFinalization(textElement, letterConfiguration, initializationConfiguration);

    svg.appendChild(textElement);
    return textElement.id;
}

// ------------------------------------------------------------------------------------------------------------------------

const defaultEraseConfiguration = {
    delayEraseStrokeDashoffset: 0,
    delayEraseStrokeWidth: 0,
    delayEraseStroke: 0,
    delayEraseFill: 0,
    delayOperation: 0
}

const eraseLetters = (letters, eraseConfiguration, initializationConfiguration) => {
    const {
        strokeDashoffsetDuration: eraseStrokeDashoffsetDuration,
        strokeWidthDuration: eraseStrokeWidthDuration,
        strokeDuration: eraseStrokeDuration,
        fillDuration: eraseFillDuration
    } = initializationConfiguration.durations
    const {
        delayEraseStrokeDashoffset,
        delayEraseStrokeWidth,
        delayEraseStroke,
        delayEraseFill,
    } = eraseConfiguration;

    Array.from(letters).forEach(letter => {
        letter.style.animation = `
        erase-stroke-dashoffset ${eraseStrokeDashoffsetDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-stroke-width ${eraseStrokeWidthDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-stroke ${eraseStrokeDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-fill ${eraseFillDuration}ms cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards
        `;
        letter.style.animationDelay = `
        ${delayEraseStrokeDashoffset}ms,
        ${delayEraseStrokeWidth}ms,
        ${delayEraseStroke}ms,
        ${delayEraseFill}ms
        `;
    });
}

export const erase = (textId, initializationConfiguration, eraseConfiguration = defaultEraseConfiguration) => {
    const delayOperation = eraseConfiguration?.delayOperation || initializationConfiguration.totalWaitTimeForFinalization;
    setTimeout(() => {
        const svg = document.getElementById(KHOSHNUS_SVG_ID);
        const textElement = svg.getElementById(textId);
        if (!textElement) return;

        const letters = textElement.getElementsByTagName('tspan');
        eraseLetters(letters, eraseConfiguration, initializationConfiguration)
    }, delayOperation);
};
