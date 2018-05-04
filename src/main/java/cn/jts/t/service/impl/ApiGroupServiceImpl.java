package cn.jts.t.service.impl;

import cn.jts.t.dao.ApiGroupMapper;
import cn.jts.t.entity.ApiGroup;
import cn.jts.t.service.ApiGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ApiGroupServiceImpl implements ApiGroupService {
    @Autowired
    private ApiGroupMapper apiGroupMapper;
    @Override
    public List<ApiGroup> selectApiGroupList() {
        return apiGroupMapper.selectApiGroupList();
    }

    @Override
    public int addApiGroup(ApiGroup apiGroup) {
        return apiGroupMapper.addApiGroup(apiGroup);
    }

    @Override
    public int updateApiGroupById(ApiGroup apiGroup) {
        return apiGroupMapper.updateApiGroupById(apiGroup);
    }

    @Override
    public int deleteApiGroupById(ApiGroup apiGroup) {
        return apiGroupMapper.deleteApiGroupById(apiGroup);
    }
}
