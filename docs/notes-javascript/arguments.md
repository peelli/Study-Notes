# arguments

arguments在函数中用于保存实参数组，如果里面的元素有对应的形参，则arguments的元素跟形参变量形成“你变我也变”的映射关系。

```javascript
function demo(a,b){
	console.log(arguments) // [1,2,3]
	a = 10 // arguments[0] == 10
	arguments[1] = 20 // b == 20
}
demo(1,2,3)

```

## arguments.callee

arguments.callee指向函数的引用，也就是指向函数本身。

```javascript
function test(){
	arguments.callee === test // true
}

```

用途是当函数引用没法获取时就可以使用callee

```javascript
var count = (function (num) {
    return num == 1 ? 1 : num * arguments.callee(num - 1)
}(5))
```

这是立即执行函数实现阶乘的方式，此时要获取函数引用只能使用arguments.callee

## fn.caller

fn.caller指向fn的调用者，没啥用，严格模式下都不让用这个属性

```javascript
function demo(){
	test()
}
function test(){
	console.log(test.caller) // demo
}
```

