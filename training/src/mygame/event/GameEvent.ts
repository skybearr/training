class GameEvent extends egret.Event {
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }

    public data: any = null;

    /** 视频观看结束 */
    public static REWARDAD_CLOSE_EVENT: string = "REWARDAD_CLOSE_EVENT";

    /** 开关banner广告 */
    public static BANNER_HIDE: string = "BANNER_HIDE";

    /** 道具变化 */
    public static PROP_NUM_CHANGE:string = "PROP_NUM_CHANGE";
}
