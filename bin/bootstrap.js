const hai2007_nodejs = require('@hai2007/nodejs');
const fs = require('fs');

module.exports = function (configUrl, taskName) {
  taskName = taskName || "default";

  // 如果配置文件存在，且是.js文件
  if (/\.js$/.test(configUrl) && fs.existsSync(configUrl) && !fs.lstatSync(configUrl).isDirectory()) {

    let configFile = require(configUrl);

    require('../index')(configFile);

  } else {
    hai2007_nodejs.error('No config file:' + configUrl);
  }
};