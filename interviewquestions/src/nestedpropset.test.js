
const { set } = require('./nestedpropset');

describe('nested prop tests', () => { 

    it(' basic test', () => {
        const obj = {
            a: {
              b: {
                c: [1,2,3]
              }
            }
          }
          set(obj, 'a.b.c', 'BFE');        
          expect(obj.a.b.c).toEqual("BFE");

          set(obj, 'a.b.c.d', 'BFE');        
          expect(obj.a.b.c.d).toEqual("BFE");
    });

    it('indexed tests', () => {
        const obj = {
            a: {
              b: {
                c: [1,2,3]
              }
            }
          };

        set(obj, 'a.b.c', 'BFE');        
        expect(obj.a.b.c).toEqual("BFE");
        console.log(obj);


        set(obj, 'a.b.c.0', 'BFE')
        expect(obj.a.b.c[0]).toEqual("BFE");
        
        set(obj, 'a.b.c[1]', 'BFE')
        expect(obj.a.b.c[1]).toEqual("BFE");
        
        set(obj, ['a', 'b', 'c', '2'], 'BFE')
        expect(obj.a.b.c[2]).toEqual("BFE");
        
        set(obj, 'a.b.c[3]', 'BFE')
        expect(obj.a.b.c[3]).toEqual("BFE");
    });

    it('special cases', () => {
        const obj = {
            a: {
              b: {
                c: [1,2,3]
              }
            }
          };

        set(obj, 'a.c.d[0]', 'BFE');
        console.log(obj);
        // valid digits treated as array elements
        expect(obj.a.c.d[0]).toEqual("BFE");

        set(obj, 'a.c.d.01', 'BFE')
        console.log(obj);
        // invalid digits treated as property string
        expect(obj.a.c.d['01']).toEqual("BFE");        
    });


    it('arbitrary order of sets', () => {
      const obj = {
        a: {
          b: {
            c: 'bfe'
          }
        }
      };

    set(obj, 'a.b.c', 'BFE');        
    expect(obj.a.b.c).toEqual("BFE");

    set(obj, 'a.b.0.c', 'BFE')
    expect(obj.a.b[0].c).toEqual("BFE");


    set(obj, 'a.b.c.0', 'BFE')
    expect(obj.a.b.c[0]).toEqual("BFE");

    });
 });
