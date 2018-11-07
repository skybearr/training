var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 根据开放域好友数据生成的图片
 * 创建后加载到指定位置，然后通过start开始刷新，通过command生成不同类型
 *
 * @author sky
 */
var BitmapOpenDataContext = (function (_super) {
    __extends(BitmapOpenDataContext, _super);
    /** 根据开放域好友数据生成的图片
     * @param w 宽
     * @param h 高
     * @param dis 图片刷新间隔
     */
    function BitmapOpenDataContext(dis) {
        if (dis === void 0) { dis = 48; }
        var _this = _super.call(this) || this;
        _this.dis = dis;
        _this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        _this.bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(_this.bitmapdata);
        _this.texture = texture;
        _this.width = GameConst.stageWidth;
        _this.height = GameConst.stageHeight;
        return _this;
    }
    BitmapOpenDataContext.prototype.start = function () {
        egret.stopTick(this.tickerHandler, this);
        egret.startTick(this.tickerHandler, this);
    };
    BitmapOpenDataContext.prototype.stop = function () {
        egret.stopTick(this.tickerHandler, this);
    };
    BitmapOpenDataContext.prototype.tickerHandler = function (timeStarmp) {
        var newtime = egret.getTimer();
        if (this.lasttime != null && newtime - this.lasttime < this.dis) {
            return;
        }
        this.lasttime = newtime;
        egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
        this.bitmapdata.webGLTexture = null;
        return false;
    };
    /** 传入我的当前分数，显示下一个好友的分数
     * @param commandstr 命令  UICONST.command_xxxx;
     * @param params 额外参数
     * @param sortkey 排序参数
     * @param sorttype 排序规则 fw.RANKSORTTYPE.ASC升序/DESC降序
     * @param shareTicket 如果是群排行 传入群的ticket
     */
    BitmapOpenDataContext.prototype.command = function (commandstr, params, sortkey, sorttype, shareTicket) {
        if (params === void 0) { params = null; }
        if (sortkey === void 0) { sortkey = "score"; }
        if (sorttype === void 0) { sorttype = 2; }
        if (shareTicket === void 0) { shareTicket = null; }
        WxApi.getInstance().postMessageToDataContext({
            userinfo: PlayerConst.userInfo,
            width: GameConst.stageWidth,
            height: GameConst.stageHeight,
            command: commandstr,
            sortkey: sortkey,
            sorttype: sorttype,
            shareTicket: shareTicket,
            params: params
        });
    };
    BitmapOpenDataContext.prototype.clear = function () {
        this.command(UIConst.command_clear);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        egret.stopTick(this.tickerHandler, this);
        this.bitmapdata = null;
    };
    return BitmapOpenDataContext;
}(egret.Bitmap));
__reflect(BitmapOpenDataContext.prototype, "BitmapOpenDataContext");
//# sourceMappingURL=BitmapOpenDataContext.js.map