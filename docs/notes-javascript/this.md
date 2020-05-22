# this

this指向有下面这四条规则：

1. 在预编译的时候this指向window
2. 全局作用域下this指向window
3. call/apply可以改变this指向
4. a.fn()这种形式调用时this指向a

```javascript
var name = 222
var a = {
	name : '111',
	say: function(){
		console.log(this.name)
	}
}
var b = {
	name : 333,
	say: function(fn){
		fn() 
	}
}
b.say(a.say) // 222

```

知识点：this指向问题，当调用函数是这种形式aaa.fn()的话，this就指向aaa,如果是fn()这种形式调用，则this指向window，这道题里面虽然是b.say(a.say)，但是b.say()里面执行的并不是this.fn(),而是fn(),这样的话fn函数里面的this并不是b，也不是a，而是window