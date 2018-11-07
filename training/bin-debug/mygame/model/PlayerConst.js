var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerConst = (function () {
    function PlayerConst() {
    }
    /** 微信用户信息，包含昵称和头像 和 游戏数据*/
    PlayerConst.userInfo = new UserInfo();
    /** 登录信息 */
    PlayerConst.checkInfo = new CheckInVO();
    /** 后台设置 */
    PlayerConst.settingInfo = new SettingVO();
    /** 更新公告 */
    PlayerConst.noticeInfo = new NoticeVO();
    return PlayerConst;
}());
__reflect(PlayerConst.prototype, "PlayerConst");
//# sourceMappingURL=PlayerConst.js.map