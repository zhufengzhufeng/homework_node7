
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
                    console.log(path+'Ŀ¼�����ɹ�');
                } else
                    console.log(path+'Ŀ¼����ʧ��');
                i++;
                if (i === list.length) {
                    return;
                }
                callee();
            })
        } else {
            console.log(path+'Ŀ¼�Ѿ�����');
            i++;
            if (i === list.length) {
                return;
            }
            callee();

        }
    })
}

createFile();