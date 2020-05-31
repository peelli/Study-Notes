window.onload = function () {
    initAccount()
    findAllStudent()
    initNav()
}

function initAccount() {
    var account = getCookie('account')
    if (!account) {
        location.href = './login.html'
    }
    var username = document.getElementsByClassName('user-name')[0]
    username.innerText = account
}

function findAllStudent() {
    var tableColumns = ['sNO', 'name', 'sex', 'email', 'birth', 'phone', 'address', 'operate']
    _ajax.get('http://open.duyiedu.com/api/student/findAll', {
        appkey: 'peelli_1590497233904',
    }, function (res) {
        if (res.status == 'success') {
            var list = res.data
            for (var i = 0; i < list.length; i++) {
                var tr = document.createElement('tr')
                for (var j = 0; j < tableColumns.length; j++) {
                    var html = '', td = document.createElement('td')
                    switch (tableColumns[j]) {
                        case 'sex':
                            html = list[i].sex == 1 ? '男' : '女'
                            break
                        case 'birth':
                            html = parseInt(new Date().getFullYear) - parseInt(list[i].birth)
                            break
                        case 'operate':
                            html = '  <button class="edit">编辑</button> <button class="delete">删除</button>'
                            break
                        default:
                            html = list[i][tableColumns[j]]
                            break
                    }
                    td.innerHTML = html
                    tr.appendChild(td)
                }
                var tbody = document.querySelector("#student-list table tbody")
                tbody.remove()
                tbody.appendChild(tr)
            }
        }
    })
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
/**
 *
 *
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