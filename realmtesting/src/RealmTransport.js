const Realm = require('realm');
const Transport = require('winston-transport');
const util = require('util');

// A winston transport is basically a place for storage of logs.
// just extend Transport and do your saving in log() method.
module.exports = class RealmTransport extends Transport {
  constructor(opts) {
    super(opts);
    //
    // Consume any custom options here. e.g.:
    // - Connection information for database
    let LogSchema = {
      name: 'Log',
      properties: {
        level: 'string',
        message: 'string',
        timestamp: 'date',
      }
    };
  
    this.realm = new Realm({
      path: 'winston.realm',
      schema: [LogSchema]
    });
  }

  log(info, callback) {
    console.log('realm related log, info  =',info);
    //TODO put log info inside realm
    // Perform the writing to the remote service
  }
};