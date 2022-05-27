

module.exports = {
    ArrayFilter: function myfilter(predicate, thisArg) {// note optional thisArg can be specified for callback
        var contextArr = this;// the array that this method is called on, different from thisArg which is for callback context
        const retArr = [];
        for(var i=0;i<contextArr.length;i++) {
            // using call to give special thisArg to callback fn
            if(predicate.call(thisArg, contextArr[i],i, contextArr) === true) { // note all four params given to callback fn
                retArr.push(contextArr[i]);
            }
        }
        return retArr;
    },
    ArrayMap: function mymap(callback, thisArg) {
        var contextArr = this;
        const retArr = [];
        for(let i=0;i<contextArr.length;i++) {
            const retValue = callback.call(thisArg, contextArr[i], i, contextArr);
            retArr.push(retValue);
        }
        return retArr;
    },
    /**
     * also known as reduceLeft in other languages
     * callbackFn takes four params: prev, curr, currIdx, arr
     * initialValue is starting value for reducing
     * @param {*} callbackFn 
     * @param {*} initialValue 
     */
    ArrayReduce: function myreduce(callbackFn, initialValue) {
        const contextArr = this;
        // undefined check is necessary because of initialValue can be 0 etc        
        const isInitialValueDefined = initialValue !== undefined;
        let curr = isInitialValueDefined ? contextArr[0] : contextArr[1] ;
        let prev = isInitialValueDefined ? initialValue : contextArr[0];
        let currIdx = isInitialValueDefined ? 0 : 1;
        let i = isInitialValueDefined ? 0 : 1;
        const initialLength = contextArr.length; // we record length at start to avoid iterating appended elements during iteration

        for(;i<initialLength;i++) {
            prev = callbackFn(prev, curr, currIdx, contextArr);
            console.log(prev);
            currIdx++;
            curr = contextArr[currIdx];
        }
        return prev;
    },
    /**
     * There is no way to stop or break a forEach() loop other than by throwing an exception. 
     * If you need such behavior, the forEach() method is the wrong tool
     * @param {*} callback 
     * @param {*} thisArg 
     */
    ArrayForEach: function myforEach(callback, thisArg) {
        const contextArr = this;
        for(let i=0;i<contextArr.length; i++) {
            if(contextArr[i]) {
                callback.call(thisArg, contextArr[i], i, contextArr);
            }
        }
    }
}