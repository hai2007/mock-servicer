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

> 基于此项目开发的[mock-manager](https://github.com/hai2007/mock-manager)是一个更简单的提供模拟数据的“新增”、“删除”、“更新”和“使用”于一体的项目，使用起来非常简单，推荐使用此项目哦~

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
  },

  // 自定义处理，可选
  handler:function(options){

    return {
      code:"",// 响应码，可选，默认200
      data:"",// 数据，必输
      type:""// 数据类型，可选，默认application/json
    };

  },

  // 请求拦截，可选，默认全部同意
  intercept:function(options){
      // 如果返回false，服务器会拒绝这次请求
      return true|false;
  }

});
```

### 和服务器交互

服务器启动成功以后，我们就可以通过请求的方式和数据服务器进行数据交互了。

交互主要分为下列几种：

- 新增或更新

也就是在仓库中新增或修改已经有的模拟数据

> 其中url用于指定模拟数据名称，method用于指定模拟数据请求方法，总之，url和method唯一确定了哪一方模拟数据（主要是考虑到实际项目的同一个url可能会使用不同的method实现不同的功能），下同。

```js
$.ajax({
  url: 'http://127.0.0.1:8080/update?url=XXX&method=XXX',
  type: "POST",
  data: "需要保存的数据"
});
```

- 删除

删除已经存在的模拟数据

```js
$.ajax({
  url: 'http://127.0.0.1:8080/delete?url=XXX&method=XXX'
});
```

- 查询

如果需要使用这份模拟数据，可以这样请求，返回的是mock运行后的结果而不是你新增的原始代码

```js
$.ajax({
  url: 'http://127.0.0.1:8080/query?url=XXX&method=XXX'
});
```

- Mock查询

和```查询```类似，只是这里直接使用```XXX```指定请求的模拟数据文件名称

```js
$.ajax({
  url: 'http://127.0.0.1:8080/mock?XXX'
});
```

- 原始查询

有时候，我们可能希望开发一个平台来管理我们的模拟数据，这个方法就可以返回原始代码，方便我们在线维护（比如这个项目：[mock-manager](https://github.com/hai2007/mock-manager)）

```js
$.ajax({
  url: 'http://127.0.0.1:8080/oralquery?url=XXX&method=XXX'
});
```

- 自定义处理

对于一些特殊情况，我们无法考虑那么多，比如访问权限等，这时候就可以自定义处理规则了

```js
$.ajax({
  url: 'http://127.0.0.1:8080/handler'
});
```

当前，这意味着启动服务器时```handler```配置项是必须的。

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

## 命令行启动

除了作为一个node包使用外，还可以在安装以后使用命令行启动：

```bash
mock-servicer --config ./mock-servicer.config.js
```

需要指定一个配置文件用来规定如何启动，配置文件格式如下：

```js
// mock-servicer.config.js
module.exports = {

  port: 8080,
  // 和直接作为包使用的时候可配置参数的一致的

};
```

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/mock-servicer/blob/master/LICENSE)

Copyright (c) 2021-2022 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
