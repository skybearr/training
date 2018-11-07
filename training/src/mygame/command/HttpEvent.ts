/**
 * 
 * 
 */
class HttpEvent extends egret.Event {
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }

    public data: any = null;

    /**与服务端通信地址 */
    public static httpApi: string = "https://common.zhuyuce.com/";

    /**游戏的appid */
    public static appid: string = "wxd4950745d08c9e90";

    /** api接口版本 */
    public static version:string = "1.0";



    /** ---------------------------- 接口协议 --------------------------------------- */

    /** 获取Token */
    public static getToken: string = "getToken";

    /** 获取用户信息 */
    public static getUser: string = "getUser";

    /** 发送用户信息 */
    public static postUser: string = "postUser";

    /** 获取货币道具信息 */
    public static getProps: string = "getProps";

    /** 发送货币道具信息 */
    public static postProps: string = "postProps";

    /** 获取排行榜信息 */
    public static getWorldRank: string = "getWorldRank";

    /** 发送排行榜信息 */
    public static postWorldRank: string = "postWorldRank";

    public static getMyData: string = "getMyData";
    public static postMyData: string = "postMyData";

    public static getTurntable: string = "getTurntable";

    public static getSkinsInfo: string = "getSkinsInfo";
    public static postSkinGot: string = "postSkinGot";
    public static postSkinDefault: string = "postSkinDefault";
    public static getSkinsGot: string = "getSkinsGot";

    public static getMissionsInfo: string = "getMissionsInfo";
    public static postMission: string = "postMission";
    public static getMissionsPass: string = "getMissionsPass";

    public static getAchievesAll: string = "getAchievesAll";
    public static postAchieve: string = "postAchieve";
    public static getAchieveGot: string = "getAchieveGot";

    public static checkIn: string = "checkIn";
    public static getInvite: string = "getInvite";
    public static getNotice: string = "getNotice";
    public static postInvite: string = "postInvite";
    public static getSetting: string = "getSetting";
    public static getShareSetting: string = "getShareSetting";
    public static getAd: string = "getAd";
}
