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
var GrowLeftItemUI = (function (_super) {
    __extends(GrowLeftItemUI, _super);
    function GrowLeftItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "GrowLeftItemSkin";
        return _this;
    }
    GrowLeftItemUI.prototype.setVO = function (vo) {
        this.initView(vo);
    };
    GrowLeftItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.initView(vo);
    };
    GrowLeftItemUI.prototype.initView = function (vo) {
        this.lbl.text = "第" + vo.id + "章";
        this.lbl_state.visible = vo.state != 1;
        this.lbl_state.text = vo.state == 0 ? "未解锁" : "通关";
        this.lbl_state.textColor = vo.state == 0 ? 0x8FFC02 : 0xF7DF07;
        this.rect_state.visible = vo.state == 0;
    };
    GrowLeftItemUI.prototype.isSelected = function (b) {
        this.rect_select.visible = b;
    };
    return GrowLeftItemUI;
}(eui.ItemRenderer));
__reflect(GrowLeftItemUI.prototype, "GrowLeftItemUI");
window['GrowLeftItemUI'] = GrowLeftItemUI;
//# sourceMappingURL=GrowLeftItemUI.js.map