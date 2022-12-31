
function erraticFn() {
    let tryNum = 0;
    return function passesOn5thTry(){
        if(tryNum >= 3) {
            return Promise.resolve(42);
        } else {
            tryNum++;
            return Promise.reject('failed');
        }
    }
}

const fnToCall = erraticFn();
let retries = 0;
function fetchWithRetries() {
    return fnToCall()
    .then(resp => {
        return resp;
    }).catch(err => {
        console.log('err is ', err);
        retries++;
        if(retries < 5) {
            return fetchWithRetries();
        }
    });
}

fetchWithRetries().then(ans => {
    console.log('ans = ', ans);
}).catch(err => {
    console.log('main err is ', err);
})