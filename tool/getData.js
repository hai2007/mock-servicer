module.exports = function (response, callback) {
  
  // 不断更新数据
  let body = '';
  response.on('data', function (data) {
    body += data;
  });

  response.on('end', function () {
    
    // 数据接收完成
    callback(body);
  });

};