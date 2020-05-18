// //闭包实现累加器
// function add() {

//     var num = 0
//     return function a() {
//         var div = document.getElementById('count')
//         div.innerHTML = num++
//         if (num == 60) num = 0
//     }
// }
// // 经典闭包 要求输出0-9
// function log() {
//     var arr = []
//     for (var i = 0; i < 10; i++) {
//         arr[i] = (function (i) {
//             return function result() {
//                 console.log(i)
//             }
//         }(i))
//     }
//     return arr
// }
// var arr = log()
// for (var i = 0; i < 10; i++) {
//     arr[i]()
// }
// // 经典闭包升华版 页面上有多个li标签，要求为每个li标签添加点击事件，输出它们的索引
// var lis = document.getElementsByTagName('li')
// for (var i = 0; i < lis.length; i++) {
//     (function (i) {
//         lis[i].addEventListener('click', function () {
//             console.log(i)
//         })
//     }(i))
// }

// // 写一个方法，返回一个字符串的字节数，中文占俩字节，英文占一个字节。提示：charCodeAt(i)函数可获得字符串第i个字符的unicode码，大于255是中文，小于等于255是英文
// function getCharLength(str) {
//     var length = str.length
//     for (var i in str) {
//         if (str.charCodeAt(i) > 255) length++
//     }
//     return length
// }

// 
var x = 1, y = z = 2
function add(n) {
    return n = n + 1
}
y = add(x)
function add(n) {
    return n = n + 3
}
z = add(x)
console.log(x, y, z)