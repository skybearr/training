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
var GameUI1 = (function (_super) {
    __extends(GameUI1, _super);
    function GameUI1(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    GameUI1.prototype.checkFit = function () {
        _super.prototype.checkFit.call(this);
    };
    /**初始化数据 */
    GameUI1.prototype.initData = function () {
        this.arr_data = new eui.ArrayCollection();
        switch (this.vo.type) {
            case 1:
                this.initType1();
                break;
            case 3:
                this.initType3();
                break;
        }
    };
    GameUI1.prototype.initType1 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        for (var i = 0; i < len; i++) {
            this.arr.push((i + 1) + "");
        }
        var row = Math.sqrt(len);
        var a = this.shuffle(this.arr);
        var size = 60;
        for (var i = 0; i < a.length; i++) {
            this.arr_data.addItem({ id: a[i], row: row, size: size });
        }
    };
    GameUI1.prototype.initType3 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        var str = "";
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * 10) + "";
            this.arr.push(n);
            str += n;
        }
        this.lbl_num.visible = true;
        this.lbl_num.alpha = 1;
        this.lbl_num.text = str;
        var size = 60;
        for (var i = 0; i < 10; i++) {
            this.arr_data.addItem({ id: i + "", row: 5, size: size });
        }
        this.list.visible = false;
    };
    /**对数组乱序 */
    GameUI1.prototype.shuffle = function (a) {
        var b = a.slice();
        var c = [];
        while (true) {
            var i = Math.floor(Math.random() * b.length);
            c.push(b[i]);
            b.splice(i, 1);
            if (b.length == 0) {
                break;
            }
        }
        return c;
    };
    /**初始化界面 */
    GameUI1.prototype.initView = function () {
        this.lbl_des.text = this.vo.des;
        this.list.itemRenderer = GameItemUI;
        this.list.dataProvider = this.arr_data;
        this.btn_back.visible = true; // this.vo.type != 1 || this.vo.id > 3;
    };
    GameUI1.prototype.clickStart = function () {
        var _this = this;
        this.gp.visible = false;
        if (this.vo.type == 3) {
            egret.clearTimeout(this.timeId);
            var t = (parseInt(this.vo.content) - 5) * 1000;
            this.timeId = egret.setTimeout(function () {
                egret.Tween.get(_this.lbl_num).to({ alpha: 0 }, 3000).call(function () {
                    _this.lbl_num.visible = false;
                    _this.list.visible = true;
                    _this.start();
                }, _this);
            }, this, t);
        }
        else {
            this.start();
        }
    };
    GameUI1.prototype.start = function () {
        GameTrainLogic.getInstance().crtclick = 0;
        GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
        this.starttime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
    };
    GameUI1.prototype.gameover = function () {
        var newtime = egret.getTimer();
        var time = newtime - this.starttime;
        this.addChild(new GameOverUI(this.vo, time));
    };
    /**初始化事件 */
    GameUI1.prototype.initEvent = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    GameUI1.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GameUI1.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var id = e.item.id;
        var item = e.itemRenderer;
        if (GameTrainLogic.getInstance().crtClickStr == id) {
            GameTrainLogic.getInstance().crtclick++;
            if (GameTrainLogic.getInstance().crtclick >= this.arr.length) {
                this.gameover();
            }
            else {
                GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
            }
        }
    };
    GameUI1.prototype.enterframe = function () {
        var newtime = egret.getTimer();
        var time = newtime - this.starttime;
        var s = TimeUtil.ParseTime2Format(Math.floor(time / 1000), "m:s");
        var hs = time % 1000;
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
    GameUI1.prototype.clickMission = function () {
        GameTrainLogic.getInstance().openMission();
    };
    GameUI1.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        GameTrainLogic.getInstance().crtclick = 0;
        egret.clearTimeout(this.timeId);
        egret.Tween.removeTweens(this.lbl_num);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    return GameUI1;
}(GameBaseUI));
__reflect(GameUI1.prototype, "GameUI1");
//# sourceMappingURL=GameUI1.js.map