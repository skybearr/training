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
        //1，连续坚持天数，最快，最慢，平均，
        //2，加油
        var str = "";
        this.lbl.text = str;
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
        fw.UIManager.getInstance().openUI(UIConst.MISSION);
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