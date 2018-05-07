package cn.jts.t.dao;

import cn.jts.t.entity.Input;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InputMapper {
    @Insert("insert into ms_input ("+
            "apiId,hbType,paramName,paramType,paramSpec,paramDesc,paramUnit,paramValue,isMust"+
            ") values ("+
            "#{apiId},#{hbType},#{paramName},#{paramType},#{paramSpec},#{paramDesc},#{paramUnit},#{paramValue},#{isMust}"+
            ")")
    int insert(Input input) throws Exception;
}
