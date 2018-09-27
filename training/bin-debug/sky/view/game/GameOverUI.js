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
var GameOverUI = (function (_super) {
    __extends(GameOverUI, _super);
    function GameOverUI(v, t) {
        var _this = _super.call(this, "GameOverSkin") || this;
        _this.vo = v;
        _this.time = t;
        return _this;
    }
    GameOverUI.prototype.initView = function () {
        var star = 0;
        for (var i = this.vo.times.length - 1; i >= 0; i--) {
            if (this.time <= this.vo.times[i] * 1000) {
                star++;
            }
        }
        this.vo.stars = star;
        GameLogic.getInstance().saveLocal(this.vo.type, this.vo.id, this.time);
        this.lbl.text = GameLogic.getInstance().getStringByStar(this.vo.stars);
        var s = TimeUtil.ParseTime2Format(Math.floor(this.time / 1000), "m:s");
        var hs = this.time % 1000;
        var ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";
            ;
        }
        this.lbl_time.text = s + ":" + ss;
    };
    GameOverUI.prototype.initEvent = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
    };
    GameOverUI.prototype.clickRestart = function () {
        GameLogic.getInstance().startGame(this.vo);
    };
    GameOverUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    GameOverUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
    };
    return GameOverUI;
}(BaseUI));
__reflect(GameOverUI.prototype, "GameOverUI");
