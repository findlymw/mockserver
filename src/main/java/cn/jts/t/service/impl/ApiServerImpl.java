package cn.jts.t.service.impl;

import cn.jts.t.dao.ApiMapper;
import cn.jts.t.dao.InputMapper;
import cn.jts.t.entity.Api;
import cn.jts.t.entity.Input;
import cn.jts.t.entity.input.InputParam;
import cn.jts.t.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApiServerImpl implements ApiService{
    @Autowired
    private ApiMapper apiMapper;
    @Autowired
    private InputMapper inputMapper;
    @Override
    public int insert(Api api) {
        return apiMapper.insert(api);
    }

    @Override
    public Api selectApiByApiNameOrUrlMD5(Api api) {
        return apiMapper.selectApiByApiNameOrUrlMD5(api);
    }

    @Override
    public List<Api> selectApiByGroupId(Api api) {
        return apiMapper.selectApiByGroupId(api);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public boolean insertAll(Api api, InputParam[] headInputParams, InputParam[] bodyInputParams) throws Exception{
        apiMapper.insert(api);
        setInput(api, headInputParams,0);
        setInput(api, bodyInputParams,1);
        return true;
    }

    @Override
    public Api selectApiByGroupMD5(Api api) {
        return apiMapper.selectApiByApiNameOrUrlMD5(api);
    }

    @Override
    public Api selectApiById(Api api) {
        return apiMapper.selectApiById(api);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int deleteApi(Api api) {
        int count = 0;
        count += apiMapper.deleteApi(api);
        Input input = new Input();
        input.setApiId(api.getId());
        count += inputMapper.deleteInputByApiId(input);
        return count;

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int updateById(Api api) throws Exception {
        //先更新api
        int count = 0;
        count += apiMapper.updateById(api);
        return count;
    }

    private void updateInputs(Input[] headList) throws Exception {
        Input _input;
        for(Input input : headList){
            //查询是否有这个input
            _input = inputMapper.selectInputById(input);
            if(null == _input){
                inputMapper.insert(input);
            }else{
                inputMapper.updateInputById(input);
            }

        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int deleteApiAll(Api api, Input input) {
        int count = 0;
        count += apiMapper.deleteApi(api);
        count += inputMapper.deleteInputByApiId(input);
        return count;
    }

    //hbType : 0为header参数的类型 1为body参数的类型
    private void setInput(Api api, InputParam[] inputParams,int hbType) throws Exception {
        for(int i=0;i<inputParams.length;i++){
            InputParam inputParam = inputParams[i];
            Input input = new Input();
            input.setApiId(api.getId());
            input.setHbType(hbType);
            input.setIsMust(inputParam.getIsMust());
            input.setParamDesc(inputParam.getDesc());
            input.setParamName(inputParam.getKey());
            input.setParamSpec(inputParam.getSpec());
            input.setParamType(inputParam.getParamType());
            input.setParamUnit(inputParam.getUnit());
            input.setParamValue(inputParam.getValue());
            inputMapper.insert(input);
        }
    }
}
