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
        this.list_left.itemRenderer = GrowLeftItemUI;
        this.arr_data_left = new eui.ArrayCollection();
        this.list_right.itemRenderer = GrowRightItemUI;
        this.arr_data_right = new eui.ArrayCollection();
    };
    /**初始化界面 */
    GrowUI.prototype.initView = function () {
        this.charpters = MissionTrainLogic.getInstance().getChaprters();
        this.crtChapter = MissionTrainLogic.getInstance().crtChapter;
        this.initLeftList();
    };
    GrowUI.prototype.initLeftList = function () {
        this.arr_data_left.removeAll();
        for (var i in this.charpters) {
            this.arr_data_left.addItem(this.charpters[i]);
        }
        this.list_left.dataProvider = this.arr_data_left;
        this.list_left.validateNow();
        this.list_left.selectedIndex = this.crtChapter - 1;
        this.missions = MissionTrainLogic.getInstance().getMissionsByChapterID(this.crtChapter);
        this.crtMission = MissionTrainLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
        this.crtLeftItem = this.list_left.getElementAt(this.crtChapter - 1);
        this.crtLeftItem.isSelected(true);
        this.initRightList();
    };
    GrowUI.prototype.initRightList = function () {
        this.arr_data_right.removeAll();
        for (var i = 0; i < this.missions.length; i++) {
            this.arr_data_right.addItem(this.missions[i]);
        }
        this.list_right.dataProvider = this.arr_data_right;
        this.list_right.validateNow();
        this.list_right.selectedIndex = this.crtMission;
        this.clickMission = this.missions[this.crtMission];
        this.crtRightItem = this.list_right.getElementAt(this.crtMission - 1);
        this.crtRightItem.isSelected(true);
    };
    /**初始化事件 */
    GrowUI.prototype.initEvent = function () {
        this.list_left.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
        this.list_right.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
    };
    GrowUI.prototype.clickStart = function () {
        if (this.clickMission != null) {
            MissionTrainLogic.getInstance().startMissionGame(this.clickMission);
        }
    };
    GrowUI.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GrowUI.prototype.itemLeftClick = function (e) {
        var vo = this.list_left.selectedItem;
        if (vo.state == 0) {
            return;
        }
        if (this.crtLeftItem != null) {
            this.crtLeftItem.isSelected(false);
        }
        var i = this.list_left.selectedIndex;
        this.crtLeftItem = this.list_left.getElementAt(i);
        this.crtLeftItem.isSelected(true);
        this.missions = vo.missions;
        this.crtMission = MissionTrainLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
        this.initRightList();
    };
    GrowUI.prototype.itemRightClick = function (e) {
        var vo = this.list_right.selectedItem;
        if (vo.state == 0) {
            return;
        }
        this.clickMission = vo;
        if (this.crtRightItem != null) {
            this.crtRightItem.isSelected(false);
        }
        var i = this.list_right.selectedIndex;
        this.crtRightItem = this.list_right.getElementAt(i);
        this.crtRightItem.isSelected(true);
    };
    GrowUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list_left.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
        this.list_right.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.list_left.dataProvider = null;
        this.list_right.dataProvider = null;
        this.arr_data_left = null;
        this.arr_data_right = null;
        this.charpters = null;
        this.missions = null;
        this.clickMission = null;
    };
    return GrowUI;
}(fw.BaseUI));
__reflect(GrowUI.prototype, "GrowUI");
//# sourceMappingURL=GrowUI.js.map