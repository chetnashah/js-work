
// function promise({ value = DEFAULT_VALUE, fail = false } = {}) {
//     return new MyPromise((resolve, reject) => {
//       fail ? reject(value) : resolve(value)
//     })
//   }

const DEFAULT_VALUE = "default"

describe("all promise tests" ,() => {
   it("bsic test" ,() => {
       expect(4).toBe(4);
   });

   it("with no chaining", () => {
    const MyPromise = require('./promise');

    const p = new MyPromise((resolve, reject) => {
        resolve(DEFAULT_VALUE)
      })
    return p.then(v => expect(v).toEqual(DEFAULT_VALUE))
  })

  it("with multiple thens for same promise", () => {
    const checkFunc = v => expect(v).toEqual(DEFAULT_VALUE)
    const MyPromise = require('./promise');

    const p = new MyPromise((resolve, reject) => {
        resolve(DEFAULT_VALUE)
      })

    const promise1 = p.then(checkFunc)
    const promise2 = p.then(checkFunc)
    return Promise.allSettled([promise1, promise2])
  })

  it("with chaining", (done) => {
    const MyPromise = require('./promise');

    const p = new MyPromise((resolve, reject) => {
        resolve(3)
      })

    p.then(v => v * 4).then(v => {
        expect(v).toEqual(12)
        done();
    });
  })

   it('promise constructor does not throw', () => {
        const MyPromise = require('./promise');
        const p = new MyPromise(() => {});
   });

   it('then callback is called on resolve', (done) => {
        const MyPromise = require('./promise');
        const thenFn = jest.fn((args) => {
            expect(args).toBe(22);
            done();
        });

        const p = new MyPromise((resolve, reject) => {
            resolve(22);
        }).then(thenFn);
   });

//    it('supports then chainging', (done) => {
//     const MyPromise = require('./promise');
//     const thenFn = jest.fn((args) => {
//         expect(args).toBe(22);
//         return 33;
//     });

//     const thenFn2 = jest.fn(args => {
//         expect(args).toBe(33);
//         done();
//     })

//     const p = new MyPromise((resolve, reject) => {
//         resolve(22);
//     }).then(thenFn).then(thenFn2);
//    });



});