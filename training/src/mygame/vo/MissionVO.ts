class MissionVO {
	public constructor() {
	}

	public id:number;
	/** 开启条件 */
	public baseline:number;

	
	public imgurl:string;
	/** 通关星级 */
	public star:number;

	/** 状态 0未解锁 1解锁 2通关 */
	public state:number;



	public name:string;

	/** 通关时间 null表示未达成 */
	public create_time:number;

	private _grade:number;
	/** 达成成绩 */
	public set grade(v:number){
		this._grade = v;
		this.star = this.getStarByGrade(v);
	}
	public get grade():number{
		return this._grade;
	}

	/** 根据成绩得出过关星级，项目自行编写 */
	private getStarByGrade(v):number{
		if(this.times == null){
			return 0;
		}
		return 0;
	}

		/** 过关星级 */
	public starline: number[];

	/** 备用参数1 */
	public extradata:string;

	/** 服务器使用区分游戏 */
	public appid:string;


	/** ------------------- train项目使用 ----------------- */
	/** 标题 */
	public title:string;
	/** 游戏类型 GAMETYPE.XXX 1舒尔特 2速记 */
	public type:number;
	/** 游戏参数 */
	public content:string;
	/** 游戏玩法描述 */
	public des:string;
	/** 游戏星级 */
	public times:number[];
	/** 剧情对话 */
	public setDialog(id:number){
		
	}
}