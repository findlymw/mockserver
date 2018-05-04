$('#addApiGroupBtn').on('click',function(){
    $('#addApiGroupWin').window('open');
});
$('#addApiGroupForm').form({
    success:function(data){
        $.messager.alert('Info', data, 'info');
    }
});