/**
 * https://www.promisejs.org/implementing/
 * https://www.freecodecamp.org/news/how-to-implement-promises-in-javascript-1ce2680a7f51/
 * 
 */
module.exports = class MyPromise {
    constructor(executorFn) {
        this.state = 'PENDING';
        this.value = undefined;// value that this promise holds
        this.onSuccessBind = this.onSuccessBind.bind(this);
        this.onFailBind = this.onFailBind.bind(this);
        this.thenCbs = [];// needs to be an array because one can register multiple via: p.then(cb1); p.then(cb2);
        this.catchCbs = [];
        // directly run executor, onSuccessBind function does queueMicroTask to runCallbacks
        executorFn(this.onSuccessBind, this.onFailBind);
    }

    // first check state, then run thenCbs/catchCbs;
    // running callbacks is simple synchronous
    // can be run by adding of then listeners, or on executorFn resolve calling..
    runCallbacks(){
        if(this.state == 'FULLFILLED') {
            this.thenCbs.forEach(thenCb => {
                thenCb(this.value);// notifies all our thenable callbacks of our fulfilled value
            })
            this.thenCbs = [];
        }
    }

    onFailBind(rejectValue) {

    }

    /**
     * updates promise state and value, delegates thenable firing to runCallbacks
     * @param {} successValue 
     */
    onSuccessBind(successValue) {// successValue might be a Promise or a value, if a promise we must follow it, by adding our resolve/reject to its thens fullfilled/rejected
        queueMicrotask(() => {
            // what if successValue is promise?
            if(successValue instanceof MyPromise) {
                // need to resolve that first
                successValue.then(this.onSuccessBind, this.onFailBind);// follow that promise by attaching our resolve/reject to this 
                return;
            }
            
            // what if successValue is not a promise
            this.value = successValue;
            this.state = 'FULLFILLED';
            // we should run callbacks
            this.runCallbacks();
        })
    }

    scheduleTaskForExecution(fn) {
        setTimeout(fn, 0);
    }

    reject() {
        this.state = 'REJECTED';
    }

    /**
     * We never add cb to current promise instance directly,
     * we return new promise instance
     * then takes fulfilled cb for current promise
     * but returns a new promise
     * @param {*} handleFulFilledCb 
     * @param {*} handleRejectedCb 
     * @returns 
     */
    then(thenCb, catchCb) {// we connect two different things here: thenCbs list of current promise, but Promise executor for next/returned Promise.
        // return a new promise, whose executor will push thenCb to current list of cbs and fire anything that is already FULFILLED.
        return new MyPromise((resolve, reject)=> {// the executor impl for then Promise is local to then fn.
            // add to current promise's cb
            this.thenCbs.push((result)=> {// we cannot directly add user given thenCb, a wrapper to thenCb to convert flow of control to this framework code
                resolve(thenCb(result));// thenCb(result) is user returned value of the thenable to be taken to next promise
            });
            // fire all that is currently already fulfilled for current Promise
            // since runCallbacks is guarded by FULLFILLED state check, no need to worry about double firing
            this.runCallbacks();
        });
    }
}