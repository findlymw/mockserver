package cn.jts.t.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @RequestMapping(value = "/gateway/{url}")
    public String main(@PathVariable String url){

        return url;
    }
}
