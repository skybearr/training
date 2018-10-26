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
var GamesOverUI = (function (_super) {
    __extends(GamesOverUI, _super);
    function GamesOverUI(v, t) {
        var _this = _super.call(this, "GamesOverSkin") || this;
        _this.vo = v;
        _this.time = t;
        return _this;
    }
    GamesOverUI.prototype.initView = function () {
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
            GameLogic.getInstance().setNextMission(this.vo.type, this.vo.id, 1);
        }
        console.log("gameover:", this.vo);
        var recond = GameLogic.getInstance().getRecond(this.vo.type, this.vo.id);
        if (recond != 0) {
            this.lbl_best.text = "历史最快成绩：" + this.getText(recond);
        }
        if (recond == 0 || this.time < recond) {
            GameLogic.getInstance().saveLocal(this.vo.type, this.vo.id, this.time);
            WxApi.getInstance().setHigherScore(this.vo.type, this.vo.id, this.time);
        }
        if (this.time < recond) {
            this.lbl_fast.visible = true;
        }
        this.lbl.text = GameLogic.getInstance().getStringByStar(this.vo.stars);
        this.lbl_time.text = "本局用时：" + this.getText(this.time);
    };
    GamesOverUI.prototype.getText = function (t) {
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
    GamesOverUI.prototype.initEvent = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    GamesOverUI.prototype.clickRestart = function () {
        GameLogic.getInstance().startGame(this.vo);
    };
    GamesOverUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    GamesOverUI.prototype.clickShare = function () {
        var title = "这次舒尔特注意力训练" + this.vo.name + "关卡我只用了" + this.getText(this.time) + "秒，快来挑战我吧";
        WxApi.getInstance().share(title);
    };
    GamesOverUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    return GamesOverUI;
}(BaseUI));
__reflect(GamesOverUI.prototype, "GamesOverUI");
//# sourceMappingURL=GamesOverUI.js.map