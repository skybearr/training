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
var TurnUI = (function (_super) {
    __extends(TurnUI, _super);
    function TurnUI() {
        var _this = _super.call(this, "TurnSkin") || this;
        _this.crtIndex = 0;
        return _this;
    }
    /**初始化数据 */
    TurnUI.prototype.initData = function () {
        this.turnItems = [];
        this.weights = [];
        HttpCommand.getInstance().getTurntable();
    };
    /**初始化界面 */
    TurnUI.prototype.initView = function () {
        this.rewardCD();
    };
    TurnUI.prototype.updateVideoCD = function () {
        var cd = WxApi.getInstance().getRewardCD();
        this.btn_1.touchEnabled = cd <= 0;
        this.btn_1.filters = cd <= 0 ? null : FilterUtil.getGrayFilter();
        this.can1 = cd <= 0;
        if (cd > 0) {
            this.lbl_cd1.text = GameUtil.ParseTime2Format(cd);
        }
        else {
            this.lbl_cd1.text = "";
        }
    };
    TurnUI.prototype.updateFreeCD = function () {
        var cd2 = TurnLogic.getInstance().getFreeShareCD();
        this.btn_2.touchEnabled = cd2 <= 0;
        this.btn_2.filters = cd2 <= 0 ? null : FilterUtil.getGrayFilter();
        this.can2 = cd2 <= 0;
        if (cd2 > 0) {
            this.lbl_cd2.text = GameUtil.ParseTime2Format(cd2);
        }
        else {
            this.lbl_cd2.text = "";
        }
    };
    /**初始化事件 */
    TurnUI.prototype.initEvent = function () {
        this.btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
        HttpCommand.getInstance().addEventListener(HttpEvent.getTurntable, this.turnResponse, this);
        TimerManager.getInstance().addTimerCallBack(this.rewardCD, this);
    };
    TurnUI.prototype.rewardCD = function () {
        this.updateVideoCD();
        this.updateFreeCD();
    };
    TurnUI.prototype.watchReward = function (e) {
        if (e.data.type == WATCHTYPE.TURNPLAY && e.data.data == 0) {
            this.play();
            this.updateVideoCD();
        }
    };
    TurnUI.prototype.clickBtn = function (e) {
        if (this.turns == null) {
            return;
        }
        switch (e.currentTarget) {
            case this.btn_1:
                this.turnPlay();
                break;
            case this.btn_2:
                this.freePlay();
                break;
        }
    };
    TurnUI.prototype.turnPlay = function () {
        if (this.isplaying) {
            return;
        }
        WxApi.getInstance().showRewardAd(WATCHTYPE.TURNPLAY);
    };
    TurnUI.prototype.freePlay = function () {
        if (this.isplaying) {
            return;
        }
        if (this.can2 && TurnLogic.getInstance().freetimes > 0) {
            this.play();
            TurnLogic.getInstance().setFreeTurn();
            this.updateFreeCD();
        }
    };
    /** 转盘开始转 */
    TurnUI.prototype.play = function () {
        var _this = this;
        this.isplaying = true;
        this.count = this.crtIndex;
        var round = 4;
        var min = this.turnItems.length * round;
        var i = GameUtil.getRandomByWeight(this.weights);
        var tar = min + i;
        egret.Tween.get(this, { onChange: this.update, onChangeObj: this }).to({ count: tar }, 5000, egret.Ease.quadInOut).call(function () {
            _this.isplaying = false;
            _this.getReward();
        }, this);
    };
    TurnUI.prototype.update = function () {
        var index = Math.ceil(this.count) % this.turnItems.length;
        if (this.crtIndex == index) {
            return;
        }
        this.crtIndex = index;
        if (this.crtItem != null) {
            this.crtItem.selected(false);
        }
        this.crtItem = this.turnItems[index];
        this.crtItem.selected(true);
    };
    TurnUI.prototype.getReward = function () {
        if (this.crtItem != null) {
            WxApi.getInstance().toast("获得奖励：" + this.crtItem.vo.name);
        }
    };
    TurnUI.prototype.turnResponse = function () {
        this.turns = TurnLogic.getInstance().getTurnVOs();
        this.updateTurns();
    };
    /** 初始化所有奖励 */
    TurnUI.prototype.updateTurns = function () {
        var l = this.turns.length / 4;
        var itemborder = 124;
        for (var i = 0; i < this.turns.length; i++) {
            var vo = this.turns[i];
            var item = new TurnItemUI(i, vo);
            var n = Math.floor(i / l);
            if (n == 0) {
                item.x = itemborder * i;
                item.y = 0;
            }
            else if (n == 1) {
                item.x = itemborder * l;
                item.y = itemborder * (i - l);
            }
            else if (n == 2) {
                item.x = itemborder * (l * 3 - i);
                item.y = itemborder * l;
            }
            else {
                item.x = 0;
                item.y = itemborder * (l * 4 - i);
            }
            this.gp_items.addChild(item);
            this.turnItems.push(item);
            this.weights.push(vo.weight);
        }
    };
    TurnUI.prototype.clickClose = function () {
        if (this.isplaying) {
            return;
        }
        _super.prototype.clickClose.call(this);
    };
    TurnUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
        HttpCommand.getInstance().removeEventListener(HttpEvent.getTurntable, this.turnResponse, this);
        TimerManager.getInstance().removeFun(this.rewardCD, this);
        this.isplaying = false;
    };
    return TurnUI;
}(fw.BaseUI));
__reflect(TurnUI.prototype, "TurnUI");
window['TurnUI'] = TurnUI;
//# sourceMappingURL=TurnUI.js.map