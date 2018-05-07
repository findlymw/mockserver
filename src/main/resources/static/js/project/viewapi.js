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
                    if(json.inputHeadFlag == 1){
                        ul.append('<li><label>是否Head入参：</label><b>'+json.inputHeadFlagString+'</b></li>');
                        ul.append('<li><div id="headerParams"></div></li>');

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
                        $('#headerParams').html(headContent);
                    }
                    if(json.inputBodyFlag == 1){
                        ul.append('<li><label>是否Body入参：</label><b>'+json.inputBodyFlagString+'</b> 入参方式:<b>'+json.inputBodyTypeString+'</b></li>');
                        ul.append('<li><div id="bodyParams"></div></li>');
                        if(json.inputBodyType == 2){

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
                            $('#bodyParams').html(bodyContent);
                        }
                    }
                    ul.append('<li><label>正确出参：</label><b>'+json.outputData+'</b></li>');
                    ul.append('<li><label>正确出参描述：</label><b>'+json.outPutDesc+'</b></li>');
                    ul.append('<li><label>错误出参：</label><b>'+json.failData+'</b></li>');
                    ul.append('<li><label>错误出参描述：</label><b>'+json.outPutFailDesc+'</b></li>');

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