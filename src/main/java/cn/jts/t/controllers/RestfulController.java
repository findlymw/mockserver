package cn.jts.t.controllers;

import cn.jts.t.entity.ApiGroup;
import cn.jts.t.entity.DicCache;
import cn.jts.t.entity.Result;
import cn.jts.t.service.ApiGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestfulController {

    @Autowired
    private ApiGroupService apiGroupService;

    @Autowired
    private DicCache dicCache;

    @RequestMapping("/restful/apigroups")
    public List<ApiGroup> getApiGroups(){
        System.out.println(dicCache.getMethods());
        return apiGroupService.selectApiGroupList();
    }

    @RequestMapping("/restful/addapigroup")
    public Result addApiGroups(ApiGroup apiGroup){
        Result result = new Result();

        if(apiGroupService.addApiGroup(apiGroup) == 1){
            result.setSuccess(true);
        }else{
            result.setSuccess(false);
        }

        return result;
    }

    @RequestMapping("/restful/updateapigroup")
    public Result updateApiGroup(ApiGroup apiGroup){
        Result result = new Result();

        if(apiGroupService.updateApiGroupById(apiGroup) == 1){
            result.setSuccess(true);
        }else{
            result.setSuccess(false);
        }
        return result;
    }

    @RequestMapping("/restful/delapigroup")
    public Result delApiGroup(ApiGroup apiGroup){
        Result result = new Result();

        if(apiGroupService.deleteApiGroupById(apiGroup) == 1){
            result.setSuccess(true);
        }else{
            result.setSuccess(false);
        }
        return result;
    }

}
