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

class Interval {
    constructor(id, callback, startTime, intervalMs) {
        this.id = id;
        this.callback = callback;
        this.startTime = startTime;
        this.intervalMs = intervalMs;
        this.latestIdInTimers = null;
    }
}

class FakeTimer {
    constructor() {
        this.timers = {};// saved by id
        this.currentTime = 0;
        this.id = 0;

        // for intervals
        this.intervals = {};
        this.intervalId = 0;
    }
    install() {
        this.originalSetTimout = globalThis.setTimeout;
        this.originalClearTimeout = globalThis.clearTimeout;
        this.originalSetInterval = globalThis.setInterval;
        this.originalClearInterval = globalThis.clearInterval;
        this.originalDate = globalThis.Date;

        globalThis.setTimeout = (cb, delay) => {
            const newId = this.id++;
            this.timers[newId] = new Timer(this.currentTime + delay, newId, cb);
            return newId;
        };

        globalThis.clearTimeout = (id) => {
            delete this.timers[id];
        };

        globalThis.setInterval = (cb, delayMs) => {
            const newIntervalId = this.intervalId++;
            this.intervals[newIntervalId] = new Interval(newIntervalId, cb, undefined, delayMs);
            const executor = (handler, delayMs2) => {
                this.intervals[newIntervalId].latestIdInTimers = setTimeout(() => {
                    handler();
                    // only schedule next round if still present in intervals
                    if(this.intervals[newIntervalId]) {
                        executor(handler, delayMs2)
                    }
                }, delayMs2);
                // console.log(this.intervals[newIntervalId].latestIdInTimers);
            }
            executor(cb, delayMs);
            return newIntervalId;
        };

        globalThis.clearInterval = (id) => {
            const relevantInterval = this.intervals[id];
            // console.log(relevantInterval)
            clearTimeout(relevantInterval.latestIdInTimers);
            delete this.intervals[id];
        };

        globalThis.Date = Object.assign({}, Date, {now: () => this.currentTime});
    }

    uninstall(){
        globalThis.setTimeout = this.originalSetTimout;
        globalThis.clearTimeout = this.originalClearTimeout;
        globalThis.Date = this.originalDate;
        globalThis.setInterval = this.originalSetInterval;
        globalThis.clearInterval = this.originalClearInterval;
        this.timers = {};
        this.intervals = {};
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