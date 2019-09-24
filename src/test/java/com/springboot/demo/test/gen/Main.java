package com.springboot.demo.test.gen;


import com.springboot.demo.gen.utils.GenUtils;

/**
 *
 */
public class Main {

    public static final String ENTITY_TYPE_GRID = "grid";
//    public static final String ENTITY_TYPE_TREE = "tree";

    static {
        String packageName = "springboot.demo";
        String dbName = GenUtils.MYSQL;
        String dbIp = "";
        String dbPort = "";
        String db = "";
        String username = "";
        String password = "";
        GenUtils.init(packageName, dbName, dbIp, dbPort, db, username, password);
    }

    public static void main(String[] args) {
        createPersonInfo();
    }

    private static void createPersonInfo() { //
        String schema = "healthcloud_questionnaire";
        String tableName = "zzwj_t_personinfo";
        String moduleName = "sys";
        String className = "PersonInfo";
        GenUtils.createMain(schema, tableName, moduleName, className, ENTITY_TYPE_GRID, "基本信息", "zhangxike");
    }

}
