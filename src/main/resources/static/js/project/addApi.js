var columnTypes = new Object();
var apiGroups = new Object();
var methods = new Object();
var units = new Object();
var contentTypes = new Object();
var inputTypes = new Object();


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
            '  <b>类型: </b><span id="headersParamType'+randomId+'"></span><b>是否必填: </b><span><select id="headerKeyMust"'+randomId+'><option value="1">是</option><option value="0">否</option></select></span>'+
            '<b>值：</b><span><input class="paramValueInput" type="text" /></span><b>单位：</b><span id="paramUnitSelect'+randomId+'"></span>'+
            '<b>规格：</b><span><input type="text" placeholder="比如边界规格要求" /></span>'+
            '<b>说明：</b><span><input type="text" placeholder="参数说明" /></span>'+
            '</p>');
        $('#headersParamType'+randomId).html(getSelect('columnType'+randomId,columnTypes.options));
        $('#paramUnitSelect'+randomId).html(getSelect('unitType'+randomId,units.options));
        headerParamsCount += 1
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
            '  <b>类型: </b><span id="bodyParamType'+randomId+'"></span><b>是否必填: </b><span><select id="bodyKeyMust"'+randomId+'><option>是</option><option>否</option></select></span>'+
            '<b>值：</b><span><input class="paramValueInput" type="text" /></span><b>单位：</b><span id="paramUnitSelect'+randomId+'"></span>'+
            '<b>规格：</b><span><input type="text" placeholder="比如边界规格要求" /></span>'+
            '<b>说明：</b><span><input type="text" placeholder="参数说明" /></span>'+
            '</p>');
        $('#bodyParamType'+randomId).html(getSelect('bodyColumnType'+randomId,columnTypes.options));
        $('#paramUnitSelect'+randomId).html(getSelect('unitType'+randomId,units.options));
        bodyParamsCount += 1
        console.log('bodyParamsCount : ' + bodyParamsCount);
    }else{
        $.messager.alert('Warning','Body的参数最多能够添加到'+maxBodyParamsCount+'个。');
    }
}

$(document).ready(function(){





    $.ajax({
            type: 'GET',
            dataType : 'json',
            url: '/restful/dic',
            data: {},
            beforeSend: ajaxLoading,
            success: function(json) {
                //console.log(JSON.stringify(json));
                if (json) {
                    //构建api分组
                    if (json.apiGroups && json.apiGroups.length > 0) {
                        var _options = '';
                        for (var i = 0; i < json.apiGroups.length; i++) {
                            var apiGroup = json.apiGroups[i];
                            _options += '<option value="' + apiGroup.id + '">' + apiGroup.groupName + '</option>';

                        }
                        apiGroups.options = _options;
                    }
                    //构建字段类型
                    if (json.columTypes && json.columTypes.length > 0) {
                        var _options = '';
                        for (var i = 0; i < json.columTypes.length; i++) {
                            var columnType = json.columTypes[i];
                            _options += '<option value="' + columnType.id + '">' + columnType.columType + '</option>';

                        }
                        columnTypes.options = _options;
                    }
                    //构建提交方法
                    if (json.methods && json.methods.length > 0) {
                        var _options = '';
                        for (var i = 0; i < json.methods.length; i++) {
                            var method = json.methods[i];
                            _options += '<option value="' + method.id + '">' + method.methodName + '</option>';

                        }
                        methods.options = _options;
                    }
                    //构建单位
                    if (json.units && json.units.length > 0) {

                        var _options = '';
                        for (var i = 0; i < json.units.length; i++) {
                            var unit = json.units[i];
                            _options += '<option value="' + unit.id + '">' + unit.unitName + '</option>';

                        }
                        units.options = _options;
                    }
                    //构建contentType
                    if (json.contentTypes && json.contentTypes.length > 0) {

                        var _options = '';
                        for (var i = 0; i < json.contentTypes.length; i++) {
                            var contentType = json.contentTypes[i];
                            _options += '<option value="' + contentType.id + '">' + contentType.contentType + '</option>';

                        }
                        contentTypes.options = _options;
                    }
                    //构建inputType
                    if (json.inputTypes && json.inputTypes.length > 0) {

                        var _options = '';
                        for (var i = 0; i < json.inputTypes.length; i++) {
                            var inputType = json.inputTypes[i];
                            _options += '<option value="' + inputType.id + '">' + inputType.inputTypeName + '</option>';

                        }
                        inputTypes.options = _options;
                    }



                    $('#apiGroupSelect').html(getSelect('apiGroup',apiGroups.options));
                    $('#reqMethodSelect').html(getSelect('method',methods.options));

                    $('#reqContentTypeSelect').html(getSelect('reqContentType',contentTypes.options));
                    $('#respContentTypeSelect').html(getSelect('respContentType',contentTypes.options));

                    ajaxLoadEnd();
                }else {
                    $.messager.alert('Warning', '加载字典数据失败，请刷新页面重试', 'warning');
                }
            }
        });



    $("input[name='headersFlag']").on('click',function(){
        var headers = $("input[name='headersFlag']:checked").val();
        if(headers && headers == 0){
            console.log('select headers : no');
            $('#headersParams').hide();
            $('#addHeadersParamBtn').hide();
        }else if(headers == 1){
            console.log('select headers : yes');
            $('#addHeadersParamBtn').show();
            var headersParamsContent = $('#headersParams');
            if(headersParamsContent && headersParamsContent.html().length <= 0){
                addHeaderParam();
            }

            $('#headersParams').show();

        }
    });

    $("input[name='bodyFlag']").on('click',function(){
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
    });







    // create the editor
    var container = document.getElementById("jsoneditorSuccess");
    var options = {
        //mode: 'view', //只读
        mode: 'code',
        modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
        onError: function (err) {
            alert(err.toString());
        },
        onModeChange: function (newMode, oldMode) {
            console.log('Mode switched from', oldMode, 'to', newMode);
        }
    };
    editorSuccess = new JSONEditor(container, options);

    // set json
    var json = {

    };
    editorSuccess.set(json);

    // get json
    //var json = editor.get();




    var containerFail = document.getElementById("jsoneditorFail");
    editorFail = new JSONEditor(containerFail, options);
    editorFail.set({});

    var containerRaw = document.getElementById("jsoneditorRaw");
    editorRaw = new JSONEditor(containerRaw, options);
    editorRaw.set({});

    simplemdeInput = new SimpleMDE({ element: document.getElementById("inputParamDesc") });
    simplemdeOutput = new SimpleMDE({ element: document.getElementById("outPutDesc") });
    simplemdeOutputFail = new SimpleMDE({ element: document.getElementById("outPutFailDesc") });

});