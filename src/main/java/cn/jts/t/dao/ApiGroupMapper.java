package cn.jts.t.dao;

import cn.jts.t.entity.ApiGroup;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ApiGroupMapper {
    @Select("select * from ms_apigroup")
    List<ApiGroup> selectApiGroupList();
    @Select("select count(id) from ms_apigroup where groupName = #{groupName}")
    long selectApiGroupNameCount(ApiGroup apiGroup);
    @Insert("insert into ms_apigroup (groupName) values (#{groupName})")
    int addApiGroup(ApiGroup apiGroup);
    @Update("update ms_apigroup set groupName = #{groupName} where id = #{id}")
    int updateApiGroupById(ApiGroup apiGroup);
    @Delete("delete from ms_apigroup where id = #{id}")
    int deleteApiGroupById(ApiGroup apiGroup);
}
