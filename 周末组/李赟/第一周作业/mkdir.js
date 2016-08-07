
var fs = require('fs');
var path = 'fir/sec/third';
var list = path.split('/');
var i = 0;
function createFile() {
    var path = list.slice(0, i + 1).join('/');
    var callee = arguments.callee;
    fs.exists(path, function (isFlag) {
        if (!isFlag) {
            fs.mkdir(path, function (err) {
                if (!err) {
                    console.log(path+'目录创建成功');
                } else
                    console.log(path+'目录创建失败');
                i++;
                if (i === list.length) {
                    return;
                }
                callee();
            })
        } else {
            console.log(path+'目录已经存在');
            i++;
            if (i === list.length) {
                return;
            }
            callee();

        }
    })
}

createFile();