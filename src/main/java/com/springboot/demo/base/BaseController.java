package com.springboot.demo.base;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @program: demo
 * @description: 基本Controller
 * @author: Zhangxike
 * @create: 2019-09-24 15:33
 **/
@Controller
@Slf4j
public class BaseController {
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(){
        int i = 7/0;
        return "jsp/index";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home(){

        return "html/test";
    }
}
