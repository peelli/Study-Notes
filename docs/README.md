---
sidebar: auto
---

# JavaScript 笔记配置

使用 vuepress 管理学习笔记，可以很方便的随时浏览笔记

> vuepress中文文档：[https://www.vuepress.cn/](https://www.vuepress.cn/)

## 安装vuepress

### 安装node

首先确保自己电脑上全局安装有nodejs环境，没有的同学自行安装，参考教程如下：

> 菜鸟教程：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

可用如下命令验证nodejs是否安装成功：

```JavaScript
$> node -V
v10.15.3
// 下方出现版本号则表示安装成功。
```

### 淘宝镜像

npm是nodejs自带的包管理器，用来安装和管理依赖等等，当你电脑上安装好nodejs之后就可以使用npm了。不过npm是国外的资源会比较慢，可安装国内淘宝镜像吹牛拍马，这样安装依赖包会快很多。

**安装淘宝镜像**

```
npm install -g cnpm -registry=https://registry.npm.taobao.org
```

**初始化项目**

新建一个文件夹，不要使用中文文件名，用vscode打开该文件夹，打开终端：

```JavaScript
//这是项目初始化的命令，一路回车就好了，如果出错，大概率是使用了中文文件名，执行完之后会在根目录下生成一个package.json文件
cnpm init
```

**安装vuepress**

```JavaScript
// -D 是 --save-dev 的简写，表示安装的依赖仅在开发环境下生效
cnpm install vuepress -D
```

上述命令执行完之后会发现根目录下多了个node_modules文件夹，这是存放安装好的依赖包的地方，尽量不要去修改它。

## 配置vuepress

根目录下新建docs文件夹，在docs下新建.vuepress文件夹，再继续新建config.js文件，目录结构如下：

![image.png](https://i.loli.net/2020/05/16/M4Sw91G5b2vgiTY.png)

打开config.js，输入以下代码，自行理解：

```javascript
module.exports = {
    title: 'Javascript Study Notes',
    description: 'JavaScript学习笔记',
    //记住这里的base配置很重要，涉及到部署时能否正常显示文档内容，根据你的项目路径来配置
    //当vuepress构建之后会生成dist文件夹，里面的html引用css路径就加入下面这一段
    //不理解没关系，如果不用部署的话就可以先不管这个
    //举个例子：我是部署到github上去的，我github上的项目名叫blog，因此我的github部署地址为https://lp1290271715.github.io/blog/，那我下面这个base就需要配置成/blog/，否则构建出来的页面样式会错乱
    base: '/blog/',
    themeConfig: {
        nav: [
            { text: '笔记配置', link: '/' },
            // 这里的notes-javascript对应存放笔记的文件夹名字，根据自己实际设置
            { text: 'JavaScript笔记', link: '/notes-javascript/' },
        ],
        sidebar: {
            '/notes-javascript/': ['', '函数初始作用域', '立即执行函数', 'js编译'],
        }
    }
}
```

打开packa.json文件，添加如下代码：

```javascript
{
  "name": "javascript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
     // 主要是下面这两行，用于启动vuepress，各位复制代码之后记得把这样注释删掉哦
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vuepress": "^1.5.0"
  }
}

```

### 运行vuepress

经过上面一系列步骤之后，就是激动人心的时刻了！！

```JavaScript
npm run docs:dev
```

上述代码执行之后，如果看到这样一段，就表示成功了，现在输入给出的地址，就能在浏览器里面看到我们的笔记内容了。

```javascript
VuePress dev server listening at http://localhost:8080/docs/JavaScript/
```

## 最后

以上只是一个简单的配置，vuepress的功能远不止这些，可根据自己需要，做出自己喜欢的笔记风格，其他配置请参考[vuepress中文文档](https://www.vuepress.cn/)