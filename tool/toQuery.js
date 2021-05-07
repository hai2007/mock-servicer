module.exports = function (queryString) {

  // 如果没有参数
  if (queryString == null) return {};

  // 参数用&分割
  let queryArray = queryString.split('&');
  let queryObject = {};
  for (let i = 0; i < queryArray.length; i++) {

    // 格式：key=value
    let temp = queryArray[i].split('=');
    queryObject[temp[0]] = temp[1];
  }

  // 返回
  return queryObject;
};