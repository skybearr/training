var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ViewUtil = (function () {
    function ViewUtil() {
    }
    /**把一个DisObject画成一个位图
    * @param disobject 要画的disobject
    * @param scale 缩放比例
    */
    ViewUtil.drawBitmapFromDisObject = function (disobject, clipBounds, scale) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(disobject, clipBounds, scale);
        var bitmap = new egret.Bitmap(renderTexture);
        return bitmap;
    };
    /**屏幕或组件抖动 （为确保精确参数尽量用2的幂数）
     * @param dis 要抖动的容器 不能是stage
     * @param times 抖动次数
     * @param offset 抖动幅度
     * @param speed 抖动频率
     */
    ViewUtil.shake = function (dis, times, offset, speed) {
        var _this = this;
        if (times === void 0) { times = 1.5; }
        if (offset === void 0) { offset = 0.5; }
        if (speed === void 0) { speed = 50; }
        if (this.isShake) {
            return;
        }
        this.isShake = true;
        var point = new egret.Point(dis.x, dis.y);
        var offsetXYArray = [0, 0];
        var num = 0;
        var u = egret.setInterval(function () {
            offsetXYArray[num % 2] = (num++) % 4 < 2 ? 0 : offset;
            if (num > (times * 4 + 1)) {
                egret.clearInterval(u);
                num = 0;
                _this.isShake = false;
            }
            dis.x = offsetXYArray[0] + point.x;
            dis.y = offsetXYArray[1] + point.y;
        }, this, speed);
    };
    /**画一个箭头,默认箭头指向右侧*/
    ViewUtil.drawArrow = function (width, color) {
        if (width === void 0) { width = 50; }
        if (color === void 0) { color = 0xffff00; }
        var sp = new egret.Shape();
        sp.graphics.lineStyle(1, 0, 1);
        sp.graphics.beginFill(0xffff00);
        sp.graphics.moveTo(-width, -width / 2);
        sp.graphics.lineTo(0, -width / 2);
        sp.graphics.lineTo(0, -width);
        sp.graphics.lineTo(width, 0);
        sp.graphics.lineTo(0, width);
        sp.graphics.lineTo(0, width / 2);
        sp.graphics.lineTo(-width, width / 2);
        sp.graphics.lineTo(-width, -width / 2);
        sp.graphics.endFill();
        return sp;
    };
    ViewUtil.getShape = function (width, height, color, alpha) {
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
    ViewUtil.getArtNum = function (art_src, src) {
        var con = new egret.Sprite();
        var i = 0;
        while (i < src.length) {
            var texture = RES.getRes(art_src + src.charAt(i));
            var bmp = new egret.Bitmap(texture);
            bmp.x = con.width + 1;
            bmp.y = -texture.textureHeight / 2;
            con.addChild(bmp);
        }
        return con;
    };
    /**检测碰撞*/
    ViewUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    ViewUtil.isShake = false;
    return ViewUtil;
}());
__reflect(ViewUtil.prototype, "ViewUtil");
//# sourceMappingURL=ViewUtil.js.map