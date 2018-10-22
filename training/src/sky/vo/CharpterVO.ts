class CharpterVO {
	public constructor() {
	}

	public id:number;
	/** 0未解锁 1解锁 2通关 */
	public state:number;

	public missions:CharpterMissionVO[];
}