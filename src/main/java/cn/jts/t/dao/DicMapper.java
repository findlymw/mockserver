package cn.jts.t.dao;

import cn.jts.t.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DicMapper {
    @Select("select * from ms_method")
    public List<Method> selectMethodList();

    @Select("select * from ms_inputtype")
    public List<InputType> selectInputTypeList();

    @Select("select * from ms_contenttype")
    public List<ContentType> selectContentTypeList();

    @Select("select * from ms_unit")
    public List<Unit> selectUnitList();

    @Select("select * from ms_columtype")
    public List<ColumType> selectColumTypeList();


}
