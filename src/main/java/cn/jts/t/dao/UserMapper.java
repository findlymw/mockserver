package cn.jts.t.dao;

import cn.jts.t.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Insert("insert into ms_user(userName,password) values(#{userName},#{password})")
    public int save(User user);

    public User get(int id);

    @Select("select * from ms_user where admin = 0")
    public List<User> getAll();

    @Delete("delete from ms_user where id = #{id}")
    public int delUser(int id);


    @Select("select * from ms_user where username = #{userName} and password = #{password}")
    public User getUserByUP(User user);

    @Update("update ms_user set password = #{password} where id = #{id}")
    public int updatePasswordByUserId(User user);
}
