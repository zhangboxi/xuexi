function Watcher(vm,exp,cb) {
  this.cb = cb;//执行函数
  this.vm = vm;//一个vm对象。这里的vm是vue的自己开发版本
  this.exp = exp;//页面属性
  this.value = this.get();//将自己添加到Dep订阅器
}

Watcher.prototype = {
  update:function () {
    this.run();
  },
  run: function () {
    let value = this.vm.data[this.exp];//新的值，已经在Observer中，set过了
    let oldVal = this.value;//旧的值，上一次的值，因为，会在下面，将这次的值，付给自己的value，所以永远是旧的值
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm , value, oldVal)//执行function，更改页面显示的内容
    }
  },
  get: function () {
    Dep.target = this;  // 缓存自己，将自己给予Dep.target,下一步，将自己加入dep arr中,只会在初始化时候执行一次
    var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数,在这里，因为Observer，已经被劫持，所以get会将，Watcher自己，加入dep中
    Dep.target = null;  // 释放自己
    return value;
  }
}