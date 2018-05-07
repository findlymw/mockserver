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

function delApi(id){
    $.messager.confirm('Confirm','Are you sure you want to delete record?',function(r){
        if (r){
            $.messager.alert('Info','Sorry, System dose not support delete api.');
        }
    });
}


function loadApiDataGrid(url){

    $('#apidg').datagrid({
        url:url,
        columns:[[
            {field:'groupIdString',title:'Group',align:'center'},
            {field:'apiName',title:'API Name',align:'center'},
            {field:'requestContentTypeString',title:'reqContentType',align:'center'},
            {field:'responseContentTypeString',title:'respContentType',align:'center'},
            {field:'apiName',title:'API Name',align:'center'},
            {field:'methodString',title:'Method',align:'center'},
            {field:'inputHeadFlagString',title:'Header',align:'center'},
            {field:'inputBodyFlagString',title:'Body',align:'center'},
            {field:'inputBodyTypeString',title:'BodyType'},
            {field:'urlString',title:'Path',align:'left',
                formatter: function(value,row,index){
                    return '<a target="_blank" title="'+value+'" href="/api'+value+'">visit</a>';
                }},
            {field:'isExpiredString',title:'isExpired',align:'center'},
            {field:'id',title:'Operation',align:'center',
                formatter: function(id,row,index){
                    var ops = '<a target="_blank" href="/viewapi/'+id+'.html">查看</a> | ';
                    ops += '<a target="_blank" href="/'+id+'">编辑</a> | ';
                    ops += '<a onclick="delApi('+id+')">删除</a>';
                    return ops;
                }
            }
        ]]
    });
    $('#apidg').datagrid({singleSelect:true});
}


$(document).ready(function(){
    $('#easyui-tree-id').on('click',function(){
        var tree = $('#easyui-tree-id');
        var selected = tree.tree('getSelected');
        console.log(JSON.stringify(selected));
        var url = '/restful/getApilist/'+selected.id;
        loadApiDataGrid(url);
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