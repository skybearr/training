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
var MissionUI = (function (_super) {
    __extends(MissionUI, _super);
    function MissionUI() {
        return _super.call(this, "MissionSkin") || this;
    }
    /**初始化数据 */
    MissionUI.prototype.initData = function () {
        this.list.itemRenderer = MissionItemUI;
        this.arr_data = new eui.ArrayCollection();
    };
    /**初始化界面 */
    MissionUI.prototype.initView = function () {
        this.data = GameLogic.getInstance().getMissionData();
        this.crttype = 1;
        this.initList();
    };
    MissionUI.prototype.initList = function () {
        var arr = this.data[this.crttype];
        if (arr == null || arr.length == 0) {
            return;
        }
        this.arr_data.removeAll();
        for (var i = 0; i < arr.length; i++) {
            this.arr_data.addItem(arr[i]);
        }
        this.list.dataProvider = this.arr_data;
        this.initBtn();
    };
    /**初始化事件 */
    MissionUI.prototype.initEvent = function () {
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        for (var i = 1; i <= 3; i++) {
            this['btn' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    MissionUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    MissionUI.prototype.btnClick = function (e) {
        var i = parseInt(e.currentTarget.name);
        if (this.crttype == i) {
            return;
        }
        this.crttype = i;
        this.initList();
    };
    MissionUI.prototype.initBtn = function () {
        for (var i = 1; i <= 3; i++) {
            var btn = this['btn' + i];
            if (btn != null) {
                btn.filters = this.crttype != i ? FilterUtil.getGrayFilter() : null;
            }
        }
    };
    MissionUI.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var arr = this.data[this.crttype];
        if (arr == null || arr.length == 0) {
            return;
        }
        var vo = arr[i];
        if (vo == null) {
            return;
        }
        if (vo.state == 0) {
            return;
        }
        GameLogic.getInstance().startGame(vo);
    };
    MissionUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        for (var i = 1; i <= 3; i++) {
            this['btn' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.list.dataProvider = null;
        this.arr_data = null;
        this.list = null;
        this.data = null;
    };
    return MissionUI;
}(BaseUI));
__reflect(MissionUI.prototype, "MissionUI");
//# sourceMappingURL=MissionUI.js.map