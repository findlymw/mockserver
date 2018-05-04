package cn.jts.t.dao;

import cn.jts.t.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DicMapper {
    @Select("select * from ms_method")
    List<Method> selectMethodList();

    @Select("select * from ms_inputtype")
    List<InputType> selectInputTypeList();

    @Select("select * from ms_contenttype")
    List<ContentType> selectContentTypeList();

    @Select("select * from ms_unit")
    List<Unit> selectUnitList();

    @Select("select * from ms_columtype")
    List<ColumType> selectColumTypeList();


}
