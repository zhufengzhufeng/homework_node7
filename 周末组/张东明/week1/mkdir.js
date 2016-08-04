/**
 * Created by zhangdongming on 16-8-3.
 */
var fs=require('fs');
function mkdir(pathString) {
  if(pathString==="") return;
    var reg=/[a-zA-Z1-9_]+(\/|$)/g;
    var curPath="",nextPath="";
    var pathList=[];
    var tempPath="";
    pathString.replace(reg,function (value,index) {
        tempPath+=value;
        pathList.push(tempPath);
    });
    mkEachDir(pathList);
}
function mkEachDir(pathList) {
    if(pathList.length===0) return;
    fs.exists(pathList[0],function (existsFlag) {
        if(!existsFlag) fs.mkdir(pathList[0]);
        pathList.shift();
        mkEachDir(pathList);
    })
}
mkdir('a/b/c/d/e');