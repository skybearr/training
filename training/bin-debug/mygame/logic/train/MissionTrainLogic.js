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
var MissionTrainLogic = (function (_super) {
    __extends(MissionTrainLogic, _super);
    function MissionTrainLogic() {
        var _this = _super.call(this) || this;
        _this.charpters = {};
        _this.crtChapter = 1;
        _this.crtMission = 101;
        return _this;
    }
    MissionTrainLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionTrainLogic();
        }
        return this._instance;
    };
    MissionTrainLogic.prototype.initData = function () {
        this.initPassData();
        GameTrainLogic.getInstance().initData();
        this.initCharpter();
    };
    MissionTrainLogic.prototype.initPassData = function () {
        this.passdata = {};
        //格式  101=1151&102=313
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_DATA);
        if (str != null) {
            var arr = str.split("&");
            for (var i = 0; i < arr.length; i++) {
                var a1 = arr[i].split("=");
                this.passdata[a1[0]] = parseInt(a1[1]);
            }
        }
    };
    MissionTrainLogic.prototype.updatePassData = function (id, score) {
        this.passdata[id] = score;
        var s1 = "";
        for (var id_1 in this.passdata) {
            if (s1 != "") {
                s1 += "&";
            }
            s1 += (id_1 + "=" + this.passdata[id_1]);
        }
        GameLogic.getInstance().updateMyDataValue(MYDATA.MISSION_DATA, s1);
    };
    MissionTrainLogic.prototype.getPassData = function () {
        return this.passdata;
    };
    MissionTrainLogic.prototype.updateCrtMission = function (id) {
        this.crtMission = id;
        GameLogic.getInstance().updateMyDataValue(MYDATA.MISSION_CRT, this.crtMission + "");
    };
    MissionTrainLogic.prototype.initCharpter = function () {
        var s1 = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_CRT);
        if (s1 == null) {
            this.updateCrtMission(101);
        }
        else {
            this.crtMission = parseInt(s1);
        }
        this.crtChapter = Math.floor(this.crtMission / 100);
        var data = RES.getRes("mission_json");
        var mid = this.crtMission % 100;
        for (var id in data) {
            var o = data[id];
            var v = new CharpterMissionVO();
            v.missionId = parseInt(o.id);
            v.title = o.title;
            v.type = parseInt(o.type);
            v.content = o.content;
            v.des = o.des;
            v.times = o.time.split(":");
            v.setDialog(o.dialog);
            var cid = Math.floor(parseInt(id) / 100);
            var vo = this.charpters[cid];
            if (vo == null) {
                vo = new CharpterVO();
                vo.id = cid;
                vo.missions = [];
                if (cid == this.crtChapter) {
                    vo.state = 1;
                    v.state = mid < v.missionId ? 2 : (mid > v.missionId ? 0 : 1);
                }
                else {
                    vo.state = cid < this.crtChapter ? 2 : 0;
                }
            }
            vo.missions.push(v);
            this.charpters[cid] = vo;
        }
    };
    MissionTrainLogic.prototype.getChaprters = function () {
        return this.charpters;
    };
    MissionTrainLogic.prototype.getMissionsByChapterID = function (charpterId) {
        var charpter = this.charpters[charpterId];
        return charpter.missions;
    };
    /** 当前章节的 当前关卡索引 0开始 */
    MissionTrainLogic.prototype.getCrtMissionInCharpter = function (charpterId) {
        var charpter = this.charpters[charpterId];
        var c = Math.floor(this.crtMission / 100);
        if (c == charpterId) {
            return this.crtMission % 100;
        }
        else {
            return charpter.missions.length;
        }
    };
    /** 关卡更新
     * @param id 关卡id
     * @param grade 关卡的成绩
     * @param remark 备用参数 可选
    */
    MissionTrainLogic.prototype.updatemission = function (id, grade, remark) {
        // let vo = this.missions[id];
        // if (vo == null) {
        // 	console.log("没有找到关卡" + id + "，请联系GM");
        // }
        // else {
        // 	if(grade <= vo.grade){
        // 		return;
        // 	}
        // 	HttpCommand.getInstance().postMission(id, grade, remark);
        // 	console.log("updateMission:", vo, grade);
        if (remark === void 0) { remark = ""; }
        // 	if (grade >= vo.baseline) {
        // 		//更新当前关卡
        // 		if (vo.state == 1) {
        // 			vo.state = 2;
        // 			let nextid = id + 1;
        // 			let nextvo = this.missions[nextid];
        // 			if (nextvo == null) {//当前章节没有了，寻找下一章节的第一关
        // 				nextid = (id - id % 100) + 101;
        // 			}
        // 			console.log("nextid:",nextid);
        // 			nextvo = this.missions[nextid];
        // 			if (nextvo != null) {
        // 				this.crt_missionId = nextid;
        // 				nextvo.state = 1;
        // 				console.log("updateCrtMission:",this.crt_missionId);
        // 				GameLogic.getInstance().updateMyDataValue(MYDATA.CRT_MISSION, this.crt_missionId);
        // 			}
        // 		}
        // 	}
        // }
    };
    MissionTrainLogic.prototype.startMissionGame = function (vo) {
        var obj_class = egret.getDefinitionByName("GameUI" + vo.type);
        fw.UIManager.getInstance().main.addChild(new obj_class(vo));
    };
    return MissionTrainLogic;
}(egret.EventDispatcher));
__reflect(MissionTrainLogic.prototype, "MissionTrainLogic");
//# sourceMappingURL=MissionTrainLogic.js.map