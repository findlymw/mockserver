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
    var apiDetail = $('.apiDetail');
    apiDetail.html('<ul></ul>')
    var ul = apiDetail.find('ul');
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
                    ul.append('<li><label>Api 名称：</label><span>'+json.apiName+'</span>,所属分组 <b>['+json.groupIdString+']</b>,版本号：<b>'+json.versionNo+'</b></li>');
                    ul.append('<li><label>Api URL：</label><span>'+json.urlString+'</span> <b><a target="_blank" href="/api'+json.urlString+'">[Visit]</a></b></li>');
                    ul.append('<li><label>请求方式：</label><b>'+json.methodString+'</b>, Request Content-Type:<b>'+json.requestContentTypeString+'</b>, Response Content-Type:<b>'+json.responseContentTypeString+'</b></li>');
                    ul.append('<li><label>是否过期：</label><b>'+json.isExpiredString+'</b></li>');
                    ul.append('<li><label>前置 API：</label><b>'+json.preAPI+'</b></li>');
                    ul.append('<li><label>数据库信息：</label><b>'+json.dbNameAndTableName+'</b></li>');
                    if(json.inputHeadFlag == 1){
                        ul.append('<li><label>是否Head入参：</label><b>'+json.inputHeadFlagString+'</b>  <span style="cursor: pointer;"><a showFlag="hide" onclick="showParamsDetail(\'headerParams\',this);" >Show</a></span> </li>');
                        ul.append('<li><div id="headerParams" style="display: none;"></div></li>');

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
                        headContent += '</tr></table>';
                        $('#headerParams').html('<table><tr><td width="50%">'+headContent+'</td><td></td></tr></table>');
                    }
                    if(json.inputBodyFlag == 1){
                        ul.append('<li><label>是否Body入参：</label><b>'+json.inputBodyFlagString+'</b> 入参方式:<b>'+json.inputBodyTypeString+'</b> <span style="cursor: pointer;"><a showFlag="hide" onclick="showParamsDetail(\'bodyParams\',this);" >Show</a></span> </li>');
                        ul.append('<li><div id="bodyParams" style="display: none;"></div></li>');
                        if(json.inputBodyType == 2){
                            $('#bodyParams').html('<div id="jsoneditorRaw" style="width: 100%; height: 300px;"></div>');

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
                            $('#bodyParams').html('<table><tr><td width="50%">'+bodyContent+'</td><td></td></tr></table>');
                        }
                    }
                    ul.append('<li><label>入参详细描述：</label><textarea id="inputParamDesc" style="width: 100%;height: 300px;">'+json.inputTypeDesc+'</textarea></li>');
                    ul.append('<li><label>正确出参：</label><div id="jsoneditorSuccess" style="width: 100%; height: 300px;"></div></li>');
                    ul.append('<li><label>正确出参描述：</label><textarea id="outPutDesc" style="width: 100%;height: 300px;">'+json.outPutDesc+'</textarea></li>');
                    ul.append('<li><label>错误出参：</label><div id="jsoneditorFail" style="width: 100%; height: 300px;"></div></li>');
                    ul.append('<li><label>错误出参描述：</label><textarea id="outPutFailDesc" style="width: 100%;height: 300px;">'+json.outPutFailDesc+'</textarea></li>');

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