var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    /**web测试 0微信  1web本地 */
    GameConst.web = 1;
    GameConst.version = "201808181130";
    GameConst.localkey_missiondata = "localkey_missiondata";
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var INTERFACEAPI;
(function (INTERFACEAPI) {
    INTERFACEAPI[INTERFACEAPI["TESTGET"] = 0] = "TESTGET";
    INTERFACEAPI[INTERFACEAPI["TESTPOST"] = 1] = "TESTPOST";
})(INTERFACEAPI || (INTERFACEAPI = {}));
var WATCHTYPE;
(function (WATCHTYPE) {
    WATCHTYPE[WATCHTYPE["THANKS"] = 1] = "THANKS";
})(WATCHTYPE || (WATCHTYPE = {}));
var GAMETYPE;
(function (GAMETYPE) {
    GAMETYPE[GAMETYPE["SRT"] = 1] = "SRT";
    GAMETYPE[GAMETYPE["SHORTHAND"] = 2] = "SHORTHAND";
})(GAMETYPE || (GAMETYPE = {}));
//# sourceMappingURL=GameConst.js.map