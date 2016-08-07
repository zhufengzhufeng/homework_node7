var sign = document.getElementById('sign');
var form = document.getElementById('form');
var tbody = document.getElementById('tbody');
var user = document.getElementsByClassName('user');
var modify = document.getElementById('modify');
var searInfo = document.getElementById('searInfo');
var search = document.getElementById('search');

function ajax(options) {
    var _defalut = {
        type: 'get',
        url: null,
        async: true,
        data: null,
        success: null
    };
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            _defalut[attr] = options[attr];
        }
    }
    if (_defalut.type == 'get') {
        _defalut.url += ((_defalut.url.indexOf('?') >= 0 ? '&_=' : '?_=') + Math.random());
    }
    var xhr = new XMLHttpRequest();
    xhr.open(_defalut.type, _defalut.url, _defalut.async);
    xhr.onload = function () {
        var users = xhr.responseText ? JSON.parse(xhr.responseText) : null;
        _defalut.success && _defalut.success(users);
    };
    xhr.send(_defalut.data);
}

var pageModule = (function () {
    function bindHtml(users) {
        var html = '';
        users.forEach(function (item, index) {
            html += '<tr class="user"> <td>' + item['id'] + '</td> <td>' + item['username'] + '</td> <td>' + item['password'] + '</td> <td> <button type="button" id="update" class="btn btn-primary" userId="' + item['id'] + '">修改</button> <button type="button" class="btn btn-danger" id="delete" userId="' + item['id'] + '">删除</button> </td> </tr>';
        });
        tbody.innerHTML = html;
    }

    function init() {
        ajax({
            url: '/allUsers',
            success: bindHtml
        })
    }

    return {
        init: init,
        bindHtml:bindHtml
    }
})();

pageModule.init();


function serializable(form) {
    var ary = [];
    var arrs = Array.prototype.slice.call(form.elements);
    arrs.forEach(function (item, index) {
        if (item.type == 'text') {
            ary.push(item.name + '=' + item.value);
        }
    });
    return ary.join('&');
}


document.addEventListener('click', function (ev) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.id === 'sign') {
        var formResult = serializable(form);
        ajax({
            type: 'post',
            url: '/sign',
            data: formResult,
            success: function (users) {
                pageModule.init();
            }
        })
    } else if (target.id === 'delete') {
        var userId = target.getAttribute('userId');
        ajax({
            url: '/delete?id=' + userId,
            success: function (data) {
                pageModule.init();
            }
        });
    } else if (target.id == 'update') {
        modify.style.display = 'block';
        var userId = target.getAttribute('userId');
        ajax({
            url: '/getInfo?id='+userId,
            success: function (user) {
                var input = modify.getElementsByTagName('input');
                var button = modify.getElementsByTagName('button')[0];
                input[0].value = user.username;
                input[1].value = user.password;
                button.setAttribute('userId', userId);
            }
        });
    }  else if (target.id == 'confirm') {
        var userId = target.getAttribute('userId');
        var input = modify.getElementsByTagName('input');
        var obj = {};
        obj.id = userId;
        obj.username = input[0].value;
        obj.password = input[1].value;
        if (obj.username!='' && obj.password != ''){
            ajax({
                type: 'post',
                url: '/update',
                data: JSON.stringify(obj),
                success: function (data) {
                    pageModule.init();
                    modify.style.display = 'none';
                }
            });
        }
    } else if (target.id == 'search' && target.innerHTML == 'Go!') {
        target.innerHTML = 'cancel';
        var info = searInfo.value;
        if (info){
            ajax({
                url: '/searchInfo?info='+info,
                success: function (users) {
                    pageModule.bindHtml(users);
                    if (users.length == 0){
                        alert('没有您要查找的用户');
                    }
                }
            });
        }
    } else if (target.id == 'search' && target.innerHTML == 'cancel') {
        target.innerHTML = 'Go!';
        pageModule.init();
    }
});
