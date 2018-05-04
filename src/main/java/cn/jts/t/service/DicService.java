package cn.jts.t.service;

import cn.jts.t.entity.*;

import java.util.List;

public interface DicService {
    List<ColumType> columTypes();
    List<ContentType> contentTypes();
    List<InputType> inputTypes();
    List<Method>  methods();
    List<Unit> units();
}
