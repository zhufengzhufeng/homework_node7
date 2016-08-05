var fs = require('fs');
mkdir('./a/b/v/b/n/m');
function mkdir(obj){
    var partPath = [], dirPath='';
    obj.split('/').forEach(function (item) {
        partPath.push(item);
        dirPath = partPath.join('/');
        (function (dirPath) {
            fs.exists(dirPath, function (exists) {
                if(!exists){
                    fs.mkdir(dirPath, function (err) {
                        if(!err){
                            console.log(dirPath+'done!');
                            mkdir(obj);
                        }
                    })
                }
            })
        })(dirPath)
    })

}
