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
    StartUI.prototype.rewardCD = function () {
        var cd = WxApi.getInstance().getRewardCD();
        this.canwatch = cd <= 0;
        if (cd > 0) {
            this.lbl_cd.text = TimeUtil.ParseTime2Format(cd);
        }
        else {
            this.lbl_cd.text = "";
        }
    };
    /**初始化界面 */
    StartUI.prototype.initView = function () {
        platform.bannershow();
        if (!WxApi.getInstance().checkWx()) {
            return;
        }
        this.button = wx.createGameClubButton({
            icon: 'white',
            style: {
                left: 10,
                top: 80,
                width: 32,
                height: 32,
                text: "分享圈"
            }
        });
    };
    /**初始化事件 */
    StartUI.prototype.initEvent = function () {
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
        this.btn_grow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGrow, this);
        this.btn_ad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReward, this);
        WxApi.getInstance().addEventListener(GameEvent.OPENRANK, this.openRank, this);
        TimerManager.getInstance().addTimerCallBack(this.rewardCD, this);
        WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
    };
    StartUI.prototype.clickReward = function () {
        if (!this.canwatch) {
            var cd = WxApi.getInstance().getRewardCD();
            WxApi.getInstance().toast("为了保护眼睛，请不要连续观看，" + cd + "秒后再来鼓励");
            return;
        }
        WxApi.getInstance().showRewardAd(WATCHTYPE.THANKS);
    };
    StartUI.prototype.watchReward = function (e) {
        if (e.data.type == WATCHTYPE.THANKS && e.data.data == 0) {
            WxApi.getInstance().toast("谢谢您的鼓励，我会努力做出更好的游戏来帮助小朋友提高注意力");
        }
    };
    StartUI.prototype.clickGrow = function () {
        // WxApi.getInstance().toast('即将推出');
        GameLogic.getInstance().openGrow();
    };
    StartUI.prototype.clickRank = function () {
        this.addChild(new RankUI());
    };
    StartUI.prototype.openRank = function (e) {
        var ticket = e == null ? null : e.data;
        this.addChild(new RankUI(ticket));
    };
    StartUI.prototype.clickShare = function () {
        WxApi.getInstance().share();
    };
    StartUI.prototype.clickMission = function () {
        GameLogic.getInstance().openMission();
    };
    StartUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this.button != null) {
            this.button.destroy();
        }
        platform.bannerdestroy();
        this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
        this.btn_grow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGrow, this);
        WxApi.getInstance().removeEventListener(GameEvent.OPENRANK, this.openRank, this);
        this.btn_ad.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReward, this);
        TimerManager.getInstance().removeFun(this.rewardCD, this);
        WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
    };
    return StartUI;
}(BaseUI));
__reflect(StartUI.prototype, "StartUI");
//# sourceMappingURL=StartUI.js.map