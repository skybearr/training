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
var GameTrainLogic = (function (_super) {
    __extends(GameTrainLogic, _super);
    function GameTrainLogic() {
        return _super.call(this) || this;
    }
    GameTrainLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameTrainLogic();
        }
        return this._instance;
    };
    GameTrainLogic.prototype.init = function () {
        // this.initData();
        // MissionTrainLogic.getInstance().initCharpter();
        // this.openStart();
        // WxApi.getInstance().userInfo = platform.getUserInfo();
        // console.log("userinfo:", WxApi.getInstance().userInfo);
    };
    GameTrainLogic.prototype.setNextMission = function (type, id, state) {
        var arr = this.data[type];
        if (arr != null) {
            var vo = arr[id];
            if (vo != null) {
                vo.state = state;
            }
        }
    };
    GameTrainLogic.prototype.initData = function () {
        this.data = [, [], [], []];
        this.config = RES.getRes("config_json");
        for (var i in this.config) {
            var o = this.config[i];
            if (i.length < 8) {
                continue;
            }
            var vo = new TrainMissionVO();
            vo.id = o['id'];
            vo.type = o['type'];
            vo.des = o['des'];
            vo.content = o['content'];
            vo.name = o['name'];
            vo.times = [];
            var ta = o['time'].split(":");
            for (var j = 0; j < ta.length; j++) {
                vo.times.push(parseInt(ta[j]));
            }
            vo.state = vo.type == 1 ? 0 : 1;
            if (vo.type == 1 && vo.id == 1) {
                vo.state = 1;
            }
            vo.stars = 0;
            var previewvo = this.data[vo.type][vo.id - 1];
            if (previewvo != null) {
                if (previewvo.state == 2) {
                    vo.state = 1;
                }
            }
            this.data[vo.type].push(vo);
        }
    };
    GameTrainLogic.prototype.getRecond = function (id) {
        var value = 0;
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE);
        if (str == null) {
            value = 0;
        }
        else {
            var arr = str.split("&");
            p1: for (var i = 0; i < arr.length; i++) {
                var brr = arr[i].split("=");
                if (id + "" == brr[0]) {
                    value = parseInt(brr[1]);
                    break p1;
                }
            }
        }
        return value;
    };
    GameTrainLogic.prototype.setRecond = function (id, time, type) {
        var sss = id + "=" + time;
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE);
        if (str == null) {
            str = sss;
        }
        else {
            str += ("&" + sss);
        }
        GameLogic.getInstance().updateMyDataValue(MYDATA.BEST_SCORE, str);
        WxApi.getInstance().setScore(type, id, time);
    };
    GameTrainLogic.prototype.openStart = function () {
        fw.UIManager.getInstance().openUI(UIConst.START);
    };
    GameTrainLogic.prototype.startGame = function (vo) {
        fw.UIManager.getInstance().openUI(UIConst.GAME, vo);
    };
    GameTrainLogic.prototype.openMission = function () {
        fw.UIManager.getInstance().openUI(UIConst.MISSION);
    };
    GameTrainLogic.prototype.openGrow = function () {
        fw.UIManager.getInstance().openUI(UIConst.GROW);
    };
    GameTrainLogic.prototype.getMissionData = function () {
        return this.data;
    };
    GameTrainLogic.prototype.getStartMission = function () {
        return this.data[1][2];
    };
    GameTrainLogic.prototype.getStringByStar = function (n) {
        return this.config["str" + n];
    };
    return GameTrainLogic;
}(egret.EventDispatcher));
__reflect(GameTrainLogic.prototype, "GameTrainLogic");
//# sourceMappingURL=GameTrainLogic.js.map