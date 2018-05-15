package cn.jts.t.dao;

import cn.jts.t.entity.Api;
import cn.jts.t.entity.Input;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InputMapper {
    @Insert("insert into ms_input ("+
            "apiId,hbType,paramName,paramType,paramSpec,paramDesc,paramUnit,paramValue,isMust"+
            ") values ("+
            "#{apiId},#{hbType},#{paramName},#{paramType},#{paramSpec},#{paramDesc},#{paramUnit},#{paramValue},#{isMust}"+
            ")")
    int insert(Input input) throws Exception;

    @Select("select * from ms_input where apiId = #{id}")
    List<Input> selectInputByApiId(Api api);

    @Select("select * from ms_input where id = #{id}")
    Input selectInputById(Input input);

    @Delete("delete from ms_input where apiId = #{apiId}")
    int deleteInputByApiId(Input input);

    @Update("update ms_input set hbType = #{hbType},paramName = #{paramName},paramType = #{paramType},paramSpec = #{paramSpec}"+
    "paramDesc = #{paramDesc},paramUnit = #{paramUnit},paramValue = #{paramValue},isMust = #{isMust} where id = #{id}")
    int updateInputById(Input input);
}
