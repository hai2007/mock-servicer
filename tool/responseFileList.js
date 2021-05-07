const fs = require('fs');
const path = require('path');

// 读取当前路径下的文件，方便服务器404的时候导航
module.exports = function (fullUrl) {

  let files, content = fullUrl;
  try {
    files = fs.readdirSync(fullUrl);
  } catch (e) {
    content = path.resolve(fullUrl, '../');
    files = fs.readdirSync(content);
  }

  let list = [];

  for (let i in files) {
    let isFolder = fs.lstatSync(path.join(content, files[i])).isDirectory();

    // 保存起来
    list.push({

      // 文件类型
      type: isFolder ? "folder" : "file",

      // 地址
      url: "./" + files[i] + (isFolder ? "/" : "")

    });

  }

  return list;
};