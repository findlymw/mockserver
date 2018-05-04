package cn.jts.t.service.impl;

import cn.jts.t.dao.DicMapper;
import cn.jts.t.entity.*;
import cn.jts.t.service.DicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DicServiceImpl implements DicService {

    @Autowired
    private DicMapper dicMapper;


    @Override
    public List<ColumType> columTypes() {
        return dicMapper.selectColumTypeList();
    }

    @Override
    public List<ContentType> contentTypes() {
        return dicMapper.selectContentTypeList();
    }

    @Override
    public List<InputType> inputTypes() {
        return dicMapper.selectInputTypeList();
    }

    @Override
    public List<Method> methods() {
        return dicMapper.selectMethodList();
    }

    @Override
    public List<Unit> units() {
        return dicMapper.selectUnitList();
    }
}
