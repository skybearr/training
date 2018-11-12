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
var PlatUI = (function (_super) {
    __extends(PlatUI, _super);
    function PlatUI() {
        return _super.call(this, "PlatSkin") || this;
    }
    /**初始化数据 */
    PlatUI.prototype.initData = function () {
    };
    /**初始化界面 */
    PlatUI.prototype.initView = function () {
        var s2 = GameLogic.getInstance().getMyDataValueByID(MYDATA.PLAY_DATA);
        var s0 = "还没开始训练或你之前中断了训练，请点击下面的训练开始30天训练计划吧，坚持就能看到成果！加油！";
        if (s2 == null) {
            this.lbl.text = s0;
            return;
        }
        var arr = s2.split("&");
        var max = 0;
        var min = 9999999999;
        var total = 0;
        var avg = 0;
        var lastvo;
        for (var i = 0; i < arr.length; i++) {
            var a1 = arr[i].split("=");
            var time = parseInt(a1[1]);
            if (time > max) {
                max = time;
            }
            if (time < min) {
                min = time;
            }
            total += time;
            var vo = new PlanVO();
            vo.id = parseInt(a1[0]);
            vo.time = time;
            var item = new PlanItemUI(vo);
            this.gp.addChild(item);
            lastvo = vo;
        }
        avg = Math.floor(total / arr.length);
        //1，连续坚持天数，最快，最慢，平均，
        //2，加油
        var str = "";
        if (lastvo == null) {
            str = s0;
        }
        else {
            str = "你已坚持训练" + (lastvo.id + 1) + "天，\n" +
                "最快用时" + this.getText(min) + "秒，\n" +
                "最慢用时" + this.getText(max) + "秒，\n" +
                "平均用时" + this.getText(avg) + "秒。\n" +
                "你真棒！继续加油哦！";
        }
        this.lbl.text = str;
    };
    PlatUI.prototype.getText = function (t) {
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
    /**初始化事件 */
    PlatUI.prototype.initEvent = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
    };
    PlatUI.prototype.clickBack = function () {
        fw.UIManager.getInstance().openUI(UIConst.START);
    };
    PlatUI.prototype.clickStart = function () {
        // fw.UIManager.getInstance().openUI(UIConst.MISSION);
        var vo = GameTrainLogic.getInstance().getStartMission();
        fw.UIManager.getInstance().openUI(UIConst.GAME, vo);
    };
    PlatUI.prototype.clickClose = function () {
        _super.prototype.clickClose.call(this);
    };
    PlatUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
    };
    return PlatUI;
}(fw.BaseUI));
__reflect(PlatUI.prototype, "PlatUI");
window['PlatUI'] = PlatUI;
//# sourceMappingURL=PlatUI.js.map