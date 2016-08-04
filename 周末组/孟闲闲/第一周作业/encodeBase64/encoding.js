function Encoding(obj){
    var buffer = new Buffer(obj);
    var bufArray=[], bufArrayPart=[] ,start=0, bufString='',str='',encode='' ;
    buffer.forEach(function (item) {
        bufArray.push(item.toString(2)); // 转换成2进制
    })
    bufArray.forEach(function (item) {
        bufString+=item;
    })
    for(var i=0;i<bufString.length/6;i++){ // 分为6位一个 前面加上两个0
        bufArrayPart.push('00'+bufString.substr(start,6));
        start+=6;
    }

    str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    str+= "abcdefghijklmnopqrstuvwxyz";
    str+="0123456789";
    str+="+/";
    bufArrayPart.forEach(function (item) {
        encode += str[parseInt(item,2)];
    })
    return encode.toString();

}

module.exports = Encoding;