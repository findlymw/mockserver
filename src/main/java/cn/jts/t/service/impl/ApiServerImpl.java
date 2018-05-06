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
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public boolean insertAll(Api api, InputParam[] headInputParams, InputParam[] bodyInputParams) throws Exception{
        apiMapper.insert(api);
        setInput(api, headInputParams);
        setInput(api, bodyInputParams);
        return true;
    }

    private void setInput(Api api, InputParam[] inputParams) throws Exception {
        for(int i=0;i<inputParams.length;i++){
            InputParam inputParam = inputParams[i];
            Input input = new Input();
            input.setApiId(api.getId());
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
