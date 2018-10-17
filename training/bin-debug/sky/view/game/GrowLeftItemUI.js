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
        this.lbl.text = vo.name;
        this.lbl.textColor = 0xffffff;
        if (vo.state == 2) {
            for (var i = 1; i <= 3; i++) {
                this['star' + i].source = RES.getRes(i <= vo.stars ? "star_a_png" : "star_b_png");
            }
        }
    };
    return GrowLeftItemUI;
}(eui.ItemRenderer));
__reflect(GrowLeftItemUI.prototype, "GrowLeftItemUI");
window['GrowLeftItemUI'] = GrowLeftItemUI;
//# sourceMappingURL=GrowLeftItemUI.js.map