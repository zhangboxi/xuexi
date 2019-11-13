module.exports = {
  css: {
    loaderOptions: {
      less: {
        //更改主题色，类似于elementui，方便太多了，不过这个是全局修改
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    /*
      添加了mock方便测试，在mock文件夹中，放置了各种数据，当正常启动时，去直接访问文件数据，完成测试环境搭建
      在package.json中配置了serve:no-mock启动方式，当输入npm run serve:no-mock启动时，进入非mock环境，并在下方else if判断
      当正常启动时，进入mock测试环境
    */
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log();
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
