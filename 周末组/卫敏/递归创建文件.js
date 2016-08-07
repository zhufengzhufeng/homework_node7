/**
 * Created by MWei2 on 8/2/2016.
 */
var fs=require('fs');

// var mkDirect = function(path){
//     var pathAry=path.split('/');
//     for (var i=0;i<pathAry.length;i++){
//         var curPath=pathAry.slice(0,i+1).join('/');
//         (function(curPath){
//             fs.exists(curPath,function(exists){
//                 if(!exists) {
//                     fs.mkdir(curPath,function(){
//                         console.log(curPath+' is created');
//                     })
//                 }
//             })
//         })(curPath);
//     }
// };
mkDirect('a/b/c');

function mkDirect(dirPath){
    var pathAry=dirPath.split('/');
    var path=[];
    for (var i=0;i<pathAry.length;i++){
        var temp=pathAry.slice(0,i+1).join('/');
        path.splice(path.length,0,temp);
    }
    mkSingleDir(path);
}
function mkSingleDir(curPath){
    fs.mkdir(curPath[0],function(){
      fs.exists(curPath[0],function(isExist){
         if (isExist) {
             curPath.shift();
             if (curPath.length==0) return;
             mkSingleDir(curPath);
         }
          else{
             mkSingleDir(curPath);
         }

      })
    })
}