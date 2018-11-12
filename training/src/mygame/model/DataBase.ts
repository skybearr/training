/**
 * 存放数据
 * 数据来源  本地配置
 * 
 * 
 * 
 */
class DataBase {
	public constructor() {
	}

	/**  */
	public static strings: Object;




	/** 货币名字 */
	public static COIN_NAME:string[] = [,'体力','金币','钻石','','','','','','','',];


	/** 挑战关卡需要消耗的体力 */
	public static HP_REDUCE_BATTLE:number = 10;
	/** 每日签到奖励 */
	public static REWARD_ADD_SIGNIN:string = "1:50";
	/** 看视频送的体力 */
	public static REWARD_ADD_WATCHAD:number = 50;
	/** 邀请好友给的体力 */
	public static HP_ADD_INVITE:number = 120;
	
}
