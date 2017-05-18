/**
 * utils.js 0.0.1 | @tangqy | utils.js/LICENSE.md
 */

/** jQuery对象原型方法扩展 */
if(jQuery){
    /** 
     * 表单数据序列化为JSON对象
     * 注：当表单中参数出现同名时，serializeObject会取第一个，而忽略后续的
     */
    jQuery.prototype.serializeObject=function(){
        var obj=new Object();
        $.each(this.serializeArray(),function(index,param){
            if(!(param.name in obj)){
                obj[param.name]=param.value;
            }
        });
        return obj;
    };
}

/** JS对象原型方法扩展 */
if(String){
    /** 字符串直接调用获取指定参数 */
    String.prototype.getQuery = function (name) {
        var search = this;
        if(typeof(search)=="undefined") return "";
        var reg = new RegExp("(^|&)"+ name +"=([^&|#]*)(&|$|#)");
        var r = search.substr(search.indexOf("/?")+1).match(reg);
        if (r!=null) return decodeURI(r[2]); return "";
    };
}

/** 定义console的log记录 */
function log(content){
    console.log(content);
}

/** JS取指定id的DOM对象 */
function $1(domid){
    return document.getElementById(domid);
}

/**
 * 取得地址栏问号(?)后的参数内容
 * @param name:参数的key
 * @returns {String} 不存在则返回""
 **/
function getQuery(name){
    var href = window.location.href.replace(/\?#/,'#');
    var search = href.split("?")[1];
    if(typeof(search)=="undefined") return "";
    var reg = new RegExp("(^|&)"+ name +"=([^&|#]*)(&|$|#)");
    var r = search.substr(search.indexOf("/?")+1).match(reg);
    if (r!=null) return decodeURI(r[2]); return "";
}

/**
 * 判断对象是否为数组
 * @param obj
 * @returns {Boolean}
 */
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 返回数组对象
 * @param objOrArr 判断对象是否为数组集合
 * @param {Array} 是数组则直接返回，不是则创建新数组并返回存有入力元素的数据
 */
function toArray(objOrArr) {
    var arr = new Array(); 
    if(isArray(objOrArr)){
        return objOrArr;
    } else {
        // 单条记录时存入数组
        arr.push(objOrArr);
        return arr;
    }
}

/**
 * 字符串转化为日期对象，只支持yyyy-MM-dd 和 yyyy/MM/dd
 * @param String dateStr
 * @return {*}
 */
function parseDateStr(dateStr){
    var dateRE = /^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})$/;
    return dateRE.test(dateStr) ? new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10)) :    null;
}

/**
 * 字符串转化为日期对象，只支持yyyy-MM-dd hh:mm:ss和yyyy/MM/dd hh:mm:ss
 * @param String dateStr
 * @return {*}
 */
function parseDateStr2(dateStr){
    var dateRE = /^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})(?:\s)(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    return dateRE.test(dateStr) ? new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10),
        parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10)) : null;
}

/**
 * 格式化日期    yyyy-MM-dd
 * @return {String}
 */
function formatDate(date,pattern){
    /*var y    = date.getFullYear(),m = date.getMonth()+1,d = date.getDate();
    m = (m<10)?('0'+m):m;
    d = (d<10)?('0'+d):d;
    return y + '-' + m + '-' + d;*/
    var y = date.getFullYear(),
        M = date.getMonth()+1,
        d = date.getDate(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        w = date.getDay(),
        M2 = (M<10)?('0'+M):M,
        d2 = (d<10)?('0'+d):d,
        h2 = (h<10)?('0'+h):h,
        m2 = (m<10)?('0'+m):m,
        s2 = (s<10)?('0'+s):s,
        x = '';
    // 取得星期的值
    switch (w){
        case 0 :
            x = '日';
            break;
        case 1 :
            x = '一';
            break;
        case 2 :
            x = '二';
            break;
        case 3 :
            x = '三';
            break;
        case 4 :
            x = '四';
            break;
        case 5 :
            x = '五';
            break;
        case 6 :
            x = '六';
            break;
        default :
            break;
    }
    // 根据pattern格式化日期串
    if(pattern){
        return pattern.replace(/yyyy/,y).replace(/MM/,M2).replace(/M/,M)
            .replace(/dd/,d2).replace(/d/,d).replace(/HH/,h2).replace(/H/,h2)
            .replace(/mm/,m2).replace(/m/,m2).replace(/ss/,s2).replace(/s/,s2).replace(/w/,x);
    } else {
        return y + '-' + M2 + '-' + d;
    }
}

/**
 * 日期时间字符串截取年月日时分，取消秒的显示
 * @param String dateStr
 * @return {*}
 */
function splitDateStr(dateStr){
    return dateStr.substring(0, 16);
}

/**
 * 对时间的分钟进行取整 (向上取整为15min)
 * @param Date date 需要取整的时间
 * @return Date
 */
function roundTime(date){
    var date1 = date?date:new Date();
    var y = date1.getFullYear(),
        M = date1.getMonth(),
        d = date1.getDate(),
        h = date1.getHours(),
        m = date1.getMinutes();
    if(m<=15){
        m=15;
    } else if(m<=30) {
        m=30;
    } else if(m<=45) {
        m=45;
    } else {
        m=0;
        h+=1;
    }
    return new Date(y,M,d,h,m);
}

/**
 * 根据日期字符串转化为带星期和具体时间段的日期格式，只支持yyyy-MM-dd HH:mm:ss ---> 周W mm:ss
 * @param date
 * @return {*}
 */
function parseWeekDate(dateStr){
    if(!dateStr)
        return '--';
    var weekDays = ['星期日 ','星期一 ','星期二 ','星期三 ','星期四 ','星期五 ','星期六 '];
    // 参数Date
    var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    // 当前Date
    var now = new Date();
    // 获取参数Date的星期
    var weekDay = weekDays[date.getDay()];
    // 获取参数Date和当前Date的年月日时分的值
    var y1 = now.getFullYear(), // 当前Date
        M1 = now.getMonth(),
        d1 = now.getDate(),
        //h1 = now.getHours(),
        //m1 = now.getMinutes(),
        y2 = date.getFullYear(), // 参数Date
        M2 = date.getMonth(),
        d2 = date.getDate(),
        h2 = date.getHours(),
        h2_ = date.getHours()<10?('0'+date.getHours()):date.getHours(),
        //m2 = date.getMinutes(),
        m2_ = date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes();
    // 参数Date就是当前Date
    if(y1==y2 && M1==M2 && d1==d2){
        if(h2 < 12) {
            return '早上 '+h2_+':'+m2_;
        } else {
            return '下午 '+h2_+':'+m2_;
        }
    }
    // 参数Date为昨天
    else if(y1==y2 && M1==M2 && (d1-d2==1)){
        return '昨天 '+h2_+':'+m2_;
    }
    // 参数Date为前五天的某段时间
    else if(y1==y2 && M1==M2 && (d1-d2<6)){
        return weekDay+h2_+':'+m2_;
    }
    // 参数Date超过前五天的时间直接显示日期
    else {
        if(y1==y2){
            return (M2+1)+'月'+d2+'日 '+h2_+':'+m2_;
        } else {
            return y2+'年'+(M2+1)+'月'+d2+'日 '+h2_+':'+m2_;
        }
    }
}

/**
 * 本地上传文件时建立一个可存取到该file的url
 * 建立一个可存取到该file的url
 * @param file
 * @returns {String}
 */
function getObjectURL(file) {
    var url = null ; 
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url;
}

/**
 * 整数取整，小数保留两位，返回结果
 * @param numStr
 * @returns {Number}
 */
function round2decimal(numStr) {
    var num = Number(numStr);
    return parseInt(num)==num?num:Number(num.toFixed(2));
}

/**
 * 验证手机号码格式是否正确
 * 
 * @param mobile 手机号码
 * @return {Boolean} 验证结果 true 通过 false 不通过
 */
function MobileValidate(mobile) {
    var regMobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return regMobile.test(mobile);
}

/**
 * 身份证号码的真实性验证 ******************* START 
 * 
 * 身份证号分为两种，旧的为15位，新的为18位。
 * 身份证15位编码规则：dddddd yymmdd xx p
 * 其中 dddddd：地区码；yymmdd: 出生年月日；xx: 顺序类编码，无法确定；p: 性别，奇数为男，偶数为女； 
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * 其中 dddddd：地区码；yyyymmdd: 出生年月日；xxx:顺序类编码，无法确定，奇数为男，偶数为女；
 * y: 校验码，该位数值可通过前17位计算获得，计算的公式见程序，一些需要用到的常数：18位号码加权因子为(从右到左) 
 * Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]；
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
 */
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
function IdCardValidate(idCard) { 
    idCard = trim(idCard.replace(/ /g, ""));            //去掉字符串头尾空格
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);    //进行15位身份证的验证
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组
        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){//进行18位身份证的基本验证和第18位的验证
            return true;
        }else {
            return false;
        }
    } else {
        return false;
    }
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
    }
    for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }
    valCodePosition = sum % 11;                // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
* 验证18位数身份证号码中的生日是否是有效生日
* @param idCard 18位书身份证字符串
* @return
*/
function isValidityBrithBy18IdCard(idCard18){
    var year =idCard18.substring(6,10);
    var month = idCard18.substring(10,12);
    var day = idCard18.substring(12,14);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if(temp_date.getFullYear()!=parseFloat(year)
        ||temp_date.getMonth()!=parseFloat(month)-1
        ||temp_date.getDate()!=parseFloat(day)){
            return false;
    }else{
        return true;
    }
}
/**
* 验证15位数身份证号码中的生日是否是有效生日
* @param idCard15 15位书身份证字符串
* @return
*/
function isValidityBrithBy15IdCard(idCard15){
    var year =idCard15.substring(6,8);
    var month = idCard15.substring(8,10);
    var day = idCard15.substring(10,12);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if(temp_date.getYear()!=parseFloat(year)
            ||temp_date.getMonth()!=parseFloat(month)-1
            ||temp_date.getDate()!=parseFloat(day)){
                return false;
        }else{
            return true;
        }
}
//去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/******************* 身份证号码的真实性验证 END *******************/


/** 加法函数 */
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。 
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

/** 减法函数 */
function accSubtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}
//给Number类型增加一个add方法，，使用时直接用 .sub 即可完成计算。 
Number.prototype.subtr = function (arg) {
    return accSubtr(this, arg);
};

/** 乘法函数 */
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。 
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

/** 除法函数 */
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。 
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};


/**
 * 姓名加密
 * 两位字符的名字取最后一个字符，其他字符显示"*"
 * 三位和三位以上的名字取最后两个字符，其他字符显示"*"
 * 
 * @param name 姓名
 * @return {String} 加密后的名字
 */
function encryptName(name){
    var len = name.length;
    if(name==null){
        return '';
    } else if(len<=1){
        return name;
    } else if(len==2){
        return '*'+name.substring(1,len);
    } else if(len==3){
        return '*'+name.substring(1,len);
    } else {
        var temp = '';
        for (var i = 0; i < len-2; i++) {
            temp += '*';
        }
        return temp+name.substring(len-2,len);
    }
}

// TODO

