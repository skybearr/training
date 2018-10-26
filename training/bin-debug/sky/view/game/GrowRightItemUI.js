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
var GrowRightItemUI = (function (_super) {
    __extends(GrowRightItemUI, _super);
    function GrowRightItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "GrowRightItemSkin";
        return _this;
    }
    GrowRightItemUI.prototype.setVO = function (vo) {
        this.initView(vo);
    };
    GrowRightItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.initView(vo);
    };
    GrowRightItemUI.prototype.initView = function (vo) {
        this.lbl_title.text = vo.missionId + "." + vo.title;
        if (vo.best != null) {
            this.lbl_best.text = "最好成绩：" + TimeUtil.formatSecondT(vo.best);
        }
        else {
            this.lbl_best.text = "";
        }
        if (vo.state == 2) {
            for (var i = 1; i <= 5; i++) {
                this['star' + i].source = RES.getRes(i <= vo.stars ? "star_a_png" : "star_b_png");
            }
        }
        this.rect_state.visible = vo.state == 0;
    };
    GrowRightItemUI.prototype.isSelected = function (b) {
        this.rect_select.visible = b;
    };
    return GrowRightItemUI;
}(eui.ItemRenderer));
__reflect(GrowRightItemUI.prototype, "GrowRightItemUI");
window['GrowRightItemUI'] = GrowRightItemUI;
//# sourceMappingURL=GrowRightItemUI.js.map