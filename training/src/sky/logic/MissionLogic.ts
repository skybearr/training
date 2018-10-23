class MissionLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: MissionLogic;
	public static getInstance(): MissionLogic {
		if (this._instance == null) {
			this._instance = new MissionLogic();
		}
		return this._instance;
	}


	private charpters: Map<CharpterVO> = {};
	public crtChapter: number = 2;
	public crtMission: number = 202;

	public initCharpter() {
		this.charpters = RES.getRes("mission_json");
	}

	public getChaprters(): Map<CharpterVO> {
		return this.charpters;
	}

	public getMissionsByChapterID(charpterId: number): CharpterMissionVO[] {
		let charpter = this.charpters[charpterId];
		return charpter.missions;
	}

	/** 当前章节的 当前关卡索引 0开始 */
	public getCrtMissionInCharpter(charpterId: number): number {
		let charpter = this.charpters[charpterId];
		let c = Math.floor(this.crtMission / 100);
		if (c == charpterId) {
			return this.crtMission % 100;
		}
		else {
			return charpter.missions.length;
		}
	}


	public startMissionGame(vo: CharpterMissionVO) {
		GameLogic.getInstance().main.removeChildren();
		var obj_class: any = egret.getDefinitionByName("GameUI" + vo.type);
		GameLogic.getInstance().main.addChild(new obj_class(vo));
	}

}