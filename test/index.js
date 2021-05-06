const MockServicer = require('../index');

MockServicer({

  // 请求端口，默认8080
  port: 30000,

  // 数据处理方法
  handler: function (options, Mock) {

    console.log(options);

    return {

      // 状态码
      status: 200,

      // 数据
      data: Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1
        }]
      })
    };

  }

});