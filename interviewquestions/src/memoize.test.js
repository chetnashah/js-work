
const { memoize} = require('./memoize');

describe('memo tests', () => { 
    it(' basic tests', () => {
        var object = { 'a': 1, 'b': 2 };
        var other = { 'c': 3, 'd': 4 };
        
        function values(obj) {
            return Object.values(obj)
        }

        var valuesM = memoize(values);
        expect(valuesM(object)).toEqual([1,2]);
        // => [1, 2]
         
        expect(valuesM(other)).toEqual([3,4]);
        // => [3, 4]
         
        object.a = 2;
        expect(valuesM(object)).toEqual([1,2]);
        // // => [1, 2]
         
        // // Modify the result cache.
        // values.cache.set(object, ['a', 'b']);
        // expect(valuesM(object)).toEqual(['a', 'b']);
        // => ['a', 'b']
         
        // Replace `_.memoize.Cache`.
        // _.memoize.Cache = WeakMap;
        
    });
});