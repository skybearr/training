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
var AchieveUI = (function (_super) {
    __extends(AchieveUI, _super);
    function AchieveUI() {
        return _super.call(this, "AchieveSkin") || this;
    }
    /**初始化数据 */
    AchieveUI.prototype.initData = function () {
    };
    /**初始化界面 */
    AchieveUI.prototype.initView = function () {
        this.list.itemRenderer = AchieveItemUI;
        this.arr_data = new eui.ArrayCollection();
        var dic = AchieveLogic.getInstance().getAllAchieves();
        for (var id in dic) {
            this.arr_data.addItem(dic[id]);
        }
        this.list.dataProvider = this.arr_data;
    };
    /**初始化事件 */
    AchieveUI.prototype.initEvent = function () {
    };
    AchieveUI.prototype.clickClose = function () {
        _super.prototype.clickClose.call(this);
    };
    AchieveUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list.dataProvider = null;
        this.arr_data = null;
    };
    return AchieveUI;
}(fw.BaseUI));
__reflect(AchieveUI.prototype, "AchieveUI");
window['AchieveUI'] = AchieveUI;
//# sourceMappingURL=AchieveUI.js.map