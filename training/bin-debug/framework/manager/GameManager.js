/**
 *
 * 小游戏游戏进程管理类
 *
 *
 */
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
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            return _super.call(this) || this;
        }
        GameManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GameManager();
            }
            return this._instance;
        };
        /** 游戏初始化 */
        GameManager.prototype.init = function () {
            /** 打开logo动画 */
            fw.UIManager.getInstance().main.addChild(new LogoUI());
            WxApi.getInstance().init();
        };
        /** logo动画结束，检测是否后台加载完毕 */
        GameManager.prototype.logoOver = function () {
            fw.UIManager.getInstance().openUI(UIConst.START);
            fw.UIManager.getInstance().showLoading(!WxApi.getInstance().inited);
        };
        GameManager.prototype.initSwitchData = function (str) {
            this.switchData = str.split("");
        };
        /**判断功能是否开启 SWITCHTYPE.xxxx*/
        GameManager.prototype.isSwitch = function (id) {
            if (this.switchData == null) {
                return false;
            }
            return this.switchData[id] == "1";
        };
        GameManager.prototype.getParams = function (a2) {
            var a1 = [];
            for (var i = 0; i < a2.length; i++) {
                a1.push(parseFloat(a2[i]));
            }
            return a1;
        };
        return GameManager;
    }(egret.EventDispatcher));
    fw.GameManager = GameManager;
    __reflect(GameManager.prototype, "fw.GameManager");
})(fw || (fw = {}));
//# sourceMappingURL=GameManager.js.map