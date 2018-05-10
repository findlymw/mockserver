package cn.jts.t.service;

import cn.jts.t.entity.Api;
import cn.jts.t.entity.input.InputParam;

import java.util.List;

public interface ApiService {
    int insert(Api api);
    Api selectApiByApiNameOrUrlMD5(Api api);
    List<Api> selectApiByGroupId(Api api);
    boolean insertAll(Api api, InputParam[] headInputParams,InputParam[] bodyInputParams) throws Exception;
    Api selectApiByGroupMD5(Api api);
    Api selectApiById(Api api);
    int deleteApi(Api api);
}
