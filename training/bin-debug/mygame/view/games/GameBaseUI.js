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
/**
 * 过关模式基类
 * 过关类型
 * 1：舒尔特方格 tar：规定时间内完成，time最后一个
 * 2：速记 tar：记住所有
 * 3：舒尔特方格，坑爹游戏 tar：完成最后一步 star：time
 * 4：猜成语 tar：
 */
var GameBaseUI = (function (_super) {
    __extends(GameBaseUI, _super);
    function GameBaseUI(skinname, vo) {
        var _this = _super.call(this) || this;
        _this.skinName = skinname;
        _this.vo = vo;
        return _this;
    }
    GameBaseUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.checkFit();
        this.initData();
        this.initView();
        this.initEvent();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    /**适配处理 */
    GameBaseUI.prototype.checkFit = function () {
        this.img_bg.height = this.img_1.height = GameConst.stageHeight;
    };
    /**初始化数据 */
    GameBaseUI.prototype.initData = function () {
    };
    /**初始化界面 */
    GameBaseUI.prototype.initView = function () {
    };
    /**初始化事件 */
    GameBaseUI.prototype.initEvent = function () {
    };
    GameBaseUI.prototype.clear = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
        this.vo = null;
    };
    return GameBaseUI;
}(eui.Component));
__reflect(GameBaseUI.prototype, "GameBaseUI");
//# sourceMappingURL=GameBaseUI.js.map