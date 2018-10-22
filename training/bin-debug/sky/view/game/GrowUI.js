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
    return GrowUI;
}(BaseUI));
__reflect(GrowUI.prototype, "GrowUI");
//# sourceMappingURL=GrowUI.js.map