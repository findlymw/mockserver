package cn.jts.t.dao;

import cn.jts.t.entity.Api;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.StatementType;

import java.util.List;


@Mapper
public interface ApiMapper {
    @Insert({"insert into ms_api (groupId,apiName,urlMD5,urlString,method,outputData,dbNameAndTableName,preAPI,failData,"+
            "versionNo,isExpired,requestContentType,responseContentType,inputBodyType,inputBodyFlag,inputHeadFlag,"+
            "outPutFailDesc,outPutDesc,inputTypeDesc) values ("+
            "#{groupId},#{apiName},#{urlMD5},#{urlString},#{method},#{outputData},#{dbNameAndTableName},#{preAPI},#{failData},"+
            "#{versionNo},#{isExpired},#{requestContentType},#{responseContentType},#{inputBodyType},#{inputBodyFlag},#{inputHeadFlag},"+
            "#{outPutFailDesc},#{outPutDesc},#{inputTypeDesc}"+
            ")"})
    @SelectKey(statement = "SELECT last_insert_id() as id",
            keyProperty = "id", before = false,
            resultType = Long.class, statementType = StatementType.STATEMENT)
    int insert(Api api);

    @Select("select * from ms_api where apiName = #{apiName} || urlMD5 = #{urlMD5}")
    Api selectApiByApiNameOrUrlMD5(Api api);


    @Select("select * from ms_api where groupId =  #{groupId}")
    List<Api> selectApiByGroupId(Api api);

    @Select("select * from ms_api where urlMD5 =  #{urlMD5}")
    Api selectApiByGroupMD5(Api api);

    @Select("select * from ms_api where id =  #{id}")
    Api selectApiById(Api api);


    @Delete("delete from ms_api where id = #{id}")
    int deleteApi(Api api);

    @Update("update ms_api set groupId = #{groupId},apiName = #{apiName},urlMD5 = #{urlMD5},urlString = #{urlString},"+
            "method = #{method},outputData = #{outputData},dbNameAndTableName = #{dbNameAndTableName},preAPI = #{preAPI},"+
            "failData = #{failData},versionNo = #{versionNo},isExpired = #{isExpired},requestContentType = #{requestContentType}"+
            ",responseContentType = #{responseContentType},inputBodyType = #{inputBodyType},inputBodyFlag = #{inputBodyFlag},"+
            "inputHeadFlag = #{inputHeadFlag},outPutFailDesc = #{outPutFailDesc},outPutDesc = #{outPutDesc},inputTypeDesc = #{inputTypeDesc}"+
            " where id = #{id}")
    int updateById(Api api);
}
