var fs = require('fs');
var path = require('path');

function mkdir(src) {
    var sep = path.sep;
    var folders = src.split(sep);
    var len = folders.length;
    (function create(num) {
        var curPath = folders.slice(0, num).join(sep);
        fs.exists(curPath, function (exists) {
            if (!exists) {
                fs.mkdir(curPath, function (err, data) {
                    if (!err) {
                        console.log(curPath + ' is created');
                        if (num < len) {
                            create(num + 1);
                        }
                    }
                });
            } else {
                console.log('Already has ' + curPath);
                if (num < len) {
                    create(num + 1);
                }
            }
        });
    })(1);
}

mkdir('a/b/c/d');
