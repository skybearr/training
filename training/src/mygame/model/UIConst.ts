class UIConst {
	public constructor() {
	}

	/** 一级界面 */
	public static START: string = "StartUI";
	public static GAME: string = "GameUI";
	

	/** 二级界面 */
	public static NOTICE:string = "NoticeUI";
	public static RANK: string = "RankUI";
	public static TURN: string = "TurnUI";
	public static INVITE: string = "InviteUI";
	public static GROW: string = "GrowUI";
	public static MISSION: string = "MissionUI";
	public static ACHIEVE: string = "AchieveUI";
	public static PLAN:string = "PlatUI";



	/** ----------------------------------- 开放域好友激励命令  ----------------------------------------- */

	/** 下一个比自己高的 必要额外参数：当前分数*/
	public static command_getnext:string = "nextscore";

	/** 超越了一个比自己高的 必要额外参数：当前分数和上一个分数*/
	public static command_exceed:string = "exceed";

	/** 结算分段附近好友分段 */
	public static command_nearfriend:string = "near";

	/** 结算超越了多少好友 */
	public static command_exceedfriend:string = "exceedfriend";

	/** 开启排行 */
	public static command_openrank:string = "openrank";

	/** 关闭 */
	public static command_clear:string = "clear";
}


