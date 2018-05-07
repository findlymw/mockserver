package cn.jts.t.utils;

import cn.jts.t.entity.*;

import java.util.List;

public class ApiTrans {

    public static void apiTrans(Api api, DicCache dic, List<ApiGroup> apiGroups){
        dic.setApiGroups(apiGroups);

        for (ApiGroup apiGroup:apiGroups
             ) {
            if(apiGroup.getId() == api.getGroupId()){
                api.setGroupIdString(apiGroup.getGroupName());
            }
        }

        for (Method method:dic.getMethods()
                ) {
            if(method.getId() == api.getMethod()){
                api.setMethodString(method.getMethodName());
            }
        }

        if(api.getIsExpired() == 0){
            api.setIsExpiredString("否");
        }else{
            api.setIsExpiredString("是");
        }

        for (ContentType contentType:dic.getContentTypes()
                ) {
            if(contentType.getId() == api.getRequestContentType()){
                api.setRequestContentTypeString(contentType.getContentType());
            }
            if(contentType.getId() == api.getResponseContentType()){
                api.setResponseContentTypeString(contentType.getContentType());
            }
        }


        for (InputType inputType:dic.getInputTypes()
                ) {
            if(inputType.getId() == api.getInputBodyType()){
                api.setInputBodyTypeString(inputType.getInputTypeName());
            }
        }


        if(api.getInputHeadFlag() == 0){
            api.setInputHeadFlagString("否");
        }else{
            api.setInputHeadFlagString("是");
        }

        if(api.getInputBodyFlag() == 0){
            api.setInputBodyFlagString("否");
        }else{
            api.setInputBodyFlagString("是");
        }


        //inputs

        if(null != api.getInputs() && 0 < api.getInputs().size()){

            for(Input input : api.getInputs()){
                if(input.getHbType() == 0){
                    input.setHbTypeString("header");
                }else if(input.getHbType() == 1){
                    input.setHbTypeString("body");
                }

                if(input.getIsMust() == 0){
                    input.setIsMustString("否");
                }else{
                    input.setIsMustString("是");
                }

                for (ColumType columType:dic.getColumTypes()
                        ) {
                    if(columType.getId() == input.getParamType()){
                        input.setParamTypeString(columType.getColumType());
                    }
                }

                for (Unit unit:dic.getUnits()
                        ) {
                    if(unit.getId() == input.getParamUnit()){
                        input.setParamUnitString(unit.getUnitName());
                    }
                }

            }
        }
    }
}
