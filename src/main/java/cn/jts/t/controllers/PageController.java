package cn.jts.t.controllers;

import cn.jts.t.entity.Api;
import cn.jts.t.entity.ApiGroup;
import cn.jts.t.entity.DicCache;
import cn.jts.t.service.ApiGroupService;
import cn.jts.t.service.ApiService;
import cn.jts.t.service.InputService;
import cn.jts.t.utils.ApiTrans;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class PageController {


    @Autowired
    private ApiService apiService;

    @Autowired
    private DicCache dicCache;

    @Autowired
    private ApiGroupService apiGroupService;

    @Autowired
    private InputService inputService;

    @RequestMapping("/index.html")
    public String index(){

        return "index";
    }

    @RequestMapping("/addapi.html")
    public String addapi(){

        return "addApi";
    }

    @RequestMapping("/viewapi/{id}.html")
    public String viewapi(@PathVariable long id,Map<String, Object> model){
        model.put("api", id);
        return "viewapi";
    }
}
