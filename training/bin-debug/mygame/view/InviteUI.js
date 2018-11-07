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
var InviteUI = (function (_super) {
    __extends(InviteUI, _super);
    function InviteUI() {
        return _super.call(this, "InviteSkin") || this;
    }
    /**初始化数据 */
    InviteUI.prototype.initData = function () {
        HttpCommand.getInstance().getInvite();
    };
    /**初始化界面 */
    InviteUI.prototype.initView = function () {
        this.list.itemRenderer = InviteItemUI;
    };
    /**初始化事件 */
    InviteUI.prototype.initEvent = function () {
        this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().addEventListener(HttpEvent.getInvite, this.getInviteResponse, this);
    };
    InviteUI.prototype.clickBtn = function () {
        WxApi.getInstance().share(fw.SHARETYPE.INVITE);
    };
    /** 数据处理在logic里处理了，这里直接获取结果 */
    InviteUI.prototype.getInviteResponse = function () {
        this.invites = InviteLogic.getInstance().getInvites();
        this.arr_data = new eui.ArrayCollection();
        this.invites = this.invites.concat(this.invites).concat(this.invites);
        for (var i = 0; i < this.invites.length; i++) {
            this.arr_data.addItem(this.invites[i]);
        }
        this.list.dataProvider = this.arr_data;
    };
    InviteUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_invite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().removeEventListener(HttpEvent.getInvite, this.getInviteResponse, this);
    };
    return InviteUI;
}(fw.BaseUI));
__reflect(InviteUI.prototype, "InviteUI");
window['InviteUI'] = InviteUI;
//# sourceMappingURL=InviteUI.js.map