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
var RankTypeItemUI = (function (_super) {
    __extends(RankTypeItemUI, _super);
    function RankTypeItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankTypeItemSkin";
        return _this;
    }
    RankTypeItemUI.prototype.setVO = function (vo) {
        this.initView(vo);
    };
    RankTypeItemUI.prototype.setSelected = function (b) {
        this.rect_bg.fillColor = b ? 0xF48B07 : 0xF2FC8D;
    };
    RankTypeItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.initView(vo);
    };
    RankTypeItemUI.prototype.initView = function (vo) {
        this.lbl.text = vo.name;
    };
    return RankTypeItemUI;
}(eui.ItemRenderer));
__reflect(RankTypeItemUI.prototype, "RankTypeItemUI");
window['RankTypeItemUI'] = RankTypeItemUI;
//# sourceMappingURL=RankTypeItemUI.js.map