var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏中的一些类型定义
 *
 *
 * @sky
 */
var fw;
(function (fw) {
    var Definition = (function () {
        function Definition() {
        }
        return Definition;
    }());
    fw.Definition = Definition;
    __reflect(Definition.prototype, "fw.Definition");
    var UITYPE;
    (function (UITYPE) {
        UITYPE[UITYPE["FIRST"] = 1] = "FIRST";
        UITYPE[UITYPE["SECOND"] = 2] = "SECOND";
    })(UITYPE = fw.UITYPE || (fw.UITYPE = {}));
    var TWEENTYPE;
    (function (TWEENTYPE) {
        TWEENTYPE[TWEENTYPE["NONE"] = 0] = "NONE";
        TWEENTYPE[TWEENTYPE["SCALE"] = 1] = "SCALE";
        TWEENTYPE[TWEENTYPE["MOVE_OVERRIDE"] = 2] = "MOVE_OVERRIDE";
        TWEENTYPE[TWEENTYPE["MOVE_PUSH"] = 3] = "MOVE_PUSH";
        TWEENTYPE[TWEENTYPE["ROTAION"] = 4] = "ROTAION";
    })(TWEENTYPE = fw.TWEENTYPE || (fw.TWEENTYPE = {}));
    /** 全屏加载时 加载界面 */
    var LOADINGTYPE;
    (function (LOADINGTYPE) {
        LOADINGTYPE[LOADINGTYPE["RESET"] = 0] = "RESET";
        LOADINGTYPE[LOADINGTYPE["CIRCLE"] = 1] = "CIRCLE";
        LOADINGTYPE[LOADINGTYPE["LOADING"] = 2] = "LOADING";
    })(LOADINGTYPE = fw.LOADINGTYPE || (fw.LOADINGTYPE = {}));
    /** 分享类型 */
    var SHARETYPE;
    (function (SHARETYPE) {
        SHARETYPE[SHARETYPE["ACTIVE"] = 1] = "ACTIVE";
        SHARETYPE[SHARETYPE["SHOWOFF"] = 2] = "SHOWOFF";
        SHARETYPE[SHARETYPE["CRTSCORE"] = 3] = "CRTSCORE";
        SHARETYPE[SHARETYPE["PASSIVE"] = 4] = "PASSIVE";
        SHARETYPE[SHARETYPE["GROUPRANK"] = 5] = "GROUPRANK";
        SHARETYPE[SHARETYPE["SCREENSHOT"] = 6] = "SCREENSHOT";
        SHARETYPE[SHARETYPE["INVITE"] = 7] = "INVITE";
        SHARETYPE[SHARETYPE["INVITE_DAILY"] = 8] = "INVITE_DAILY";
    })(SHARETYPE = fw.SHARETYPE || (fw.SHARETYPE = {}));
    /** 排行榜排序类型 */
    var RANKSORTTYPE;
    (function (RANKSORTTYPE) {
        RANKSORTTYPE[RANKSORTTYPE["ASC"] = 1] = "ASC";
        RANKSORTTYPE[RANKSORTTYPE["DESC"] = 2] = "DESC";
    })(RANKSORTTYPE = fw.RANKSORTTYPE || (fw.RANKSORTTYPE = {}));
})(fw || (fw = {}));
//# sourceMappingURL=Definition.js.map