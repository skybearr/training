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
var InviteItemUI = (function (_super) {
    __extends(InviteItemUI, _super);
    function InviteItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "InviteItemSkin";
        return _this;
    }
    InviteItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    InviteItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.lbl_name.text = vo.name;
        this.lbl_num1.text = vo.num1 + "";
        if (!platform.isdebug()) {
            this.img.source = vo.avatarurl;
        }
        this.btn_get.label = vo.hasget ? "已领取" : "领取";
    };
    InviteItemUI.prototype.clickGet = function () {
        if (this.data.hasget) {
            return;
        }
        this.data.hasget = true;
        this.btn_get.label = this.data.hasget ? "已领取" : "领取";
        InviteLogic.getInstance().getReward(this.data.uid);
    };
    InviteItemUI.prototype.clear = function () {
        this.btn_get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
        this.data = null;
    };
    return InviteItemUI;
}(eui.ItemRenderer));
__reflect(InviteItemUI.prototype, "InviteItemUI");
//# sourceMappingURL=InviteItemUI.js.map