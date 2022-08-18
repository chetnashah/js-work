
const { update } = require('./immutabilityHelper');

describe('immutabilityHelper', () => { 
    it('update push', () => {
        const arr = [1, 2, 3, 4];
        const newArr = update(arr, {$push: [5, 6]});
        expect(newArr === arr).toBe(false);
        expect(arr).toEqual([1,2,3,4]);
        expect(newArr).toEqual([1,2,3,4,5,6]);

        // nested $push
        const obj = {a: {b: [1,2,3]}};
        const newObj = update(obj, {a: {b: {$push: [5,6]}}});
        expect(newObj === obj).toBe(false);
        expect(obj).toEqual({a: {b: [1,2,3]}});
        expect(newObj).toEqual({a: {b: [1,2,3,5,6]}});
    });

    it('bfe tes 1', () => {
        expect(update([1], {$push: [2, 3]})).toEqual([1, 2, 3])
    })

    it('bfe test 2', () => {
        expect(update({a: [1]}, {a: {$push: [2, 3]}})).toEqual({a: [1, 2, 3]})
    });

    it('bfe test 3', () => {
        expect(() => update(1, {$push: [2, 3]}))
        .toThrow()      
    });

    // it('bfe test 4', () => {
    //     expect(update([1], {1: {$set: 2}})).toEqual([1, 2])
    // });

    it('bfe test 5', () => {
        expect(update({a: {b: 1}}, {a: { b: {$set: 2}}})).toEqual({ a: { b: 2 } })
    });

    it('bfe test 6', () => {
        expect(update({a: {b: 1}}, {a: {$merge: {c: 3}}})).toEqual({ a: { b: 1, c: 3 } })
    });

    it('bfe test 7', () => {
        // merge on same existing key overrides value
        expect(update({a: {c: 1}}, {a: {$merge: {c: 3}}})).toEqual({ a: { c: 3 } })
    });

    it('bfe test 8', () => {
        // trying to merge non-object with object should throw
        expect(() => update({a: 1}, {a: {$merge: {c: 3}}})).toThrow()
    });

    // it('bfe test 9', () => {
    //     // pass the current value and apply the function
    //     expect(update([1], {0: {$apply: (item) => item * 2}}))
    //     .toEqual([2])      
    // });
    it('update object with set', () => {
        const state = {
            a: {b: {c: 1}},
            d: 2
          };
          
          const newState = update(
            state, 
            {a: {b: { c: {$set: 3}}}}
          );
        
          // check original has not changed
          expect(state).toEqual({
            a: {b: {c: 1}},
            d: 2
          });

          // check new is correct
          expect(newState).toEqual({
            a: {b: {c: 3}},
            d: 2
          });
    });

    it('update array with set', () => {
        const arr = [1, 2, 3, 4]
        debugger;
        const newArr = update(
          arr, 
          {0: {$set: 0}}
        );

        expect(arr).toEqual([1,2,3,4]);
        expect(newArr).toEqual([0,2,3,4]);
    });

    it('update Shallow merge', () => {
        const obj = {a: 5, b: 3};
        const newObj = update(obj, {$merge: {b: 6, c: 7}}); // => {a: 5, b: 6, c: 7}
        expect(obj).toEqual({a: 5, b: 3});
        expect(newObj).toEqual({ a: 5, b: 6, c: 7});        
    });

    // it('update apply', () => {
    //     const arr = [1, 2, 3, 4]
    //     const newArr = update(arr, {0: {$apply: (item) => item * 2}})
    //     // [2, 2, 3, 4]

    //     expect(arr).toEqual([1,2,3,4]);
    //     expect(newArr).toEqual([2,2,3,4]);
    // });

    it('multiple operators, set and push', () => {
        const myData = {x: { y: {z: null}}, a:{ b: []}};
        const newData = update(myData, {
            x: {y: {z: {$set: 7}}},
            a: {b: {$push: [9]}}
        });

        expect(myData).toEqual({x: { y: {z: null}}, a:{ b: []}});
        expect(newData).toEqual({x: { y: {z: 7}}, a:{ b: [9]}});
    });
 })