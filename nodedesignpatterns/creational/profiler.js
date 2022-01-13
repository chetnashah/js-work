
class Profiler{
    constructor(label){
        this.label = label;
        this.lastTime = null;
    }
    start(){
        this.lastTime = process.hrtime();// hrtime stands for high resolution time
    }
    end(){
        const diff = process.hrtime(this.lastTime);
        console.log(`Timer ${this.label} took ${diff[0]} seconds, ${diff[1]} nanoseconds amount of time`);
    }
}

const profiler = new Profiler('sample');
profiler.start();

process.nextTick(() => {
    profiler.end();
});

