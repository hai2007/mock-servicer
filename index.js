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
const urlToString = require('./tool/urlToString');

const jsonfile = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));

module.exports = function (config) {

  const port = 'port' in config ? config.port : 8080; // 端口号
  const basePath = fullPath(config.contentBase || "./", process.cwd());// 根路径
  const mockBasePath = fullPath(config.mockBase || "./", process.cwd());// 根路径

  http.createServer(function (request, response) {

    let contentType = 'application/json';
    let responseCode = '200';
    let responseData = "";

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

      try {
        if ('intercept' in config && !config.intercept(options)) {
          responseCode = "501";
          responseData = "The current request is not supported.";
          contentType = 'text/plain';
        } else {

          // 用于区分这次请求的目的
          let preUrl = options.url.split('/')[0];

          // 新增或更新
          // POST localhost:8080/update?url=XXX&method=XXX
          if (preUrl == 'update') {

            let datapath = fullPath("./mock-" + urlToString(options.query.url, options.query.method) + ".js", mockBasePath);

            // 写入内容
            fs.writeFileSync(datapath, `module.exports=function(Mock){return ${options.value};};`, {
              encoding: 'utf8'
            });

          }

          // 删除
          // localhost:8080/delete?url=XXX&method=XXX
          else if (preUrl == 'delete') {

            let datapath = fullPath("./mock-" + urlToString(options.query.url, options.query.method) + ".js", mockBasePath);

            // 删除内容
            if (fs.existsSync(datapath)) {
              fs.unlinkSync(datapath);
            }

          }

          // 查询
          // localhost:8080/query?url=XXX&method=XXX
          else if (preUrl == 'query') {

            let datapath = fullPath("./mock-" + urlToString(options.query.url, options.query.method) + ".js", mockBasePath);

            if (fs.existsSync(datapath)) {
              responseData = JSON.stringify(require(datapath)(require('mockjs')));
            } else {
              responseCode = "404";
            }

          }

          // 原始查询
          // localhost:8080/oralquery?url=XXX&method=XXX
          else if (preUrl == 'oralquery') {

            let datapath = fullPath("./mock-" + urlToString(options.query.url, options.query.method) + ".js", mockBasePath);

            if (fs.existsSync(datapath)) {
              responseData = (fs.readFileSync(datapath, 'utf-8') + "").replace(/^module\.exports=function\(Mock\)\{return /, '').replace(/;\};$/, '');
              contentType = 'text/plain';
            } else {
              responseCode = "404";
            }

          }

          // 自定义处理
          // localhost:8080/handler
          else if (preUrl == 'handler') {

            let resultData = config.handler(options);

            if ('code' in resultData) responseCode = resultData.code;
            responseData = resultData.data;
            if ('type' in resultData) contentType = resultData.type;

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
              responseData = ('template404' in config ? config.template404 : require('./tool/template404'))(responseFileList(filePath));
              contentType = "text/html";
            }

          }

        }
      }

      // 可能出错
      catch (e) {
        responseCode = "500";
        responseData = "" + e;
        contentType = 'text/plain';
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