
describe("all async tests" ,() => {
    it("async.series ", (done) => {
        const async = require('./async');
        async.series([
            function(cb) {
                setTimeout(function() {
                    cb(null, 'one');
                }, 200);
            },
            function(cb) {
                setTimeout(function() {
                    cb(null, 'two');
                }, 100);
            }
        ], function(err, results) {
            expect(results).toStrictEqual(['one', 'two']);
            done();
        })
    });

    it("async.series with error in one of the task", () => {

    });

    it("async.parellel", (done) => {
        const async = require('./async');
        async.parellel([
            function(cb) {
                setTimeout(function() {
                    console.log('onep');
                    cb(null, 'onep');
                }, 200);
            },
            function(cb) {
                setTimeout(function() {
                    console.log('twop');
                    cb(null, 'twop');
                }, 100);
            }
        ], function(err, results) {
            expect(results).toStrictEqual(['onep', 'twop']);
            done();
        })
    });

    it("async.parellel with error in one of the tasks", () => {

    });

    it('async.waterfall', (done) => {
        const async = require('./async');
        async.waterfall([
            function(cb) {
                cb(null, 'one', 'two');
            },
            function(arg1, arg2, cb) {
                expect(arg1).toStrictEqual('one');
                expect(arg2).toStrictEqual('two');
                cb(null, 'three');
            },
            function(arg1, cb) {
                expect(arg1).toStrictEqual('three');
                cb(null, 'donelast');
            }
        ], function(err, result) {
            expect(result).toStrictEqual('donelast');
            done();
        });
    });

    it('asyncify', (done) => {
        const async = require('./async');
        async.waterfall([
            function(cb) {
                cb(null, '{"hi": "jello"}')
            },
            async.asyncify(JSON.parse),
            function (data, cb) {
                cb(null, data.hi);
                // data is the result of parsing the text.
                // If there was a parsing error, it would have been caught.
            }
        ], (err, res) => {
            expect(res).toStrictEqual("jello");
            done();
        });
    });
 });