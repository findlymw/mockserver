function showParamsDetail(id,obj){
    $('#'+id).toggle();

    if($(obj).attr('showFlag') == 'hide'){
        $(obj).attr('showFlag','shows');
        $(obj).html('Hide');
    }else{
        $(obj).attr('showFlag','hide');
        $(obj).html('Show');
    }
}

var simplemdeInput;
var simplemdeOutput;
var simplemdeOutputFail;

var raw = {};



function getApiDetailArea(id){
    return $('#apiDetailArea').find('div').eq((id-1));
}

var apiInfo = getApiDetailArea(1);
var apiInput = getApiDetailArea(2);
var apiSuccess = getApiDetailArea(3);
var apiFail = getApiDetailArea(4);

function setApiInfo(json){
    var apiInfoStr = '<ul class="viewAPIUL">';
    apiInfoStr += ('<li><label>Api 名称：</label><span>'+json.apiName+'</span>,所属分组 <b>['+json.groupIdString+']</b>,版本号：<b>'+json.versionNo+'</b></li>');
    apiInfoStr += ('<li><label>Api URL：</label><span>'+json.urlString+'</span> <b><a target="_blank" href="/api'+json.urlString+'">[Visit]</a></b></li>');
    apiInfoStr += ('<li><label>请求方式：</label><b>'+json.methodString+'</b>, Request Content-Type:<b>'+json.requestContentTypeString+'</b>, Response Content-Type:<b>'+json.responseContentTypeString+'</b></li>');
    apiInfoStr += ('<li><label>是否过期：</label><b>'+json.isExpiredString+'</b></li>');
    apiInfoStr += ('<li><label>前置 API：</label><b>'+json.preAPI+'</b></li>');
    apiInfoStr += ('<li><label>数据库信息：</label><b>'+json.dbNameAndTableName+'</b></li>');
    apiInfoStr += '</ul>';
    return apiInfoStr;
}

function setHeaderInput(json){
    var headInfoStr = '<ul class="viewAPIUL">';
    headInfoStr += ('<li><label>是否Head入参：</label><b>'+json.inputHeadFlagString+'</b>  <span style="cursor: pointer;"></span> </li>');
    headInfoStr += ('<li><div id="headerParams">');
    var headContent = '<table><thead><th>Key</th><th>入参类型</th><th>单位</th><th>是否必填</th><th>参数样板</th></thead>';
    for(var i=0;i<json.inputs.length;i++){
        var input = json.inputs[i];
        if(input.hbType == 0){
            headContent += '<tr><td>'+input.paramName+'</td>';
            headContent += '<td>'+input.paramTypeString+'</td>';
            headContent += '<td>'+input.paramUnitString+'</td>';
            headContent += '<td>'+input.isMustString+'</td>';
            headContent += '<td>'+input.paramValue+'</td></tr>';

        }
    }
    headContent += '</table>';
    headInfoStr += (headContent + '</div></li>');
    headInfoStr += '</ul>';
    return headInfoStr;
}

function setBodyInput(json){
    var result = {};
    var raw = {};
    var bodyInfoStr = '<ul class="viewAPIUL">';
    bodyInfoStr += ('<li><label>是否Body入参：</label><b>'+json.inputBodyFlagString+'</b> 入参方式:<b>'+json.inputBodyTypeString+'</b> <span style="cursor: pointer;"></span> </li>');
    bodyInfoStr += ('<li><div id="bodyParams">');
    if(json.inputBodyType == 2){
        bodyInfoStr += '<div id="jsoneditorRaw" style="width: 100%; height: 300px;"></div>';
        for(var i=0;i<json.inputs.length;i++){
            var input = json.inputs[i];
            if(input.hbType == 1){
                raw = JSON.parse(input.paramValue);
                break;
            }
        }
    }else{
        var bodyContent = '<table><thead><th>Key</th><th>入参类型</th><th>单位</th><th>是否必填</th><th>参数样板</th></thead>';
        for(var i=0;i<json.inputs.length;i++){
            var input = json.inputs[i];
            if(input.hbType == 1){
                bodyContent += '<tr><td>'+input.paramName+'</td>';
                bodyContent += '<td>'+input.paramTypeString+'</td>';
                bodyContent += '<td>'+input.paramUnitString+'</td>';
                bodyContent += '<td>'+input.isMustString+'</td>';
                bodyContent += '<td>'+input.paramValue+'</td></tr>';

            }
        }
        bodyContent += '</tr></table>';
        bodyInfoStr += bodyContent;
    }

    bodyInfoStr += ('</div></li></ul>');
    result.raw = raw;
    result.bodyInfoStr = bodyInfoStr;
    return result;
}


function markDownTrans(str){
    var lexed = marked.lexer(str);
    return marked.parser(lexed);
}

var options = {
    //mode: 'view', //只读
    mode: 'code',
    //modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    onError: function (err) {
        alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
        console.log('Mode switched from', oldMode, 'to', newMode);
    }
};
$(document).ready(function(){
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
            beforeSend: ajaxLoading,
            success: function(json) {

                if (json) {
                    //console.log(JSON.stringify(json));
                    //set panel-title
                    $('.panel-title').html(' API: ' + json.apiName);
                    //set apiInfo
                    apiInfo.html(setApiInfo(json));
                    //set input header
                    if(json.inputHeadFlag == 1){
                        apiInput.html(setHeaderInput(json));
                    }

                    if(json.inputBodyFlag == 1){
                        var result = setBodyInput(json);
                        raw = result.raw;
                        apiInput.append(result.bodyInfoStr);
                    }

                    apiInput.append('<div class="inputDetailDesc"><label>入参详细描述：</label><div>'+markDownTrans(json.inputTypeDesc)+'</div>');

                    var outputSuccess = '<ul class="viewAPIUL">';
                    outputSuccess += ('<li><label>正确出参：</label><div id="jsoneditorSuccess" style="width: 100%; height: 300px;"></div></li>');
                    outputSuccess += ('<li><label>正确出参描述：</label><div>'+markDownTrans(json.outPutDesc)+'</div>');
                    outputSuccess += '</ul>';
                    apiSuccess.html(outputSuccess);


                    var outputFail = '<ul  class="viewAPIUL">';
                    outputFail += ('<li><label>错误出参：</label><div id="jsoneditorFail" style="width: 100%; height: 300px;"></div></li>');
                    outputFail += ('<li><label>错误出参描述：</label><div>'+markDownTrans(json.outPutFailDesc)+'</div>');
                    outputFail += '</ul>';
                    apiFail.html(outputFail);


                    new SimpleMDE({ element: document.getElementById("inputParamDesc") });
                    new SimpleMDE({ element: document.getElementById("outPutDesc") });
                    new SimpleMDE({ element: document.getElementById("outPutFailDesc") });

                    if(document.getElementById("jsoneditorRaw")){
                        var containerRaw = document.getElementById("jsoneditorRaw");
                        editorRaw = new JSONEditor(containerRaw, options);
                        if(raw){
                            editorRaw.set(raw);
                        }

                    }
                    var _jsoneditorSuccess = document.getElementById("jsoneditorSuccess");
                    _editorSuccess = new JSONEditor(_jsoneditorSuccess, options);
                    if(raw){
                        _editorSuccess.set(JSON.parse(json.outputData));
                    }
                    var _jsoneditorFail = document.getElementById("jsoneditorFail");
                    _editorFail = new JSONEditor(_jsoneditorFail, options);
                    if(raw){
                        _editorFail.set(JSON.parse(json.failData));
                    }


                    ajaxLoadEnd();
                }else {
                    $.messager.alert('Warning', '<b class="messageBoxBWarning">加载API数据失败，请重试</b>', 'warning');
                }
            }
        });
    }else{
        $.messager.alert('Error','Sorry,没有获取到需要加载的API ID.','error');
    }
});






// var containerFail = document.getElementById("jsoneditorFail");
// editorFail = new JSONEditor(containerFail, options);
// editorFail.set({});
//
// var containerRaw = document.getElementById("jsoneditorRaw");
// editorRaw = new JSONEditor(containerRaw, options);
// editorRaw.set({});


//simplemdeOutput = new SimpleMDE({ element: document.getElementById("outPutDesc") });
//simplemdeOutputFail = new SimpleMDE({ element: document.getElementById("outPutFailDesc") });