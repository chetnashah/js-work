describe('array methods test', () => {

    beforeEach(() => {
        const ArrayFilter = require('./arraymethods.js').ArrayFilter;
        const ArrayMap = require('./arraymethods.js').ArrayMap;
        const ArrayReduce = require('./arraymethods.js').ArrayReduce;
        const ArrayForEach = require('./arraymethods.js').ArrayForEach;
        Array.prototype.myfilter = ArrayFilter;
        Array.prototype.mymap = ArrayMap;
        Array.prototype.myreduce = ArrayReduce;
        Array.prototype.myforeach = ArrayForEach;
    });

    it('filter method', () => {
        const arr = [1,2,3,4,5,6];

        // item based filtering predicate
        const evenArr = arr.myfilter((x) => { return x%2 == 0 });
        expect(evenArr).toEqual([2,4,6]);

        // item based filtering edge cases
        expect(arr.myfilter(x => true)).toEqual(arr);
        expect(arr.myfilter(x => false)).toEqual([]);

        // check index argument based predicate filtering
        const indexEvenFilter = [22,33,44,55,66,77].myfilter((x, i) => i%2 == 0);
        expect(indexEvenFilter).toStrictEqual([22,44,66]);

        // third arg is original arr
        const arrFiltercheck = [22,33,44,55,66,77].myfilter((x, i, arr) => arr[i] === x);
        expect(arrFiltercheck).toStrictEqual([22,33,44,55,66,77])

        //custom thisArg/context to myfilter
        const ret = [1,2,3,4,5].myfilter(function (x) {
            return x%2 == 0 && this.block == false // block is for shortcircuiting all filtering
        }, { block: false}); // custom thisArg for fn callback
        console.log(ret);
        expect(ret).toStrictEqual([2, 4]);

        const ret2 = [1,2,3,4,5].myfilter(function (x) {
            return x%2 == 0 && this.block == false
        }, { block: true}); // custom thisArg for fn callback
        console.log(ret2);
        expect(ret2).toStrictEqual([]);

        // modifying array while filtering
        let words = ['spray', 'limit', 'exuberant', 'destruction', 'elite', 'present']

        const modifiedWords = words.filter( (word, index, arr) => {
            arr[index+1] +=' extra'
            return word.length < 6
        })
        expect(modifiedWords).toStrictEqual(["spray"]);

        // adding words while filtering
        words = ['spray', 'limit', 'exuberant', 'destruction', 'elite', 'present']
        const appendedWords = words.filter( (word, index, arr) => {
            arr.push('new')
            return word.length < 6
        });
        expect(appendedWords).toStrictEqual(["spray", "limit", "elite"]);

        //deleting words while filtering
        words = ['spray', 'limit', 'exuberant', 'destruction', 'elite', 'present']
        const deleteWords = words.filter( (word, index, arr) => {
            arr.pop()
            return word.length < 6
        });
        expect(deleteWords).toStrictEqual(["spray", "limit"]);
    });

    it('map method', () => {

    });

    it('foreach method', () => {

    });

    it('reduce method', () => {

    });

});