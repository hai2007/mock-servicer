/*!
 * MOCK数据服务器
 * https://github.com/hai2007/mock-server
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2021 hai2007 走一步，再走一步。
 * Released under the MIT license
 */

const http = require('http');
const fs = require('fs');
const log = require('@hai2007/nodejs').log;

module.exports = function (config) {

  const port = config.port || 8080; // 端口号
  const basePath = config.contentBase || process.cwd();// 根路径

  let server = http.createServer(function (request, response) {

    response.writeHead('200', {

    });

    response.write('响应的内容');

    response.end();

  });

  server.listen(port);
  log('Server running on port:' + port);

};