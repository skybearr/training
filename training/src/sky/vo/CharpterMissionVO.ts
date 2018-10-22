class CharpterMissionVO {
	public constructor() {
	}

	public chapterId:number;

	public missionId:number;

	public title:string;
	/**0未解锁  1解锁  2已通关 */
	public state:number;
	/**星数 0-3 */
	public stars:number;
	/** 1舒尔特 2速记 */
	public type:number;

	public des:string;

	public best:number;

	public times:number[];

	public avgVO:AvgVO;

}