package com.springboot.demo.base;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: demo
 * @description: 捕获异常类
 * @author: Zhangxike
 * @create: 2019-09-25 10:20
 **/
//控制器切面
@ControllerAdvice
public class GlobalExceptionHandler {

    //捕获运行时异常
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public Map<String,Object> exceptionHander(){
        Map<String,Object> map = new HashMap<>();
        map.put("msg","错误");
        map.put("code", "1");
        return map;
    }
}
