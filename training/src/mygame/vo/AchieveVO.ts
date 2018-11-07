class AchieveVO {
	public constructor() {
	}

	/** 达成时间 null表示未达成 */
	public create_time:number;
	

	private _grade:number;
	/** 达成成绩 暂无用 */
	public set grade(v:number){
		this._grade = v;
	}
	public get grade():number{
		return this._grade;
	}

	/** 0未达成 1达成可领取 2已领取 */
	public state:number;

	/** 成就id */
	public id:number;
	/** 资源路径 */
	public imgurl:string;
	/** 成就名 */
	public title:string;

	/** 成就类型达成条件的需求类型 ACHIEVETYPE.xxxx （对应备用参数1：extradata1） */
	public type:number;

	public remark:string;

	/** 成就奖励  ['1:10','2:20','3:30']   (对应备用参数2） */
	public reward:string[];

	/** 达到条件 */
	public baseline:number;

	/** 服务器使用区分游戏 */
	public appid:string;

	
}