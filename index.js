/*!
 * MOCK数据服务器
 * https://github.com/hai2007/mock-servicer
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2021 hai2007 走一步，再走一步。
 * Released under the MIT license
 */

const http = require('http');
const log = require('@hai2007/nodejs').log;
const fs = require('fs');
const path = require('path');
const Mock = require('mockjs')

const jsonfile = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));

module.exports = function (config) {

  const port = 'port' in config ? config.port : 8080; // 端口号

  http.createServer(function (request, response) {

    let resultData = config.handler({

      // 请求方法
      method: request.method,

      // url
      url: (request.url + "").replace(/\?[^?]+$/, '')

    }, Mock);

    response.writeHead(resultData.status, {

      // 设置跨域
      "Access-Control-Allow-Origin": "*",// 允许的域
      "Access-Control-Allow-Headers": "*",// 允许的header类型
      "Access-Control-Allow-Methods": "*",// 允许的请求方法

      // 标记服务器名称
      "X-Powered-By": jsonfile.name + " " + jsonfile.version,

      // 响应内容类型
      "Content-Type": "application/json;charset=utf-8"

    });

    response.write(require('@hai2007/tool').isString(resultData.data) ? resultData.data : JSON.stringify(resultData.data));

    response.end();

  })

    // 启动监听
    .listen(port);

  log(jsonfile.name + ' running on port:' + port);

};