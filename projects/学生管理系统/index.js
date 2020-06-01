var INDEX = (function () {
    var tbody = document.querySelector("#student-list table tbody")
    var studentList = []
    var activePage = 1, pageSize = 10, count = 0
    /**
     * 给某元素设置active或者显示某元素
     * @param {Element} node dom节点
     * @param {String} type class || style -->添加active类 || 设置样式为display:block
     */
    function setActive(node, type) {
        var nodes = node.parentNode.children
        for (var i = 0; i < nodes.length; i++) {
            if (type == 'class') {
                nodes[i].classList.remove('active')
            } else {
                nodes[i].style.display = 'none'
            }
        }
        if (type == 'class') {
            node.classList.add('active')
        } else {
            node.style.display = 'block'
        }
    }
    function initAccount() {
        var account = getCookie('account')
        if (!account) {
            location.href = './login.html'
        }
        var username = document.getElementsByClassName('user-name')[0]
        username.innerText = account
    }
    function initNav() {
        var menu = document.querySelector('.menu dl')
        menu.onclick = function (e) {
            var target = e.target
            if (target.nodeName == 'DD') {
                setActive(target, 'class')
                var id = target.dataset.id
                var content = document.getElementById(id)
                setActive(content, 'style')
            }
        }
    }

    function bindEvent() {
        var editModal = document.getElementsByClassName('edit-container')[0]
        tbody.onclick = function (e) {
            var target = e.target, iframe = document.querySelector('.edit-container .edit-student-page iframe')
            if (target.classList.contains('edit')) {
                var index = target.dataset.index
                iframe.contentWindow.fillMsg(studentList[index])
                editModal.style.display = 'block'
            } else if (target.classList.contains('delete')) {
                var index = target.dataset.index
                var isDel = confirm('确认删除学号为：' + studentList[index].sNo + '的学生吗？')
                if (isDel) {
                    _ajax.get(baseUrl + '/api/student/delBySno', { sNo: studentList[index].sNo }, function (res) {
                        if (res.status == 'success') {
                            alert('删除成功！')
                            INDEX.findFirstPage()
                        } else {
                            alert(res.msg)
                        }
                    })
                }
            }
        }
        editModal.onclick = function () {
            this.style.display = 'none'
        }
        var prevPageBtn = document.getElementsByClassName('prev-page')[0]
        var nextPageBtn = document.getElementsByClassName('next-page')[0]
        prevPageBtn.onclick = function () {
            activePage--
            INDEX.findAllStudent()
        }
        nextPageBtn.onclick = function () {
            activePage++
            INDEX.findAllStudent()
        }
    }
    return {
        init() {
            initNav()
            initAccount()
            bindEvent()
        },
        findAllStudent() {
            var tableColumns = ['sNo', 'name', 'sex', 'email', 'birth', 'phone', 'address', 'operate']
            _ajax.get('http://open.duyiedu.com/api/student/findByPage', {
                page: activePage,
                size: pageSize
            }, function (res) {
                if (res.status == 'success') {
                    tbody.innerHTML = ''
                    count = res.data.cont
                    var list = res.data.findByPage
                    studentList = list
                    if (list.length == 0) {
                        var tr = document.createElement('tr')
                        var td = document.createElement('td')
                        td.innerHTML = '无数据'
                        td.colSpan = 8
                        tr.appendChild(td)
                        tbody.appendChild(tr)
                    }
                    for (var i = 0; i < list.length; i++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < tableColumns.length; j++) {
                            var html = '', td = document.createElement('td')
                            switch (tableColumns[j]) {
                                case 'sex':
                                    html = list[i].sex == 0 ? '男' : '女'
                                    break
                                case 'birth':
                                    html = new Date().getFullYear() - list[i].birth
                                    break
                                case 'operate':
                                    html = '  <button class="edit" data-index=' + i + '>编辑</button> <button class="delete" data-index=' + i + '>删除</button>'
                                    break
                                default:
                                    html = list[i][tableColumns[j]]
                                    break
                            }
                            td.innerHTML = html
                            tr.appendChild(td)
                        }
                        tbody.appendChild(tr)
                    }
                    var prevPageBtn = document.getElementsByClassName('prev-page')[0]
                    var nextPageBtn = document.getElementsByClassName('next-page')[0]
                    if (activePage == 1) {
                        prevPageBtn.style.display = 'none'
                    } else {
                        prevPageBtn.style.display = 'inline-block'
                    }
                    console.log(activePage, pageSize, count);

                    if (activePage * pageSize >= count) {
                        nextPageBtn.style.display = 'none'
                    } else {
                        nextPageBtn.style.display = 'inline-block'
                    }
                }
            })
        },
        changeContent(id) {
            var dom = document.getElementById(id)
            setActive(dom, 'class')
            var id = dom.dataset.id
            var content = document.getElementById(id)
            setActive(content, 'style')
        },
        checkUserMsg(data) {
            for (var i in data) {
                if (data[i] === '') {
                    alert('请检查是否有未填项！')
                    return false
                }
            }
            if (!(/^\d{4,16}$/.test(data.sNo))) {
                alert('学号应为4-16位的数字')
                return false
            }
            if (data.birth > 2020 || data.birth < 1920) {
                alert('出生年格式不正确')
                return false
            }
            if (!(/^1\d{10}$/.test(data.phone))) {
                alert('手机号格式不正确')
                return false
            }
            return true
        },
        findFirstPage() {
            activePage = 1
            INDEX.findAllStudent()
        }
    }
}());

(function () {
    INDEX.findAllStudent()
    INDEX.init()
}())