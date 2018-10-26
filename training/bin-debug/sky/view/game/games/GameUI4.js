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
var GameUI4 = (function (_super) {
    __extends(GameUI4, _super);
    function GameUI4(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    /**初始化数据 */
    GameUI4.prototype.initData = function () {
    };
    /**初始化界面 */
    GameUI4.prototype.initView = function () {
    };
    /**初始化事件 */
    GameUI4.prototype.initEvent = function () {
    };
    GameUI4.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
    };
    return GameUI4;
}(GameBaseUI));
__reflect(GameUI4.prototype, "GameUI4");
//# sourceMappingURL=GameUI4.js.map