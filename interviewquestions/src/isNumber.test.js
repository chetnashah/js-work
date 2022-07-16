
const isValidNumber = require('./isNumber').isValidNumber;

describe("isNumber test", () => {
    it('basic values', () => {
        expect(isValidNumber(2)).toBe(true);
        expect(isValidNumber(0)).toBe(true);
        expect(isValidNumber(null)).toBe(false);
        expect(isValidNumber(undefined)).toBe(false);
        expect(isValidNumber(NaN)).toBe(false);
        expect(isValidNumber({})).toBe(false);
        expect(isValidNumber('')).toBe(false);
        expect(isValidNumber(Symbol())).toBe(false);
        expect(isValidNumber(1.23)).toBe(true);
        expect(isValidNumber(Number(4))).toBe(true); // note no "new Number(4)"
        expect(isValidNumber('123')).toBe(false);
    })
})