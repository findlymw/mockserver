package cn.jts.t.dao;

import cn.jts.t.entity.ApiGroup;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ApiGroupMapper {
    @Select("select * from ms_apigroup")
    public List<ApiGroup> selectApiGroupList();
    @Insert("insert into ms_apigroup (groupName) values (#{groupName})")
    public int addApiGroup(ApiGroup apiGroup);
    @Update("update ms_apigroup set groupName = #{groupName} where id = #{id}")
    public int updateApiGroupById(ApiGroup apiGroup);
    @Delete("delete from ms_apigroup where id = #{id}")
    public int deleteApiGroupById(ApiGroup apiGroup);
}
