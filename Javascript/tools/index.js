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
console.log(getMaxLenth([1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 2, 3, 4,]))
