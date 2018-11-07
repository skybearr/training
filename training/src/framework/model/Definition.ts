/**
 * 游戏中的一些类型定义
 * 
 * 
 * @sky
 */
module fw {
	export class Definition {
		public constructor() {
		}

	}

	export enum UITYPE {
		FIRST = 1,//1级界面 只有1个1级界面存在
		SECOND = 2,//2级界面 在1级界面上打开
	}

	export enum TWEENTYPE{
		NONE = 0,//无动画 直接打开
		SCALE = 1,//从小到大渐变
		MOVE_OVERRIDE = 2,//覆盖平移
		MOVE_PUSH = 3,//推开平移
		ROTAION = 4,//旋转
	}

	/** 全屏加载时 加载界面 */
	export enum LOADINGTYPE {
		RESET = 0,//关闭时调用
		CIRCLE = 1,	//只显示一个圈
		LOADING = 2,//首次进入游戏，有加载进度数字
	}

	/** 分享类型 */
	export enum SHARETYPE{
		ACTIVE = 1,//主动分享
		SHOWOFF = 2,//炫耀
		CRTSCORE = 3,//当前分数
		PASSIVE = 4,//被动分享
		GROUPRANK = 5,//群排行
		SCREENSHOT = 6,//当前页截图
		INVITE = 7,//邀请好友，永久
		INVITE_DAILY = 8,//每日邀请
	}

	/** 排行榜排序类型 */
	export enum RANKSORTTYPE{
		ASC = 1,//升序
		DESC = 2,//降序
	}
}