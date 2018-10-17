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
var GrowUI = (function (_super) {
    __extends(GrowUI, _super);
    function GrowUI() {
        return _super.call(this, "GrowSkin") || this;
    }
    /**初始化数据 */
    GrowUI.prototype.initData = function () {
        this.list.itemRenderer = GrowItemUI;
        this.arr_data = new eui.ArrayCollection();
    };
    /**初始化界面 */
    GrowUI.prototype.initView = function () {
        this.data = GameLogic.getInstance().getMissionData();
        this.crttype = 1;
        this.initList(3);
    };
    GrowUI.prototype.initList = function (id) {
        if (id === void 0) { id = null; }
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
        if (id != null) {
            this.list.validateNow();
            this.list.selectedIndex = id;
        }
    };
    /**初始化事件 */
    GrowUI.prototype.initEvent = function () {
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        for (var i = 1; i <= 3; i++) {
            this['btn' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    GrowUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    GrowUI.prototype.btnClick = function (e) {
        var i = parseInt(e.currentTarget.name);
        if (this.crttype == i) {
            return;
        }
        this.crttype = i;
        this.initList();
    };
    GrowUI.prototype.initBtn = function () {
        for (var i = 1; i <= 3; i++) {
            var btn = this['btn' + i];
            if (btn != null) {
                btn.filters = this.crttype != i ? FilterUtil.getGrayFilter() : null;
            }
        }
    };
    GrowUI.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var arr = this.data[this.crttype];
        if (arr == null || arr.length == 0) {
            return;
        }
        var vo = arr[i];
        if (vo == null) {
            return;
        }
        GameLogic.getInstance().startGame(vo);
    };
    GrowUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.list.dataProvider = null;
        this.arr_data = null;
        this.list = null;
        this.data = null;
    };
    return GrowUI;
}(BaseUI));
__reflect(GrowUI.prototype, "GrowUI");
//# sourceMappingURL=GrowUI.js.map