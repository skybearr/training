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
var GameUI2 = (function (_super) {
    __extends(GameUI2, _super);
    function GameUI2(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    /**初始化数据 */
    GameUI2.prototype.initData = function () {
    };
    /**初始化界面 */
    GameUI2.prototype.initView = function () {
    };
    /**初始化事件 */
    GameUI2.prototype.initEvent = function () {
    };
    GameUI2.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
    };
    return GameUI2;
}(GameBaseUI));
__reflect(GameUI2.prototype, "GameUI2");
//# sourceMappingURL=GameUI2.js.map