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
var fw;
(function (fw) {
    var RankItemUI = (function (_super) {
        __extends(RankItemUI, _super);
        function RankItemUI() {
            var _this = _super.call(this) || this;
            _this.skinName = "RankItemSkin";
            return _this;
        }
        RankItemUI.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            var vo = this.data;
            var color = 0xffffff;
            if (vo.rank == 1) {
                color = 0xff094c;
            }
            else if (vo.rank == 2) {
                color = 0xff5317;
            }
            else if (vo.rank == 3) {
                color = 0xffe117;
            }
            this.bg_rect.fillColor = vo.rank % 2 == 1 ? 0x1f1e23 : 0x2b2a30;
            this.lbl_rank.text = vo.rank + "";
            this.lbl_rank.textColor = color;
            if (!platform.isdebug()) {
                this.img_head.source = vo.head;
            }
            this.lbl_name.text = vo.name;
            this.lbl_score.text = vo.score + "";
        };
        return RankItemUI;
    }(eui.ItemRenderer));
    fw.RankItemUI = RankItemUI;
    __reflect(RankItemUI.prototype, "fw.RankItemUI");
})(fw || (fw = {}));
window['RankItemUI'] = fw.RankItemUI;
//# sourceMappingURL=RankItemUI.js.map