// https://bigfrontend.dev/problem/implement-lodash-chunk

function chunk(collection, chunkSize) {
    let collectionSize = collection.length;
    const retArr = [];
    let runningArr = [];
    for(let i=0;i<collectionSize;i++) {
        const item = collection[i];
        runningArr.push(item);
        // add to retArr when chunk size reached.
        if(runningArr.length === chunkSize) {
            retArr.push([...runningArr]);
            runningArr = [];
        }
    }
    // if some elements remaining in runningArr, add it to final ans
    if(runningArr.length >= 1) {
        retArr.push([...runningArr]);
    }
    return retArr;
}

module.exports = {
    chunk,
};