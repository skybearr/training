/**
 *
 * @author 
 * 发送HTTP请求 HttpCommand.getInstance().dispatchEvent(HttpEvent.XXXX)
 *
 */
class HttpCommand extends egret.EventDispatcher {
    public constructor() {
        super();
    }

    private static instance: HttpCommand;
    public static getInstance(): HttpCommand {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    }

    /** 登录
     * @param code 登录code
     */
    public getToken(code) {
        let url = HttpEvent.httpApi + "wx?code=" + code + "&appid=" + HttpEvent.appid;
        let header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        let header1 = { type: "version", value: HttpEvent.version };
        fw.HttpManager.getInstance().sendRequest(HttpEvent.getToken, url, [header, header1]);
    }

    /** 发送用户信息 
     * @param userinfo
     */
    public postUser(userinfo) {
        this.sendRequest(HttpEvent.postUser, "users", userinfo, 1);
    }

    /** 获取用户信息 */
    public getUser() {
        this.sendRequest(HttpEvent.getUser, "users");
    }

    /** 发送货币道具信息 */
    public postProps(id: number, num: number) {
        let data = { type: id + "", num: num + "" };
        this.sendRequest(HttpEvent.postProps, "prop", data, 1);
    }

    /** 获取货币道具信息 */
    public getProps() {
        this.sendRequest(HttpEvent.getProps, "prop");
    }

    /** 发送 世界排行 分数
     * @param score 分数
     * @param sort 0从大到小  1从小到大
     * @param type 排序分类 0全部 
     */
    public postWorldRank(score: number, sort: string = "0", type = "0") {
        let data = { sort: sort, type: type, score: score + "" };
        this.sendRequest(HttpEvent.postWorldRank, "ranking", data, 1);
    }

    /** 获取世界排行
     *  @param limit 请求个数
     * @param sort 0从大到小  1从小到大
     * @param type 排序分类 0全部 
     * @param page 页数
     */
    public getWorldRank(limit = 20, sort = 0, type = "0", page = 1) {
        let url = "ranking?sort=" + sort + "&type=" + type + "&p=" + page + "&limit=" + limit;
        this.sendRequest(HttpEvent.getWorldRank, url);
    }

    /** 设置弹性字段 客户端存储的一些数据
     * @param str 存在服务端的一个数据 具体在Gamelogic中自行实现
    */
    public postMyData(str: string) {
        let data = { mydata: str };
        this.sendRequest(HttpEvent.postMyData, "users/mydata", data, 1);
    }

    /** 获取弹性字段 
     * 
    */
    public getMyData() {
        this.sendRequest(HttpEvent.getMyData, "users/mydata");
    }

    /** 获取转盘信息
     * 
     */
    public getTurntable() {
        this.sendRequest(HttpEvent.getTurntable, "turntable");
    }

    /** 
     * 获取所有皮肤信息
     */
    public getSkinsAll() {
        this.sendRequest(HttpEvent.getSkinsInfo, "skin/all");
    }

    /** 
     * 设置皮肤获取
     * @param skin_id 皮肤Id
     */
    public postSkinGet(skin_id: number) {
        let data = { skin_id: skin_id + "" };
        this.sendRequest(HttpEvent.postSkinGot, "skin", data, 1);
    }

    /** 
     * 设置默认皮肤
     * @param skin_id 皮肤Id
     */
    public postSkinDefault(skin_id: string) {
        let data = { skin_id: skin_id };
        this.sendRequest(HttpEvent.postSkinDefault, "skin/defaultSkin", data, 1);
    }

    /** 
     * 获取用户所得的所有皮肤
     * @param skin_id 皮肤Id 可选，为null表示获取所有
     */
    public getSkinsGot(skin_id: string = null) {
        if (skin_id == null) {
            this.sendRequest(HttpEvent.getSkinsGot, "skin");
        }
        else {
            this.sendRequest(HttpEvent.getSkinsGot, "skin?skin_id=" + skin_id);
        }

    }

    /** 
     * 获取所有关卡
     */
    public getMissionsAll() {
        this.sendRequest(HttpEvent.getMissionsInfo, "level/all");
    }

    /** 
     * 提交用户关卡
     * @param mission_id 关卡Id
     * @param grade 过关成绩（可以是星级，分数，成绩）
     * @param extradata 备用，其他需要用的数据
     */
    public postMission(mission_id: number, grade: number, extradata: string = "") {
        let data = { level_id: mission_id + "", grade: grade+"", remark: extradata };
        this.sendRequest(HttpEvent.postMission, "level", data, 1);
    }

    /** 
     * 获取用户的已通关关卡数据
     * @param missionId 关卡Id
     */
    public getMissionsPass(missionId: number) {
        if (missionId == null) {
            this.sendRequest(HttpEvent.getMissionsPass, "level");
        }
        else {
            this.sendRequest(HttpEvent.getMissionsPass, "level?level_id=" + missionId);
        }

    }

    /** 
    * 获取所有成就
    */
    public getAchievesAll() {
        this.sendRequest(HttpEvent.getAchievesAll, "honor/all");
    }

    /**
     * 提交用户成就
     * @param honor_id 成就Id
     * @param grade 成就成绩
     * @param extradata 备用，其他需要用的数据
     */
    public postAchieve(honor_id, grade, extradata) {
        let data = { honor_id: honor_id + "", grade: grade, remark: extradata };
        this.sendRequest(HttpEvent.postAchieve, "honor", data, 1);
    }

    /** 
    * 获取用户已达成成就
    */
    public getAchieveGot() {
        this.sendRequest(HttpEvent.getAchieveGot, "honor");
    }

    /** 签到 */
    public checkIn() {
        this.sendRequest(HttpEvent.checkIn, "checkin",null,1);
    }

    /** 版本更新公告 */
    public notice() {
        this.sendRequest(HttpEvent.getNotice, "notice");
    }

    /** 新用户邀请判断 */
    public postInvite(uid: string) {
        this.sendRequest(HttpEvent.postInvite, "invite", { share_uid: uid }, 1);
    }

    /** 获取我邀请的用户 */
    public getInvite(){
        this.sendRequest(HttpEvent.getInvite, "invite");
    }

    /** 设置列表 */
    public getSetting(){
        this.sendRequest(HttpEvent.getSetting, "setting");
    }

    /** 分享信息数据 */
    public getShareSetting(){
        this.sendRequest(HttpEvent.getShareSetting, "shareinfo");
    }

    /** 广告列表 */
    public getAd(){
        this.sendRequest(HttpEvent.getAd, "ad");
    }





    /** 通用接口
     * 所有header有2个
     * @param interf    接口编号 
     * @param url       链接
     * @param data      数据
     * @param method    0get 1post
     */
    private sendRequest(interf, url, data = null, method = 0) {
        url = HttpEvent.httpApi + url;
        let header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        let header1 = { type: "token", value: PlayerConst.token };
        let header2 = { type: "version", value: HttpEvent.version };
        fw.HttpManager.getInstance().sendRequest(interf, url, [header, header1, header2], data, method == 0 ? egret.HttpMethod.GET : egret.HttpMethod.POST);
    }
}
