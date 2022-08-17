// https://bigfrontend.dev/problem/create-a-fake-timer
// https://bigfrontend.dev/problem/create-a-fake-timer
// https://github.com/sinonjs/fake-timers


/**
 * Question boils down to:
 * 
 * What is the correct data structure to store timers? Hashmap saved by id seems fine
 * 
 * The timers must be executed in order of time, and must be cancellable (by id)
 * 
 * How do we advance time? we pick earliest timer from timer hashmap and set current time to that
 * 
 * TODO find if there is better solution exists
 */

class Timer {
    constructor(triggerTime, id, callback) {
        this.triggerTime = triggerTime;
        this.id = id;
        this.callback = callback;
    }
}

class FakeTimer {
    constructor() {
        this.timers = {};// saved by id
        this.currentTime = 0;
        this.id = 0;
    }
    install() {
        this.originalSetTimout = globalThis.setTimeout;
        this.originalClearTimeout = globalThis.clearTimeout;
        this.originalDate = globalThis.Date;

        globalThis.setTimeout = (cb, delay) => {
            const newId = this.id++;
            this.timers[newId] = new Timer(this.currentTime + delay, newId, cb);
            return newId;
        };

        globalThis.clearTimeout = (id) => {
            delete this.timers[id];
        };

        globalThis.Date = Object.assign({}, Date, {now: () => this.currentTime});
    }

    uninstall(){
        globalThis.setTimeout = this.originalSetTimout;
        globalThis.clearTimeout = this.originalClearTimeout;
        globalThis.Date = this.originalDate;
        this.currentTime = 0;
    }

    tick(){
        // while we have timers to run
        while(Object.keys(this.timers).length > 0) {
            let earliestTime = 100000000;
            let earliestTimer = null;

            // pick the earliest timer update currentTime and loop
            const allKeys = Object.keys(this.timers);
            for(let i=0;i<allKeys.length;i++){
                const ithTimer = this.timers[allKeys[i]];
                if(ithTimer.triggerTime < earliestTime) {
                    earliestTime = ithTimer.triggerTime;
                    earliestTimer= ithTimer;
                }
            }
            this.currentTime = earliestTimer.triggerTime;
            earliestTimer.callback();
            delete this.timers[earliestTimer.id];
        }
    }

}

module.exports = {
    FakeTimer
};