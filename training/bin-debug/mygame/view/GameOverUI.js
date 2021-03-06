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
                this['star' + (this.vo.times.length - i)].source = RES.getRes("star_a_png");
            }
        }
        this.vo.stars = star;
        if (star > 0) {
            this.vo.state = 2;
            GameTrainLogic.getInstance().setNextMission(this.vo.type, this.vo.id, 1);
        }
        if (this.vo.type == 1 && this.vo.id == 3) {
            GameLogic.getInstance().setTodayScore(this.time);
        }
        console.log("gameover:", this.vo);
        var recond = GameTrainLogic.getInstance().getRecond(this.vo.id);
        if (recond != 0) {
            this.lbl_best.text = "历史最快成绩：" + this.getText(recond);
        }
        if (recond == 0 || this.time < recond) {
            GameTrainLogic.getInstance().setRecond(this.vo.id, this.time, this.vo.type);
        }
        if (this.time < recond) {
            this.lbl_fast.visible = true;
        }
        this.lbl.text = GameTrainLogic.getInstance().getStringByStar(this.vo.stars);
        this.lbl_time.text = "本局用时：" + this.getText(this.time);
    };
    GameOverUI.prototype.getText = function (t) {
        var s = TimeUtil.ParseTime2Format(Math.floor(t / 1000), "m:s");
        var hs = t % 1000;
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
        return s + ":" + ss;
    };
    GameOverUI.prototype.initEvent = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    GameOverUI.prototype.clickRestart = function () {
        GameTrainLogic.getInstance().startGame(this.vo);
    };
    GameOverUI.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GameOverUI.prototype.clickShare = function () {
        var title = "这次舒尔特注意力训练" + this.vo.name + "关卡我只用了" + this.getText(this.time) + "秒，快来挑战我吧";
        WxApi.getInstance().share(fw.SHARETYPE.CRTSCORE, title);
    };
    GameOverUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    return GameOverUI;
}(fw.BaseUI));
__reflect(GameOverUI.prototype, "GameOverUI");
//# sourceMappingURL=GameOverUI.js.map