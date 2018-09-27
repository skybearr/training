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
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(skinname) {
        var _this = _super.call(this) || this;
        _this.skinName = skinname;
        return _this;
    }
    BaseUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.checkFit();
        this.initData();
        this.initView();
        this.initEvent();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    /**适配处理 */
    BaseUI.prototype.checkFit = function () {
        this.img_bg.height = GameLogic.getInstance().GameStage.stageHeight;
    };
    /**初始化数据 */
    BaseUI.prototype.initData = function () {
    };
    /**初始化界面 */
    BaseUI.prototype.initView = function () {
    };
    /**初始化事件 */
    BaseUI.prototype.initEvent = function () {
    };
    BaseUI.prototype.clear = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
