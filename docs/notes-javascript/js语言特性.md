# JavaScript语言特性

## 一.编译性语言和解释性语言

### 编译性语言

c语言，c++，java，c# 

编译性语言会经过一个编译的过程，负责翻译的叫做编译器，生成编译结果，然后才能运行

**优点：**

1. 运行速度快

**缺点：**

1. 某个编译结果，难以适应各种环境（跨平台障碍）；

   因为编译出结果才能运行，因此编译出的结果很难在其他环境同样适用，java和c#的解决方法就是：先编译出中间件，然后放到执行环境时再编译一次，因此第一次运行时会慢一点，因为有一个翻译的过程。

2. 部署繁琐；

   编译结果要部署到服务器上运行，如果源代码改了一点点东西，都需要重新编译一次，然后再部署一次才能使改动生效。

### 解释性语言

js，php

不需要编译，解释一句执行一句，优缺点跟编译性语言正好相反

**优点：**

1. 跨平台

   不需要编译，因此各种平台都能直接翻译成自己能识别的代码

2. 部署简单

   跟编译性语言相反的理由

**缺点：**

1. 速度慢

   由于解释一句执行一句，因此速度会比编译性语言慢很多，但是2008年除了V8引擎之后，可以直接将js翻译成字节码，速度基本和编译性语言相差无几

## 二.弱类型语言和强类型语言

### 弱类型语言

存放的数据类型可变

**优点：**

灵活，易上手

**缺点：**

不严谨，不适合开发大型应用

### 强类型语言

存放的数据类型不可变

**优点**：

严谨，适合开发大型应用

**缺点：**

不灵活，不易上手

> 通常，将弱类型解释性语言称为脚本语言：js，php

## 三.单线程

同步现象：上一件事情没有做完，下一件事情必须等待

异步：提高单线程的执行效率