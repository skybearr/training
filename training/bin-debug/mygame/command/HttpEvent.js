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
 *
 *
 */
var HttpEvent = (function (_super) {
    __extends(HttpEvent, _super);
    function HttpEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    /**与服务端通信地址 */
    HttpEvent.httpApi = "https://common.zhuyuce.com/";
    /**游戏的appid */
    HttpEvent.appid = "wxd4950745d08c9e90";
    /** api接口版本 */
    HttpEvent.version = "1.0";
    /** ---------------------------- 接口协议 --------------------------------------- */
    /** 获取Token */
    HttpEvent.getToken = "getToken";
    /** 获取用户信息 */
    HttpEvent.getUser = "getUser";
    /** 发送用户信息 */
    HttpEvent.postUser = "postUser";
    /** 获取货币道具信息 */
    HttpEvent.getProps = "getProps";
    /** 发送货币道具信息 */
    HttpEvent.postProps = "postProps";
    /** 获取排行榜信息 */
    HttpEvent.getWorldRank = "getWorldRank";
    /** 发送排行榜信息 */
    HttpEvent.postWorldRank = "postWorldRank";
    HttpEvent.getMyData = "getMyData";
    HttpEvent.postMyData = "postMyData";
    HttpEvent.getTurntable = "getTurntable";
    HttpEvent.getSkinsInfo = "getSkinsInfo";
    HttpEvent.postSkinGot = "postSkinGot";
    HttpEvent.postSkinDefault = "postSkinDefault";
    HttpEvent.getSkinsGot = "getSkinsGot";
    HttpEvent.getMissionsInfo = "getMissionsInfo";
    HttpEvent.postMission = "postMission";
    HttpEvent.getMissionsPass = "getMissionsPass";
    HttpEvent.getAchievesAll = "getAchievesAll";
    HttpEvent.postAchieve = "postAchieve";
    HttpEvent.getAchieveGot = "getAchieveGot";
    HttpEvent.checkIn = "checkIn";
    HttpEvent.getInvite = "getInvite";
    HttpEvent.getNotice = "getNotice";
    HttpEvent.postInvite = "postInvite";
    HttpEvent.getSetting = "getSetting";
    HttpEvent.getShareSetting = "getShareSetting";
    HttpEvent.getAd = "getAd";
    return HttpEvent;
}(egret.Event));
__reflect(HttpEvent.prototype, "HttpEvent");
//# sourceMappingURL=HttpEvent.js.map