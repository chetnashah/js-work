const { chunk } = require('./chunk');

describe('chunk tests', () => { 
    it('basic tests', () => {
        expect(chunk([1,2,3,4,5], 1)).toEqual([[1], [2], [3], [4], [5]]);
        
        expect(chunk([1,2,3,4,5], 2)).toEqual([[1,2],[3,4],[5]]);
        
        expect(chunk([1,2,3,4,5], 3)).toEqual([[1,2,3],[4,5]]);
        
        expect(chunk([1,2,3,4,5], 4)).toEqual([[1,2,3,4],[5]]);
       
        expect(chunk([1,2,3,4,5], 5)).toEqual([[1,2,3,4,5]]);
        
    })
 })

