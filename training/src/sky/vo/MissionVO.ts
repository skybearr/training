class MissionVO {
	public constructor() {
	}

	public id:number;
	/**0未解锁  1解锁  2已通关 */
	public state:number;
	/**星数 0-3 */
	public stars:number;
	/** 1舒尔特 2趣味 3速记 */
	public type:number;
	public des:string;
	public content:string;
	public times:number[];
}