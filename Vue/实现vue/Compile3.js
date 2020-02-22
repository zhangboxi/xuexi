/* 3。0版本
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
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
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
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            //用node的节点类型，来判断，如：Element（代表元素）：1，Attr（代表属性）：2，Text（文本内容，空格被视作文本）：3

            if (self.isElementNode(node)) {
                self.compile(node);//如果是Element类型
            } else if (self.isTextNode(node) && reg.test(text)) {// 判断是否是符合这种形式{{}}的指令
                self.compileText(node, reg.exec(text)[1]);//文本且带有{{}}
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);// 继续递归遍历子节点
            }
        });
    },
    compile: function (node) {
        var nodeAttrs = node.attributes;//获取属性，这里是指v-model,on-click
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            var attrName = attr.name;//对属性遍历
            if (self.isDirective(attrName)) {//如果是v开头
                var exp = attr.value;//获取value，如： v-model:name,这里获取的是name
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) { // 事件指令，:on
                    self.compileEvent(node, self.vm, exp, dir);//对事件进行处理
                } else { // v-model 指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function (node, exp) {
        var self = this;
        var initText = this.vm[exp];//调用Oberver中的get方法
        this.updateText(node, initText);// 将初始化的数据初始化到视图中，给页面显示值
        new Watcher(this.vm, exp, function (value) {// 生成订阅器并绑定更新函数
            self.updateText(node, value);//将回掉方法，设定为这里的方法
        });
    },
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];//使用GET，进行Dep注册
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) {//生成对应的Watcher
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function (e) {//监听输入事件，当view值更改后，执行的方法
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function (dir) {
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
}