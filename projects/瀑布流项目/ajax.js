function ajax(option) {
    var xhr = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP')
    var index = option.url.indexOf('?')
    for (var prop in option.data) {
        if (option.data.hasOwnProperty(prop)) {
            if (index) {
                params += `&${prop}=${option.data[prop]}`
            } else {
                params += params.indexOf('?') ? `&${prop}=${option.data[prop]}` : `?${prop}=${option.data[prop]}`
            }
        }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                option.success(JSON.parse(xhr.responseText))
            }
        }
    }
    if (option.type.toLowerCase() == 'get') {
        xhr.open('get', option.url + params, isSync)
        xhr.send()
    } else {
        xhr.open('post', option.url, isSync)
        xhr.setHeader('Content-Type', 'application/x-www-form-data')
        xhr.send(params)
    }
}