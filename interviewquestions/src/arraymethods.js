

module.exports = {
    ArrayFilter: function myfilter(predicate, thisArg) {
        var contextArr = this;// the array that this method is called on, different from thisArg which is for callback context
        var retArr = [];
        for(var i=0;i<contextArr.length;i++) {
            if(predicate.call(thisArg, contextArr[i],i, contextArr) === true) { // note all four params given to callback fn
                retArr.push(contextArr[i]);
            }
        }
        return retArr;
    },
    ArrayMap: function mymap() {
        return [];
    },
    ArrayReduce: function myreduce() {

    },
    ArrayForEach: function myforEach() {

    }
}