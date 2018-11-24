/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    /** 是否debug */
    isdebug():any

    /** 初始化埋点sdk */
    initBuryingSDK(): Promise<any>;

    /** 埋点统计
     * @param id 埋点id，在后台设置
     */
    buryingPoint(id, value): Promise<any>

    /** 登录 */
    login(): Promise<any>

    /** 获取用户授权 */
    getUserInfo(): Promise<any>

    /** 显示当前页面的转发按钮 */
    showShareMenu(): any
    /** 主动分享 */
    share(title, imageUrl, query): any
    /** 右上角被动分享 */
    onShareAppMessage(title, imageUrl, query): any
    /**更新转发属性 */
    updateShareMenu(bool): any
    /**获取转发详细信息 */
    getShareInfo(ticket): Promise<any>
    /**小程序启动参数 */
    getLaunchOptionsSync(): any

    /** 游戏圈 */
    createGameClubButton(textstr): Promise<any>

    /** 手机震动 
     * @param short 是否短振动
    */
    vibrate(short): Promise<any>

    /** 展示banner广告 */
    bannershow(bannerId): any

    /** 隐藏banner广告 */
    bannerhide(): any

    /** 销毁banner广告 */
    bannerdestroy():any

    /** 同步存储本地缓存
     * @param key 缓存的key
     * @param value 缓存数据 string|Object
     */
    setStorageSync(key, value, isobj): any

    /** 同步读取本地缓存 */
    getStorageSync(key, isobj): any

    /** 跳转到其他小程序 */
    skipToProgram(appid, extraData): any

    /** 创建激励视频
     * @return 0正常看完有奖励 1看一半关闭没奖励 2打开失败 3加载失败 4加载成功 5版本过低
     */
    rewardAdCreate(adunitId): Promise<any>

    /** 显示激励视频 
     * @return 0正常看完有奖励 1看一半关闭没奖励 2打开失败 3加载失败 4加载成功 5版本过低
    */
    rerwardAdShow(): Promise<any>

    /** 向开放域发数据
     * @param data  shareTicket: this.shareticket,
	                userinfo: WxApi.getInstance().userInfo,
			        stageW: GlobalConst.GameStage.stageWidth,
			        stageH: GlobalConst.GameStage.stageHeight,
			        command: "open"
     */
    postMessage(data): any

    /**对用户托管数据进行写数据操作，允许同时写多组 KV 数据
     * @param KVDataList     [{ key: "newscore", value:"9999"}]
     */
    setUserCloudStorage(KVDataList): any

    /** 联系客服 */
    openCustomerServiceConversation(): any

    /** 弹出悬浮提示 */
    toast(str): any

    /** 弹窗窗提示 */
    showModal(content, title, surestr): any
    checkVersion();
}

/**
 * DebugPlatform用于本地测试
 */
class DebugPlatform implements Platform {
    isdebug(){
        return true;
    }
    checkVersion(){
        
    }
    async initBuryingSDK() {
        console.log("debug_initBuryingSDK");
    }
    async buryingPoint(id, value) {
        console.log("debug_buryingPoint", id);
    }

    async login() {
        return { code: "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C" };
    }
    async getUserInfo() {
        PlayerConst.token = "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C";
        return { nickName: "debug_nickName", avatarUrl: "resource/assets/logo.png", city: "sz", country: "CHZ", gender: 1, language: "chinese", province: "js" }
    }
    showShareMenu() {

    }
    share(title, imageUrl, query) {
        console.log("debug_share", title, imageUrl, query);
    }
    onShareAppMessage(title, imageUrl, query) {
        console.log("debug_onShareAppMessage", title, imageUrl, query);
    }
    updateShareMenu(bool) {
        console.log("debug_updateShareMenu", bool);
    }
    async getShareInfo(ticket) {
        return { encryptedData: "debug_encryptedData", iv: "debug_iv" };
    }
    getLaunchOptionsSync() {
        return { info: { query: "debug_query" }, shareTicket: "debug_shareTicket" }
    }
    async createGameClubButton(textstr) {
        console.log("debug_createGameClubButton", textstr);
    }
    async vibrate(short) {
        console.log("debug_vibrate", short);
    }
    bannershow(bannerId) {
        console.log("debug_bannershow");
    }
    bannerdestroy() {
        console.log("debug_bannerdestroy");
    }
    bannerhide() {
        console.log("debug_bannerhide");
    }
    setStorageSync(key, value, isobj) {
        if (typeof (value) != "string") {
            value = JSON.stringify(value);
        }
        console.log("setStorageSync:", key, value);
        egret.localStorage.setItem(key, value);
    }
    getStorageSync(key, isobj) {
        let value = egret.localStorage.getItem(key);
        value = JSON.parse(value);
        console.log("getStorageSync:", key, value);
        return value;
    }
    skipToProgram(appid, extraData) {
        console.log("debug_postMessage", appid, extraData);
    }
    async rewardAdCreate(adunitId) {
        return 1;
    }
    async rerwardAdShow() {
        return 2;
    }
    postMessage(data) {
        console.log("debug_postMessage", data);
    }
    setUserCloudStorage(KVDataList) {
        console.log("debug_setUserCloudStorage", KVDataList);
    }
    openCustomerServiceConversation() {
        console.log("debug_openCustomerServiceConversation");
    }
    toast(str) {
        console.log("debug_toast:", str);
    }
    showModal(content, title, surestr) {
        console.log("debug_showModal:", title, content, surestr);
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}

declare let platform: Platform;

declare interface Window {
    platform: Platform
}





