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
        return _super.call(this) || this;
    }
    MissionLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionLogic();
        }
        return this._instance;
    };
    MissionLogic.prototype.initCharpter = function () {
        this.missions = RES.getRes("config_json");
    };
    return MissionLogic;
}(egret.EventDispatcher));
__reflect(MissionLogic.prototype, "MissionLogic");
//# sourceMappingURL=MissionLogic.js.map