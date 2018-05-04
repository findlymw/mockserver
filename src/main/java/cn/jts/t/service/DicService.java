package cn.jts.t.service;

import cn.jts.t.entity.*;

import java.util.List;

public interface DicService {
    public List<ColumType> columTypes();
    public List<ContentType> contentTypes();
    public List<InputType> inputTypes();
    public List<Method>  methods();
    public List<Unit> units();
}
