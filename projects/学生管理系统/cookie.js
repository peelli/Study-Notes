function setCookie(name, value, time) {
    document.cookie = name + '=' + value + ';expires=' + new Date(Date.now() + time).toGMTString()
}

function getCookie(name) {
    var reg = new RegExp(name + "=([\\u4e00-\\u9fa5]*\\w*);?")
    var res = reg.exec(document.cookie) || []
    return res[1]
}

function removeCookie(name) {
    setCookie(name, '11', -1)
}