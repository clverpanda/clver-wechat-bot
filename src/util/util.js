const randomString = require('randomstring');

module.exports.commonParams = () => {
    return {
      'nonce_str': randomString.generate({
        length: 16,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
      }),
      'time_stamp': Math.floor(Date.now() / 1000),
    }
  };