var exeType = 'add';
var columnTypes = new Object();
var apiGroups = new Object();
var methods = new Object();
var units = new Object();
var contentTypes = new Object();
var inputTypes = new Object();

var dic = {};



function loadApi(){
    var apiId = $('#apiJson').val();
    if(apiId){
        $.ajax({
            type: 'POST',
            dataType : 'json',
            cache:false,
            async:false,
            contentType: "application/json; charset=utf-8",
            url: '/restful/getapi/'+apiId,
            data: {},
            success: function(json) {
                exeType = 'modify';
                if (json) {
                    apiId = json.id;
                    //console.log(JSON.stringify(json));
                    //set panel-title
                    $('.panel-title').html(' 当前编辑的API: ' + json.apiName);
                    $('#apiNameInput').val(json.apiName);
                    $('#Restful').val(json.urlString);
                    $('#preApiInput').val(json.preAPI);
                    $('#version').val(json.versionNo);
                    $('#dbNameTable').val(json.dbNameAndTableName);
                    selectBackView($('#apiGroupSelect'),json.groupId);
                    selectBackView($('#reqMethodSelect'),json.method);
                    selectBackView($('#reqContentTypeSelect'),json.requestContentType);
                    selectBackView($('#respContentTypeSelect'),json.responseContentType);
                    selectBackView($('#isExpired'),json.isExpired);
                    if(json.inputHeadFlag == 1){
                        redioBackView('headersFlag',json.inputHeadFlag);
                        headFlagClick();
                        var options = [];
                        if(dic.columTypes){
                            for(var i=0;i<dic.columTypes.length;i++){
                                var option = {};
                                option.val = dic.columTypes[i].id;
                                option.text = dic.columTypes[i].columType;
                                options.push(option);
                            }
                        }

                        var unitOptions = [];
                        if(dic.units){
                            for(var i=0;i<dic.units.length;i++){
                                var option = {};
                                option.val = dic.units[i].id;
                                option.text = dic.units[i].unitName;
                                unitOptions.push(option);
                            }
                        }
                        //遍历inputs,输出所有的head参数
                        if(json.inputs && json.inputs.length>0){
                            for(var i=0;i<json.inputs.length;i++){
                                var input  = json.inputs[i];
                                var randomId = 'modify_'+ ~~(Math.random()*100000);
                                if(input && input.hbType == 0){
                                    var inputId = input.id;
                                    var isMustOptions = '';
                                    if(input.isMust == 1){
                                        isMustOptions += '<option value="1" selected="selected">是</option>'+
                                            '<option value="0">否</option>';
                                    }else{
                                        isMustOptions += '<option value="1">是</option>'+
                                            '<option value="0"  selected="selected">否</option>';
                                    }



                                    var inputStr = '<p class="headerParamsP"><span onclick="delHeaderParam(this);" title="删除" style="cursor:pointer;margin-right:20px;color: red;"> X </span>'+
                                        '<b>Key: </b><span><input id="headerKey'+randomId+'" type="text" maxlength="50" value="'+input.paramName+'"/></span>  '+
                                        '<b>类型: </b><span id="headersParamType'+randomId+'">'+
                                        '<select name="columnType'+randomId+'">'+
                                        getBackViewSelectOptions(inputId,options) +
                                        '</select></span>'+
                                        '<b>是否必填: </b><span><select id="headerKeyMust'+randomId+'">'+
                                        isMustOptions +
                                        '</select></span><b>值：</b><span><input class="paramValueInput" type="text" value="'+input.paramValue+'"/></span>'+
                                        '<b>单位：</b><span id="paramUnitSelect'+randomId+'">'+
                                        '<select name="unitType'+randomId+'">'+
                                        getBackViewSelectOptions(inputId,unitOptions) +
                                        '</select></span>'+
                                        '<b>规格：</b><span><input type="text" placeholder="比如边界规格要求" value="'+input.paramSpec+'"/></span>'+
                                        '<b>说明：</b><span><input type="text" placeholder="参数说明" value="'+input.paramDesc+'" /></span>'+
                                        '<input type="hidden" value="'+inputId+'" />'+
                                        '</p>';
                                    $('#headersParams').append(inputStr);
                                    headerParamsCount += 1;
                                }
                            }

                        }

                    }else{
                        redioBackView('headersFlag',json.inputHeadFlag);
                    }
                    if(json.inputBodyFlag == 1){
                        redioBackView('bodyFlag',json.inputBodyFlag);
                        bodyFlagClick();
                        selectBackView($('#inputTypeSelect'),json.inputBodyType);
                        inputTypeChange($('#inputTypeSelect').find('select'));
                        $('#inputTypeSelect').find('select').attr('disabled','disabled');
                        // $('#addHeadersParamBtn').hide();
                        // $('#addBodyParamBtn').hide();


                        //遍历inputs,输出所有的body参数
                        var options = [];
                        if(dic.columTypes){
                            for(var i=0;i<dic.columTypes.length;i++){
                                var option = {};
                                option.val = dic.columTypes[i].id;
                                option.text = dic.columTypes[i].columType;
                                options.push(option);
                            }
                        }

                        var unitOptions = [];
                        if(dic.units){
                            for(var i=0;i<dic.units.length;i++){
                                var option = {};
                                option.val = dic.units[i].id;
                                option.text = dic.units[i].unitName;
                                unitOptions.push(option);
                            }
                        }
                        //遍历inputs,输出所有的head参数
                        if(json.inputs && json.inputs.length>0){
                            for(var i=0;i<json.inputs.length;i++){
                                var input  = json.inputs[i];
                                var randomId = 'modify_Body_'+ ~~(Math.random()*100000);
                                if(input && input.hbType == 1){
                                    var inputId = input.id;
                                    var isMustOptions = '';
                                    if(input.isMust == 1 && json.inputBodyType != 2){
                                        isMustOptions += '<option value="1" selected="selected">是</option>'+
                                            '<option value="0">否</option>';
                                    }else{
                                        isMustOptions += '<option value="1">是</option>'+
                                            '<option value="0"  selected="selected">否</option>';
                                    }



                                    var inputStr = '<p class="bodyParamsP"><span onclick="delBodyParam(this);" title="删除" style="cursor:pointer;margin-right:20px;color: red;"> X </span>'+
                                        '<b>Key: </b><span><input id="bodyKey'+randomId+'" type="text" maxlength="50" value="'+input.paramName+'"/></span>  '+
                                        '<b>类型: </b><span id="bodyParamType'+randomId+'">'+
                                        '<select name="bodyColumnType'+randomId+'">'+
                                        getBackViewSelectOptions(inputId,options) +
                                        '</select></span>'+
                                        '<b>是否必填: </b><span><select id="bodyKeyMust'+randomId+'">'+
                                        isMustOptions +
                                        '</select></span><b>值：</b><span><input class="paramValueInput" type="text" value="'+input.paramValue+'"/></span>'+
                                        '<b>单位：</b><span id="paramUnitSelect'+randomId+'">'+
                                        '<select name="unitType'+randomId+'">'+
                                        getBackViewSelectOptions(inputId,unitOptions) +
                                        '</select></span>'+
                                        '<b>规格：</b><span><input type="text" placeholder="比如边界规格要求" value="'+input.paramSpec+'"/></span>'+
                                        '<b>说明：</b><span><input type="text" placeholder="参数说明" value="'+input.paramDesc+'" /></span>'+
                                        '<input type="hidden" value="'+inputId+'" />'+
                                        '</p>';
                                    $('#bodyParams').append(inputStr);
                                    bodyParamsCount += 1;
                                }
                            }

                        }
                    }else{
                        redioBackView('bodyFlag',json.inputBodyFlag);
                        bodyFlagClick();
                    }

                    $('#inputParamDesc').val(json.inputTypeDesc);
                    $('#outPutDesc').val(json.outPutDesc);
                    $('#outPutFailDesc').val(json.outPutFailDesc);




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
                    editorSuccess.set(JSON.parse(json.outputData));

                    var containerFail = document.getElementById("jsoneditorFail");
                    editorFail = new JSONEditor(containerFail, options);
                    editorFail.set(JSON.parse(json.failData));

                    var containerRaw = document.getElementById("jsoneditorRaw");
                    editorRaw = new JSONEditor(containerRaw, options);

                    for(var i = 0;i<json.inputs.length;i++){
                        if(json.inputs[i].hbType == 1 && json.inputBodyType == 2){
                            console.log(json.inputs[i].paramValue);
                            if(json.inputs[i].paramValue){
                                editorRaw.set(JSON.parse(json.inputs[i].paramValue));
                            }

                            break;
                        }
                    }



                    simplemdeInput = new SimpleMDE({autofocus: true, element: document.getElementById("inputParamDesc") });
                    simplemdeOutput = new SimpleMDE({autofocus: true, element: document.getElementById("outPutDesc") });
                    simplemdeOutputFail = new SimpleMDE({autofocus: true, element: document.getElementById("outPutFailDesc") });


                }else {
                    $.messager.alert('Warning', '<b class="messageBoxBWarning">加载API数据失败，请重试</b>', 'warning');
                }
            }
        });
    }else{
        $.messager.alert('Error','Sorry,没有获取到需要加载的API ID.','error');
    }
}

$.ajax({
    type: 'GET',
    dataType : 'json',
    url: '/restful/dic',
    data: {},
    beforeSend: ajaxLoading,
    success: function(json) {
        //console.log(JSON.stringify(json));
        if (json) {
            dic = json;
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


            if($('#apiJson') && $('#apiJson').val() && $('#apiJson').val() > 0){
                loadApi();
            }


            ajaxLoadEnd();
        }else {
            $.messager.alert('Warning', '加载字典数据失败，请刷新页面重试', 'warning');
        }
    }
});