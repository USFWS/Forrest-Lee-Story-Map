const xhr = require('xhr');

const init = (url, cb) => {
  xhr.get(url, (err, res, body) => {
    if (err) return cb(err);
    return cb(null, JSON.parse(body))
  });
}

module.exports.init = init;
