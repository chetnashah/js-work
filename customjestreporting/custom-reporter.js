export default class CustomeReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
        console.log('this._globalConfig = ', this._globalConfig);
    }
    
    onTestResult() {
        console.log('onTestResult = ', arguments);
    }

    onRunStart() {
        console.log('onRunStart = ', arguments);
    }

    onRunComplete() {
        console.log('onRunComplete = ', arguments);
    }
    
}