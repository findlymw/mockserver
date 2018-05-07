$(document).ready(function(){

    function exeSave(obj){
        console.log(JSON.stringify(obj));
        $.ajax({
            type: 'POST',
            dataType : 'json',
            cache:false,
            async:false,
            contentType: "application/json; charset=utf-8",
            url: '/restful/addApi',
            data: JSON.stringify(obj),
            beforeSend: ajaxLoading,
            success: function(json) {
                //console.log(JSON.stringify(json));
                if (json) {
                    if(json.success == true){
                        $.messager.alert('Info', '恭喜，<b class="messageBoxBSuccess">添加成功</b>', 'Info');
                    }else{
                        $.messager.alert('Error', 'Sorry，添加失败原因：<b class="messageBoxBError">'+json.desc+'</b>', 'Error');
                    }
                    ajaxLoadEnd();
                }else {
                    $.messager.alert('Warning', '<b class="messageBoxBWarning">加载字典数据失败，请刷新页面重试</b>', 'warning');
                }
            }
        });
    }

    function validateParams(params,paramType){
        var n=0;
        var result = {};
        result.message = {};
        result.success = false;
        result.message.title = 'Warning';
        if(params && params.length > 0){
            for(n=0;n<params.length;n++){
                var param = params[n];
                if(!param.key){
                    result.message.content = 'Sorry,您增加的 <b class="messageBoxBWarning">'+paramType+' 参数key</b> 没有填写，请重新填写。';
                    break;
                }else if(!param.value){
                    result.message.content = 'Sorry,您增加的 <b class="messageBoxBWarning">'+paramType+' 参数值</b> 没有填写，请重新填写。';
                    break;
                }else if(!param.spec){
                    result.message.content = 'Sorry,您增加的 <b class="messageBoxBWarning">'+paramType+' 参数规格</b> 没有填写，请重新填写。';
                    break;
                }else if(!param.desc){
                    result.message.content = 'Sorry,您增加的 <b class="messageBoxBWarning">'+paramType+' 参数说明</b> 没有填写，请重新填写。';
                    break;
                }
            }
            if(n>=params.length){
                /**********ok*********/
               // exeSave(obj);
                result.success = true;
            }

        }else{
            result.message.content =  'Sorry,<b class="messageBoxBWarning">您未增加 header 参数，它在入参选项卡中，请重新填写。</b>';
        }
        return result;
    }

    function saveBodyParams(obj){
        if(obj.inputTypeSelect && obj.inputTypeSelect == '2'){
            if(obj.bodyRaw && obj.bodyRaw.length > 2){
                /**********ok*********/
                exeSave(obj);
            }else{
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBWarning">【body-raw】，它在【入参】选项卡中</b>，请重新选择并填写。');
            }
        }else{
            var result = validateParams(obj.bodyParams,'body');

            if(result && result.success === true){
                exeSave(obj);
            }else{
                $.messager.alert(result.message.title,result.message.content);
            }
        }
    }

    function saveHeaderParams(obj){
        var result = validateParams(obj.headParams,'header');
        if(result && result.success === true){
            exeSave(obj);
        }else{
            $.messager.alert(result.message.title,result.message.content);
        }
    }



    $('.saveall').on('click',function(){
        var obj = new Object();
        obj.apiGroup = $(":input[name='apiGroup']").val();
        obj.restful = $(":input[name='Restful']").val();
        obj.method = $(":input[name='method']").val();
        obj.reqContentType = $(":input[name='reqContentType']").val();
        obj.respContentType = $(":input[name='respContentType']").val();

        obj.headersFlag = $("input[name='headersFlag']:checked").val();
        obj.bodyFlag = $("input[name='bodyFlag']:checked").val();
        obj.inputParamDesc = simplemdeInput.value();
        obj.outPutDesc = simplemdeOutput.value();
        obj.outPutFailDesc = simplemdeOutputFail.value();

        obj.apiName = $('#apiName').find('input').val();
        obj.preApi = $('#preApiInput').val();
        obj.isExpired = $('#isExpiredSelect').val();
        obj.version = $('#version').val();
        obj.dbNameTable = $('#dbNameTable').val();

        obj.headParams = [];
        obj.bodyParams = [];
        if(obj.headersFlag && obj.headersFlag == 1){
            var headerParamsP = $('.headerParamsP');
            console.log('headerParamsP.length:' + headerParamsP.length);
            if(headerParamsP && headerParamsP.length > 0){
                headerParamsP.each(function(){
                    var p = $(this);
                    var headParam = new Object();
                    headParam.key = p.find('input').eq(0).val();
                    headParam.paramType = p.find('select').eq(0).val();
                    headParam.isMust = p.find('select').eq(1).val();

                    headParam.value = p.find('input').eq(1).val();
                    headParam.unit = p.find('select').eq(2).val();
                    headParam.spec = p.find('input').eq(2).val();
                    headParam.desc = p.find('input').eq(3).val();



                    obj.headParams.push(headParam);
                    console.log(headParam.key + headParam.paramType + headParam.isMust);
                });
            }
        }
        if(obj.bodyFlag && obj.bodyFlag == '1'){
            obj.inputTypeSelect = $('#bodyParamsType').find('select').val();
            if(obj.inputTypeSelect == 1 || obj.inputTypeSelect == 3){
                var bodyParamsP = $('.bodyParamsP');
                console.log('bodyParamsP.length:' + bodyParamsP.length);
                if(bodyParamsP && bodyParamsP.length > 0){
                    bodyParamsP.each(function(){
                        var p = $(this);
                        var bodyParam = new Object();
                        bodyParam.key = p.find('input').eq(0).val();
                        bodyParam.paramType = p.find('select:checked').eq(0).val();
                        bodyParam.isMust = p.find('select:checked').eq(1).val();

                        bodyParam.value = p.find('input').eq(1).val();
                        bodyParam.unit = p.find('select').eq(2).val();
                        bodyParam.spec = p.find('input').eq(2).val();
                        bodyParam.desc = p.find('input').eq(3).val();


                        obj.bodyParams.push(bodyParam);
                        console.log(bodyParam.key + bodyParam.paramType + bodyParam.isMust);
                    });
                }
            }
        }

        obj.output = JSON.stringify(editorSuccess.get());
        obj.bodyRaw = JSON.stringify(editorRaw.get());
        obj.outputFail = JSON.stringify(editorFail.get());


        //上面是获取所有需要获取的值，放入到obj的对象中，下面对obj的值进行判断
        if(!obj){
            $.messager.alert('Warning','<b class="messageBoxBError">提交API的数据对象不存在，系统可能出现了非常严重的问题了。</b>');
        }else{
            //1 判断apiGroup是否为空
            if(!obj.apiGroup){
                $.messager.alert('Warning','Sorry,您未选中<b class="messageBoxBError">API Group</b>的选项，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新选择。');
            }else if(!obj.apiName){
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">API Name</b> 字段详细说明，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新填写。');
            }else if(!obj.restful){
                //2 判断url是否为空，并且判断第一个字符是否反斜杠
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">Restful Url</b>，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新填写。');
            }else if(obj.restful[0] != '/'){
                //2 判断url是否为空，并且判断第一个字符是否反斜杠
                $.messager.alert('Warning','Sorry,您填写的<b class="messageBoxBError">Restful Url的格式不正确</b>，第一个字符必须是<b style="color:red;">/</b>，它在API信息选项卡中，请重新填写。');
            }else if(!obj.method){
                $.messager.alert('Warning','Sorry,您未选中<b class="messageBoxBError">Request Method</b>的选项，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新选择。');
            }else if(!obj.reqContentType){
                $.messager.alert('Warning','Sorry,您未选中<b class="messageBoxBError">Request Content-type</b> 的选项，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新选择。');
            }else if(!obj.respContentType){
                $.messager.alert('Warning','Sorry,您未选中<b class="messageBoxBError">Request Content-type</b> 的选项，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新选择。');
            }else if(!obj.preApi){
                $.messager.alert('Warning','Sorry,您未填写 <b class="messageBoxBError">Pre API</b>，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新填写。');
            }else if(!obj.isExpired){
                $.messager.alert('Warning','Sorry,您未选中 <b class="messageBoxBError">Is Expired</b> 的选项，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新选择。');
            }else if(!obj.version){
                $.messager.alert('Warning','Sorry,您未填写 <b class="messageBoxBError">Version No. </b>，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新填写。');
            }else if(!obj.dbNameTable){
                $.messager.alert('Warning','Sorry,您未填写 <b class="messageBoxBError">DB Name And Table Name </b>，它在<b class="messageBoxBTip">API信息</b>选项卡中，请重新填写。');
            } else if(!obj.output || obj.output == '{}'){
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">【正确出参】</b>，它在<b class="messageBoxBTip">【正确出参】</b>选项卡中，请重新选择并填写。');
            }else if(!obj.outputFail || obj.outputFail == '{}'){
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">【错误出参】</b>，它在<b class="messageBoxBTip">【错误出参】</b>选项卡中，请重新选择并填写。');
            }else if(!obj.headersFlag){
                $.messager.alert('Warning','Sorry,您未选中 <b class="messageBoxBError">是否有headers类型参数</b> 的选项，它在<b class="messageBoxBTip">入参</b>选项卡中，请重新选择。');
            }else if(!obj.bodyFlag){
                $.messager.alert('Warning','Sorry,您未选中 <b class="messageBoxBError">是否有Body类型参数</b> 的选项，它在<b class="messageBoxBTip">入参</b>选项卡中，请重新选择。');
            }else if(!obj.inputParamDesc){
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">入参的字段详细说明</b>，它在<b class="messageBoxBTip">入参</b>选项卡中，请重新填写。');
            }else if(!obj.outPutDesc){
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">正确出参的字段详细说明</b>，它在<b class="messageBoxBTip">正确出参</b>选项卡中，请重新填写。');
            }else if(!obj.outPutFailDesc){
                $.messager.alert('Warning','Sorry,您未填写<b class="messageBoxBError">错误出参的字段详细说明</b>，它在<b class="messageBoxBTip">错误出参</b>选项卡中，请重新填写。');
            }else if(obj.headersFlag == '0' && obj.bodyFlag == '0'){
                exeSave(obj);
            }else if(obj.bodyFlag == '0' && obj.headersFlag == '1'){
               saveHeaderParams(obj);
            }else if(obj.bodyFlag == '1' && obj.headersFlag == '0'){
                saveBodyParams(obj);
            }else if(obj.bodyFlag == '1' && obj.headersFlag == '1'){
                var resultOfHeader = validateParams(obj.headParams,'header');
                if(resultOfHeader && resultOfHeader.success === true){
                    saveBodyParams(obj);
                }else{
                    $.messager.alert(resultOfHeader.message.title,result.message.content);
                }
            }

        }

    });
});