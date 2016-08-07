var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var querystring = require('querystring');
var user = [];

var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathName = urlObj.pathname;
    var query = urlObj.query;
    var reg = /\.(HTML|CSS|JS|JSON)/i;
    console.log(pathName);
    if(reg.test(pathName)){
        if(pathName.indexOf('.map')>-1){
            return;
        }
        var suffix = reg.exec(pathName)[1].toUpperCase();
        var suffixMIME = 'text/plain';
        switch(suffix){
            case 'HTML':suffixMIME = 'text/html';break;
            case 'CSS':suffixMIME = 'text/css';break;
            case 'JS':suffixMIME = 'text/javascript';break;
            case 'JSON':suffixMIME = 'application/json';break;
        }
        var content = fs.readFileSync('.'+pathName,'utf-8');
        res.writeHead(200,'content-type:'+suffixMIME+';charset=utf-8');
        res.end(content);
    }
    /*if(pathName=='/index.html'){
        res.setHeader('content-type','text/html;charset=utf8');
        res.statusCode = 200;
        fs.createReadStream('./index.html').pipe(res);
    }else */
    if(pathName=='/add'){
        console.log('add');
        var msg = '';
        req.on('data',function(data){
            msg+=data;
        });
        req.on('end',function(){
            user.push(querystring.parse(msg));
            res.end(JSON.stringify(user));
        })
    }else if(pathName=='/delete'){
        console.log('delete');
        var result = query['arr'].split(',');
        result.forEach(function(item){
            user.forEach(function(u,index){
                if(u.username==item){
                   user.splice(index,1);
                }
            })
        });
        req.on('data',function(data){});
        req.on('end',function(){
            res.setHeader('content-type','application/json;charset=utf8');
            res.end(JSON.stringify({isCode:0,data:user}));
        });
    }else if(pathName=='/update'){
        console.log('update');
        var newVal = '';
        req.on('data',function(data){
            console.log(data.toString());
            newVal+=data.toString();
        });
        req.on('end',function(){
            var obj = querystring.parse(newVal);
            user.forEach(function(item,index){
                if(item.username==obj['oldVal']){
                    item.username = obj['newVal'];
                }
            });
            res.end(JSON.stringify({isCode:0,data:user}));
        })
    }else if(pathName=='/select'){
        console.log('select');
        var message = [];
        req.on('data',function(data){});
        req.on('end',function(){
            var ary = query['arr'];
            user.forEach(function(u,index){
                if(u.username.indexOf(ary)>-1){
                    message.push(u);
                }
            });
            if(ary==''||ary==undefined||ary==null){
                message = user;
            }
            if(message==[]){
                message.push({username:'未找到任何信息！',userpwd:''});
            }
            res.setHeader('content-type','application/json;charset=utf8');
            res.end(JSON.stringify({
                isCode:0,
                data:message}));
        });
    }/*else{
        var flag = fs.existsSync('.'+pathName);
        if(flag){
            res.setHeader('content-type',mime.lookup(pathName)+'charset=utf8');
            fs.createReadStream('.'+pathName).pipe(res);
        }else{
            res.statusCode=404;
            res.end('not found');
        }
    }*/
});
server.listen(80,function(){
    console.log('80 service success')
});
