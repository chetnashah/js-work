const crypto = require('crypto');
const fs = require('fs');
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

function doHash() {
    crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
        console.log('Hash: = ', Date.now() - start);
    });
}

// kernel thread
doRequest();

// uv threadpool
fs.readFile('multitask.js','utf8', () => {
    console.log('FS:', Date.now() - start);
});

// uv threadpool
doHash();
doHash();
doHash();
doHash();

// the results are unexpected.