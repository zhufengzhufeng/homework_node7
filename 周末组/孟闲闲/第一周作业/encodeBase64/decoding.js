function Decoding(obj){
    var str= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    str+= "abcdefghijklmnopqrstuvwxyz";
    str+="0123456789";
    str+="+/";
    var numArray=[], getString ='',newArray=[],start=0,lastArray=[] ;
    for(var i=0;i<obj.length;i++){
        numArray.push(str.indexOf(obj[i])) ; // 找到字母在str中的位置
    }
    numArray.forEach(function (item) {
        var part = (item).toString(2); // 将10进制变为2进制
        var partL = part.length;
        if(partL != 8){  // 2进制不足6位数 补充0
            for(var i=0;i<(6-partL);i++){
                part = "0"+part;
            }
        }
        getString += part; // 得到所有二进制字符串
    })
    for(var i=0;i<getString.length/8;i++){
        newArray.push(getString.substr(start,8));
        start += 8;
    }
    newArray.forEach(function (item) {
        lastArray.push( parseInt(item,2) ); // 转换为10进制 放到Buffer中
    })
    var buffer = new Buffer(lastArray);

    return buffer.toString();
}

module.exports = Decoding;