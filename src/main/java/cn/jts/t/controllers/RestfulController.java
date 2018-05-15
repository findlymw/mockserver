package cn.jts.t.controllers;

import cn.jts.t.entity.*;
import cn.jts.t.entity.input.AddApiInput;
import cn.jts.t.entity.input.InputParam;
import cn.jts.t.entity.tree.Node;
import cn.jts.t.service.ApiGroupService;
import cn.jts.t.service.ApiService;
import cn.jts.t.service.InputService;
import cn.jts.t.utils.ApiTrans;
import cn.jts.t.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RestfulController {

    @Autowired
    private ApiGroupService apiGroupService;

    @Autowired
    private ApiService apiService;

    @Autowired
    private InputService inputService;

    @Autowired
    private DicCache dicCache;


    @RequestMapping("/restful/getapi/{id}")
    public Api getApiById(@PathVariable long id){
        Api api = new Api();
        if(id > 0){
            api.setId(id);
            api = apiService.selectApiById(api);
            if(null != api){
                api.setInputs(inputService.selectInputByApiId(api));
                List<ApiGroup> apiGroupList = apiGroupService.selectApiGroupList();
                if(null == apiGroupList){
                    apiGroupList = new ArrayList<ApiGroup>();
                }
                ApiTrans.apiTrans(api,dicCache,apiGroupList);
            }else{
                api = new Api();
            }
        }
        return api;
    }

    @RequestMapping("/restful/getApilist/{id}")
    public List<Api> getApiList(@PathVariable long id){
        Api api = new Api();
        api.setGroupId(id);
        List<Api> apiList = apiService.selectApiByGroupId(api);
        if(null == apiList){
            apiList = new ArrayList<Api>();
        }

        List<ApiGroup> apiGroups = apiGroupService.selectApiGroupList();
        if(apiList.size() > 0){
            for (Api _api: apiList
                    ) {
                _api.setInputs(inputService.selectInputByApiId(_api));
                ApiTrans.apiTrans(_api,dicCache,apiGroups);
            }
        }
        return apiList;
    }




    @RequestMapping("/restful/dic")
    public DicCache getDicCache(){
        dicCache.setApiGroups(apiGroupService.selectApiGroupList());
        return dicCache;
    }


    @RequestMapping(value = "/restful/delapi/{id}",method = RequestMethod.DELETE)
    public Result delApiById(@PathVariable long id){
        Result result = new Result();
        if(id > 0){
            Api api = new Api();
            api.setId(id);
            apiService.deleteApi(api);
            result.setSuccess(true);
        }else{
            result.setSuccess(false);
            result.setDesc("api id is not exist.");
        }
        return result;
    }


    @RequestMapping(value = "/restful/updateApi",method = RequestMethod.POST)
    public Result updateApi(@RequestBody AddApiInput addApiInput) throws Exception {
        Result result = new Result();
        if(null == addApiInput){
            result.setSuccess(false);
            result.setDesc("Add Api Input object is null");
        }else{
            if(addApiInput.getId() <= 0){
                result.setSuccess(false);
                result.setDesc("apiId Failed");
            }else if(addApiInput.getApiGroup() < 0){
                result.setSuccess(false);
                result.setDesc("ApiGroup Failed");
            }else if(null == addApiInput.getRestful()
                    || "".equals(addApiInput.getRestful())
                    ){
                result.setSuccess(false);
                result.setDesc("Restful is null");
            }else if(addApiInput.getReqContentType() < 0){
                result.setSuccess(false);
                result.setDesc("ReqContentType Failed");
            }else if(addApiInput.getRespContentType() < 0){
                result.setSuccess(false);
                result.setDesc("RespContentType Failed");
            }else if(addApiInput.getOutput() == null
                    || "".equals(addApiInput.getOutput())
                    || "{}".equals(addApiInput.getOutput())
                    ){
                result.setSuccess(false);
                result.setDesc("Output Failed ,is empty or {} ");
            }else if(addApiInput.getOutputFail() == null
                    || "".equals(addApiInput.getOutputFail())
                    || "{}".equals(addApiInput.getOutputFail())
                    ){
                result.setSuccess(false);
                result.setDesc("OutputFail Failed ,is empty or {} ");
            }else if(addApiInput.getHeadersFlag() < 0){
                result.setSuccess(false);
                result.setDesc("HeadersFlag Failed");
            }else if(addApiInput.getBodyFlag() < 0){
                result.setSuccess(false);
                result.setDesc("BodyFlag Failed");
            }else{

                //构建Api
                Api api = new Api();
                api.setId(addApiInput.getId());
                api.setGroupId(addApiInput.getApiGroup());
                api.setUrlString(addApiInput.getRestful());
                api.setUrlMD5(MD5.parseStrToMd5L32(addApiInput.getRestful()));
                api.setMethod(addApiInput.getMethod());
                api.setRequestContentType(addApiInput.getReqContentType());
                api.setResponseContentType(addApiInput.getRespContentType());
                api.setOutputData(addApiInput.getOutput());
                api.setFailData(addApiInput.getOutputFail());
                api.setInputTypeDesc(addApiInput.getInputParamDesc());
                api.setOutPutDesc(addApiInput.getOutPutDesc());
                api.setOutPutFailDesc(addApiInput.getOutPutFailDesc());

                api.setInputHeadFlag(addApiInput.getHeadersFlag());
                api.setInputBodyFlag(addApiInput.getBodyFlag());
                api.setInputBodyType(addApiInput.getInputTypeSelect());

                api.setApiName(addApiInput.getApiName());
                api.setPreAPI(addApiInput.getPreApi());
                api.setVersionNo(addApiInput.getVersion());
                api.setDbNameAndTableName(addApiInput.getDbNameTable());
                api.setIsExpired(addApiInput.getIsExpired());

                Api _api = apiService.selectApiByApiNameOrUrlMD5(api);
                if((null != _api && api.getId() == _api.getId()) || null == _api){
                    apiService.updateById(api);
                    result.setSuccess(true);
                }else{
                    result.setSuccess(false);
                    result.setDesc("API Name or URL is exist");
                }
            }
        }
        return result;
    }

    private void deleteInputs(long apiId){
        Input input = new Input();
        input.setApiId(apiId);
        inputService.deleteInputByApiId(input);

    }
    @RequestMapping(value = "/restful/addApi",method = RequestMethod.POST)
    public Result addApi(@RequestBody AddApiInput addApiInput){
        Result result = new Result();
        if(null == addApiInput){
            result.setSuccess(false);
            result.setDesc("Add Api Input object is null");
        }else{
            if(addApiInput.getApiGroup() < 0){
                result.setSuccess(false);
                result.setDesc("ApiGroup Failed");
            }else if(null == addApiInput.getRestful()
                    || "".equals(addApiInput.getRestful())
                    ){
                result.setSuccess(false);
                result.setDesc("Restful is null");
            }else if(addApiInput.getReqContentType() < 0){
                result.setSuccess(false);
                result.setDesc("ReqContentType Failed");
            }else if(addApiInput.getRespContentType() < 0){
                result.setSuccess(false);
                result.setDesc("RespContentType Failed");
            }else if(addApiInput.getOutput() == null
                    || "".equals(addApiInput.getOutput())
                    || "{}".equals(addApiInput.getOutput())
                    ){
                result.setSuccess(false);
                result.setDesc("Output Failed ,is empty or {} ");
            }else if(addApiInput.getOutputFail() == null
                    || "".equals(addApiInput.getOutputFail())
                    || "{}".equals(addApiInput.getOutputFail())
                    ){
                result.setSuccess(false);
                result.setDesc("OutputFail Failed ,is empty or {} ");
            }else if(addApiInput.getHeadersFlag() < 0){
                result.setSuccess(false);
                result.setDesc("HeadersFlag Failed");
            }else if(addApiInput.getBodyFlag() < 0){
                result.setSuccess(false);
                result.setDesc("BodyFlag Failed");
            }else{

                //构建Api
                Api api = new Api();
                api.setGroupId(addApiInput.getApiGroup());
                api.setUrlString(addApiInput.getRestful());
                api.setUrlMD5(MD5.parseStrToMd5L32(addApiInput.getRestful()));
                api.setMethod(addApiInput.getMethod());
                api.setRequestContentType(addApiInput.getReqContentType());
                api.setResponseContentType(addApiInput.getRespContentType());
                api.setOutputData(addApiInput.getOutput());
                api.setFailData(addApiInput.getOutputFail());
                api.setInputTypeDesc(addApiInput.getInputParamDesc());
                api.setOutPutDesc(addApiInput.getOutPutDesc());
                api.setOutPutFailDesc(addApiInput.getOutPutFailDesc());

                api.setInputHeadFlag(addApiInput.getHeadersFlag());
                api.setInputBodyFlag(addApiInput.getBodyFlag());
                api.setInputBodyType(addApiInput.getInputTypeSelect());

                api.setApiName(addApiInput.getApiName());
                api.setPreAPI(addApiInput.getPreApi());
                api.setVersionNo(addApiInput.getVersion());
                api.setDbNameAndTableName(addApiInput.getDbNameTable());
                api.setIsExpired(addApiInput.getIsExpired());



                if(null == apiService.selectApiByApiNameOrUrlMD5(api)){
                    //判断各类选项的参数数据
                    //如果headFlag和bodyflag都是0，则不需要需任何入参数据
                    if(api.getInputHeadFlag() == 0 && api.getInputBodyFlag() == 0){
                        apiService.insert(api);
                        result.setSuccess(true);
                        result.setData(api);
                    }

                    if(api.getInputHeadFlag() == 1 && api.getInputBodyFlag() == 0){
                        //header has params,get header params
                        InputParam[] inputParams = addApiInput.getHeadParams();
                        if(inputParams == null || inputParams.length < 1){
                            result.setSuccess(false);
                            result.setDesc("sorry,no header params");
                        }else{
                            result = insertAll(result,api,inputParams,new InputParam[0]);
                        }
                    }else if(api.getInputHeadFlag() == 0 && api.getInputBodyFlag() == 1){
                        //分为两种情况：form类型和非form类型
                        InputParam[] inputParams = addApiInput.getBodyParams();
                        if(api.getInputBodyType() == 2){
                            inputParams = buildInputParams(addApiInput.getBodyRaw());
                        }
                        result = insertAll(result,api,new InputParam[0],inputParams);
                    }else if(api.getInputHeadFlag() == 1 && api.getInputBodyFlag() == 1){
                        InputParam[] headInputParams = addApiInput.getHeadParams();
                        InputParam[] bodyInputParams = addApiInput.getBodyParams();
                        if(headInputParams == null || headInputParams.length < 1){
                            result.setSuccess(false);
                            result.setDesc("sorry,no header params");
                        }else{
                            if(api.getInputBodyType() == 2){
                                bodyInputParams = buildInputParams(addApiInput.getBodyRaw());
                            }
                            result = insertAll(result,api,headInputParams,bodyInputParams);
                        }
                    }

                }else{
                    result.setSuccess(false);
                    result.setDesc("API Name or URL is exist");
                }



            }
        }
        return result;
    }

    private InputParam[] buildInputParams(String bodyRaw){
        InputParam[] inputParams = new InputParam[1];
        InputParam _inputParam = new InputParam();
        _inputParam.setDesc("");
        _inputParam.setIsMust(1);
        _inputParam.setKey("none");
        _inputParam.setParamType(2);
        _inputParam.setSpec("");
        _inputParam.setUnit(1);
        _inputParam.setValue(bodyRaw);
        inputParams[0] = _inputParam;
        return inputParams;
    }

    private Result insertAll(Result result, Api api, InputParam[] headInputParams, InputParam[] bodyInputParams){
        try {
            if (apiService.insertAll(api, headInputParams, bodyInputParams)){
                result.setSuccess(true);
                result.setData(api);
            }else{
                result.setSuccess(false);
                result.setDesc("add api failed");
            }
        } catch (Exception e) {
            result.setSuccess(false);
            result.setDesc("add api exception:" + e.getMessage());
        }
        return result;
    }

    @RequestMapping("/restful/apigroups")
    public List<Node> getApiGroups(){
        //System.out.println(dicCache.getMethods());
        Node root = new Node();
        root.setId(0);
        root.setState("open");
        root.setText("API Group");
        root.setChildren(new ArrayList<Node>());
        List<ApiGroup> apiGroups = apiGroupService.selectApiGroupList();
        if(null != apiGroups && apiGroups.size()>0){
            for(int i=0;i<apiGroups.size();i++){
                ApiGroup _apiG =  apiGroups.get(i);
                Node _node = new Node();
                _node.setId(_apiG.getId());
                _node.setText(_apiG.getGroupName());

                root.getChildren().add(_node);
            }
        }
        List<Node> apiGroupList = new ArrayList<Node>();
        apiGroupList.add(root);

        return apiGroupList;
    }

    @RequestMapping("/restful/addapigroup")
    public Result addApiGroups(ApiGroup apiGroup){
        Result result = new Result();
        if(null == apiGroup || null == apiGroup.getGroupName() || "".equals(apiGroup.getGroupName())){
            result.setSuccess(false);
            result.setDesc("Group Name is empty");
        }else {
            if(apiGroupService.selectApiGroupNameCount(apiGroup) <= 0){
                if (apiGroupService.addApiGroup(apiGroup) == 1) {
                    result.setSuccess(true);
                } else {
                    result.setSuccess(false);
                }
            }else{
                result.setSuccess(false);
                result.setDesc("Group Name is duplication");
            }
        }
        return result;
    }

    @RequestMapping("/restful/updateapigroup")
    public Result updateApiGroup(ApiGroup apiGroup){
        Result result = new Result();

        if(null == apiGroup || null == apiGroup.getGroupName() || "".equals(apiGroup.getGroupName())){
            result.setSuccess(false);
            result.setDesc("Group Name is empty");
        }else{
            if(apiGroupService.updateApiGroupById(apiGroup) == 1){
                result.setSuccess(true);
            }else{
                result.setSuccess(false);
            }
        }
        return result;
    }

    @RequestMapping("/restful/delapigroup")
    public Result delApiGroup(ApiGroup apiGroup){
        Result result = new Result();

        /*if(apiGroupService.deleteApiGroupById(apiGroup) == 1){
            result.setSuccess(true);
        }else{
            result.setSuccess(false);
        }*/
        return result;
    }

}
