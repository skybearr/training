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
/**
 *
 * @author
 *
 */
var AvgMainUI = (function (_super) {
    __extends(AvgMainUI, _super);
    function AvgMainUI(id, type) {
        var _this = _super.call(this) || this;
        _this.avg_type = type;
        _this.vo = AVGLogic.getInstance().getAVGVOByID(id);
        _this.skinName = "AvgMainSkin";
        return _this;
    }
    AvgMainUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.bg_img = new eui.Image(RES.getRes(this.vo.bg));
        this.bg_img.bottom = 0;
        this.bg.addChild(this.bg_img);
        this.finger = new eui.Image(RES.getRes("finger_png"));
        this.finger.smoothing = true;
        this.finger.scaleX = this.finger.scaleY = 0.4;
        this.finger.right = 120;
        this.finger.bottom = 12;
        this.finger.visible = false;
        this.addChild(this.finger);
        this.timer = new egret.Timer(100);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.delay, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dialogSubOver, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.current_dialog_index = 0;
        this.start();
    };
    AvgMainUI.prototype.start = function () {
        this.finger.visible = false;
        this.current_dialog = this.vo.dialogs[this.current_dialog_index];
        this.words_index = 0;
        this.txt.text = "";
        this.words = this.current_dialog.words.split("");
        if (this.dialog_bg == null) {
            this.dialog_bg = new eui.Image();
        }
        if (this.dialog_bg_src != this.current_dialog.bg) {
            this.dialog_bg.texture = RES.getRes(this.current_dialog.bg);
        }
        if (this.head == null) {
            this.head = new eui.Image();
        }
        this.head.texture = RES.getRes(this.current_dialog.head);
        if (this.current_dialog.is_left) {
            this.head.left = 150;
            this.head.right = null;
        }
        else {
            this.head.left = null;
            this.head.right = 150;
        }
        this.head.bottom = 560;
        this.addChild(this.head);
        this.timer.start();
    };
    AvgMainUI.prototype.delay = function () {
        if (this.words_index >= this.words.length) {
            this.dialogSubOver();
        }
        else {
            this.txt.text += this.words[this.words_index];
            this.words_index++;
        }
    };
    AvgMainUI.prototype.dialogSubOver = function () {
        this.timer.reset();
        this.txt.text = this.current_dialog.words;
        this.finger.visible = true;
    };
    AvgMainUI.prototype.click = function () {
        if (this.timer.running) {
            this.dialogSubOver();
        }
        else {
            this.current_dialog_index++;
            if (this.current_dialog_index >= this.vo.dialogs.length) {
                this.over();
            }
            else {
                this.start();
            }
        }
    };
    /**剧情结束*/
    AvgMainUI.prototype.over = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
            this.clear();
        }
    };
    AvgMainUI.prototype.clear = function () {
        this.timer.start();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.delay, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dialogSubOver, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.current_dialog = null;
        this.vo = null;
    };
    return AvgMainUI;
}(eui.Component));
__reflect(AvgMainUI.prototype, "AvgMainUI");
//# sourceMappingURL=AvgMainUI.js.map