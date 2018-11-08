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
var NoticeUI = (function (_super) {
    __extends(NoticeUI, _super);
    function NoticeUI() {
        return _super.call(this, "NoticeSkin") || this;
    }
    /**初始化数据 */
    NoticeUI.prototype.initData = function () {
    };
    /**初始化界面 */
    NoticeUI.prototype.initView = function () {
        this.lbl_content.text = PlayerConst.noticeInfo.content;
        this.lbl_version.text = "版本号：" + PlayerConst.noticeInfo.version_server;
    };
    /**初始化事件 */
    NoticeUI.prototype.initEvent = function () {
        this.img_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
    };
    NoticeUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.img_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
    };
    return NoticeUI;
}(fw.BaseUI));
__reflect(NoticeUI.prototype, "NoticeUI");
window['NoticeUI'] = NoticeUI;
//# sourceMappingURL=NoticeUI.js.map