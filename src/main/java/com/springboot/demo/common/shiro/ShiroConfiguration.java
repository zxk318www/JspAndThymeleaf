package com.springboot.demo.common.shiro;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import net.sf.ehcache.CacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.io.ResourceUtils;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.ErrorPageFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

/**
 * @program: questionnaire
 * @description:
 * @author: Zhangxike
 * @create: 2019-09-03 20:30
 **/
@Configuration
public class ShiroConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(ShiroConfiguration.class);

    @Bean
    public CacheManager getCacheManager() {
        CacheManager manager = null;
        try {
            manager = new CacheManager(ResourceUtils.getInputStreamForPath("classpath:cache/ehcache-local.xml"));
        } catch (IOException e) {
            logger.error("", e);
        }
        return manager;
    }

    @Bean(name = "shiroDialect")
    public ShiroDialect shiroDialect() {
        return new ShiroDialect();
    }

    @Bean
    public EhCacheManager getEhCacheManager(CacheManager manager) {
        EhCacheManager em = new EhCacheManager();
        em.setCacheManager(manager);
        return em;
    }

    @Bean
    public ErrorPageFilter errorPageFilter() {
        return new ErrorPageFilter();
    }

    @Bean
    public FilterRegistrationBean disableSpringBootErrorFilter(ErrorPageFilter filter) {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(filter);
        filterRegistrationBean.setEnabled(false);
        return filterRegistrationBean;
    }

    /**
     * 注册DelegatingFilterProxy（Shiro）
     */
//    @Bean
//    public FilterRegistrationBean filterRegistrationBean() {
//        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
//        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter"));
//        //  该值缺省为false,表示生命周期由SpringApplicationContext管理,设置为true则表示由ServletContainer管理
//        filterRegistration.addInitParameter("targetFilterLifecycle", "true");
//        filterRegistration.setEnabled(true);
//        filterRegistration.addUrlPatterns("/*");
//        return filterRegistration;
//    }
//
//
//    @Bean(name = "lifecycleBeanPostProcessor")
//    public LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {
//        return new LifecycleBeanPostProcessor();
//    }
//
//    @Bean
//    public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
//        DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
//        daap.setProxyTargetClass(true);
//        return daap;
//    }

    @Bean(name = "sessionIdCookie")
    public SimpleCookie getSimpleCookie() {
        SimpleCookie simpleCookie = new SimpleCookie("uid");
        simpleCookie.setHttpOnly(true);
        simpleCookie.setMaxAge(-1);
        return simpleCookie;
    }

    @Bean(name = "sessionManager")
    public DefaultWebSessionManager getSessionManager(SimpleCookie sessionIdCookie) {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.setGlobalSessionTimeout(3600000);
        sessionManager.setDeleteInvalidSessions(true);
        sessionManager.setSessionValidationInterval(3600000);
        sessionManager.setSessionValidationSchedulerEnabled(true);
//        sessionManager.setSessionValidationScheduler(quartzSessionValidationScheduler);
        sessionManager.setSessionIdCookieEnabled(true);
        sessionManager.setSessionIdCookie(sessionIdCookie);
        return sessionManager;
    }

//    @Bean(name = "securityManager")
//    public DefaultWebSecurityManager getDefaultWebSecurityManager(SysAuthorizingRealm realm,
//                                                                  EhCacheManager ehCacheManager,
//                                                                  DefaultWebSessionManager sessionManager) {
//        DefaultWebSecurityManager dwsm = new DefaultWebSecurityManager();
//        dwsm.setRealm(realm);
//        dwsm.setSessionManager(sessionManager);
//        dwsm.setCacheManager(ehCacheManager);
//        // 指定 SubjectFactory
//        return dwsm;
//    }

//    @Bean
//    public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
//        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
//        aasa.setSecurityManager(securityManager);
//        return aasa;
//    }
//    @Bean
//    public ServletListenerRegistrationBean SingleSignOutRegistration() {
//        ServletListenerRegistrationBean registration = new ServletListenerRegistrationBean();
//        registration.setListener(new SingleSignOutHttpSessionListener());
//        return registration;
//    }
//
//    @Bean(name = "shiroFilter")
//    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager securityManager,
//                                                            @Value("${shiro.successUrl}") String successUrl,
//                                                            @Value("${shiro.unauthorizedUrl}") String unauthUrl,
//                                                            @Value("${shiro.anonUrl}") String mappings) {
//        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
//        // 必须设置 SecurityManager
//        shiroFilterFactoryBean.setSecurityManager(securityManager);
//        // 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
//        shiroFilterFactoryBean.setLoginUrl("/login");
//        // 登录成功后要跳转的连接
//        shiroFilterFactoryBean.setSuccessUrl(successUrl);
//        shiroFilterFactoryBean.setUnauthorizedUrl(unauthUrl);
//
//        // 设置拦截器
//        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
//        // shiro集成cas后，首先添加该规则
//        String mappingsArr[] = mappings.split(";");
//        for (String mapping : mappingsArr) {
//            String[] kv = mapping.split(":");
//            if (kv.length == 2) {
//                filterChainDefinitionMap.put(kv[0].trim(), kv[1].trim());
//            }
//        }
//        filterChainDefinitionMap.put("/**", "authc");
//        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
//
//        return shiroFilterFactoryBean;
//    }



}
