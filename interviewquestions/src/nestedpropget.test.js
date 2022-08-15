
const { get} = require('./nestedpropget');
describe('nested prop get tests', () => { 
    it('all tests', () => {
        const obj = {
            a: {
              b: {
                c: [1,2,3]
              }
            }
          }
          
          expect(get(obj, 'a.b.c')).toEqual([1,2,3]); // [1,2,3]
          expect(get(obj, 'a.b.c.0')).toEqual(1); // 1
          expect(get(obj, 'a.b.c[1]')).toEqual(2); // 2
          expect(get(obj, ['a', 'b', 'c', '2'])).toEqual(3); // 3
          expect(get(obj, 'a.b.c[3]')).toEqual(undefined); // undefined
          expect(get(obj, 'a.c', 'bfe')).toEqual('bfe'); // 'bfe' 
          expect(get(obj, 'a.e', 'xyz')).toEqual('xyz');
          expect(get(obj, 'a.b.c.d', 'pqr')).toEqual('pqr');     
          
          // clarify behavior with client/interviewer, 
          // sometimes you would want obj returned 
          // instead of defaultValue
          expect(get(obj, '', 'xyz')).toEqual('xyz');
          expect(get(obj, null, 'xyz')).toEqual('xyz');
          expect(get(obj, [], 'xyz')).toEqual('xyz');    

    });
 });