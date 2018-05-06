package cn.jts.t.dao;

import cn.jts.t.entity.Api;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.mapping.StatementType;


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
}
