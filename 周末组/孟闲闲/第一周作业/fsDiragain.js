var fs = require('fs');

mkdiring('./a/m');
function mkdiring(obj) {
    var path=curPath='';
    var objlist = obj.split('/');
    objlist.forEach(function (item) {
        path += '/'+item;
        (function (curPath) {
            create(curPath);
        })(path.slice(1))
    })

}

function create(path){
    fs.exists(path,function (exists) {
        if(exists){
            console.info(path+' has exists ')
        }else{
            fs.mkdir(path, function (err) {
                if(!err) console.info(path + ' has done!');
            })
        }
    })
}




