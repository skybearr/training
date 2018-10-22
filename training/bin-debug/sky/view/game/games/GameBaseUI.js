var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 过关模式基类
 * 过关类型
 * 1：舒尔特方格 tar：规定时间内完成，time最后一个
 * 2：速记 tar：记住所有
 * 3：舒尔特方格，坑爹游戏 tar：完成最后一步 star：time
 * 4：猜成语 tar：
 */
var GameBaseUI = (function () {
    function GameBaseUI() {
    }
    return GameBaseUI;
}());
__reflect(GameBaseUI.prototype, "GameBaseUI");
//# sourceMappingURL=GameBaseUI.js.map