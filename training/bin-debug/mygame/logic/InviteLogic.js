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
var InviteLogic = (function (_super) {
    __extends(InviteLogic, _super);
    function InviteLogic() {
        return _super.call(this) || this;
    }
    InviteLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new InviteLogic();
        }
        return this._instance;
    };
    InviteLogic.prototype.initInvite = function () {
        this.invites = [];
        HttpCommand.getInstance().addEventListener(HttpEvent.getInvite, this.getInviteResponse, this, false, 1);
    };
    InviteLogic.prototype.getInviteResponse = function (e) {
        this.invites = [];
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_GET);
        var aaa = str == null ? [] : str.split("_");
        var arr = e.data;
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = new InviteVO();
            vo.avatarurl = o.avatarurl;
            vo.name = o.nickname;
            vo.uid = o.uid;
            vo.hasget = aaa.indexOf(vo.uid) != -1;
            vo.coinId1 = COINTYPE.HP;
            vo.num1 = DataBase.HP_ADD_INVITE;
            if (i % 5 == 4) {
                vo.num1 *= 2;
            }
            this.invites.push(vo);
        }
    };
    InviteLogic.prototype.getReward = function (uid) {
        for (var i = 0; i < this.invites.length; i++) {
            var vo = this.invites[i];
            if (vo.uid == uid) {
                vo.hasget = true;
                var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_GET);
                if (str == null || str == "") {
                    str = vo.uid;
                }
                else {
                    str += ("_" + vo.uid);
                }
                GameLogic.getInstance().updateMyDataValue(MYDATA.INVITE_GET, str);
                PropLogic.getInstance().updateProp(vo.coinId1, vo.num1);
                return;
            }
        }
    };
    InviteLogic.prototype.getInvites = function () {
        return this.invites;
    };
    return InviteLogic;
}(egret.EventDispatcher));
__reflect(InviteLogic.prototype, "InviteLogic");
//# sourceMappingURL=InviteLogic.js.map