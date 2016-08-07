function serializable($myForm){
    var arr = [];
    var arrs = Array.prototype.slice.call($myForm.children().children('input'));
    arrs.forEach(function(item){
        if(item.type=='text'||item.type=='password'){
            arr.push(item.name+'='+item.value);
        }
    });
    return arr.join('&');
}
function getChecked(){
    var arr = [];
    $("#userList li input[type=checkbox]").each(function(){
        if(this.checked){
            //alert($(this).val());
            arr.push($(this).val());
        }
    });
    if(arr.length>0){return arr}else{return null};
}
function updateInput(){
    $("#userList li input[type=checkbox]").each(function(){
        if(this.checked){
            $(this).parent().next().remove();
            $(this).parent().after('<input type="text" class="form-control" name="newName" value="'+$(this).val()+'"><input type="button" value="提交修改" class="btn btn-primary" onclick="updateSub()"/>');
        }
    });
}
function bindHtml(jsonData){
    var total = jsonData.isCode;
    console.log(total);
    if(total==1){
        alert('操作失败！');
        return;
    }
    var data = jsonData.data;
    var str = '';
    data.forEach(function(item){
        str +='<li class="list-group-item"><label><input type="checkbox" name="checkbox" value="'+item.username+'"></label><span>'+item.username+'</span></li>';
    });
    $('#userList').html(str);
}
$('#add').click(function(){
    $.ajax({
        type:'post',
        url:'/add',
        async:true,
        timeout:6000,
        dataType:'json',
        data:serializable($('#signForm')),
        success:function(jsonData){
            var str = '';
            jsonData.forEach(function(item){
                str +='<li class="list-group-item"><label><input type="checkbox" name="checkbox" value="'+item.username+'"></label><span>'+item.username+'</span></li>';
            });
            $('#userList').html(str);
        },
        error:function(err){
            console.log(err);
        }
    });
});
$('#delete').click(function(){
    var arr = getChecked();
    if(arr==null){
        alert('您没有选中任何信息！');
        return;
    }
    $.ajax({
        type:'get',
        url:'/delete?arr='+arr,
        async:true,
        timeout:6000,
        success:function(jsonData){
            bindHtml(jsonData);
        },
        error:function(err){
            console.log(err);
        }
    });
});
$('#update').click(function(){
    console.log(3);
    updateInput();
});
function updateSub(){
    var obj = 'oldVal='+getChecked()[0]+'&newVal='+$("#userList li input[name='newName']").val();
    console.log(obj);
    $.ajax({
        type:'post',
        url:'/update',
        async:true,
        timeout:6000,
        dataType:'json',
        data:obj,
        success:function(jsonData){
            bindHtml(jsonData);
        },
        error:function(err){
            console.log(err);
        }
    });
};
$('#select').click(function(){
    console.log(4);
    selecter();
});
function selecter(){
    $.ajax({
        type:'get',
        url:'/select?arr='+$('#searchUser').val(),
        async:true,
        timeout:6000,
        success:function(jsonData){
            bindHtml(jsonData);
        },
        error:function(err){
            console.log(err);
        }
    });
}



