/*
  根据传入id,便利所有id下的节点，当内容有{{}}的时候，根据其text，获取Observer中的内容，并声称对应的Watcher
*/

function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init: function () {
    if (this.el) {
      //为了解析模板，首先需要获取到dom元素，然后对含有dom元素上含有指令的节点进行处理，
      //因此这个环节需要对dom操作比较频繁，所有可以先建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理：
      this.fragment = this.nodeToFragment(this.el); 
      this.compileElement(this.fragment);//遍历各各节点
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在');
    }
  },
  nodeToFragment: function (el) {
    var fragment = document.createDocumentFragment();//创建一个空的文本段
    var child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild
    }
    return fragment;
  },
  compileElement: function (el) {
    var childNodes = el.childNodes;//获取子节点合集
    var self = this;
    [].slice.call(childNodes).forEach(function (node) {//对每个子，进行便利
      var reg = /\{\{\s*(.*?)\s*\}\}/;
      var text = node.textContent;
      if (self.isTextNode(node) && reg.test(text)) { // 判断是否是符合这种形式{{}}的指令
        self.compileText(node, reg.exec(text)[1]);//如果是{{}}
      }

      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node); // 继续递归遍历子节点
      }
    });
  },
  compileText: function (node, exp) {
    debugger
    var self = this;
    var initText = this.vm[exp]; //调用Oberver中的get方法
    this.updateText(node, initText); // 将初始化的数据初始化到视图中，给页面显示值
    new Watcher(this.vm, exp, function (value) { // 生成订阅器并绑定更新函数
      self.updateText(node, value); //将回掉方法，设定为这里的方法
    });
  },
  updateText: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  isTextNode: function (node) {
    return node.nodeType == 3;
  }
}