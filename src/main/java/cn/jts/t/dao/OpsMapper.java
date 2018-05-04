package cn.jts.t.dao;

import cn.jts.t.entity.Ops;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OpsMapper {

    @Select("select * from ms_ops")
    public List<Ops> selectOpsList();

}
