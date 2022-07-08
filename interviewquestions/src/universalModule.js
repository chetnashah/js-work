// top level fn needs two arguments, global and factory
function create(global, factory) {
    if(typeof exports !== "undefined") {
        // put in exports
        factory(exports);
    } else {
        // put in window
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.log = mod.exports;
    }
}(globalThis,function abc(exports) {
    // module is wrapped in a fun for privacy, and gets parameter exports to expose exports, 
    // by convention: factory function called once, and exports cached
    // module start
    function innerLog() {
        console.log('I am inner log');
    }

    function log(){
        console.log('I am log');
        innerLog();
    }

    exports.log = log;
    // module end
});
