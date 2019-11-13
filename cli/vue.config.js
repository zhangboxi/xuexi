module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      less: {
        //更改主题色，类似于elementui，方便太多了，不过这个是全局修改
        modifyVars: {
          "primary-color": "#1DA57A"
          // @primary-color: #1890ff; // 全局主色
          // @link-color: #1890ff; // 链接色
          // @success-color: #52c41a; // 成功色
          // @warning-color: #faad14; // 警告色
          // @error-color: #f5222d; // 错误色
          // @font-size-base: 14px; // 主字号
          // @heading-color: rgba(0, 0, 0, 0.85); // 标题色
          // @text-color: rgba(0, 0, 0, 0.65); // 主文本色
          // @text-color-secondary : rgba(0, 0, 0, .45); // 次文本色
          // @disabled-color : rgba(0, 0, 0, .25); // 失效色
          // @border-radius-base: 4px; // 组件/浮层圆角
          // @border-color-base: #d9d9d9; // 边框色
          // @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
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
