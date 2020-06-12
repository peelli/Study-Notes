//封装type方法，返回传入参数的真实类型
function type(target) {
    var result = typeof target;
    var maps = {
        '[object Array]': 'array',
        '[object Null]': 'null',
        '[object Number]': 'number-object',
        '[object Boolean]': 'boolean-object',
        '[object String]': 'string-object',
        '[object Object]': 'object'
    };
    if (result === 'object') {
        result = Object.prototype.toString.call(target);
        result = maps[result];
    }
    return result;
}

//数组去重
Array.prototype.unique = function () {
    var obj = {},
        arr = this,
        result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
};
//一个字符串由a-z组成，请找出第一个只出现一次的字符
function findOnlyOnce(str) {
    var arr = [],
        obj = {};
    for (var i in str) {
        if (!obj[str[i]]) {
            obj[str[i]] = 1;
            arr.push(str[i]);
        } else {
            obj[str[i]]++;
            var index = arr.findIndex(s => s == str[i]);
            index !== -1 && arr.splice(index, 1);
        }
    }
    return arr[0] || null;
}

//字符串去重
function strOnly(str) {
    var obj = {},
        arr = [];
    for (var i in str) {
        if (!obj[str[i]]) {
            obj[str[i]] = true;
            arr.push(str[i]);
        }
    }
    return arr.join('');
}

// 深拷贝

function deepClone(target) {
    var results = [],
        targets = [];

    function getRegExp(re) {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
    }
    function _deepClone(target) {
        var toStr = Object.prototype.toString,
            type = toStr.call(target),
            result;
        if (target == null || typeof target !== 'object') {
            return target;
        }
        switch (type) {
            case '[object RegExp]':
                {
                    result = new RegExp(target.source, getRegExp(target));
                    if (target.lastIndex) {
                        result.lastIndex = target.lastIndex;
                    }
                }
                break;
            case '[object Date]':
                {
                    result = new Date(target.getTime());
                }
                break;
            case '[object Array]':
                {
                    result = [];
                }
                break;
            default:
                {
                    result = {};
                }
                break;
        }
        // 处理对象原型
        var proto = Object.getPrototypeOf(parent);
        // 利用 Object.create 切断原型链
        child = Object.create(proto);
        var index = targets.indexOf(target);
        if (index != -1) {
            return results[index];
        }
        targets.push(target);
        results.push(result);
        for (var i in target) {
            if (target.hasOwnProperty(i)) result[i] = _deepClone(target[i]);
        }
        return result;
    }
    return _deepClone(target);
}

// 4. 查询子串首次出现的位置，如：原串abccbaxzabc 子串为axz 结果为5。
function findFirstStr(str, ch) {
    return str.match(new RegExp(ch)) ? str.match(new RegExp(ch)).index : -1;
}
// 5. 计算数组中，最大连续增长子序列的长度，如：[1,2,3,4,1,2,3,4,5,1,2,3] 结果为5
function getMaxLenth(arr) {
    var temp = 0,
        result = 0;
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] > arr[i - 1]) {
            temp++;
        } else {
            result = Math.max(temp, result);
            temp = 1;
        }
    }
    return Math.max(temp, result);
}
// 6.遍历元素节点树，在原型链上编程
Element.prototype.enumElem = function (onlyElem = true) {
    var children = onlyElem ? this.children : this.childNodes
    for (var i = 0, len = children.length; i < len; i++) {
        console.log(children[i])
        children[i].nodeType == 1 && children[i].enumElem()
    }
}
var div = document.getElementById('box')

// 7.封装函数，返回元素e的第n层父节点
Element.prototype.getParent = function (n) {
    var result = this
    while (result && n) {
        result = result.parentElement
        n--
    }
    return result
}
var i = document.getElementsByTagName('i')[0]

// 8.封装函数，返回元素e的第n个兄弟节点，n为正，返回后面的兄弟节点，n为负，返回前面的兄弟节点

Element.prototype.getSiblings = function (n) {
    var result = this
    while (result && n) {
        if (n > 0) {
            // 考虑兼容性
            if (this.nextElementSibling) {
                result = result.nextElementSibling
            } else {
                for (result = result.nextSibling; result && result.nodeType != 1; result = result.nextSibling);
            }
            n--
        } else {
            if (this.previousElementSibling) {
                result = result.previousElementSibling
            } else {
                for (result = result.previousSibling; result && result.nodeType != 1; result = result.previousSibling);
            }
            n++
        }
    }
    return result
}
var span = document.getElementsByTagName('span')[0]


// 9.编辑函数，封装myChildren功能，解决以前部分浏览器功能
Element.prototype.myChildren = function () {
    var childNodes = this.childNodes, arr = []
    for (var i = 0, len = childNodes.length; i < len; i++) {
        if (childNodes[i].nodeType == 1) {
            arr.push(childNodes[i])
        }
    }
    return arr
}

// 10.自己封装hasChildren方法，不可用children属性
Element.prototype.haschildren = function () {
    var childNodes = this.childNodes
    for (var i = 0, len = childNodes.length; i < len; i++) {
        if (childNodes[i].nodeType == 1) {
            return true
        }
    }
    return false
}
// 11.封装函数insertAfter,功能类似insertBefore
Element.prototype.insertAfter = function (target, node) {
    var sibling = node.nextElementSibling
    if (sibling == null) {
        this.appendChild(target)
    } else {
        this.insertBefore(target, sibling)
    }
}
var p = document.getElementsByTagName('p')[0]
var test = document.createElement('a')
test.innerText = 'aaa'

// 12.将目标节点内部的节点逆序
Element.prototype.reverse = function () {
    var childNodes = this.childNodes
    for (var i = childNodes.length - 2; i >= 0; i--) {
        this.appendChild(childNodes[i])
    }
}

// 13.求滚动轮滚动距离getScrollOffset()
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 14.获取可视区宽高
function getViewportOffset() {
    if (!window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {// 混杂模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}

// 15.求元素相对于文档的坐标
function getElementPosition(dom) {
    var x = 0, y = 0
    while (dom.offsetParent) {
        x += dom.offsetLeft
        y += dom.offsetTop
        dom = dom.offsetParent
    }
    return {
        x,
        y
    }
}

