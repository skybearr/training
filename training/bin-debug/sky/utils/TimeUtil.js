var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeUtil = (function () {
    function TimeUtil() {
    }
    /**
     * 真正的当前时间
     */
    TimeUtil.getCurrentTime = function () {
        var time = new Date();
        return time.getTime(); // + time.getTimezoneOffset() * 60 * 1000; 这个时间不对，直接getTime是对的，除非这取的不是本地时间@zhang
    };
    /**获取当前的服务器时间 */
    TimeUtil.getCrtServerTime = function () {
        return new Date().getTime() / 1000 + this.offTime;
    };
    /**
     * 获取服务器日期
     */
    TimeUtil.getServerDate = function () {
        return new Date(TimeUtil.getCrtServerTime() * 1000);
    };
    /**
     * 返回一年中的第N天
     * @param t 秒
     */
    TimeUtil.GetDayInYear = function (t) {
        var time = new Date(t);
        var month = time.getUTCMonth() + 1;
        var year = time.getFullYear();
        var days = time.getDate();
        function get_month_days(m) {
            var d = 0;
            if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12)
                d = 31;
            else if (m == 4 || m == 6 || m == 9 || m == 11)
                d = 30;
            else if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
                d = 29;
            else
                d = 28;
            return d;
        }
        var all_days = 0;
        for (var i = 1; i <= month; i++) {
            if (i == month) {
                all_days += days;
            }
            else {
                all_days += get_month_days(i);
            }
        }
        return all_days;
    };
    /**
     * 返回时间点在当天的秒数
     */
    TimeUtil.getSecondInDay = function (date) {
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    };
    /**
     * 倒计时转换为时间格式（h:m:s） ，可自定义
     * @param t 秒
     * @param f 格式
     */
    TimeUtil.ParseTime2Format = function (t, f) {
        if (f === void 0) { f = "h:m:s"; }
        var h = Math.floor(t / 3600);
        var m = Math.floor((t % 3600) / 60);
        var s = (t % 3600) % 60;
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }
        if (f.indexOf("h") != -1) {
            f = f.replace(/h/g, parse_format(h));
        }
        else {
            m += h * 60;
        }
        if (f.indexOf("m") != -1) {
            f = f.replace(/m/g, parse_format(m));
        }
        else {
            if (f.indexOf("h") != -1) {
                s += m * 60;
            }
            else {
                s = t;
            }
        }
        if (f.indexOf("s") != -1) {
            f = f.replace(/s/g, parse_format(s));
        }
        return f;
    };
    /**
     * 转换为日期格式
     * @param t 毫秒
     * @param f 格式 Y/M/D h:m:s
     */
    TimeUtil.ParseTime2Date = function (t, f) {
        if (f === void 0) { f = "Y-M-D h:m:s"; }
        var d = new Date(t);
        var Y = d.getFullYear();
        var M = d.getMonth() + 1;
        var D = d.getDate();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }
        if (f.indexOf("Y") != -1) {
            f = f.replace(/Y/g, parse_format(Y));
        }
        if (f.indexOf("M") != -1) {
            f = f.replace(/M/g, parse_format(M));
        }
        if (f.indexOf("D") != -1) {
            f = f.replace(/D/g, parse_format(D));
        }
        if (f.indexOf("h") != -1) {
            f = f.replace(/h/g, parse_format(h));
        }
        if (f.indexOf("m") != -1) {
            f = f.replace(/m/g, parse_format(m));
        }
        if (f.indexOf("s") != -1) {
            f = f.replace(/s/g, parse_format(s));
        }
        return f;
    };
    /**
     * 获得带单位的时间字符串
     * * @param t 秒
     */
    TimeUtil.ParseTime2Units = function (t) {
        var str = "";
        if (t >= 3600 * 24) {
            str = Math.floor(t / (3600 * 24)) + "天";
        }
        else if (t >= 3600) {
            str = Math.floor(t / 3600) + "小时";
        }
        else if (t >= 60) {
            str = Math.floor(t / 60) + "分钟";
        }
        else if (t > 0) {
            str = t + "秒";
        }
        return str;
    };
    /**
     * 注册倒计时
     * @param fun 回调
     * @param reg 域
     * @param tim 延时
     * @param rep 次数
     */
    TimeUtil.CreateCD = function (fun, reg, tim, rep) {
        if (rep === void 0) { rep = 0; }
        var t = new egret.Timer(tim, rep);
        t.addEventListener(egret.TimerEvent.TIMER, fun, reg);
        return t;
    };
    TimeUtil.RemoveCD = function (tim, fun, reg) {
        if (tim != null) {
            tim.stop();
            tim.removeEventListener(egret.TimerEvent.TIMER, fun, reg);
        }
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
//# sourceMappingURL=TimeUtil.js.map