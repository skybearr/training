var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    /**灰色滤镜*/
    GameUtil.getGrayFilter = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    };
    /**根据2个坐标点获取角度 */
    GameUtil.getRotation = function (src, tar) {
        var dy = Math.abs(src.y - tar.y);
        var dx = Math.abs(src.x - tar.x);
        var r = Math.atan2(dx, dy) * 180 / Math.PI;
        if (tar.x > src.x) {
            if (tar.y < src.y) {
                r = r + 0;
            }
            else {
                r = 180 - r;
            }
        }
        else {
            if (tar.y < src.y) {
                r = 360 - r;
            }
            else {
                r = 180 + r;
            }
        }
        return r;
    };
    /** 根据权重随机 */
    GameUtil.getRandomByWeight = function (arr) {
        var total = 0;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        var r = Math.floor(Math.random() * total);
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) {
                r -= arr[i - 1];
            }
            if (r < arr[i]) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**tip提示 */
    GameUtil.showMessage = function (str) {
        console.log("showMessage:", str);
    };
    /**给按钮做连续点击检测
     * @param btn 点击的按钮
     * @param delay 按钮连续点击间隔，delay间隔内不能连续点击
     * @return true 可以点击
     */
    GameUtil.CheckBtnContinuousClick = function (btn, delay) {
        if (delay === void 0) { delay = 1; }
        if (this.btnTimeDic == null) {
            this.btnTimeDic = {};
        }
        var key = btn.hashCode;
        var last = this.btnTimeDic[key];
        var now = new Date().getTime();
        var b = last == null || now - last > delay * 1000;
        if (b) {
            this.btnTimeDic[key] = now;
        }
        return b;
    };
    /**
     * @param
     * @param
     * @param floor 0不处理  1floor -1ceil 2[a,b]双闭区间，整数
     */
    GameUtil.between = function (a, b, floor) {
        if (floor === void 0) { floor = 2; }
        var r = Math.random() * (b - a) + a;
        if (floor == 0) {
            return r;
        }
        else if (floor == 1) {
            return Math.floor(r);
        }
        else if (floor == -1) {
            return Math.ceil(r);
        }
        else {
            return Math.floor(Math.random() * (b - a + 1) + a);
        }
    };
    /**对数组乱序 */
    GameUtil.shuffle = function (a) {
        var b = a.slice();
        var c = [];
        while (true) {
            var i = Math.floor(Math.random() * b.length);
            c.push(b[i]);
            b.splice(i, 1);
            if (b.length == 0) {
                break;
            }
        }
        return c;
    };
    GameUtil.getShape = function (width, height, color, alpha) {
        if (width === void 0) { width = 640; }
        if (height === void 0) { height = 960; }
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    };
    GameUtil.getRectShape = function (width, height, color, alpha, ellipseWidth, ellipseHeight) {
        if (width === void 0) { width = 640; }
        if (height === void 0) { height = 960; }
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        if (ellipseWidth === void 0) { ellipseWidth = 0; }
        if (ellipseHeight === void 0) { ellipseHeight = 0; }
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    };
    /**把一个数字转换
     * @param n 原始数字
     * @param s 10的s次幂
     */
    GameUtil.dealNum = function (n, s) {
        if (s === void 0) { s = 3; }
        var ss = Math.pow(10, s);
        return Math.round(n / ss);
    };
    /**
     * 倒计时转换为时间格式（h:m:s） ，可自定义
     * @param t 秒
     * @param f 格式
     */
    GameUtil.ParseTime2Format = function (t, f) {
        if (f === void 0) { f = "h:m:s"; }
        var d = Math.floor(t / 24 / 3600);
        var h = Math.floor((t / 3600) % 24);
        var m = Math.floor((t % 3600) / 60);
        var s = (t % 3600) % 60;
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }
        if (f.indexOf("d") != -1) {
            f = f.replace(/d/g, parse_format(d));
        }
        else {
            h += d * 24;
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
    /**创建文本
     * @param x 如果为
     * @param y
     * @param pw 如果为null  设置x  否则 x=(pw-w)/2
     * @param ph 如果为null  设置y  否则 y=(ph-h)/2
     */
    GameUtil.createTextField = function (x, y, pw, ph, w, h, color, size, font, textalign, veralign) {
        if (color === void 0) { color = 0xffffff; }
        if (size === void 0) { size = 30; }
        if (font === void 0) { font = "SimHei"; }
        if (textalign === void 0) { textalign = "center"; }
        if (veralign === void 0) { veralign = "middle"; }
        var tf = new egret.TextField();
        if (x != null) {
            tf.x = x;
        }
        if (y != null) {
            tf.y = y;
        }
        if (pw != null) {
            tf.x = (pw - w) / 2;
        }
        if (ph != null) {
            tf.y = (ph - h) / 2;
        }
        if (w != null) {
            tf.width = w;
        }
        if (h != null) {
            tf.height = h;
        }
        tf.textColor = color;
        tf.size = size;
        tf.fontFamily = font;
        tf.textAlign = textalign;
        tf.verticalAlign = veralign;
        tf.touchEnabled = false;
        return tf;
    };
    /**创建图片
     * @param res 资源名
     * @param x 如果不为null，则设置为x
     * @param y 如果不为null，则设置为y
     * @param pw 如果为null  设置x  否则 x=(pw-w)/2
     * @param ph 如果为null  设置y  否则 y=(ph-h)/2
     * @param center 锚点 默认0左上角
     * @param w 图片宽 默认初始宽度
     * @param h 图片高 默认初始高度
    
     */
    GameUtil.createBitmap = function (res, x, y, pw, ph, center, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (pw === void 0) { pw = null; }
        if (ph === void 0) { ph = null; }
        if (center === void 0) { center = 0; }
        if (w === void 0) { w = null; }
        if (h === void 0) { h = null; }
        var bmp = new egret.Bitmap();
        if (res != null) {
            bmp.texture = RES.getRes(res);
        }
        if (w != null) {
            bmp.width = w;
        }
        if (h != null) {
            bmp.height = h;
        }
        if (center % 3 == 1) {
            bmp.anchorOffsetX = bmp.width / 2;
        }
        else if (center % 3 == 2) {
            bmp.anchorOffsetX = bmp.width;
        }
        var i = Math.floor(center / 3);
        if (i == 1) {
            bmp.anchorOffsetY = bmp.height / 2;
        }
        else if (i == 2) {
            bmp.anchorOffsetY = bmp.height;
        }
        if (x != null) {
            bmp.x = x;
        }
        if (y != null) {
            bmp.y = y;
        }
        if (pw != null) {
            bmp.x = (pw - w) / 2;
        }
        if (ph != null) {
            bmp.y = (ph - h) / 2;
        }
        return bmp;
    };
    /**名字太长改为xxx.. */
    GameUtil.formatNameString = function (str) {
        var len = 0;
        var newstr = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            }
            else {
                len++;
            }
            newstr += str.charAt(i);
            if (len > 12 && i < str.length - 1) {
                return newstr + "..";
            }
        }
        return str;
    };
    /**处理一些特殊字符导致的无法显示的名字 */
    GameUtil.checkSpeName = function (str) {
        var newstr = "";
        var i = 0;
        while (i < str.length) {
            var n = str.charCodeAt(i);
            var s = str.charAt(i);
            i++;
            if (n >= 65024 && n <= 65039) {
                continue;
            }
            newstr += s;
        }
        return newstr;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map