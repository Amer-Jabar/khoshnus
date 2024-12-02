import { checkConfigurationValidity, KHOSHNUS_SVG_ID } from "../initialize";

export const checkDeclaration = (svgId) => {
    const svg = document.getElementById(svgId) || document.getElementById(KHOSHNUS_SVG_ID)
    if (!svg) throw new Error("Khoshnus SVG not initiated.")
}

// ------------------------------------------------------------------------------------------------------------------------

const defaultTextElementAttributes = { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "12px" }

const defaultWriteConfiguration = {
    eachLetterDelay: 250,
    delayOperation: 0
}

export const defaultWritingConfiguration = {
    textElementAttributes: defaultTextElementAttributes,
    writeConfiguration: defaultWriteConfiguration,
}

const validateAndReturnConfiguration = (writingConfiguration) => {
    checkConfigurationValidity(() => {
        const { textElementAttributes, writeConfiguration } = writingConfiguration;
        return [textElementAttributes, writeConfiguration].filter(configuration => configuration).every(config => typeof config === "object")
    }, writingConfiguration);
    return {
        textElementAttributes: { ...defaultTextElementAttributes, ...writingConfiguration.textElementAttributes },
        writeConfiguration: { ...defaultWriteConfiguration, ...writingConfiguration.writeConfiguration }
    };
}

const createTextElement = (textId, textElementAttributes) => {
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
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
        svgId,
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
    draw-stroke-dashoffset-${svgId} ${strokeDashoffsetDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
    draw-stroke-width-${svgId} ${strokeWidthDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
    draw-stroke-${svgId} ${strokeDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
    draw-fill-${svgId} ${fillDuration}ms cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards
    `;
}

const writeLetters = (textElement, letters, writeConfiguration, initializationConfiguration) => {
    [...letters].forEach((letterToWrite, index) => {
        const letterElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
        letterElement.textContent = letterToWrite;
        setLetterStyle(letterElement, initializationConfiguration);
        letterElement.style.animationDelay = `${(index + 1) * writeConfiguration.eachLetterDelay}ms`;
        textElement.appendChild(letterElement);
    });
}

const setTotalWaitTimeForFinalization = (textElement, writeConfiguration, initializationConfiguration) => {
    const { durations: {
        strokeDashoffsetDuration,
        strokeWidthDuration,
        strokeDuration,
        fillDuration,
    } } = initializationConfiguration;
    const largestDuration = Math.max(
        strokeDashoffsetDuration,
        strokeWidthDuration,
        strokeDuration,
        fillDuration,
    )
    const smallestDuration = Math.min(
        strokeDashoffsetDuration,
        strokeWidthDuration,
        strokeDuration,
        fillDuration,
    )
    const usedDuration = (largestDuration / smallestDuration) < 1.25 ? largestDuration : smallestDuration
    const textSize = textElement.childNodes.length - 1;
    const lettersDelay = textSize * writeConfiguration.eachLetterDelay
    const waitTimeUntilLetterStyleFinalization = usedDuration + lettersDelay;
    initializationConfiguration.totalWaitTimeForFinalization = waitTimeUntilLetterStyleFinalization
}

export const write = (svgId, text, initializationConfiguration, writingConfiguration = defaultWritingConfiguration) => {
    checkDeclaration(svgId);
    const { textElementAttributes, writeConfiguration } = validateAndReturnConfiguration(writingConfiguration)
    const svg = document.getElementById(svgId) || document.getElementById(KHOSHNUS_SVG_ID)
    const textId = crypto.randomUUID()
    if (writeConfiguration.delayOperation) {
        setTimeout(() => doWrite(svg, text, textId, textElementAttributes, writeConfiguration, initializationConfiguration), writeConfiguration.delayOperation)
    } else {
        return doWrite(svg, text, textId, textElementAttributes, writeConfiguration, initializationConfiguration)
    }
    return textId
}

const doWrite = (svg, text, textId, textElementAttributes, writeConfiguration, initializationConfiguration) => {
    const textElement = createTextElement(textId, textElementAttributes);
    writeLetters(textElement, text, writeConfiguration, initializationConfiguration);
    setTotalWaitTimeForFinalization(textElement, writeConfiguration, initializationConfiguration);

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
    const { svgId } = initializationConfiguration
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
        erase-stroke-dashoffset-${svgId} ${eraseStrokeDashoffsetDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-stroke-width-${svgId} ${eraseStrokeWidthDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-stroke-${svgId} ${eraseStrokeDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-fill-${svgId} ${eraseFillDuration}ms cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards
        `;
        letter.style.animationDelay = `
        ${delayEraseStrokeDashoffset}ms,
        ${delayEraseStrokeWidth}ms,
        ${delayEraseStroke}ms,
        ${delayEraseFill}ms
        `;
    });
}

export const erase = (svgId, textId, initializationConfiguration, eraseConfiguration = defaultEraseConfiguration) => {
    const delayOperation = eraseConfiguration?.delayOperation || initializationConfiguration.totalWaitTimeForFinalization;
    setTimeout(() => {
        const svg = document.getElementById(svgId) || document.getElementById(KHOSHNUS_SVG_ID);
        const textElement = svg.getElementById(textId);
        if (!textElement) return;

        const letters = textElement.getElementsByTagName('tspan');
        eraseLetters(letters, eraseConfiguration, initializationConfiguration)
    }, delayOperation);
};
