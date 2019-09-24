/**
 * {formSelector:'', btnSubmit:'', btnReset:'', datatype:{}, callback:function(){}}
 */
function createForm(option) {
    var defualtOption = {
        btnSubmit: option.btnSubmit,
        btnReset: option.btnReset,
        postonce: true,
        ajaxPost: true,
        showAllError: true,
        tiptype: function(msg, o, cssctl) {
            var input = o.obj.attr("type");
            if (o.type == 3) { //校验失败
                var target = undefined;
                if (input == "radio" || input == "checkbox") {
                    var pt = o.obj.parents('.skin-minimal');
                    pt.addClass("Validform_error");
                    target = pt.children().last();
                } else {
                    target = o.obj;
                }
                layer.tips(msg, target, {
                    tipsMore: true,
                    tips: 3
                });
            } else {
                if (input == "radio" || input == "checkbox") {
                    var pt = o.obj.parents('.skin-minimal');
                    pt.removeClass("Validform_error");
                }
            }
        },
        datatype: {
            "group": function(gets, obj, curform, regxp) {
                //参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
                var selector = obj.attr("dataParam");
                var flag = false;
                $(selector).each(function() {
                    if ($.trim(this.value) != '') {
                        flag = true;
                    }
                });
                if (flag) {
                    $(selector).each(function() {
                        var id = $(this).attr("id");
                        if (id != obj.attr("id")) {
                            form.ignore("#" + id);
                            form.unignore("#" + id);
                        }
                    });
                }
                return flag;
                //注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
            },
            "ajax": function(gets, obj, curform, regxp) {
                var paramUrl = obj.attr("dataUrl");
                var selector = obj.attr("dataParam");
                var data = {};
                data[obj.attr("name")] = gets;
                $(selector).each(function() {
                    data[this.name] = $.trim(this.value);
                });
                var flag = false;
                $.ajax({
                    type: "post",
                    url: paramUrl,
                    data: data,
                    async: false,
                    dataType: "json",
                    success: function(rs) { //{"info":"demo info","status":"y"}
                        flag = rs.status == 'y';
                    },
                    error: function(err) {}
                });
                return flag;
            },
            "personcard": function (gets, obj, curform, regxp) {
                //参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
                var number = gets;
                var date, Ai;
                var verify = "10X98765432";
                var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var area = ['', '', '', '', '', '', '', '', '', '', '', '北京', '天津', '河北', '山西', '内蒙古', '', '', '', '', '', '辽宁', '吉林', '黑龙江', '', '', '', '', '', '', '', '上海', '江苏', '浙江', '安微', '福建', '江西', '山东', '', '', '', '河南', '湖北', '湖南', '广东', '广西', '海南', '', '', '', '重庆', '四川', '贵州', '云南', '西藏', '', '', '', '', '', '', '陕西', '甘肃', '青海', '宁夏', '新疆', '', '', '', '', '', '台湾', '', '', '', '', '', '', '', '', '', '香港', '澳门', '', '', '', '', '', '', '', '', '国外'];
                var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
                if (re == null)
                    return false;
                if (re[1] >= area.length || area[re[1]] == "")
                    return false;
                if (re[2].length == 12) {
                    Ai = number.substr(0, 17);
                    date = [re[9], re[10], re[11]].join("");
                }
                else {
                    Ai = number.substr(0, 6) + "19" + number.substr(6);
                    date = ["19" + re[4], re[5], re[6]].join("");
                }
                if (!CheckyyyyMMdd(date))
                    return false;
                var sum = 0;
                for (var i = 0; i <= 16; i++) {
                    sum += Ai.charAt(i) * Wi[i];
                }
                Ai += verify.charAt(sum % 11);
                return (number.length == 18 && number == Ai);
            },
            //默认固定电话校验
            "vPhone":function (gets, obj, curform, regxp) {
                var reg =/^[0-9][0-9-]+$/;
                if($.trim(gets)!==''&&!reg.test(gets)){
                    return "电话格式不正确";
                }
                return true;
            },
            //默认手机校验
            "vMobilePhone":function (gets, obj, curform, regxp) {
                var reg =/^(1\d{10})$/;
                if($.trim(gets)!==''&&!(reg.test(gets)&&gets.length==11)){
                    return "手机格式不正确";
                }
                return true;
            },
            //手机固话只能选一个校验,只适用表单只有一对组件，多个需自行判断
            "groupPhone":function (gets, obj, curform, regxp) {
                var phone=curform.find("[datatype*='vPhone']").val();
                var mobile=curform.find("[datatype*='vMobilePhone']").val();
                if((phone==''||phone==undefined)&&(mobile==''||mobile==undefined)){
                    return false;
                }else {
                    curform.find("[datatype*='vPhone']").removeClass("Validform_error");
                    curform.find("[datatype*='vMobilePhone']").removeClass("Validform_error");
                    return true;
                }
            }
        },
        beforeCheck: option.beforeCheck,
        beforeSubmit: function(curform){
        },
        callback: function(data) {
            option.callback.call(this, form, data);
        }
    };
    option = $.extend({}, defualtOption, option);
    option.datatype = $.extend({}, defualtOption.datatype, option.datatype);
    var form = $(option.formSelector).Validform(option);
    return form;
}

//全屏打开
function fullPage(title,url,end){
    var index = layer.open({
        type: 2,
        title: title,
        content: url,
        end:end
    });
    layer.full(index);
}

function open_tab(title,url){
    var bStop=false;
    var bStopIndex=0;
    var _href=url;
    var _titleName=title;
    var topWindow=$(window.parent.document);
    var show_navLi=topWindow.find("#min_title_list li");
    show_navLi.each(function() {
        var _dataHref = $(this).find('span').attr("data-href");
        var _dataHrefPos = _dataHref.indexOf("?");
        if(_dataHrefPos != -1) {
            _dataHref = _dataHref.substr(0,_dataHrefPos);
        }
        var _hrefCom = _href;
        var _hrefComPos = _hrefCom.indexOf("?");
        if(_hrefComPos != -1) {
            _hrefCom = _hrefCom.substr(0,_hrefComPos);
        }
        if(_dataHref==_hrefCom){
            bStop=true;
            bStopIndex=show_navLi.index($(this));
            return false;
        }
    });
    if(!bStop){
        creatIframe(_href,_titleName);
        min_titleList();
    }
    else{
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            var iframe_box=topWindow.find("#iframe_box");
            show_navLi.removeClass("active").eq(bStopIndex).remove();
            iframe_box.find(".show_iframe").hide().eq(bStopIndex).remove();
            creatIframe(_href,_titleName);
            min_titleList();
        } else {
            var li_box = show_navLi.removeClass("active").eq(bStopIndex);
            li_box.addClass("active");
            li_box.find("span").text(_titleName);
            var iframe_box=topWindow.find("#iframe_box");
            iframe_box.find(".show_iframe").hide().eq(bStopIndex).show().find("iframe").attr("src",_href);
        }
    }
}

function close_tab(url){
    var _href=url;
    var topWindow=$(window.parent.document);
    var show_navLi=topWindow.find("#min_title_list li");
    show_navLi.each(function() {
        var _dataHref = $(this).find('span').attr("data-href");
        var _dataHrefPos = _dataHref.indexOf("?");
        if(_dataHrefPos != -1) {
            _dataHref = _dataHref.substr(0,_dataHrefPos);
        }
        var _hrefCom = _href;
        var _hrefComPos = _hrefCom.indexOf("?");
        if(_hrefComPos != -1) {
            _hrefCom = _hrefCom.substr(0,_hrefComPos);
        }
        if(_dataHref==_hrefCom){
            var aCloseIndex =show_navLi.index($(this));

            $(this).remove();

            var iframe_box=topWindow.find("#iframe_box");

            iframe_box.find('.show_iframe').eq(aCloseIndex).remove();
            num==0?num=0:num--;
            show_navLi.removeClass("active").eq(aCloseIndex-1).addClass("active");
            iframe_box.find(".show_iframe").hide().eq(aCloseIndex-1).show();
            tabNavallwidth();
        }
    });
}

function refresh_tab_grid(url){
    var _href=url;
    var topWindow=$(window.parent.document);
    var show_navLi=topWindow.find("#min_title_list li");
    show_navLi.each(function() {
        var _dataHref = $(this).find('span').attr("data-href");
        var _dataHrefPos = _dataHref.indexOf("?");
        if(_dataHrefPos != -1) {
            _dataHref = _dataHref.substr(0,_dataHrefPos);
        }
        var _hrefCom = _href;
        var _hrefComPos = _hrefCom.indexOf("?");
        if(_hrefComPos != -1) {
            _hrefCom = _hrefCom.substr(0,_hrefComPos);
        }
        if(_dataHref==_hrefCom){
            var refreshIndex =show_navLi.index($(this));

            var iframe_box=topWindow.find("#iframe_box");

            $(iframe_box.find('.show_iframe').eq(refreshIndex).find("iframe")[0].contentWindow.document).find("#query").click();
        }
    });
}

function change_tab_name(title,url){
    var _href=url;
    var _titleName=title;
    var topWindow=$(window.parent.document);
    var show_navLi=topWindow.find("#min_title_list li");
    show_navLi.each(function() {
        var _dataHref = $(this).find('span').attr("data-href");
        var _dataHrefPos = _dataHref.indexOf("?");
        if(_dataHrefPos != -1) {
            _dataHref = _dataHref.substr(0,_dataHrefPos);
        }
        var _hrefCom = _href;
        var _hrefComPos = _hrefCom.indexOf("?");
        if(_hrefComPos != -1) {
            _hrefCom = _hrefCom.substr(0,_hrefComPos);
        }
        if(_dataHref==_hrefCom){
            $(this).find("span").text(_titleName);
        }
    });
}

function CheckyyyyMMdd(dayString) {
    // 年月日检验函数
    var digit = "0123456789";
    datelist = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (dayString.length != 8)
        return (false);
    for (var i = 0; i < 8; i++) {
        if (digit.indexOf(dayString.charAt(i), 0) == -1)
            return (false);
    }
    year = dayString.substr(0, 4); // 截取年部分
    month = dayString.substr(4, 2); // 截取月部分
    date = dayString.substr(6, 2); // 截取日部分
    if (year > 2200 || year < 1900 || month > 12 || month < 1 || date > 31 ||
        date < 1)
        return (false);
    if (date > datelist[month - 1])
        return (false);

    yyyy = eval(year);
    if (month == "02") {
        if ((yyyy % 400) == 0) {
            if (date > 29)
                return (false);
        }
        else if ((yyyy % 4) == 0 && (yyyy % 100) != 0) {
            if (date > 29)
                return (false);
        }
        else {
            if (date > 28)
                return (false);
        }
    }
    return (true);
} // end function CheckyyyyMMdd

/*tab选项卡*/
jQuery.HuitabCkd =function(tabBar,tabCon,class_name,tabEvent,i,funcCanMove){
    var $tab_menu=$(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();

    $tab_menu.on(tabEvent,function() {
        var check = true;
        var index = $tab_menu.index(this);

        if ($.isFunction(funcCanMove)) {
            check = funcCanMove.call(this, index);
        }

        if (check) {
            $tab_menu.removeClass(class_name);
            $(this).addClass(class_name);
            $(tabCon).hide();
            $(tabCon).eq(index).show();
        }
    });
}
//校验身份证
function IsIdCard(numberTmp) {
    var number = numberTmp;
    var date, Ai;
    var verify = "10X98765432";
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var area = ['', '', '', '', '', '', '', '', '', '', '', '北京', '天津', '河北', '山西', '内蒙古', '', '', '', '', '', '辽宁', '吉林', '黑龙江', '', '', '', '', '', '', '', '上海', '江苏', '浙江', '安微', '福建', '江西', '山东', '', '', '', '河南', '湖北', '湖南', '广东', '广西', '海南', '', '', '', '重庆', '四川', '贵州', '云南', '西藏', '', '', '', '', '', '', '陕西', '甘肃', '青海', '宁夏', '新疆', '', '', '', '', '', '台湾', '', '', '', '', '', '', '', '', '', '香港', '澳门', '', '', '', '', '', '', '', '', '国外'];
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
    if (re == null)
        return false;
    if (re[1] >= area.length || area[re[1]] == "")
        return false;
    if (re[2].length == 12) {
        Ai = number.substr(0, 17);
        date = [re[9], re[10], re[11]].join("");
    }
    else {
        Ai = number.substr(0, 6) + "19" + number.substr(6);
        date = ["19" + re[4], re[5], re[6]].join("");
    }
    if (!CheckyyyyMMdd(date))
        return false;
    var sum = 0;
    for (var i = 0; i <= 16; i++) {
        sum += Ai.charAt(i) * Wi[i];
    }
    Ai += verify.charAt(sum % 11);
    return (number.length == 18 && number == Ai);
}
//通过身份证计算生日和性别
function getBirthDayAndSex(idcard) {
    if (IsIdCard(idcard)) {
        try {
            var birth = idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
            var sex = undefined;
            if (parseInt(idcard.substr(16, 1)) % 2 == 1) {
                //男
                sex = 1;
            } else {
                //女
                sex = 2;
            }
            return {"birthday": birth, "sex": sex}
        } catch (e) {
        }
    }
    return {"birthday": "", "sex": ""}
}
function ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return "";
    var birth = new Date(r[1], r[3] - 1, r[4]);
    if (birth.getFullYear() == r[1] && (birth.getMonth() + 1) == r[3] && birth.getDate() == r[4]) {
        var now = new Date();
        var yearNow = now.getFullYear();
        var monthNow = now.getMonth() + 1;
        var dayOfMonthNow = now.getDate()

        var yearBirth = birth.getFullYear();
        var monthBirth = birth.getMonth() + 1;
        var dayOfMonthBirth = birth.getDate()

        var age = yearNow - yearBirth;

        if (monthNow <= monthBirth) {
            if (monthNow == monthBirth) {
                if (dayOfMonthNow < dayOfMonthBirth) {
                    age--;
                }
            } else {
                age--;
            }
        }

        return age;
    }
    return "";
}
