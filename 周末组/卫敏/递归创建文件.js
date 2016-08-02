/**
 * Created by MWei2 on 8/2/2016.
 */
var fs=require('fs');

var mkDirect = function(path){
    var pathAry=path.split('/');
    for (var i=0;i<pathAry.length;i++){
        var curPath=pathAry.slice(0,i+1).join('/');
        (function(curPath){
            fs.exists(curPath,function(exists){
                if(!exists) {
                    fs.mkdir(curPath,function(){
                        console.log(curPath+' is created');
                    })
                }
            })
        })(curPath);
    }
};

mkDirect('a/b/c');