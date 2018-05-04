package cn.jts.t.controllers;

import cn.jts.t.entity.DicCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {


    @RequestMapping("/index.html")
    public String index(){

        return "index";
    }

    @RequestMapping("/addapi.html")
    public String addapi(){

        return "addApi";
    }
}
