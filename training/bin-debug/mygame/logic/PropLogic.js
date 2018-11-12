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
 * 道具逻辑类
 *
 *
 */
var PropLogic = (function (_super) {
    __extends(PropLogic, _super);
    function PropLogic() {
        var _this = _super.call(this) || this;
        _this.props = {};
        return _this;
    }
    PropLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PropLogic();
        }
        return this._instance;
    };
    /** 初始化道具货币 */
    PropLogic.prototype.initProps = function (arr) {
        this.props = {};
        HttpCommand.getInstance().addEventListener(HttpEvent.getProps, this.propResponse, this, false, 1);
        this.updateProps(arr);
    };
    /** 服务器只返回成功失败，不返回其他数据，不处理 */
    PropLogic.prototype.propResponse = function (e) {
    };
    PropLogic.prototype.updateProps = function (arr) {
        this.props = {};
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = new PropVO();
            vo.id = parseInt(o.type);
            vo.num = parseInt(o.num);
            vo.extradata1 = o.id;
            vo.extradata2 = o.uid;
            this.props[vo.id] = vo;
        }
        if (GameLogic.getInstance().startui != null) {
            GameLogic.getInstance().startui.updateHp();
        }
    };
    /** 根据id获取一个道具的名字 (含货币)*/
    PropLogic.prototype.getPropNameByID = function (id) {
        if (id < 10) {
            return DataBase.COIN_NAME[id];
        }
        else {
            var vo = this.getPropByID(id);
            return vo == null ? id + "" : vo.name;
        }
    };
    /** 货币道具的变化
     * @param id 道具id
     * @param num 增加减少的数量
    */
    PropLogic.prototype.updateProp = function (id, num) {
        var vo = this.props[id];
        if (vo != null) {
            if (vo.num + num <= 0) {
                num = -vo.num;
            }
            vo.num += num;
        }
        else {
            vo = new PropVO();
            vo.id = id;
            if (num < 0) {
                num = 0;
            }
            vo.num = num;
            this.props[id] = vo;
        }
        var str = DataBase.COIN_NAME[id] + (num > 0 ? "增加" : "减少") + " " + num;
        WxApi.getInstance().toast(str);
        HttpCommand.getInstance().postProps(id, num);
        var event = new GameEvent(GameEvent.PROP_NUM_CHANGE);
        event.data = { id: id, num: num };
        this.dispatchEvent(event);
    };
    /** 获取奖励
     * @param reward 格式  1:100;2:200;3001:1
     */
    PropLogic.prototype.getReward = function (reward) {
        var arr = reward.split(";");
        for (var i = 0; i < arr.length; i++) {
            var aaa = arr[i].split(":");
            PropLogic.getInstance().updateProp(parseInt(aaa[0]), parseInt(aaa[1]));
        }
    };
    /** 获取道具 */
    PropLogic.prototype.getPropByID = function (id) {
        return this.props[id];
    };
    return PropLogic;
}(egret.EventDispatcher));
__reflect(PropLogic.prototype, "PropLogic");
//# sourceMappingURL=PropLogic.js.map