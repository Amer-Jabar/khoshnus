import { initialize } from "./initialize.js"
import { write, erase } from "./operations/operations.js"

export class Manuscript {
    setup(initializationConfiguration) {
        this.initializationConfiguration = initialize(initializationConfiguration)
    }

    write(text, writingConfiguration) {
        return write(text, this.initializationConfiguration, writingConfiguration);
    }

    erase(textId, eraseConfiguration) {
        erase(textId, this.initializationConfiguration, eraseConfiguration)
    }
}
