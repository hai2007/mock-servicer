const MockServicer = require('../index');

MockServicer({

  // 请求端口，默认8080
  port: 30000,

  contentBase: './',

  mockBase: './mock',

  // template404:function(list){
  //   console.log(list);
  //   return "404";
  // }，

  handler: function (options) {

    // throw new Error('一个错误handler');

    return {
      code: "200",
      data: "{info:'handler的数据'}",
      // type:""
    };

  },

  // intercept:function(options){
  //   // throw new Error('一个错误intercept');
  //     // 如果返回false，服务器会拒绝这次请求
  //     return true;
  // }

});