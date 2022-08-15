// https://lodash.com/docs/4.17.15#groupBy

function groupBy(collection, groupFn) {
    const retObj = {};
    collection.forEach(item => {
        const groupId = groupFn(item);
        if(!retObj.hasOwnProperty(groupId)) {
            retObj[groupId] = []
        }
        retObj[groupId].push(item);
    })
    return retObj;
}

module.exports = {
    groupBy
};