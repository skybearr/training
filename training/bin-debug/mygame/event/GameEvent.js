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
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    /** 视频观看结束 */
    GameEvent.REWARDAD_CLOSE_EVENT = "REWARDAD_CLOSE_EVENT";
    /** 开关banner广告 */
    GameEvent.BANNER_HIDE = "BANNER_HIDE";
    /** 道具变化 */
    GameEvent.PROP_NUM_CHANGE = "PROP_NUM_CHANGE";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map