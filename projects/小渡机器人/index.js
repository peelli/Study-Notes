function initInput() {
    var input = document.getElementsByClassName('input-text')[0]
    var btn = document.getElementsByClassName('send')[0]
    btn.onclick = function () {
        var value = input.value
        if (value == '') return
        fillMsg(value, 'mine')
        getRobotMsg(value)
        input.value = ''
    }
    input.onkeyup = function (e) {
        if (e.keyCode == 13) {
            btn.click()
        }
    }
}

function getRobotMsg(value) {
    _ajax.get('http://124.70.160.98:3000/chat', { text: value }, function (res) {
        fillMsg(res.text, 'robot')
    })
}


function fillMsg(value, type) {
    var html = `<div class="${type}">
    <img src="./image/${type == 'mine' ? 'mine.jpg' : 'robot.jpg'}" alt="" class="avatar">
    <p class="text">
        ${value}
    </p>
    </div>`
    document.getElementsByClassName('content')[0].innerHTML += html
}

initInput()