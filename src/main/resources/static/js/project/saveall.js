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

                    console.log(JSON.stringify(json));

                    ajaxLoadEnd();
                }else {
                    $.messager.alert('Warning', '加载字典数据失败，请刷新页面重试', 'warning');
                }
            }
        });
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
        obj.headParams = [];
        obj.bodyParams = [];
        if(obj.headersFlag && obj.headersFlag == 1){
            var headerParamsP = $('.headerParamsP');
            console.log('headerParamsP.length:' + headerParamsP.length);
            if(headerParamsP && headerParamsP.length > 0){
                headerParamsP.each(function(){
                    var p = $(this);
                    var headParam = new Object();
                    headParam.key = p.find('input').val();
                    headParam.paramType = p.find('select').eq(0).val();
                    headParam.isMust = p.find('select').eq(1).val();
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
                        bodyParam.key = p.find('input').val();
                        bodyParam.paramType = p.find('select:checked').eq(0).val();
                        bodyParam.isMust = p.find('select:checked').eq(1).val();
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
            $.messager.alert('Warning','提交API的数据对象不存在，系统可能出现了非常严重的问题了。');
        }else{
            //1 判断apiGroup是否为空
            if(!obj.apiGroup){
                $.messager.alert('Warning','Sorry,您未选中API Group的选项，它在API信息选项卡中，请重新选择。');
            }else if(!obj.restful){
                //2 判断url是否为空，并且判断第一个字符是否反斜杠
                $.messager.alert('Warning','Sorry,您未填写Restful Url，它在API信息选项卡中，请重新填写。');
            }else if(obj.restful[0] != '/'){
                //2 判断url是否为空，并且判断第一个字符是否反斜杠
                $.messager.alert('Warning','Sorry,您填写的Restful Url的格式不正确，第一个字符必须是<b style="color:red;">/</b>，它在API信息选项卡中，请重新填写。');
            }else if(!obj.method){
                $.messager.alert('Warning','Sorry,您未选中Request Method的选项，它在API信息选项卡中，请重新选择。');
            }else if(!obj.reqContentType){
                $.messager.alert('Warning','Sorry,您未选中Request Content-type 的选项，它在API信息选项卡中，请重新选择。');
            }else if(!obj.respContentType){
                $.messager.alert('Warning','Sorry,您未选中Request Content-type 的选项，它在API信息选项卡中，请重新选择。');
            }else if(!obj.output || obj.output == '{}'){
                $.messager.alert('Warning','Sorry,您未填写【正确出参】，它在【正确出参】选项卡中，请重新选择并填写。');
            }else if(!obj.outputFail || obj.outputFail == '{}'){
                $.messager.alert('Warning','Sorry,您未填写【错误出参】，它在【错误出参】选项卡中，请重新选择并填写。');
            }else if(!obj.headersFlag){
                $.messager.alert('Warning','Sorry,您未选中 是否有headers类型参数 的选项，它在入参选项卡中，请重新选择。');
            }else if(!obj.bodyFlag){
                $.messager.alert('Warning','Sorry,您未选中 是否有Body类型参数 的选项，它在入参选项卡中，请重新选择。');
            }else if(!obj.inputParamDesc){
                $.messager.alert('Warning','Sorry,您未填写入参的字段详细说明，它在入参选项卡中，请重新填写。');
            }else if(!obj.outPutDesc){
                $.messager.alert('Warning','Sorry,您未填写正确出参的字段详细说明，它在正确出参选项卡中，请重新填写。');
            }else if(!obj.outPutFailDesc){
                $.messager.alert('Warning','Sorry,您未填写错误出参的字段详细说明，它在错误出参选项卡中，请重新填写。');
            }else if(obj.headersFlag == '0' && obj.bodyFlag == '0'){
                console.log('no input params');
                /**********ok*********/
                exeSave(obj);
            }else if(obj.bodyFlag == '0' && obj.headersFlag == '1'){
                var n=0;
                    if(obj.headParams && obj.headParams.length > 0){
                        for(n=0;n<obj.headParams.length;n++){
                            var headParam = obj.headParams[n];
                            if(!headParam.key){
                                console.log(JSON.stringify(headParam))
                                $.messager.alert('Warning','Sorry,您增加的 header 参数没有填写，请重新填写。');
                                break;
                            }
                        }
                        if(n>=obj.headParams.length){
                            /**********ok*********/
                            exeSave(obj);
                        }

                    }else{
                        $.messager.alert('Warning','Sorry,您未增加 header 参数，它在入参选项卡中，请重新填写。');
                    }
            }else if(obj.bodyFlag == '1' && obj.headersFlag == '0'){
                    if(obj.inputTypeSelect && obj.inputTypeSelect == '2'){
                        if(obj.bodyRaw && obj.bodyRaw.length > 2){
                            /**********ok*********/
                            exeSave(obj);
                        }else{
                            $.messager.alert('Warning','Sorry,您未填写【body-raw】，它在【入参】选项卡中，请重新选择并填写。');
                        }
                    }else{
                        var m = 0;
                        if(obj.bodyParams && obj.bodyParams.length > 0){
                            for(m=0;m<obj.bodyParams.length;m++){
                                var bodyParam = obj.bodyParams[m];
                                if(!bodyParam.key){
                                    console.log(JSON.stringify(bodyParam))
                                    $.messager.alert('Warning','Sorry,您增加的 body 参数没有填写，请重新填写。');
                                    break;
                                }
                            }
                            if(m>=obj.bodyParams.length){
                                /**********ok*********/
                                exeSave(obj);
                            }
                        }else{
                            $.messager.alert('Warning','Sorry,您未增加 body 参数，它在入参选项卡中，请重新填写。');
                        }
                    }

            }else if(obj.bodyFlag == '1' && obj.headersFlag == '1'){
                var i=0;
                if(obj.headParams && obj.headParams.length > 0){
                    for(i=0;i<obj.headParams.length;i++){
                        var headParam = obj.headParams[i];
                        if(!headParam.key){
                            console.log(JSON.stringify(headParam))
                            $.messager.alert('Warning','Sorry,您增加的 header 参数没有填写，请重新填写。');
                            break;
                        }
                    }
                    if(i>=obj.headParams.length){
                        if(obj.inputTypeSelect && obj.inputTypeSelect == '2'){
                            if(obj.bodyRaw && obj.bodyRaw.length > 2){
                                  /**********ok*********/
                                  exeSave(obj);
                            }else{
                                $.messager.alert('Warning','Sorry,您未填写【body-raw】，它在【入参】选项卡中，请重新选择并填写。');
                            }
                        }else{
                            var j=0;
                            if(obj.bodyParams && obj.bodyParams.length > 0){
                                for(var j=0;j<obj.bodyParams.length;j++){
                                    var bodyParam = obj.bodyParams[j];
                                    if(!bodyParam.key){
                                        console.log(JSON.stringify(bodyParam))
                                        $.messager.alert('Warning','Sorry,您增加的 body 参数没有填写，请重新填写。');
                                        break;
                                    }
                                }
                                if(j>=obj.bodyParams.length){
                                    /**********ok*********/
                                    exeSave(obj);
                                }
                            }else{
                                $.messager.alert('Warning','Sorry,您未增加 body 参数，它在入参选项卡中，请重新填写。');
                            }
                        }
                    }
                }else{
                    $.messager.alert('Warning','Sorry,您未增加 header 参数，它在入参选项卡中，请重新填写。');
                }
            }

        }

    });
});