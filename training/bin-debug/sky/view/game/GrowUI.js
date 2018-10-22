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
        this.list_right.itemRenderer = GrowLeftItemUI;
        this.arr_data_right = new eui.ArrayCollection();
    };
    /**初始化界面 */
    GrowUI.prototype.initView = function () {
        this.charpters = MissionLogic.getInstance().getChaprters();
        this.crtChapter = MissionLogic.getInstance().crtChapter;
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
        this.missions = MissionLogic.getInstance().getMissionsByChapterID(this.crtChapter);
        this.crtMission = MissionLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
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
    };
    /**初始化事件 */
    GrowUI.prototype.initEvent = function () {
        this.list_left.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
        this.list_right.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
    };
    GrowUI.prototype.clickStart = function () {
        if (this.clickMission == null) {
        }
        MissionLogic.getInstance().startMissionGame(this.clickMission);
    };
    GrowUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    GrowUI.prototype.itemLeftClick = function (e) {
        var vo = this.list_left.selectedItem.data;
        this.missions = vo.missions;
        this.crtMission = MissionLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
        this.initRightList();
    };
    GrowUI.prototype.itemRightClick = function (e) {
        this.clickMission = this.list_left.selectedItem.data;
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
}(BaseUI));
__reflect(GrowUI.prototype, "GrowUI");
//# sourceMappingURL=GrowUI.js.map