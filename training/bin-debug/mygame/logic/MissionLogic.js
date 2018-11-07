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
 *
 * 关卡逻辑类
 *
 *
 */
var MissionLogic = (function (_super) {
    __extends(MissionLogic, _super);
    function MissionLogic() {
        var _this = _super.call(this) || this;
        _this.charpters = {};
        return _this;
    }
    MissionLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionLogic();
        }
        return this._instance;
    };
    /** 初始化关卡 */
    MissionLogic.prototype.initMissions = function () {
        this.missions = {};
        var data = RES.getRes("mission_json");
        for (var id in data) {
            var o = data[id];
            var v = new MissionVO();
            v.id = parseInt(o.id);
            v.title = o.title;
            v.type = parseInt(o.type);
            v.content = o.content;
            v.des = o.des;
            v.times = o.time;
            v.setDialog(o.dialog);
            this.missions[v.id] = v;
        }
    };
    /** 初始化所有关卡配置 */
    MissionLogic.prototype.missionAllResponse = function (e) {
        //本地配置
        var data = RES.getRes("mission_json");
        for (var id in data) {
            var o = data[id];
            var v = new MissionVO();
            v.id = parseInt(o.id);
            v.title = o.title;
            v.type = parseInt(o.type);
            v.content = o.content;
            v.des = o.des;
            v.times = o.time;
            v.setDialog(o.dialog);
            this.missions[v.id] = v;
        }
        // //章节处理
        // let cid = Math.floor(parseInt(id) / 100);
        // let vo: CharpterVO = this.charpters[cid];
        // if (vo == null) {
        // 	vo = new CharpterVO();
        // 	vo.id = cid;
        // 	vo.missions = [];
        // 	if (cid == this.crtChapter) {
        // 		vo.state = 1;
        // 		v.state = mid < v.missionId ? 2 : (mid > v.missionId ? 0 : 1);
        // 	}
        // 	else {
        // 		vo.state = cid < this.crtChapter ? 2 : 0;
        // 	}
        // }
        // vo.missions.push(v);
        // this.charpters[cid] = vo;
    };
    /**  */
    MissionLogic.prototype.getNextMissionVO = function (id) {
        var nextid = id + 1;
        if (this.missions[nextid] != null) {
            return this.missions[nextid];
        }
        else {
            nextid = id - (id % 100) + 101;
            return this.missions[nextid];
        }
    };
    return MissionLogic;
}(egret.EventDispatcher));
__reflect(MissionLogic.prototype, "MissionLogic");
//# sourceMappingURL=MissionLogic.js.map