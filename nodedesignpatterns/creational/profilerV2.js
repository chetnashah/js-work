// why create factory?
// 1. separate instantiation, constructor, and usage site
// 2. config driven instantiation is nice and useful

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

const noOpProfiler = {
    start() {},
    end(){}
};

// no need to expose Profiler class, export the factory instead.
function createProfiler(label){
    if(process.env.NODE_ENV === 'production') {
        return noOpProfiler;
    }
    return new Profiler(label);// consumer still use Profiler instance, but instnatiation has to go through factory method only
}

module.exports = createProfiler;