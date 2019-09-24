package com.springboot.demo.common.cache;

import java.util.List;

/**
 * @program: questionnaire
 * @description:
 * @author: Zhangxike
 * @create: 2019-09-03 20:19
 **/
public class CacheVo {

    private String key;

    private List<CacheMeta> metas;

    public CacheVo() {
        super();
    }

    public CacheVo(String key, List<CacheMeta> metas) {
        super();
        this.key = key;
        this.metas = metas;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public List<CacheMeta> getMetas() {
        return metas;
    }

    public void setMetas(List<CacheMeta> metas) {
        this.metas = metas;
    }

}
