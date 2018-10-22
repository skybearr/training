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
var GameItemUI = (function (_super) {
    __extends(GameItemUI, _super);
    function GameItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameItemSkin";
        return _this;
    }
    GameItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    GameItemUI.prototype.begin = function () {
        this.rect_click.fillColor = GameLogic.getInstance().crtClickStr == this.data.id ? 0x42F907 : 0xFF0000;
        this.rect_click.visible = true;
    };
    GameItemUI.prototype.end = function () {
        this.rect_click.visible = false;
    };
    GameItemUI.prototype.clear = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    GameItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var len = 720 / this.data.row;
        this.width = this.height = this.rect_bg.width =
            this.rect_bg.height = this.rect_click.width = this.rect_click.height = len - 30;
        this.lbl.size = this.data.size;
        this.lbl.text = this.data.id + "";
    };
    return GameItemUI;
}(eui.ItemRenderer));
__reflect(GameItemUI.prototype, "GameItemUI");
window['MissionItemUI'] = MissionItemUI;
//# sourceMappingURL=GameItemUI.js.map