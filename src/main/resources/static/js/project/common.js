function ajaxLoading(){
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
}
function ajaxLoadEnd(){
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}


function getBackViewSelectOptions(val,options){
    var optionsString = '';
    for(var i=0;i<options.length;i++){
        if(val == options[i].val){
            optionsString += '<option selected="selected" value="'+options[i].val+'">'+options[i].text+'</option>';
        }else{
            optionsString += '<option value="'+options[i].val+'">'+options[i].text+'</option>';
        }
    }
    return optionsString;
}
function getSelect(name,options){
    var select = '<select name="'+name+'">';
    select += options;
    select += '</select>';
    return select;
}

function getInputTypeSelect(name,options){
    var select = '<select onchange="inputTypeChange(this);" name="'+name+'">';
    select += options;
    select += '</select>';
    return select;
}

function selectBackView(obj,id){
    console.log(obj + id);
    obj.find('select').find('option[value='+id+']').attr('selected','selected');
}
function redioBackView(_name,id){
    $("input[type=radio][name="+_name+"]").each(function() {
        if ($(this).val() == id) {
            $(this).attr("checked", "checked");
        }
    });
}

var editorSuccess;
var editorFail;
var editorRaw;

var simplemdeInput;
var simplemdeOutput;
var simplemdeOutputFail;

function inputTypeChange(obj){
    var select = $(obj);
    var val = select.val();
    $('#bodyRawParams').hide();
    if(val == 1 || val == 3){
        $('#bodyRawParams').hide();

        $('#bodyParams').show()
        $('#addBodyParamBtn').show();

    }else if(val == 2){
        $('#bodyParams').hide();
        $('#addBodyParamBtn').hide();
        $('#bodyRawParams').show();
    }
    console.log('input select : ' + val);
}




function addInputParam(who){
    var str = '<div>' +
        '<b>Params Type of Input:</b>\n' +
        '<span id="inputTypeSelect"></span>\n' +
        '</div>';
    $(who).html(str);
    $('#inputTypeSelect').html(getInputTypeSelect('inputTypeSelect',inputTypes.options));
}

var headerParamsCount = 0;
var maxHeaderParamsCount = 20;
var bodyParamsCount = 0;
var maxBodyParamsCount = 20;

function delHeaderParam(obj){
    $(obj).parent().remove();
    headerParamsCount -= 1;
}
function delBodyParam(obj){
    $(obj).parent().remove();
    bodyParamsCount -= 1;
}
function addHeaderParam(){
    if(headerParamsCount<maxHeaderParamsCount){
        var randomId = ~~(Math.random()*100000);
        $('#headersParams').append('<p class="headerParamsP"><span onclick="delHeaderParam(this);" title="删除" style="cursor:pointer;margin-right:20px;color: red;"> X </span><b>Key: </b>'+
            '<span><input id="headerKey'+randomId+'" type="text" maxlength="50"/></span>' +
            '  <b>类型: </b><span id="headersParamType'+randomId+'"></span><b>是否必填: </b><span><select id="headerKeyMust'+randomId+'"><option value="1">是</option><option value="0">否</option></select></span>'+
            '<b>值：</b><span><input class="paramValueInput" type="text" /></span><b>单位：</b><span id="paramUnitSelect'+randomId+'"></span>'+
            '<b>规格：</b><span><input type="text" placeholder="比如边界规格要求" /></span>'+
            '<b>说明：</b><span><input type="text" placeholder="参数说明" /></span>'+
            '<input type="hidden" value="0" />'+
            '</p>');
        $('#headersParamType'+randomId).html(getSelect('columnType'+randomId,columnTypes.options));
        $('#paramUnitSelect'+randomId).html(getSelect('unitType'+randomId,units.options));
        headerParamsCount += 1;
        console.log('headerParamsCount : ' + headerParamsCount);
    }else{
        $.messager.alert('Warning','Header的参数最多能够添加到'+maxHeaderParamsCount+'个。');
    }
}

function addBodyParam(){
    if(bodyParamsCount<maxBodyParamsCount){
        var randomId = ~~(Math.random()*100000);
        $('#bodyParams').append('<p class="bodyParamsP"><span onclick="delBodyParam(this);" title="删除" style="cursor:pointer;margin-right:20px;color: red;"> X </span><b>Key: </b>'+
            '<span><input id="bodyKey'+randomId+'" type="text" maxlength="50"/></span>' +
            '  <b>类型: </b><span id="bodyParamType'+randomId+'"></span><b>是否必填: </b><span><select id="bodyKeyMust'+randomId+'"><option value="1">是</option><option value="0">否</option></select></span>'+
            '<b>值：</b><span><input class="paramValueInput" type="text" /></span><b>单位：</b><span id="paramUnitSelect'+randomId+'"></span>'+
            '<b>规格：</b><span><input type="text" placeholder="比如边界规格要求" /></span>'+
            '<b>说明：</b><span><input type="text" placeholder="参数说明" /></span>'+
            '<input type="hidden" value="0" />'+
            '</p>');
        $('#bodyParamType'+randomId).html(getSelect('bodyColumnType'+randomId,columnTypes.options));
        $('#paramUnitSelect'+randomId).html(getSelect('unitType'+randomId,units.options));
        bodyParamsCount += 1
        console.log('bodyParamsCount : ' + bodyParamsCount);
    }else{
        $.messager.alert('Warning','Body的参数最多能够添加到'+maxBodyParamsCount+'个。');
    }
}

function headFlagClick(){
    var headers = $("input[name='headersFlag']:checked").val();
    if(headers && headers == 0){
        console.log('select headers : no');
        $('#headersParams').hide();
        $('#addHeadersParamBtn').hide();
    }else if(headers == 1){
        console.log('select headers : yes');
        $('#addHeadersParamBtn').show();
        /*var headersParamsContent = $('#headersParams');
        if(headersParamsContent && headersParamsContent.html().length <= 0){
            addHeaderParam();
        }*/

        $('#headersParams').show();

    }
}
function bodyFlagClick(){
    var body = $("input[name='bodyFlag']:checked").val();
    if(body && body == 0){
        console.log('select body : no');
        $('#bodyParamsType').hide();
        $('#bodyParams').hide();
        $('#addBodyParamBtn').hide();
        $('#bodyRawParams').hide();
    }else if(body == 1){
        console.log('select body : yes');
        addInputParam('#bodyParamsType');
        $('#bodyParamsType').show();

        //隐藏raw的编辑器
        $('#bodyRawParams').hide();
        //显示添加按钮和添加区域
        $('#bodyParams').show()
        $('#addBodyParamBtn').show();
    }
}

$("input[name='headersFlag']").on('click',function(){
    headFlagClick();
});

$("input[name='bodyFlag']").on('click',function(){
    bodyFlagClick();
});