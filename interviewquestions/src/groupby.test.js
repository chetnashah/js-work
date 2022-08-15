

const { groupBy } = require('./groupby');

describe('groupby tests', () => {
    it('basic test', () => {
        expect(groupBy(['one','two','three'], (item) => item.length)).toEqual({
            '3': ['one', 'two'],
            '5': ['three']
        });
    });

    it('with math', () => {
        expect(groupBy([1.2,1.5,3.2,3.3,3], Math.floor)).toEqual({
            1: [1.2,1.5],
            3: [3.2,3.3,3]
        });
    })
})