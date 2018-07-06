process.env.UV_THREADPOOL_SIZE = 15;


// crypto lib is useful for providing functions 
// that do pure cpu work
const crypto = require('crypto');


const start = Date.now();
// note that pbkdf2 is pure cpu work and happens in a different thread
// managed by OS.
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('1: = ', Date.now() - start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('2: t = ', Date.now() - start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('3: t = ', Date.now() - start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('4: t = ', Date.now() - start);
});

// threadpool size of uvlib is 4, 
// so this one starts to work a little late
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('5: t = ', Date.now() - start);
});
