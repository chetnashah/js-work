describe('obj copy test', () => {
    it('basic test', () => {
        const copy = require('./objcopy');
        const obj1 = { a: 1, b: 2 };
        const obj2 = copy(obj1); // obj2 looks like obj1 now
        expect(obj2).toStrictEqual(obj1);
    })
})