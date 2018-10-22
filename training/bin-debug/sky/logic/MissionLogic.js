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
var MissionLogic = (function (_super) {
    __extends(MissionLogic, _super);
    function MissionLogic() {
        var _this = _super.call(this) || this;
        _this.charpters = {};
        _this.crtChapter = 2;
        _this.crtMission = 202;
        return _this;
    }
    MissionLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionLogic();
        }
        return this._instance;
    };
    MissionLogic.prototype.initCharpter = function () {
        this.charpters = RES.getRes("mission_json");
    };
    MissionLogic.prototype.getChaprters = function () {
        return this.charpters;
    };
    MissionLogic.prototype.getMissionsByChapterID = function (charpterId) {
        var charpter = this.charpters[charpterId];
        return charpter.missions;
    };
    /** 当前章节的 当前关卡索引 0开始 */
    MissionLogic.prototype.getCrtMissionInCharpter = function (charpterId) {
        var charpter = this.charpters[charpterId];
        var c = Math.floor(this.crtMission / 100);
        if (c == charpterId) {
            return this.crtMission % 100;
        }
        else {
            return charpter.missions.length;
        }
    };
    MissionLogic.prototype.startMissionGame = function (vo) {
    };
    return MissionLogic;
}(egret.EventDispatcher));
__reflect(MissionLogic.prototype, "MissionLogic");
//# sourceMappingURL=MissionLogic.js.map