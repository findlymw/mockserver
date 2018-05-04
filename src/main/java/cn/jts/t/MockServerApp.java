package cn.jts.t;

import cn.jts.t.entity.DicCache;
import cn.jts.t.service.DicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MockServerApp {
    @Autowired
    private DicService dicService;

    @Bean
    public DicCache init(){
        return new DicCache(dicService);
    }


    public static void main(String[] args){

        SpringApplication.run(MockServerApp.class,args);
    }
}
