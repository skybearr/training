var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 存放数据
 * 数据来源  本地配置
 *
 *
 *
 */
var DataBase = (function () {
    function DataBase() {
    }
    /** 货币名字 */
    DataBase.COIN_NAME = [, '体力', '金币', '钻石', '', '', '', '', '', '', '',];
    /** 挑战关卡需要消耗的体力 */
    DataBase.HP_REDUCE_BATTLE = 10;
    /** 每日签到奖励 */
    DataBase.REWARD_ADD_SIGNIN = "1:50;2:1000;3:10";
    /** 邀请好友给的体力 */
    DataBase.HP_ADD_INVITE = 100;
    return DataBase;
}());
__reflect(DataBase.prototype, "DataBase");
//# sourceMappingURL=DataBase.js.map