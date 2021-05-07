const MockServicer = require('../index');

MockServicer({

  // 请求端口，默认8080
  port: 30000,

  contentBase:'./'

});