package cn.jts.t.service;

import cn.jts.t.entity.Api;
import cn.jts.t.entity.Input;

import java.util.List;

public interface InputService {
    List<Input> selectInputByApiId(Api api);
    int deleteInputByApiId(Input input);
}
