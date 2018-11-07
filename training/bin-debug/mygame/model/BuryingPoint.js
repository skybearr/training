var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 埋点
 */
var BuryingPoint = (function () {
    function BuryingPoint() {
    }
    BuryingPoint.bp_grouprank_click = "bp_grouprank_click";
    return BuryingPoint;
}());
__reflect(BuryingPoint.prototype, "BuryingPoint");
//# sourceMappingURL=BuryingPoint.js.map