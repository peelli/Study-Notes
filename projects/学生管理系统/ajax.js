// function ajax(method, url, data, callback, isAsync) {
//     var xhr = null,
//         params = '';
//     for (var i in data) {
//         params += params == '' ? `${i}=${data[i]}` : `&${i}=${data[i]}`;
//     }
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else {
//         xhr = new ActiveXObject('Microsoft.XMLHTTP');
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 callback(JSON.parse(xhr.responseText));
//             }
//         }
//     };

//     if (method == 'get') {
//         xhr.open(method, url + '?' + params, isAsync);
//         xhr.send();
//     } else if (method == 'post') {
//         xhr.open(method, url, isAsync);
//         xhr.setRequestHeader(
//             'Content-Type',
//             'application/x-www-form-urlencoded'
//         );
//         xhr.send(params);
//     }
// }

var _ajax = (function () {
    var xhr = null,
        params = '',
        isAsync = true,
        appkey = 'peelli_1590497233904';
    function initParams(data) {
        params = 'appkey=' + appkey;
        for (var i in data) {
            params += `&${i}=${data[i]}`;
        }
    }

    function initXhr(callback) {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };
    }
    return {
        get: function (url, data, callback) {
            initParams(data);
            initXhr(callback);
            xhr.open('get', url + '?' + params, isAsync);
            xhr.send();
        },
        post: function (url, data, callback) {
            initParams(data);
            initXhr(callback);
            xhr.open('post', url, isAsync);
            xhr.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            );
            xhr.send(params);
        }
    };
})();
