# mock-servicer - 用于提供模拟数据的node服务器。 

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=mock-servicer"><img src="https://img.shields.io/npm/dm/mock-servicer.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=mock-servicer"><img src="https://packagephobia.now.sh/badge?p=mock-servicer" alt="install size"></a>
  <a href="https://www.jsdelivr.com/package/npm/mock-servicer"><img src="https://data.jsdelivr.com/v1/package/npm/mock-servicer/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/mock-servicer"><img src="https://img.shields.io/npm/v/mock-servicer.svg" alt="Version"></a>
  <a href="https://github.com/hai2007/mock-servicer/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mock-servicer.svg" alt="License"></a>
  <a href="https://github.com/hai2007/mock-servicer">
      <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/hai2007/mock-servicer?style=social">
  </a>
</p>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/hai2007/mock-servicer/issues)！

## 如何使用？

```
npm install mock-servicer
```

安装好了以后，在需要的地方引入：

```js
const MockServicer = require('mock-servicer');

MockServicer({

  // 请求端口，默认8080
  port: 30000,

  // 数据处理方法
  handler: function (options, Mock) {

    return {

      // 状态码
      status: 200,

      // 数据
      // 可以根据options来判断应该返回什么样的数据
      data: Mock.mock({
        // 这里可以借助mock的方法来生成模拟数据
        // 或者使用缓存数据
      })
      
    };

  }

});
```

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/mock-servicer/blob/master/LICENSE)

Copyright (c) 2021 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
