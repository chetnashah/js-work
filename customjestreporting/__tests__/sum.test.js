const sum = require('../sum');

describe('sum testing suite:', () => {
    it('single test: ', () => {
        expect(sum(2,2)).toBe(4);
    });
});