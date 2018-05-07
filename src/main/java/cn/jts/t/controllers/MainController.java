package cn.jts.t.controllers;

import cn.jts.t.entity.Api;
import cn.jts.t.filter.APIFilter;
import cn.jts.t.service.ApiService;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    private ApiService apiService;

    @RequestMapping(value = "/gateway/{url}")
    public Object main(@PathVariable String url){
        Api api = new Api();
        if(null != url){
            api.setUrlMD5(url);
            api = apiService.selectApiByApiNameOrUrlMD5(api);
        }
        if(null == api){
            api = new Api();
            api.setOutputData("{}");
        }
        return JSON.parse(api.getOutputData());
    }

}
