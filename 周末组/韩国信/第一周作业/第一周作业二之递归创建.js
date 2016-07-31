var fs = require('fs');
var path = 'one/two/three';
var list = path.split('/');
var i = 0;//i的作用是判断是否已经完成需要创建的多级文件目录，如果完成，则停止迭代
function createFile() {
    var path = list.slice(0, i + 1).join('/');
    var callee = arguments.callee;
    fs.exists(path, function (isFlg) {
        //判断如果不存在此文件
        if (!isFlg) {
            fs.mkdir(path, function (err) {
                if (!err) {
                    console.log(path+'目录创建成功');
                } else
                    console.log(path+'目录创建失败')
                i++;
                if (i === list.length) {
                    return;
                }
                callee();
            })
        } else {
            console.log(path+'目录已经存在')
            i++;
            if (i === list.length) {
                return;
            }
            callee();

        }
    })
}

createFile();