
const { JSONStringify, JSONParse } = require('./jsonparsestringify');

describe("all json stringify tests" ,() => {
    it("primitive test" ,() => {
        expect(JSONStringify(1)).toEqual("1");
        expect(JSONStringify("1")).toEqual("1");
        expect(JSONStringify(null)).toEqual("null");
        expect(JSONStringify(undefined)).toEqual(undefined);
        expect(JSONStringify(NaN)).toEqual("null");
    });

    it('stringify complex data', () => {
        expect(JSONStringify({})).toEqual("{}");                    // '{}'
        expect(JSONStringify([1, 'false', false])).toEqual('[1,"false",false]');   // '[1,"false",false]'
        expect(JSONStringify([NaN, null, Infinity])).toEqual('[null,null,null]'); // '[null,null,null]'
        expect(JSONStringify({ x: 5 })).toEqual('{"x":5}');            // '{"x":5}'

        expect(JSONStringify(JSON.stringify(function(){}))).toEqual(undefined);

        expect(JSONStringify(new Date(Date.UTC(2006, 0, 2, 15, 4, 5)))).toEqual('"2006-01-02T15:04:05.000Z"');


        expect(JSONStringify({ x: 5, y: 6 })).toEqual('{"x":5,"y":6}');
        
        // primitives with Constructors
        expect(JSONStringify([new Number(3), new String('false'), new Boolean(false)])).toEqual('[3,"false",false]');

        // String-keyed array elements are not enumerable and make no sense in JSON
        const a = ['foo', 'bar'];
        a['baz'] = 'quux';      // a: [ 0: 'foo', 1: 'bar', baz: 'quux' ]
        expect(JSONStringify(a)).toEqual('["foo","bar"]');
        // 

        expect(JSONStringify({ x: [10, undefined, function() {}, Symbol('')] })).toEqual('{"x":[10,null,null,null]}');
        // 

        // Standard data structures
        expect(JSONStringify([new Set([1]), new Map([[1, 2]]), new WeakSet([{a: 1}]), new WeakMap([[{a: 1}, 2]])])).toEqual('[{},{},{},{}]');

        
        // Symbols:
        expect(JSONStringify({ x: undefined, y: Object, z: Symbol('') })).toEqual('{}');
        // '{}'
        expect(JSONStringify({ [Symbol('foo')]: 'foo' })).toEqual('{}');
        // '{}'
        expect(JSONStringify({ [Symbol.for('foo')]: 'foo' }, [Symbol.for('foo')])).toEqual('{}');
        // '{}'
        
        // with replacer
        // JSONStringify({ [Symbol.for('foo')]: 'foo' }, (k, v) => {
        //     if (typeof k === 'symbol') {
        //     return 'a symbol';
        // }
        // });
        // undefined

        // Non-enumerable properties:
        expect(JSONStringify(Object.create(null, { x: { value: 'x', enumerable: false }, y: { value: 'y', enumerable: true } }))).toEqual('{"y":"y"}');
        // '{"y":"y"}'

        // BigInt values throw
        // JSONStringify({x: 2n});
        // TypeError: BigInt value can't be serialized in JSON
    })

    it('cyclic data throws error', () => {
        /**
        * Throws a TypeError ("cyclic object value") exception when a circular reference is found.
        */
        let a = {};
        a.x = a;
        expect(() => {
            JSONStringify(a)
        }).toThrowError(new Error('cyclic object value'));
    });

 });

describe('all json parse tests', () => { 
    it('primitive tsts', () => {

    });
})