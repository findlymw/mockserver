package cn.jts.t.service;

import cn.jts.t.entity.Api;
import cn.jts.t.entity.input.InputParam;

public interface ApiService {
    int insert(Api api);
    Api selectApiByApiNameOrUrlMD5(Api api);

    boolean insertAll(Api api, InputParam[] headInputParams,InputParam[] bodyInputParams) throws Exception;

}
