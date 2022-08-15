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
        // basic test
        const ret = [1,2,3].mymap(x => x * 2);
        expect(ret).toStrictEqual([2,4,6]);

        // check with index in callback
        const ret2 = [1,2,3].mymap((x,i) => x*2 + i)
        expect(ret2).toStrictEqual([2,5,8])

        // check with index and array in callback
        const ret3 = [1,2,3].mymap((x,i, arr) => x - arr[i]);
        expect(ret3).toStrictEqual([0,0,0]);

        // check with modified/custom thisArg for callback
        function mapWithBlocking(x) {
            if(this.blockMapping) {
                return 0
            } else {
                return x;
            }
        }
        const ret4 = [1,2,3].mymap(mapWithBlocking, { blockMapping: true});
        expect(ret4).toStrictEqual([0,0,0]);

        const ret5 = [1,2,3].mymap(mapWithBlocking, { blockMapping: false});
        expect(ret5).toStrictEqual([1,2,3]);

        // undefined when nothing is returned from callback
        const numbers = [1,2,3,4];
        const filteredNums = numbers.mymap((x) => {
            if(x < 3) {
                return x;
            }
        });
        expect(filteredNums).toStrictEqual([1,2,undefined, undefined]);
    });

    it('foreach method', () => {
        const callBackFn = jest.fn();
        const numbers = [1,2,3];
        numbers.myforeach(callBackFn);
        // check if callback called for each element
        expect(callBackFn.mock.calls.length).toBe(3);

        // check actual values received in callback
        expect(callBackFn.mock.calls[0][0]).toBe(1);// first call first arg
        expect(callBackFn.mock.calls[1][0]).toBe(2);// second call, first arg
        expect(callBackFn.mock.calls[2][0]).toBe(3);// third call, first arg

        expect(callBackFn.mock.calls[0][1]).toBe(0);// first call second arg
        expect(callBackFn.mock.calls[1][1]).toBe(1);// second call, second arg
        expect(callBackFn.mock.calls[2][1]).toBe(2);// third call, second arg

        expect(callBackFn.mock.calls[0][2]).toBe(numbers);
        expect(callBackFn.mock.calls[1][2]).toBe(numbers);
        expect(callBackFn.mock.calls[2][2]).toBe(numbers);
        
        // custom thisArg
        const callbackFn2 = jest.fn();
        const customContext = {
            blockMapping: true
        };
        const nums = [1,2,3];
        nums.myforeach(callbackFn2, customContext);
        expect(callbackFn2.mock.contexts[0]).toBe(customContext);
    
        // no callback for missing element in sparse errors
        const arr = [1,2,,,3];
        let callbackCnt = 0;
        const callbackFn3 = jest.fn(()=>{
            callbackCnt++;
        });
        arr.myforeach(callbackFn3);
        expect(callbackCnt).toBe(3);

        // case where arr is modified on iteration
        const words = ['one', 'two', 'three', 'four'];
        words.forEach((word) => {
          console.log(word);
          if (word === 'two') {
            words.shift(); //'one' will delete from array
          }
        }); // one // two // four
        
        expect(words).toEqual(['two', 'three', 'four']);
    });

    // it('reduce method', () => {
    //     const arr = [1,2,3];
    //     const callbackFn = jest.fn((prev, curr, currIdx, arr) => {
    //         return prev + curr;
    //     });
    //     const ans = arr.myreduce(callbackFn, 1);
    //     expect(ans).toBe(7);

    //     // check without initialValue
    //     const arr2 = [1,2,3];
    //     const callbackFn2 = jest.fn((prev, curr, currIdx, arr) => {
    //         return prev + curr;
    //     });
    //     const ans2 = arr2.myreduce(callbackFn2);
    //     expect(ans2).toBe(6);

    //     // removing duplicates with reduce
    //     const myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
    //     let myArrayWithNoDuplicates = myArray.myreduce(function (previousValue, currentValue) {
    //         if (previousValue.indexOf(currentValue) === -1) {
    //             previousValue.push(currentValue)
    //         }
    //         return previousValue
    //     }, [])
    //     expect(myArrayWithNoDuplicates).toStrictEqual(['a', 'b', 'c', 'e', 'd'])

    //     //array mutation behavior - appended elements not iterated
    //     const arr3 = [1,2,3];
    //     const callbackFn3 = jest.fn((prev, curr, currIdx, arrInner) => {
    //         arrInner.push(1);
    //         arr3.push(1);
    //         return prev + curr;
    //     });
    //     const ans3 = arr3.myreduce(callbackFn3);
    //     expect(ans3).toBe(6);

    //     // modified values in arr do not affect reduce
    //     const arr4 = [1,2,3];
    //     const callbackFn4 = jest.fn((prev, curr, currIdx, arrInner) => {
    //         arrInner[arrInner.length - 1] = 1000;
    //         return prev + curr;
    //     });
    //     const ans4 = arr4.myreduce(callbackFn4);
    //     expect(ans4).toBe(6);

    // });

});