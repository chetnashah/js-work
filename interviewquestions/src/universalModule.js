// top level fn needs two arguments, global and factory
function create(global, factory) {
    if(typeof exports !== "undefined") {// common js environment present, use it
        // put in exports
        factory(exports);
    } else {
        // put in window or supplied globalThis
        var mod = {// make a fresh module object
            exports: {}
        };
        factory(mod.exports);// give module chance to populate its exports and install it on globalThis
        global.log = mod.exports;// the choice of name with which to install the module exports, in global should be configurable
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
