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
var StartUI = (function (_super) {
    __extends(StartUI, _super);
    function StartUI() {
        return _super.call(this, "StartSkin") || this;
    }
    /**初始化数据 */
    StartUI.prototype.initData = function () {
    };
    /**初始化界面 */
    StartUI.prototype.initView = function () {
    };
    /**初始化事件 */
    StartUI.prototype.initEvent = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    StartUI.prototype.clickStart = function () {
        GameLogic.getInstance().startGame(GameLogic.getInstance().getStartMission());
    };
    StartUI.prototype.clickRank = function () {
        this.addChild(new RankUI());
    };
    StartUI.prototype.clickShare = function () {
        WxApi.getInstance().share();
    };
    StartUI.prototype.clickMission = function () {
        GameLogic.getInstance().openMission();
    };
    StartUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    return StartUI;
}(BaseUI));
__reflect(StartUI.prototype, "StartUI");
