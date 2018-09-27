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
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI(ticket) {
        if (ticket === void 0) { ticket = null; }
        var _this = _super.call(this, "RankSkin") || this;
        _this.shareticket = ticket;
        _this.skinName = "RankSkin";
        return _this;
    }
    /**初始化数据 */
    RankUI.prototype.initData = function () {
    };
    RankUI.prototype.initView = function () {
        this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
        this.initDataContext();
    };
    RankUI.prototype.initEvent = function () {
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
        this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
    };
    RankUI.prototype.initDataContext = function () {
        //开放域主体
        var platform = window.platform;
        if (platform.openDataContext == null) {
            return;
        }
        // this.bmp_context = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
        this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        this.bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(this.bitmapdata);
        this.bmp_context = new egret.Bitmap(texture);
        this.bmp_context.width = GameConst.GameStage.stageWidth;
        this.bmp_context.height = GameConst.GameStage.stageHeight;
        this.bmp_context.x = this.bmp_context.y = 0;
        this.addChildAt(this.bmp_context, 4); //盖在底图上面，各种按钮下面
        egret.stopTick(this.tickerHandler, this);
        egret.startTick(this.tickerHandler, this);
        WxApi.getInstance().postToDataContext({
            shareTicket: this.shareticket,
            userinfo: WxApi.getInstance().userInfo,
            stageW: GameConst.GameStage.stageWidth,
            stageH: GameConst.GameStage.stageHeight,
            command: "open"
        });
    };
    RankUI.prototype.tickerHandler = function (timeStarmp) {
        egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
        this.bitmapdata.webGLTexture = null;
        return false;
    };
    RankUI.prototype.clickGroupRank = function () {
        WxApi.getInstance().share("grouprank=1");
    };
    RankUI.prototype.clickClose = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    RankUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
        this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
        WxApi.getInstance().postToDataContext({
            command: "close"
        });
        if (this.bmp_context != null && this.bmp_context.parent != null) {
            this.bmp_context.parent.removeChild(this.bmp_context);
        }
        egret.stopTick(this.tickerHandler, this);
        this.bmp_context = null;
        this.bitmapdata = null;
    };
    return RankUI;
}(BaseUI));
__reflect(RankUI.prototype, "RankUI");
window["RankUI"] = RankUI;
