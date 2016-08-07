var http = require('http');
var mime = require('mime');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var users = [];
http.createServer(function (request, response) {
    var pathname = url.parse(request.url, true).pathname;
    var query = url.parse(request.url, true).query;


    function deleteUser(allUsers, userId) {
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id == userId) {
                allUsers.splice(i, 1);
                return;
            }
        }
    }
    function updateUser(allUsers, user) {
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id == user.id) {
                allUsers[i] = user;
                return;
            }
        }
    }
    function searchUser(allUsers, info) {
        var userInfo = [];
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username.indexOf(info) >= 0) {
                userInfo.push(allUsers[i]);
           }
        }
        return userInfo;
    }
    function findUser(allUsers, userId) {
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id == userId) {
                return allUsers[i]
            }
        }
    }

    if (pathname == '/') {
        response.setHeader('content-type', "text/html;charset=utf-8");
        response.statusCode = 200;
        fs.createReadStream('../client/index.html').pipe(response);
    } else if (pathname == '/allUsers') {
        users = fs.readFile('../client/usersInfo.json', function (err, data) {
            if (!err) {
                users = JSON.parse(data.toString());
                response.end(data.toString());

            } else {
                console.log(err);
            }

        });
    } else if (pathname == '/sign') {
        var result = '';
        request.on('data', function (data) {
            result += data;
        });
        request.on('end', function () {
            var user = querystring.parse(result);
            user.id = users[users.length-1].id + 1;
            users.push(user);
            fs.writeFile('../client/usersInfo.json', JSON.stringify(users), 'utf8', function (err) {
                response.end(JSON.stringify(users));
            });

        });
    } else if (pathname == '/delete') {
        var userId = query.id;
        deleteUser(users, userId);
        fs.writeFile('../client/usersInfo.json', JSON.stringify(users), 'utf8', function () {
            response.end();
        });

    } else if (pathname == '/getInfo') {
        var userId = query.id;
        var user = findUser(users, userId);
        response.end(JSON.stringify(user));
    } else if (pathname == '/update') {
        var result = '';
        request.on('data', function (data) {
            result += data;
        });
        request.on('end', function () {
            updateUser(users, JSON.parse(result));
            fs.writeFile('../client/usersInfo.json', JSON.stringify(users), 'utf8', function (err) {
                response.end();
            });

        });
    } else if (pathname == '/searchInfo') {
        var info = query.info;
        var userInfo = searchUser(users, info);
        response.end(JSON.stringify(userInfo));
    } else {
        if (fs.existsSync('../client' + pathname)) {
            response.setHeader('content-type', mime.lookup(pathname) + ";charset=utf-8");
            response.statusCode = 200;
            fs.createReadStream('../client' + pathname).pipe(response);
        } else {
            response.statusCode = 404;
            response.end();
        }
    }

}).listen(8080);