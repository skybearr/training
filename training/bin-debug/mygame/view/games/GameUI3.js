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
var GameUI3 = (function (_super) {
    __extends(GameUI3, _super);
    function GameUI3(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    /**初始化数据 */
    GameUI3.prototype.initData = function () {
    };
    /**初始化界面 */
    GameUI3.prototype.initView = function () {
    };
    /**初始化事件 */
    GameUI3.prototype.initEvent = function () {
    };
    GameUI3.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
    };
    return GameUI3;
}(GameBaseUI));
__reflect(GameUI3.prototype, "GameUI3");
//# sourceMappingURL=GameUI3.js.map