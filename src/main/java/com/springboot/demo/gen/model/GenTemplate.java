package com.springboot.demo.gen.model;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;


@XmlRootElement(name = "template")
public class GenTemplate implements Serializable {

    /**
     * 名称
     */
    private String name;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 内容
     */
    private String content;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}


