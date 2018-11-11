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
 * 游戏逻辑类
 *
 *
 */
var GameLogic = (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        var _this = _super.call(this) || this;
        /** ------------------ 其他数据 ------------------------------ */
        _this.mydata = {};
        return _this;
    }
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    /** 初始化游戏数据
     * @param o 数据
     */
    GameLogic.prototype.init = function (o) {
        HttpCommand.getInstance().addEventListener(HttpEvent.checkIn, this.checkInResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getNotice, this.noticeResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.postInvite, this.postInviteResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getSetting, this.getSettingResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getShareSetting, this.getShareResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getAd, this.getAdResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getMyData, this.getMyDataResponse, this, false, 1);
        this.updateCheckInfo(o.checkin);
        this.updateSetting(o.setting);
        this.updateMyData(o.mydata);
        this.checkNotice();
        this.checkLoginData();
    };
    GameLogic.prototype.checkNotice = function () {
        // let s1 = this.getMyDataValueByID(MYDATA.VERSION);
        // if(s1 == null || s1 != GameConst.version){
        // 	PlayerConst.noticeInfo.content = GameConst.notice_content;
        // 	PlayerConst.noticeInfo.version_client = GameConst.version;
        // 	fw.UIManager.getInstance().openUI(UIConst.NOTICE,null,fw.UITYPE.SECOND);
        // 	this.updateMyDataValue(MYDATA.VERSION,GameConst.version);
        // }
    };
    /** 每次登陆检测   */
    GameLogic.prototype.checkLoginData = function () {
        var date = new Date();
        var todaykey = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate();
        //免费转盘
        var todayturnkey = todaykey + GameConst.localdata_key_turn;
        var todayturnvalue = WxApi.getInstance().getStorage(todayturnkey);
        if (todayturnvalue == null || todayturnvalue == "") {
            TurnLogic.getInstance().freetimes = 1;
        }
        else {
            TurnLogic.getInstance().freetimes = 1;
        }
        //视频cd
        var cd = WxApi.getInstance().getStorage(GameConst.localdata_key_reward_cd);
        WxApi.getInstance().starttime = cd == null || cd == "" ? null : parseInt(cd);
        //判断是否每日第一次登录
        var todayloginkey = todaykey + GameConst.localdata_key_lastlogintime;
        var lasttime = WxApi.getInstance().getStorage(todayloginkey);
        if (lasttime != "") {
            PlayerConst.checkInfo.login_first_today = false;
        }
        WxApi.getInstance().setStorage(todayloginkey, date.getTime() + "");
    };
    /** 更新我的数据
     * @param id MYDATA.xxxx
     * @param value 为字符串，禁止含有‘:’ ‘;’2种符号
     */
    GameLogic.prototype.updateMyDataValue = function (id, value) {
        this.mydata[id] = value;
        this.PostMyData();
    };
    GameLogic.prototype.PostMyData = function () {
        var str = "";
        for (var id in this.mydata) {
            str += (id + ":" + this.mydata[id] + ";");
        }
        str = str.slice(0, str.length - 1);
        HttpCommand.getInstance().postMyData(str);
    };
    /** 根据id获取我的数据
     * @param id MYDATA.xxxx
     * @return 自定义的一个字符串，没有返回null
     */
    GameLogic.prototype.getMyDataValueByID = function (id) {
        return this.mydata[id];
    };
    GameLogic.prototype.getMyDataResponse = function (e) {
        this.updateMyData(e.data);
    };
    /** 其他数据 key为 MYDATA.XXX
     * @param str 格式为 0:value;1:value;2:value
     */
    GameLogic.prototype.updateMyData = function (str) {
        this.mydata = {};
        var arr = str.split(";");
        for (var i = 0; i < arr.length; i++) {
            var sss = arr[i];
            var aaa = sss.split(":");
            this.mydata[aaa[0]] = aaa[1];
        }
    };
    /** 警告，勿用 */
    GameLogic.prototype.clearMyData = function () {
        HttpCommand.getInstance().postMyData("");
    };
    /** 获取更新公告,检测是否更新了新版本，是的话弹出更新公告  */
    GameLogic.prototype.noticeResponse = function (e) {
        PlayerConst.noticeInfo.data = e.data;
    };
    /** 点击分享进入游戏后 发送邀请好友信息 受邀成功获取奖励 */
    GameLogic.prototype.postInviteResponse = function (e) {
        // e.data.uid;//自己的
        // e.data.share_uid;//发送者的
        // e.data.create_time;//邀请成功时间
        //这里处理 受邀成功后的奖励
    };
    /** 后台配置数据列表
     */
    GameLogic.prototype.getSettingResponse = function (e) {
        this.updateSetting(e.data);
    };
    GameLogic.prototype.updateSetting = function (data) {
        //保存设置信息
        PlayerConst.settingInfo.data = data;
    };
    /** 后台配置数据列表 可放在setting中 */
    GameLogic.prototype.getShareResponse = function (e) {
    };
    /**  */
    GameLogic.prototype.getAdResponse = function (e) {
    };
    /** 签到 */
    GameLogic.prototype.signIn = function () {
        if (!PlayerConst.checkInfo.signed_today) {
            HttpCommand.getInstance().checkIn();
        }
        else {
            WxApi.getInstance().toast("今日已签到");
        }
    };
    /** 签到成功*/
    GameLogic.prototype.checkInResponse = function (e) {
        this.updateCheckInfo(e.data);
        PropLogic.getInstance().getReward(DataBase.REWARD_ADD_SIGNIN);
    };
    GameLogic.prototype.updateCheckInfo = function (data) {
        PlayerConst.checkInfo.data = data;
        if (this.startui != null) {
            this.startui.updateCheckIn();
        }
    };
    return GameLogic;
}(egret.EventDispatcher));
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map