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
 * 转盘逻辑类
 *
 *
 */
var TurnLogic = (function (_super) {
    __extends(TurnLogic, _super);
    function TurnLogic() {
        var _this = _super.call(this) || this;
        _this.turns = [];
        _this.freetimes = 0;
        return _this;
    }
    TurnLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TurnLogic();
        }
        return this._instance;
    };
    /** 初始化转盘 */
    TurnLogic.prototype.initTurns = function () {
        this.turns = [];
        HttpCommand.getInstance().addEventListener(HttpEvent.getTurntable, this.turnResponse, this, false, 1);
    };
    TurnLogic.prototype.turnResponse = function (e) {
        this.updateTurns(e.data);
    };
    /** 初始化转盘数据 */
    TurnLogic.prototype.updateTurns = function (arr) {
        this.turns = [];
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = new TurnVO();
            vo.id = parseInt(o.id);
            vo.appid = o.appid;
            vo.imgurl = o.imgurl;
            vo.num = parseInt(o.num);
            vo.name = o.title;
            vo.type = parseInt(o.type);
            vo.weight = parseInt(o.weights);
            this.turns.push(vo);
        }
        this.turns = [];
        //读取本地配置
        for (var i = 0; i < 16; i++) {
            var vo = new TurnVO();
            vo.id = i + 1;
            vo.num = GameUtil.between(10, 1000);
            vo.name = "奖励" + vo.id;
            vo.weight = GameUtil.between(10, 100);
            this.turns.push(vo);
        }
    };
    /** 获取转盘信息 */
    TurnLogic.prototype.getTurnVOs = function () {
        return this.turns;
    };
    /** 免费抽奖的cd 0表示可以免费抽奖 */
    TurnLogic.prototype.getFreeShareCD = function () {
        if (this.freetimes == 0) {
            var a = 24 * 3600;
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            return a - h * 3600 - m * 60 - s;
        }
        else {
            return 0;
        }
    };
    TurnLogic.prototype.setFreeTurn = function () {
        var date = new Date();
        var todaykey = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate();
        var todayturnkey = todaykey + GameConst.localdata_key_turn;
        WxApi.getInstance().setStorage(todayturnkey, "true");
        this.freetimes = 0;
    };
    return TurnLogic;
}(egret.EventDispatcher));
__reflect(TurnLogic.prototype, "TurnLogic");
//# sourceMappingURL=TurnLogic.js.map