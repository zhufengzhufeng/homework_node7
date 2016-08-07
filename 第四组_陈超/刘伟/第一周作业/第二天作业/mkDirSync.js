function mkDirSync(path){
    var newPath = path.split('/');
    for (var i=0; i<newPath.length; i++){
        (function (i) {
            var curPath = newPath.slice(0, i+1).join('/');
            fs.exists(curPath, function (exists) {
                if (!exists){
                    fs.mkdir(curPath,0777,function (err) {
                        if (err){
                            return;
                        }else{
                            console.log('creat success');
                        }
                    })
                }
            })
        })(i);
    }
}