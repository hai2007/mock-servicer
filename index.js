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
const { log, fullPath } = require('@hai2007/nodejs');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mineTypes = require('./mime.types.js');
const responseFileList = require('./tool/responseFileList.js');

const jsonfile = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));

module.exports = function (config) {

  const port = 'port' in config ? config.port : 8080; // 端口号
  const basePath = config.contentBase || process.cwd();// 根路径

  http.createServer(function (request, response) {

    let urlObject = url.parse(request.url);

    // 获取data
    require('./tool/getData')(request, data => {

      let options = {

        // 请求方法
        method: request.method,

        // url
        url: urlObject.pathname.replace(/^\//, '').replace(/\/$/, ''),

        // 请求参数
        query: require('./tool/toQuery.js')(urlObject.query),

        // 数据
        value: data

      };

      // 用于区分这次请求的目的
      let preUrl = options.url.split('/')[0];

      let contentType = 'application/json';
      let responseCode = '200';
      let responseData = JSON.stringify(options);

      // 新增或更新
      if (preUrl == 'update') {

      }

      // 删除
      else if (preUrl == 'delete') {

      }

      // 查询
      else if (preUrl == 'query') {

      }

      // 默认就作为普通的数据服务器
      else {

        // 请求的文件路径
        let filePath = fullPath(options.url == "" ? "index.html" : options.url, basePath);

        // 文件后缀名称
        let dotName = /\./.test(filePath) ? filePath.match(/\.([^.]+)$/)[1] : "";

        // 文件类型
        if (dotName != "") contentType = mineTypes[dotName];

        // 如果需要读取的文件存在
        if (fs.existsSync(filePath) && !fs.lstatSync(filePath).isDirectory()) {
          responseData = fs.readFileSync(filePath);
        }

        // 如果不存在，就返回404并列举出当前目录内容
        // 这样的目的是为了方便二次开发
        else {
          responseCode = "404";
          responseData = JSON.stringify(responseFileList(filePath));
        }

      }

      response.writeHead(responseCode, {

        // 设置跨域
        "Access-Control-Allow-Origin": "*",// 允许的域
        "Access-Control-Allow-Headers": "*",// 允许的header类型
        "Access-Control-Allow-Methods": "*",// 允许的请求方法

        // 标记服务器名称
        "X-Powered-By": jsonfile.name + " " + jsonfile.version,

        // 响应内容类型
        "Content-Type": contentType + ";charset=utf-8"

      });

      response.write(responseData);

      response.end();

    });

  })

    // 启动监听
    .listen(port);

  log(jsonfile.name + ' running on port:' + port);

};