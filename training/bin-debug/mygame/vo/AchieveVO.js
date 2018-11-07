var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AchieveVO = (function () {
    function AchieveVO() {
    }
    Object.defineProperty(AchieveVO.prototype, "grade", {
        get: function () {
            return this._grade;
        },
        /** 达成成绩 暂无用 */
        set: function (v) {
            this._grade = v;
        },
        enumerable: true,
        configurable: true
    });
    return AchieveVO;
}());
__reflect(AchieveVO.prototype, "AchieveVO");
//# sourceMappingURL=AchieveVO.js.map