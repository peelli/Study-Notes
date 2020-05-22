function deepClone(origin) {
    var type = typeof origin, target
    if (type == 'object') {
        if (Object.prototype.toString.call(origin) == '[object Array]') {
            target = []
        } else {
            target = {}
        }
        for (var attr in origin) {
            if (typeof origin[attr] == 'object' && origin[attr] !== null) {
                target[attr] = deepClone(origin[attr])
            } else {
                target[attr] = origin[attr]
            }
        }
    } else {
        target = origin
    }
    return target

}

var b = [1, 2, 3, { key: 'dede', c: { name: 'ccc', age: 123 } }]
b = {
    name: 'bbb',
    sex: 'male',
    age: null,
    wife: {
        one: 'xiaoliu',
        two: 'xiaohua',
        three: null
    }
}
var a = deepClone(b)
// function getDom(str) {
//     var isId = /#/.test(str)
//     var isClass = /\./.test(str)
//     return isId ? document.getElementById(str.split('#')[1]) : isClass ? getElByClassName(str) : document.getElementsByTagName(str)
//     function getElByClassName(str) {
//         var tags = document.getElementsByTagName('*'), array = [], str = str.split('.')[1]
//         for (var i = 0, len = tags.length; i < len; i++) {
//             if (tags[i].className) {
//                 var className = tags[i].className.replace(/\s+/g, ' ')
//                 var arr = className.split(' ')
//                 if (arr.indexOf(str) !== -1) {
//                     array.push(tags[i])
//                 }
//             } else {
//                 continue
//             }

//         }
//         return array.length ? array : null
//     }
// }
// console.log(getDom('div'))
// function getStyle(dom, attr) {
//     if (window.getComputedStyle) {
//         return window.getComputedStyle(dom, null)[attr]
//     } else {
//         return currentStyle
//     }
// }
// function startMove(dom, target) {
//     clearInterval(dom.timer)
//     dom.timer = setInterval(() => {
//         var speed = target - dom
//     }, 30);
// }