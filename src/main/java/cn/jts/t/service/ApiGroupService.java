package cn.jts.t.service;

import cn.jts.t.entity.ApiGroup;

import java.util.List;

public interface ApiGroupService {
    public List<ApiGroup> selectApiGroupList();
    public int addApiGroup(ApiGroup apiGroup);
    public int updateApiGroupById(ApiGroup apiGroup);
    public int deleteApiGroupById(ApiGroup apiGroup);
}
