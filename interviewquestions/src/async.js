/**
 * task - a function that takes node style retturn continuation/cb which should
 * be invoked when its work is done.
 * If task gets data, cb will be the last argument
 */
module.exports = {
    /**
     * Take a sync function and make it async
     * this is useful for plugging sync function to waterfall,series
     * Any arguments passed to generate function will be passed to wrapped fn
     * Returns a function which must be called with args and a return continuation (node style callback)
     * @param {*} func
     * @returns An async wrapper of func, to be invoked with (
     * args..., callback) 
     */
    asyncify: function(func) {
        return function(data,cb) {
            // first apply the original function with data arg
            // then return control flow via passed continuation (error first cb)
            cb(null, func(data));
        };
    },
    /**
     * Run the functions in the tasks collection in series, 
     * each one running once the previous function has completed. 
     * If any functions in the series pass an error to its callback, 
     * no more functions are run, and callback is immediately called with the value of the error
     * Note: there is no result passing between tasks.
     * @param {Array} tasks - collection of tasks to run in series
     * @param {function} mainCallback - final callback combining
     */
    series: function(tasks, mainCallback){
        const results = [];
        let i = 0;
        // idea is recursive iteration
        function iterSchedule() {
            if(i == tasks.length) {
                mainCallback(null, results);
                return;
            }
            tasks[i](function(err, ans) {
                results[i] = ans;
                i++;
                iterSchedule();
            });
        }
        // kick off iteration
        iterSchedule();
    },

    /**
     * Run the tasks in parellel, no dependency between tasks
     * if any functions pass error to its callback, main callback
     * is called immediately with value of an error.
     * once all tasks have completed, results array is passed to mainCallback
     * @param {Array} tasks 
     * @param {function} mainCallback 
     */
    parellel: function(tasks, mainCallback) {
        const results = [];
        let i = 0;
        let doneCnt = 0;
        // invoked when any task is finished, to see if we have finished all tasks
        function updateResults() {
            if(doneCnt === tasks.length) {
                mainCallback(null, results);
            }
        }
        // idea is looped iteration
        for(let i = 0;i<tasks.length;i++) {
            tasks[i]((err, ans) => {
                results[i] = ans;
                doneCnt++;
                updateResults();
            })
        }
    },
    /**
     * Run tasks in series, where each task passes its result
     * to the next task in array
     * If any tasks returns error, mainCallback is invoked with error
     * The result of mainCallback is return value from last task
     * @param {Array<function>} tasks 
     * @param {function} mainCallback 
     */
    waterfall: function(tasks, mainCallback) {
        let i = 0;
        let ans = [];// holds the values returned from previous tasks
        // idea is recursive iteration
        function iterSchedule() {
            if(i == tasks.length) {
                mainCallback(null, ...ans);
                return;
            }
            // same idea as series, but need to pass extra data to next task
            tasks[i].call(null, ...ans, function(err, ...res){
                ans = res;
                i++;
                iterSchedule();
            });
        }
        iterSchedule();
    },
    forEach: function() {

    },
    map: function() {

    },
    filter: function(){

    },
    reduce: function() {

    }
}