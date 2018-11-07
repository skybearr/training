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
 * @author
 * 发送HTTP请求 HttpCommand.getInstance().dispatchEvent(HttpEvent.XXXX)
 *
 */
var HttpCommand = (function (_super) {
    __extends(HttpCommand, _super);
    function HttpCommand() {
        return _super.call(this) || this;
    }
    HttpCommand.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    };
    /** 登录
     * @param code 登录code
     */
    HttpCommand.prototype.getToken = function (code) {
        var url = HttpEvent.httpApi + "wx?code=" + code + "&appid=" + HttpEvent.appid;
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        var header1 = { type: "version", value: HttpEvent.version };
        fw.HttpManager.getInstance().sendRequest(HttpEvent.getToken, url, [header, header1]);
    };
    /** 发送用户信息
     * @param userinfo
     */
    HttpCommand.prototype.postUser = function (userinfo) {
        this.sendRequest(HttpEvent.postUser, "users", userinfo, 1);
    };
    /** 获取用户信息 */
    HttpCommand.prototype.getUser = function () {
        this.sendRequest(HttpEvent.getUser, "users");
    };
    /** 发送货币道具信息 */
    HttpCommand.prototype.postProps = function (id, num) {
        var data = { type: id + "", num: num + "" };
        this.sendRequest(HttpEvent.postProps, "prop", data, 1);
    };
    /** 获取货币道具信息 */
    HttpCommand.prototype.getProps = function () {
        this.sendRequest(HttpEvent.getProps, "prop");
    };
    /** 发送 世界排行 分数
     * @param score 分数
     * @param sort 0从大到小  1从小到大
     * @param type 排序分类 0全部
     */
    HttpCommand.prototype.postWorldRank = function (score, sort, type) {
        if (sort === void 0) { sort = "0"; }
        if (type === void 0) { type = "0"; }
        var data = { sort: sort, type: type, score: score + "" };
        this.sendRequest(HttpEvent.postWorldRank, "ranking", data, 1);
    };
    /** 获取世界排行
     *  @param limit 请求个数
     * @param sort 0从大到小  1从小到大
     * @param type 排序分类 0全部
     * @param page 页数
     */
    HttpCommand.prototype.getWorldRank = function (limit, sort, type, page) {
        if (limit === void 0) { limit = 20; }
        if (sort === void 0) { sort = 0; }
        if (type === void 0) { type = 0; }
        if (page === void 0) { page = 1; }
        var url = "ranking?sort=" + sort + "&type=" + type + "&p=" + page + "&limit=" + limit;
        this.sendRequest(HttpEvent.getWorldRank, url);
    };
    /** 设置弹性字段 客户端存储的一些数据
     * @param str 存在服务端的一个数据 具体在Gamelogic中自行实现
    */
    HttpCommand.prototype.postMyData = function (str) {
        var data = { mydata: str };
        this.sendRequest(HttpEvent.postMyData, "users/mydata", data, 1);
    };
    /** 获取弹性字段
     *
    */
    HttpCommand.prototype.getMyData = function () {
        this.sendRequest(HttpEvent.getMyData, "users/mydata");
    };
    /** 获取转盘信息
     *
     */
    HttpCommand.prototype.getTurntable = function () {
        this.sendRequest(HttpEvent.getTurntable, "turntable");
    };
    /**
     * 获取所有皮肤信息
     */
    HttpCommand.prototype.getSkinsAll = function () {
        this.sendRequest(HttpEvent.getSkinsInfo, "skin/all");
    };
    /**
     * 设置皮肤获取
     * @param skin_id 皮肤Id
     */
    HttpCommand.prototype.postSkinGet = function (skin_id) {
        var data = { skin_id: skin_id + "" };
        this.sendRequest(HttpEvent.postSkinGot, "skin", data, 1);
    };
    /**
     * 设置默认皮肤
     * @param skin_id 皮肤Id
     */
    HttpCommand.prototype.postSkinDefault = function (skin_id) {
        var data = { skin_id: skin_id };
        this.sendRequest(HttpEvent.postSkinDefault, "skin/defaultSkin", data, 1);
    };
    /**
     * 获取用户所得的所有皮肤
     * @param skin_id 皮肤Id 可选，为null表示获取所有
     */
    HttpCommand.prototype.getSkinsGot = function (skin_id) {
        if (skin_id === void 0) { skin_id = null; }
        if (skin_id == null) {
            this.sendRequest(HttpEvent.getSkinsGot, "skin");
        }
        else {
            this.sendRequest(HttpEvent.getSkinsGot, "skin?skin_id=" + skin_id);
        }
    };
    /**
     * 获取所有关卡
     */
    HttpCommand.prototype.getMissionsAll = function () {
        this.sendRequest(HttpEvent.getMissionsInfo, "level/all");
    };
    /**
     * 提交用户关卡
     * @param mission_id 关卡Id
     * @param grade 过关成绩（可以是星级，分数，成绩）
     * @param extradata 备用，其他需要用的数据
     */
    HttpCommand.prototype.postMission = function (mission_id, grade, extradata) {
        if (grade === void 0) { grade = ""; }
        if (extradata === void 0) { extradata = ""; }
        var data = { level_id: mission_id + "", grade: grade, remark: extradata };
        this.sendRequest(HttpEvent.postMission, "level", data, 1);
    };
    /**
     * 获取用户的已通关关卡数据
     * @param missionId 关卡Id
     */
    HttpCommand.prototype.getMissionsPass = function (missionId) {
        if (missionId == null) {
            this.sendRequest(HttpEvent.getMissionsPass, "level");
        }
        else {
            this.sendRequest(HttpEvent.getMissionsPass, "level?level_id=" + missionId);
        }
    };
    /**
    * 获取所有成就
    */
    HttpCommand.prototype.getAchievesAll = function () {
        this.sendRequest(HttpEvent.getAchievesAll, "honor/all");
    };
    /**
     * 提交用户成就
     * @param honor_id 成就Id
     * @param grade 成就成绩
     * @param extradata 备用，其他需要用的数据
     */
    HttpCommand.prototype.postAchieve = function (honor_id, grade, extradata) {
        var data = { honor_id: honor_id + "", grade: grade, remark: extradata };
        this.sendRequest(HttpEvent.postAchieve, "honor", data, 1);
    };
    /**
    * 获取用户已达成成就
    */
    HttpCommand.prototype.getAchieveGot = function () {
        this.sendRequest(HttpEvent.getAchieveGot, "honor");
    };
    /** 签到 */
    HttpCommand.prototype.checkIn = function () {
        this.sendRequest(HttpEvent.checkIn, "checkin", null, 1);
    };
    /** 版本更新公告 */
    HttpCommand.prototype.notice = function () {
        this.sendRequest(HttpEvent.getNotice, "notice");
    };
    /** 新用户邀请判断 */
    HttpCommand.prototype.postInvite = function (uid) {
        this.sendRequest(HttpEvent.postInvite, "invite", { share_uid: uid }, 1);
    };
    /** 获取我邀请的用户 */
    HttpCommand.prototype.getInvite = function () {
        this.sendRequest(HttpEvent.getInvite, "invite");
    };
    /** 设置列表 */
    HttpCommand.prototype.getSetting = function () {
        this.sendRequest(HttpEvent.getSetting, "setting");
    };
    /** 分享信息数据 */
    HttpCommand.prototype.getShareSetting = function () {
        this.sendRequest(HttpEvent.getShareSetting, "shareinfo");
    };
    /** 广告列表 */
    HttpCommand.prototype.getAd = function () {
        this.sendRequest(HttpEvent.getAd, "ad");
    };
    /** 通用接口
     * 所有header有2个
     * @param interf    接口编号
     * @param url       链接
     * @param data      数据
     * @param method    0get 1post
     */
    HttpCommand.prototype.sendRequest = function (interf, url, data, method) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = 0; }
        url = HttpEvent.httpApi + url;
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        var header1 = { type: "token", value: PlayerConst.token };
        var header2 = { type: "version", value: HttpEvent.version };
        fw.HttpManager.getInstance().sendRequest(interf, url, [header, header1, header2], data, method == 0 ? egret.HttpMethod.GET : egret.HttpMethod.POST);
    };
    return HttpCommand;
}(egret.EventDispatcher));
__reflect(HttpCommand.prototype, "HttpCommand");
//# sourceMappingURL=HttpCommand.js.map