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
        this.updateHp();
        this.updateCheckIn();
        GameLogic.getInstance().startui = this;
        platform.bannershow(GameConst.bannerId);
    };
    /**初始化事件 */
    StartUI.prototype.initEvent = function () {
        for (var i = 0; i < 9; i++) {
            this['btn_' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_grow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_ad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_sign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_turn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_achieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().addEventListener(HttpEvent.checkIn, this.updateCheckIn, this);
        PropLogic.getInstance().addEventListener(GameEvent.PROP_NUM_CHANGE, this.propChange, this);
    };
    StartUI.prototype.updateHp = function () {
        var vo = PropLogic.getInstance().getPropByID(COINTYPE.HP);
        this.lbl_hp.text = "体力：" + (vo == null ? "0" : vo.num);
    };
    StartUI.prototype.updateCoin = function () {
        var vo = PropLogic.getInstance().getPropByID(COINTYPE.MONEY);
        this.lbl_coin.text = "金币：" + (vo == null ? "0" : vo.num);
    };
    StartUI.prototype.updateDiamond = function () {
        var vo = PropLogic.getInstance().getPropByID(COINTYPE.DIAMOND);
        this.lbl_diamond.text = "钻石：" + (vo == null ? "0" : vo.num);
    };
    StartUI.prototype.propChange = function (e) {
        switch (e.data.id) {
            case COINTYPE.HP:
                this.updateHp();
                break;
            case COINTYPE.MONEY:
                this.updateCoin();
                break;
            case COINTYPE.DIAMOND:
                this.updateDiamond();
                break;
        }
    };
    StartUI.prototype.updateCheckIn = function () {
        this.btn_sign.label = PlayerConst.checkInfo.signed_today ? "已签到" : "每日签到";
    };
    StartUI.prototype.clickBtn = function (e) {
        switch (e.currentTarget) {
            case this.btn_ad:
                WxApi.getInstance().showRewardAd(1);
                break;
            case this.btn_mission:
                fw.UIManager.getInstance().openUI(UIConst.MISSION);
                break;
            case this.btn_grow:
                // fw.UIManager.getInstance().openUI(UIConst.GROW);
                fw.UIManager.getInstance().openUI(UIConst.PLAN);
                break;
            case this.btn_sign:
                GameLogic.getInstance().signIn();
                break;
            case this.btn_turn:
                fw.UIManager.getInstance().openUI(UIConst.TURN, null, fw.UITYPE.SECOND);
                break;
            case this.btn_invite:
                fw.UIManager.getInstance().openUI(UIConst.INVITE, null, fw.UITYPE.SECOND);
                break;
            case this.btn_achieve:
                platform.toast("尽情期待");
                // fw.UIManager.getInstance().openUI(UIConst.ACHIEVE, null, fw.UITYPE.SECOND);
                break;
            case this.btn_rank:
                fw.UIManager.getInstance().openUI(UIConst.RANK, { shareticket: null, openworld: false }, fw.UITYPE.SECOND);
                break;
            case this.btn_share:
                WxApi.getInstance().share(fw.SHARETYPE.ACTIVE);
                break;
        }
    };
    StartUI.prototype.addHP = function (e) {
        if (e.data.type == WATCHTYPE.ADDHP && e.data.data == 0) {
            PropLogic.getInstance().updateProp(COINTYPE.HP, DataBase.REWARD_ADD_WATCHAD);
        }
    };
    StartUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        GameLogic.getInstance().startui = null;
        for (var i = 0; i < 8; i++) {
            this['btn_' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
        this.btn_ad.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_grow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_sign.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_turn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_invite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_achieve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().removeEventListener(HttpEvent.checkIn, this.updateCheckIn, this);
        PropLogic.getInstance().removeEventListener(GameEvent.PROP_NUM_CHANGE, this.propChange, this);
        platform.bannerdestroy();
    };
    return StartUI;
}(fw.BaseUI));
__reflect(StartUI.prototype, "StartUI");
window['StartUI'] = StartUI;
//# sourceMappingURL=StartUI.js.map