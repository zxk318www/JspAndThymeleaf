package com.springboot.demo.base;

import com.springboot.demo.common.utils.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.net.URLDecoder;

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

        return "jsp/index";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home(){

        return "html/test";
    }
}
