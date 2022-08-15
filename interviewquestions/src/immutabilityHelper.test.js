
const { update } = require('./immutabilityHelper');

describe('immutabilityHelper', () => { 
    it('update push', () => {
        const arr = [1, 2, 3, 4];
        const newArr = update(arr, {$push: [5, 6]});
        expect(newArr === arr).toBe(false);
        expect(arr).toEqual([1,2,3,4]);
        expect(newArr).toEqual([1,2,3,4,5,6]);

        
    });

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

    it('update apply', () => {
        const arr = [1, 2, 3, 4]
        const newArr = update(arr, {0: {$apply: (item) => item * 2}})
        // [2, 2, 3, 4]

        expect(arr).toEqual([1,2,3,4]);
        expect(newArr).toEqual([2,2,3,4]);
    });

    it('multiple operators, set and push', () => {
        const myData = {x: { y: {z: null}}, a:{ b: []}};
        const newData = update(myData, {
            x: {y: {z: {$set: 7}}},
            a: {b: {$push: [9]}}
        });

        expect(myData).toEqual({x: { y: {z: null}}, a:{ b: []}});
        expect(newData).toEqual({x: { y: {z: 7}}, a:{ b: [9]}});
    })
 })