(function () {
    var addBtn = document.querySelector('#add-student button.submit')
    var form = document.querySelector('#add-student form')
    addBtn.onclick = function () {
        var username = form.username.value
        var sex = form.sex.value
        var email = form.email.value
        var code = form.code.value
        var birth = form.birthdayYear.value
        var phone = form.phone.value
        var address = form.address.value
        var data = {
            sNo: code,
            name: username,
            sex: sex,
            birth: birth,
            phone: phone,
            address: address,
            email: email
        }
        if (!INDEX.checkUserMsg(data)) return
        _ajax.get(baseUrl + '/api/student/addStudent', data, function (res) {
            alert('学生添加成功！')
            if (res.status == 'success') {
                INDEX.changeContent('nav-list')
                INDEX.findFirstPage()
            } else {
                alert(res.msg)
            }
        })
        console.log(username, sex, email, code, birth, phone, address)
    }
}())