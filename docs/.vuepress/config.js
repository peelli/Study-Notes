module.exports = {
    title: 'Javascript Study Notes',
    description: '学习笔记',
    base: '/docs/Study-Notes/',
    themeConfig: {
        nav: [
            { text: '笔记配置', link: '/' },
            { text: 'Javascript', link: '/notes-javascript/' },
        ],
        sidebar: {
            '/notes-javascript/': ['', '函数初始作用域', '立即执行函数', 'js编译'],
        }
    }
}