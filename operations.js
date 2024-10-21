import { checkConfigurationValidity, KHOSHNUS_SVG_ID } from "./initialize";

export const checkDeclaration = () => {
    const svg = document.getElementById(KHOSHNUS_SVG_ID);
    if (!svg) throw new Error("Khoshnus SVG not initiated.")
}

// ------------------------------------------------------------------------------------------------------------------------

const defaultTextConfiguration = { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "12px" }

const defaultLetterConfiguration = {
    eachLetterDelay: 250
}

export const defaultWritingConfiguration = {
    textConfiguration: defaultTextConfiguration,
    letterConfiguration: defaultLetterConfiguration,
}

const validateAndReturnConfiguration = (writingConfiguration) => {
    checkConfigurationValidity(() => {
        const { textConfiguration, letterConfiguration } = writingConfiguration;
        return [textConfiguration, letterConfiguration].filter(configuration => configuration).every(config => typeof config === "object")
    }, writingConfiguration);
    return {
        textConfiguration: { ...defaultTextConfiguration, ...writingConfiguration.textConfiguration },
        letterConfiguration: { ...defaultLetterConfiguration, ...writingConfiguration.letterConfiguration }
    };
}

const createText = (textConfiguration) => {
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const textId = crypto.randomUUID()
    textElement.id = textId;
    textElement.setAttribute("x", textConfiguration.x);
    textElement.setAttribute("y", textConfiguration.y);
    textElement.setAttribute("text-anchor", textConfiguration.textAnchor);
    textElement.setAttribute("dominant-baseline", textConfiguration.dominantBaseline);
    if (textConfiguration.fontSize) {
        textElement.setAttribute("font-size", textConfiguration.fontSize);
    }
    return textElement;
}

const writeLetters = (textElement, letters, letterConfiguration) => {
    [...letters].forEach((letter, index) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
        tspan.textContent = letter;
        tspan.style.animationDelay = `${(index + 1) * letterConfiguration.eachLetterDelay}ms`;
        textElement.appendChild(tspan);
    });
}

const finalizeEachLetterStyle = (letter, initializationConfiguration) => {
    const {
        endStrokeDashoffset,
        endStrokeWidth,
        endStroke,
        endFill
    } = initializationConfiguration;
    letter.style.strokeDashoffset = endStrokeDashoffset;
    letter.style.strokeWidth = endStrokeWidth;
    letter.style.stroke = endStroke;
    letter.style.fill = endFill;
    letter.style.animation = "";
}

const finalizeLetters = (textElement, letterConfiguration, initializationConfiguration) => {
    const { eachLetterDelay } = letterConfiguration;
    const { strokeDashoffsetDuration, fillDuration } = initializationConfiguration;
    const scopedDuration = Math.max(strokeDashoffsetDuration, fillDuration)
    const waitTimeUntilLetterStyleFinalization = (textElement.childNodes.length * eachLetterDelay) + scopedDuration;
    initializationConfiguration.totalWaitTimeForFinalization = waitTimeUntilLetterStyleFinalization
    setTimeout(() => {
        textElement.childNodes.forEach(letter => finalizeEachLetterStyle(letter, initializationConfiguration));
    }, waitTimeUntilLetterStyleFinalization);
}

export const write = (text, initializationConfiguration, writingConfiguration = defaultWritingConfiguration) => {
    checkDeclaration();
    const svg = document.getElementById(KHOSHNUS_SVG_ID);

    const { textConfiguration, letterConfiguration } = validateAndReturnConfiguration(writingConfiguration);
    const textElement = createText(textConfiguration);
    writeLetters(textElement, text, letterConfiguration);
    // finalizeLetters(textElement, letterConfiguration, initializationConfiguration);

    svg.appendChild(textElement);
    return textElement.id;
}

// ------------------------------------------------------------------------------------------------------------------------

const defaultEraseConfiguration = {
    delayEraseStrokeDashoffset: 0,
    delayEraseStroke: 0,
    delayEraseFill: 0,
}

const eraseLetters = (letters, eraseConfiguration, initializationConfiguration) => {
    const { eraseStrokeDashoffsetDuration, eraseStrokeDuration, eraseFillDuration } = {
        ...{
            eraseStrokeDashoffsetDuration: initializationConfiguration.strokeDashoffsetDuration,
            eraseStrokeDuration: initializationConfiguration.strokeDuration,
            eraseFillDuration: initializationConfiguration.fillDuration
        },
        ...eraseConfiguration
    }
    const {
        delayEraseStrokeDashoffset,
        delayEraseStroke,
        delayEraseFill,
    } = eraseConfiguration;
    Array.from(letters).forEach((letter, index) => {
        letter.style.animation = `
        erase-stroke-dashoffset ${eraseStrokeDashoffsetDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-stroke ${eraseStrokeDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards,
        erase-fill ${eraseFillDuration}ms cubic-bezier(0.5, 0.135, 0.15, 0.56) forwards
        `;
        letter.style.animationDelay = `${index * delayEraseStrokeDashoffset}ms, ${index * delayEraseStroke}ms, ${index * delayEraseFill}ms`;
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
