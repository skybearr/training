class GameConst {
	public constructor() {
	}

	public static GameStage: egret.Stage;
	/** 当前屏幕宽度 */
	public static stageWidth: number;
	/** 当前屏幕高度 */
	public static stageHeight: number;


	public static version: string = "201808181130";
	

	/** 广告id */
	public static bannerId:string = "adunit-758f00e035da3372";
	public static rewardAdId:string = "adunit-922e89b51b9d9336";

	/** 缓存在本地的key */
	public static localdata_key_reward_cd:string = "rewardadcd";
	public static localdata_key_turn:string = "_turn";
	public static localdata_key_lastlogintime:string = "_lastlogintime";
}

enum PROPTYPE {
	COIN = 1, //货币
	PROP = 2, //道具
}

enum COINTYPE{
	HP = 1,//体力
	MONEY = 2,//金币
	DIAMOND = 3,//钻石
}

enum SWITCHTYPE{
	ACHIEVE = 1,//成就
	MISSION = 2,//关卡
	SKIN = 3,//皮肤
	TURN = 4,//转盘
}

enum MYDATA{
	INVITE_GET = 0,//邀请礼包中已获取奖励的
	REWARD_NUM = 1,//观看视频成功总数
	BEST_SCORE = 2,//最好成绩
	INVITE_NUM = 3,//邀请好友数量
	ACHIEVE_GET = 4,//成就中已领取的id
	CURRENT_SKIN = 5,//当前皮肤id
	MISSION_CRT = 6,//当前关卡
	MISSION_DATA = 7,//通关关卡数据
}

enum WATCHTYPE{
	TURNPLAY = 1,//视频抽奖
}

enum ACHIEVETYPE{
	LOGIN_TOTAL = 1,//累计登录
	SCORE_SINGLE = 2,//单局得分
	INVITE_NUM = 3,//邀请好友数量
	REWARDAD_NUM = 4,//观看视频次数
}