$('#addApiGroupBtn').on('click',function(){
    $('#addApiGroupWin').window('open');
});


$('#addApiGroupForm').form({
    url: '/restful/addapigroup',
    success:function(responseData){
        if(responseData){
            responseData = JSON.parse(responseData);
            if(responseData.success === true){
                $('#addApiGroupNameTip').html('<span style="color:green">Successful</span>');
                $('#easyui-tree-id').tree('reload');
            }else{
                $('#addApiGroupNameTip').html('<span style="color:red">Failed: '+responseData.desc+'</span>');
            }
        }else{
            //$.messager.alert('Info', data, 'info');
            $('#addApiGroupNameTip').html('<span style="color:red">Api Failed</span>');
        }
    }
    //*/
});


$(document).ready(function(){
    $('#easyui-tree-id').on('click',function(){
        var tree = $('#easyui-tree-id');
        var selected = tree.tree('getSelected');
        alert(selected.id);
    });

    $('#easyui-tree-id').on('dubbleclick',function(){
        var tree = $('#easyui-tree-id');
        var selected = tree.tree('getSelected');
        alert(selected.id + '---');
    });
    // $.ajax({
    //     type: 'POST',
    //     dataType : 'json',
    //     url: '/restful/apigroups',
    //     data: {},
    //     beforeSend: ajaxLoading,
    //     success: function(json){
    //        var tree = '';
    //        if(json){
    //            for(i=0;i<json.length;i++){
    //                tree += '<li><span>'+json[i].groupName+'</span></li>';
    //            }
    //            //$('.easyui-tree').html(tree);
    //        }
    //        ajaxLoadEnd();
    //     }
    // });
});