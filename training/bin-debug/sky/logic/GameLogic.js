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
var GameLogic = (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        return _super.call(this) || this;
    }
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    GameLogic.prototype.init = function () {
        this.initData();
        this.openStart();
    };
    GameLogic.prototype.initData = function () {
        this.data = [, [], [], []];
        this.config = RES.getRes("config_json");
        var localdata = WxApi.getInstance().getLocalData("trainingmission");
        if (localdata == null) {
            localdata = [, [], [], []];
        }
        if (this.config != null) {
            for (var i in this.config) {
                var o = this.config[i];
                if (i.length < 8) {
                    continue;
                }
                var vo = new MissionVO();
                vo.id = o['id'];
                vo.type = o['type'];
                vo.des = o['des'];
                vo.content = o['content'];
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
                if (localdata != null) {
                    var brr = localdata[vo.type];
                    if (brr != null) {
                        var o_1 = brr[vo.id];
                        if (o_1 != null) {
                            var t = parseInt(o_1);
                            for (var k = vo.times.length - 1; k >= 0; k--) {
                                if (t <= vo.times[k] * 1000) {
                                    vo.stars++;
                                }
                            }
                            if (vo.state == 0) {
                                vo.state = vo.stars > 0 ? 1 : 0;
                            }
                        }
                    }
                }
                this.data[vo.type].push(vo);
            }
        }
    };
    GameLogic.prototype.saveLocal = function (type, id, time) {
        var localdata = WxApi.getInstance().getLocalData("trainingmission");
        if (localdata == null) {
            localdata = [, [], [], []];
        }
        localdata[type][id] = time;
        WxApi.getInstance().setLocalData("trainingmission", localdata);
    };
    GameLogic.prototype.openStart = function () {
        this.main.removeChildren();
        this.main.addChild(new StartUI());
    };
    GameLogic.prototype.startGame = function (vo) {
        this.main.removeChildren();
        this.main.addChild(new GameUI(vo));
    };
    GameLogic.prototype.openMission = function () {
        this.main.removeChildren();
        this.main.addChild(new MissionUI());
    };
    GameLogic.prototype.getMissionData = function () {
        return this.data;
    };
    GameLogic.prototype.getStartMission = function () {
        return this.data[1][2];
    };
    GameLogic.prototype.getStringByStar = function (n) {
        return this.config["str" + n];
    };
    return GameLogic;
}(egret.EventDispatcher));
__reflect(GameLogic.prototype, "GameLogic");
