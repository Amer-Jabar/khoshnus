import { initialize } from "./initialize.js"
import { write, erase } from "./operations/operations.js"

export class Manuscript {
    constructor(initializationConfiguration) {
        this.initializationConfiguration = initialize(initializationConfiguration)
        this.svgId = initializationConfiguration.svgId
    }

    write(text, writingConfiguration) {
        return write(this.svgId, text, this.initializationConfiguration, writingConfiguration)
    }

    erase(textId, eraseConfiguration) {
        erase(this.svgId, textId, this.initializationConfiguration, eraseConfiguration)
    }
}
