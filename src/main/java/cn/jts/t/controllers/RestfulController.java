package cn.jts.t.controllers;

import cn.jts.t.entity.ApiGroup;
import cn.jts.t.entity.DicCache;
import cn.jts.t.entity.Result;
import cn.jts.t.entity.tree.Node;
import cn.jts.t.service.ApiGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RestfulController {

    @Autowired
    private ApiGroupService apiGroupService;

    @Autowired
    private DicCache dicCache;

    @RequestMapping("/restful/dic")
    public DicCache getDicCache(){
        dicCache.setApiGroups(apiGroupService.selectApiGroupList());
        return dicCache;
    }

    @RequestMapping("/restful/apigroups")
    public List<Node> getApiGroups(){
        //System.out.println(dicCache.getMethods());
        Node root = new Node();
        root.setId(0);
        root.setState("open");
        root.setText("API Group");
        root.setChildren(new ArrayList<Node>());
        List<ApiGroup> apiGroups = apiGroupService.selectApiGroupList();
        if(null != apiGroups && apiGroups.size()>0){
            for(int i=0;i<apiGroups.size();i++){
                ApiGroup _apiG =  apiGroups.get(i);
                Node _node = new Node();
                _node.setId(_apiG.getId());
                _node.setText(_apiG.getGroupName());

                root.getChildren().add(_node);
            }
        }
        List<Node> apiGroupList = new ArrayList<Node>();
        apiGroupList.add(root);

        return apiGroupList;
    }

    @RequestMapping("/restful/addapigroup")
    public Result addApiGroups(ApiGroup apiGroup){
        Result result = new Result();
        if(null == apiGroup || null == apiGroup.getGroupName() || "".equals(apiGroup.getGroupName())){
            result.setSuccess(false);
            result.setDesc("Group Name is empty");
        }else {
            if(apiGroupService.selectApiGroupNameCount(apiGroup) <= 0){
                if (apiGroupService.addApiGroup(apiGroup) == 1) {
                    result.setSuccess(true);
                } else {
                    result.setSuccess(false);
                }
            }else{
                result.setSuccess(false);
                result.setDesc("Group Name is duplication");
            }
        }
        return result;
    }

    @RequestMapping("/restful/updateapigroup")
    public Result updateApiGroup(ApiGroup apiGroup){
        Result result = new Result();

        if(null == apiGroup || null == apiGroup.getGroupName() || "".equals(apiGroup.getGroupName())){
            result.setSuccess(false);
            result.setDesc("Group Name is empty");
        }else{
            if(apiGroupService.updateApiGroupById(apiGroup) == 1){
                result.setSuccess(true);
            }else{
                result.setSuccess(false);
            }
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
