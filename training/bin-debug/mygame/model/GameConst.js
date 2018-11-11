var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.version = "1.10";
    GameConst.notice_content = "2018.11.10更新内容：\n" +
        "1，增加世界排行榜；\n" +
        "2，增加体力，用户关卡挑战\n" +
        "3，增加每日签到，用户可以签到获取体力\n" +
        "4，增加关卡模式，挑战可以获得成就及金币，后续可以购买商品\n" +
        "\n" +
        "\n" +
        "如果您有什么建议，请点击左侧游戏圈发帖，谢谢！\n";
    /** 广告id */
    GameConst.bannerId = "adunit-758f00e035da3372";
    GameConst.rewardAdId = "adunit-922e89b51b9d9336";
    /** 缓存在本地的key */
    GameConst.localdata_key_reward_cd = "rewardadcd";
    GameConst.localdata_key_turn = "_turn";
    GameConst.localdata_key_lastlogintime = "_lastlogintime";
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var PROPTYPE;
(function (PROPTYPE) {
    PROPTYPE[PROPTYPE["COIN"] = 1] = "COIN";
    PROPTYPE[PROPTYPE["PROP"] = 2] = "PROP";
})(PROPTYPE || (PROPTYPE = {}));
var COINTYPE;
(function (COINTYPE) {
    COINTYPE[COINTYPE["HP"] = 1] = "HP";
    COINTYPE[COINTYPE["MONEY"] = 2] = "MONEY";
    COINTYPE[COINTYPE["DIAMOND"] = 3] = "DIAMOND";
})(COINTYPE || (COINTYPE = {}));
var SWITCHTYPE;
(function (SWITCHTYPE) {
    SWITCHTYPE[SWITCHTYPE["ACHIEVE"] = 1] = "ACHIEVE";
    SWITCHTYPE[SWITCHTYPE["MISSION"] = 2] = "MISSION";
    SWITCHTYPE[SWITCHTYPE["SKIN"] = 3] = "SKIN";
    SWITCHTYPE[SWITCHTYPE["TURN"] = 4] = "TURN";
})(SWITCHTYPE || (SWITCHTYPE = {}));
var MYDATA;
(function (MYDATA) {
    MYDATA[MYDATA["INVITE_GET"] = 0] = "INVITE_GET";
    MYDATA[MYDATA["REWARD_NUM"] = 1] = "REWARD_NUM";
    MYDATA[MYDATA["BEST_SCORE"] = 2] = "BEST_SCORE";
    MYDATA[MYDATA["INVITE_NUM"] = 3] = "INVITE_NUM";
    MYDATA[MYDATA["ACHIEVE_GET"] = 4] = "ACHIEVE_GET";
    MYDATA[MYDATA["CURRENT_SKIN"] = 5] = "CURRENT_SKIN";
    MYDATA[MYDATA["MISSION_CRT"] = 6] = "MISSION_CRT";
    MYDATA[MYDATA["MISSION_DATA"] = 7] = "MISSION_DATA";
    MYDATA[MYDATA["VERSION"] = 8] = "VERSION";
})(MYDATA || (MYDATA = {}));
var WATCHTYPE;
(function (WATCHTYPE) {
    WATCHTYPE[WATCHTYPE["TURNPLAY"] = 1] = "TURNPLAY";
    WATCHTYPE[WATCHTYPE["ADDHP"] = 2] = "ADDHP";
})(WATCHTYPE || (WATCHTYPE = {}));
var ACHIEVETYPE;
(function (ACHIEVETYPE) {
    ACHIEVETYPE[ACHIEVETYPE["LOGIN_TOTAL"] = 1] = "LOGIN_TOTAL";
    ACHIEVETYPE[ACHIEVETYPE["SCORE_SINGLE"] = 2] = "SCORE_SINGLE";
    ACHIEVETYPE[ACHIEVETYPE["INVITE_NUM"] = 3] = "INVITE_NUM";
    ACHIEVETYPE[ACHIEVETYPE["REWARDAD_NUM"] = 4] = "REWARDAD_NUM";
})(ACHIEVETYPE || (ACHIEVETYPE = {}));
//# sourceMappingURL=GameConst.js.map