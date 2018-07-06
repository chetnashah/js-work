let https = require('https');
let start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log(Date.now() - start);
        })
    }).end();    
}

// all happen simultaneously, these do not use uv thread pool
// meaning these are os tasks (kernel managed) and not uv_threadpool tasks(user land)
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
