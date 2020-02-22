/*1.0版本
function SelfVue(data, el, exp) {
  var self = this;
  this.data = data;

  //将，vue.data.name 转变成 vue.name的形式
  Object.keys(data).forEach(function(key) {
      self.proxyKeys(key);  // 绑定代理属性
  });

  observe(data);
  el.innerHTML = this.data[exp];  // 初始化模板数据的值
  new Watcher(this, exp, function (value) {
      el.innerHTML = value;
  });
  return this;
}
*/
/*2.0版本*/
function SelfVue (options) {
  var self = this;
  this.vm = this;
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach(function(key) {
      self.proxyKeys(key);
  });

  observe(this.data);
  new Compile(options.el, this);
  options.mounted.call(this); // 所有事情处理好后执行mounted函数
}
//将，vue.data.name 转变成 vue.name的形式
SelfVue.prototype = {
  proxyKeys: function (key) {
      var self = this;
      Object.defineProperty(this, key, {
          enumerable: false,
          configurable: true,
          get: function proxyGetter() {
              return self.data[key];
          },
          set: function proxySetter(newVal) {
              self.data[key] = newVal;
          }
      });
  }
}