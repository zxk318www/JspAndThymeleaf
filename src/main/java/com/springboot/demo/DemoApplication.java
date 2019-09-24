package com.springboot.demo;

import com.springboot.demo.common.utils.SpringContextHolder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

/**
* @Description:  springboot 启动
 *               springboot项目，若打包成war包，使用外置的tomcat启动
 *
 * 1、需要继承 org.springframework.boot.context.web.SpringBootServletInitializer类
 *
 * 2、然后重写configure(SpringApplicationBuilder application)方法
 *
* @Param:
* @return:
* @Author: Zhangxike
* @Date: 2019/9/24
*/
@SpringBootApplication
public class DemoApplication extends SpringBootServletInitializer {

    @Bean
    public SpringContextHolder springContextHolder() {
        return new SpringContextHolder();
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DemoApplication.class);
    }
}
