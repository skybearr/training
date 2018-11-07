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
var TurnItemUI = (function (_super) {
    __extends(TurnItemUI, _super);
    function TurnItemUI(i, vo) {
        var _this = _super.call(this) || this;
        _this.skinName = "TurnItemSkin";
        _this.vo = vo;
        _this.index = i;
        return _this;
    }
    TurnItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbl.text = this.vo.name;
    };
    TurnItemUI.prototype.selected = function (b) {
        this.rect.fillColor = b ? 0xDD930D : 0x07F4EF;
    };
    TurnItemUI.prototype.clear = function () {
        this.vo = null;
    };
    return TurnItemUI;
}(eui.Component));
__reflect(TurnItemUI.prototype, "TurnItemUI");
//# sourceMappingURL=TurnItemUI.js.map