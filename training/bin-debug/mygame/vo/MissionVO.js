var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MissionVO = (function () {
    function MissionVO() {
    }
    Object.defineProperty(MissionVO.prototype, "grade", {
        get: function () {
            return this._grade;
        },
        /** 达成成绩 */
        set: function (v) {
            this._grade = v;
            this.star = this.getStarByGrade(v);
        },
        enumerable: true,
        configurable: true
    });
    /** 根据成绩得出过关星级，项目自行编写 */
    MissionVO.prototype.getStarByGrade = function (v) {
        if (this.times == null) {
            return 0;
        }
        return 0;
    };
    /** 剧情对话 */
    MissionVO.prototype.setDialog = function (id) {
    };
    return MissionVO;
}());
__reflect(MissionVO.prototype, "MissionVO");
//# sourceMappingURL=MissionVO.js.map