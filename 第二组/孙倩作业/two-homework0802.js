var fs=require('fs');

var newPath='';
function mkPath(path){
    var ary=path.split('/');
    newPath+=ary.shift()+'/';
    console.log(path,newPath,fs.existsSync(newPath));

    fs.exists(newPath,function(err){
       if(!err){
           fs.mkdir(newPath);
       }
        if(ary.length>0){
            mkPath(ary.join('/'));
        }
    });

}
mkPath('a/b/c/d');