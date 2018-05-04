package cn.jts.t.service;

import cn.jts.t.entity.ApiGroup;

import java.util.List;

public interface ApiGroupService {
    List<ApiGroup> selectApiGroupList();
    int addApiGroup(ApiGroup apiGroup);
    long selectApiGroupNameCount(ApiGroup apiGroup);
    int updateApiGroupById(ApiGroup apiGroup);
    int deleteApiGroupById(ApiGroup apiGroup);
}
