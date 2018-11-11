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
        return _super.call(this) || this;
    }
    MissionLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionLogic();
        }
        return this._instance;
    };
    /** 初始化已通关关卡 */
    MissionLogic.prototype.initMissions = function (arr) {
        this.missions = {};
        HttpCommand.getInstance().addEventListener(HttpEvent.getMissionsInfo, this.missionAllResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getMissionsPass, this.missionPassResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.postMission, this.missionPassResponse, this, false, 1);
        this.updatemissions(arr);
    };
    MissionLogic.prototype.startGame = function (id) {
        var vo = this.getMissionVOById(id);
        if (vo == null) {
            console.log("关卡错误", id);
            return;
        }
        fw.UIManager.getInstance().openUI(UIConst.GAME, vo);
    };
    MissionLogic.prototype.getMissionVOById = function (id) {
        return this.missions[id];
    };
    MissionLogic.prototype.getAllMissions = function () {
        return this.missions;
    };
    /** 初始化已通关关卡 */
    MissionLogic.prototype.missionPassResponse = function (e) {
        this.updatemissions(e.data);
    };
    /** 初始化所有关卡配置 */
    MissionLogic.prototype.missionAllResponse = function (e) {
        var mid = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_CRT);
        console.log("init:", mid);
        this.crt_missionId = mid == null ? 101 : parseInt(mid);
        var arr = e.data;
        arr.sort(this.sortfun);
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
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.missions[o.flow_id];
            if (vo == null) {
                vo = new MissionVO();
                vo.id = parseInt(o.flow_id);
                vo.imgurl = o.imgurl;
                vo.name = o.title;
            }
            vo.starline = [];
            var a1 = o.extradata1.split(":");
            for (var j = 0; j < a1.length; j++) {
                vo.starline.push(parseInt(a1[j]));
            }
            vo.appid = o.appid;
            vo.baseline = parseInt(o.baseline);
            console.log("state:", vo.id, this.crt_missionId);
            vo.state = vo.id < this.crt_missionId ? 2 : (vo.id == this.crt_missionId ? 1 : 0);
            vo.grade = vo.grade;
            this.missions[vo.id] = vo;
        }
    };
    MissionLogic.prototype.sortfun = function (a, b) {
        if (parseInt(a.flow_id) < parseInt(b.flow_id)) {
            return -1;
        }
        else {
            return 1;
        }
    };
    /** 更新所有已达成关卡 */
    MissionLogic.prototype.updatemissions = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.missions[o.flow_id];
            if (vo == null) {
                vo = new MissionVO();
                vo.id = parseInt(o.flow_id);
                vo.imgurl = o.imgurl;
                vo.name = o.title;
            }
            vo.grade = parseInt(o.grade);
            vo.create_time = parseInt(o.create_time);
            this.missions[vo.id] = vo;
        }
    };
    /** 关卡更新
     * @param id 关卡id
     * @param grade 关卡的成绩
     * @param remark 备用参数 可选
    */
    MissionLogic.prototype.updatemission = function (id, grade, remark) {
        if (remark === void 0) { remark = ""; }
        var vo = this.missions[id];
        if (vo == null) {
            console.log("没有找到关卡" + id + "，请联系GM");
        }
        else {
            if (grade <= vo.grade) {
                return;
            }
            HttpCommand.getInstance().postMission(id, grade, remark);
            console.log("updateMission:", vo, grade);
            if (grade >= vo.baseline) {
                //更新当前关卡
                if (vo.state == 1) {
                    vo.state = 2;
                    var nextid = id + 1;
                    var nextvo = this.missions[nextid];
                    if (nextvo == null) {
                        nextid = (id - id % 100) + 101;
                    }
                    console.log("nextid:", nextid);
                    nextvo = this.missions[nextid];
                    if (nextvo != null) {
                        this.crt_missionId = nextid;
                        nextvo.state = 1;
                        console.log("updateCrtMission:", this.crt_missionId);
                        GameLogic.getInstance().updateMyDataValue(MYDATA.MISSION_CRT, this.crt_missionId);
                    }
                }
            }
        }
    };
    return MissionLogic;
}(egret.EventDispatcher));
__reflect(MissionLogic.prototype, "MissionLogic");
//# sourceMappingURL=MissionLogic.js.map