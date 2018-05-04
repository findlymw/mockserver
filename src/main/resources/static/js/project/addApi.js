$(document).ready(function(){

    function getSelect(name,options){
        var select = '<select name="'+name+'">';
        select += options;
        select += '</select>';
        return select;
    }

    var columnTypes = new Object();
    var apiGroups = new Object();
    var methods = new Object();
    var units = new Object();
    var contentTypes = new Object();
    var inputTypes = new Object();

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
                    $('#inputTypeSelect').html(getSelect('inputType',inputTypes.options));
                    $('#reqContentTypeSelect').html(getSelect('reqContentType',contentTypes.options));
                    $('#respContentTypeSelect').html(getSelect('respContentType',contentTypes.options));

                    ajaxLoadEnd();
                }else {
                    $.messager.alert('Warning', '加载字典数据失败，请刷新页面重试', 'warning');
                }
            }
        });
});