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
    var BaseUI = (function (_super) {
        __extends(BaseUI, _super);
        function BaseUI(skinname) {
            var _this = _super.call(this) || this;
            _this.tweentype = 0;
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
            if (this.btn_close != null) {
                this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
            if (this.img_close != null) {
                this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
        };
        /** 打开UI时的附带参数 */
        BaseUI.prototype.setParams = function (params) {
            this.args = params.params;
            this.tweentype = params.tweentype;
        };
        /**适配处理 */
        BaseUI.prototype.checkFit = function () {
            this.height = GameConst.stageHeight;
            if (this.img_bg != null) {
                this.img_bg.height = GameConst.stageHeight;
            }
            if (this.rect_bg != null) {
                this.rect_bg.height = GameConst.stageHeight;
            }
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
            if (this.btn_close != null) {
                this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
            if (this.img_close != null) {
                this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
        };
        BaseUI.prototype.clickClose = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
        };
        return BaseUI;
    }(eui.Component));
    fw.BaseUI = BaseUI;
    __reflect(BaseUI.prototype, "fw.BaseUI");
})(fw || (fw = {}));
//# sourceMappingURL=BaseUI.js.map