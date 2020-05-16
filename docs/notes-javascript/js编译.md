# js执行三部曲
## 一.语法分析
JavaScript引擎先通篇扫描一遍js代码，看看是否有语法错误
## 二.预编译
预编译有两个比较重要的特性：
1. 函数声明整体提升
```
test() // 12
function test(){
    console.log(12)
}
```
2. 变量提升（仅提升声明，不提升赋值）

    变量提升也是var的特性之一，let声明的变量就不存在变量提升效果。
```
console.log(a) // undefined
console.log(b) // Error
var a = 123
let b = 'lalala'
```
**函数预编译**：函数预编译一共会经历四个步骤：
考虑如下示例：
```
function fn(a){
    console.log(a);         // 1
    var a = 123 ;           // 2
    console.log(a) ;        // 3
    function a(){} ;        // 4
    console.log(a) ;        // 5
    var b = function(){} ;  // 6
    console.log(b) ;        // 7
    function d(){} ;        // 8
}
fn(1) ;
```
1. 创建AO对象(执行上下文)
 ```
    <!--相当于执行如下语句-->
    var AO = {}
 ```
2. 找形参和变量声明，将变量和形参名作为AO对象的属性名，并设置值为undefined（变量提升）  
```
<!--经历此步后-->
上述形参a：OA.a = undefined
上述第2行：OA.a = undefined
上述第6行：OA.b = undefined
之后：
OA = {
    a : undefined,
    b : undefined
}
```
3. 将实参值和形参统一：
```
实参a=1：OA.a = 1
之后：
OA = {
    a:1,
    b:undefined
}
```
4. 在函数体里找函数声明，值赋予函数体（此操作在函数执行时不再重复进行）
```
上述第4步：OA.a = function (){}
上述第8步：OA.d = function (){}
//注意上述第6步是函数表达式，不是函数声明
之后：
OA = {
    a : function(){},
    b : undefined,
    d : function(){}
}
```
预编译在函数执行前一刻完成。
最终输出结果如下：
```
function fn(a){
    console.log(a);         // function (){}
    var a = 123 ;           
    console.log(a) ;        // 123
    function a(){} ;        // 此步骤在预编译的时候进行过了，不再重复进行
    console.log(a) ;        // 123
    var b = function(){} ;   
    console.log(b) ;        // function (){}
    function d(){} ;        
}
fn(1) ;
```
## 三.解释执行
JavaScript是一门解释性语言，在执行的时候是从上到下解释一行执行一行的过程。其他的编译性语言如java会通篇编译一遍，生成可执行文件再执行此文件。