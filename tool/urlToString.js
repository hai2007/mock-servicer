module.exports = function (url, method) {

  return method + "-" + require('hash-sum')(url);

};