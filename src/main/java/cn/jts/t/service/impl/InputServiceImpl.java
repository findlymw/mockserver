package cn.jts.t.service.impl;

import cn.jts.t.dao.InputMapper;
import cn.jts.t.entity.Api;
import cn.jts.t.entity.Input;
import cn.jts.t.service.InputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class InputServiceImpl implements InputService{
    @Autowired
    private InputMapper inputMapper;
    @Override
    public List<Input> selectInputByApiId(Api api) {
        return inputMapper.selectInputByApiId(api);
    }

    @Override
    public int deleteInputByApiId(Input input) {
        return inputMapper.deleteInputByApiId(input);
    }
}
