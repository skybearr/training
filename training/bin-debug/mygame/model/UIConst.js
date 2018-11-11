var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIConst = (function () {
    function UIConst() {
    }
    /** 一级界面 */
    UIConst.START = "StartUI";
    UIConst.GAME = "GameUI";
    /** 二级界面 */
    UIConst.NOTICE = "NoticeUI";
    UIConst.RANK = "RankUI";
    UIConst.TURN = "TurnUI";
    UIConst.INVITE = "InviteUI";
    UIConst.GROW = "GrowUI";
    UIConst.MISSION = "MissionUI";
    UIConst.ACHIEVE = "AchieveUI";
    UIConst.PLAN = "PlatUI";
    /** ----------------------------------- 开放域好友激励命令  ----------------------------------------- */
    /** 下一个比自己高的 必要额外参数：当前分数*/
    UIConst.command_getnext = "nextscore";
    /** 超越了一个比自己高的 必要额外参数：当前分数和上一个分数*/
    UIConst.command_exceed = "exceed";
    /** 结算分段附近好友分段 */
    UIConst.command_nearfriend = "near";
    /** 结算超越了多少好友 */
    UIConst.command_exceedfriend = "exceedfriend";
    /** 开启排行 */
    UIConst.command_openrank = "openrank";
    /** 关闭 */
    UIConst.command_clear = "clear";
    return UIConst;
}());
__reflect(UIConst.prototype, "UIConst");
//# sourceMappingURL=UIConst.js.map