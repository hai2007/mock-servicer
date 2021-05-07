# mock-servicer - 用于提供模拟数据的node服务器。 

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=mock-servicer"><img src="https://img.shields.io/npm/dm/mock-servicer.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=mock-servicer"><img src="https://packagephobia.now.sh/badge?p=mock-servicer" alt="install size"></a>
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

安装好了以后，引入并启动即可：

```js
const MockServicer = require('mock-servicer');

MockServicer({

  // 请求端口，可选，默认8080
  port: 8080,

  // 服务器根地址，可选，默认当前路径
  contentBase:'./',

  // mock数据缓存根地址，可选，默认当前路径
  mockBase:'./mock',

  // 404的提示界面，可选
  template404:function(list){
    // 返回当前路径下文件列表
    return template;
  }

});
```

### 和服务器交互

服务器启动成功以后，我们就可以通过请求的方式和数据服务器进行数据交互了。

交互主要分为下列几种：

- 新增或更新

```js
$.ajax({
  url: 'http://127.0.0.1:8080/update?url=XXX&method=XXX',
  type: "POST",
  data: "需要保存的数据"
});
```

- 删除

```js
$.ajax({
  url: 'http://127.0.0.1:8080/delete?url=XXX&method=XXX'
});
```

- 查询

```js
$.ajax({
  url: 'http://127.0.0.1:8080/query?url=XXX&method=XXX'
});
```

上面的```需要保存的数据```可以是一个普通的JSON字符串，比如：

```js
data: `{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}`
```

或者使用mock，比如：

```js
data: `Mock.mock({
// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
})`
```

### 作为普通的数据服务器

除了上面特殊情况的交互外，你还可以直接访问位于```服务器根地址 contentBase```下的文件。

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/mock-servicer/blob/master/LICENSE)

Copyright (c) 2021 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
