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
var PlanItemUI = (function (_super) {
    __extends(PlanItemUI, _super);
    function PlanItemUI(v) {
        var _this = _super.call(this) || this;
        _this.vo = v;
        _this.skinName = "PlanItemSkin";
        return _this;
    }
    PlanItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbl.text = "第" + (this.vo.id + 1) + "天";
        this.rect_bg.y = 300 - this.vo.time * 50 / 15 / 1000;
    };
    return PlanItemUI;
}(eui.Component));
__reflect(PlanItemUI.prototype, "PlanItemUI");
//# sourceMappingURL=PlanItemUI.js.map