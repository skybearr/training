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
	public crtChapter: number = 1;
	public crtMission: number = 102;

	public initCharpter() {
		let data = RES.getRes("mission_json");
		let mid = this.crtMission % 100;
		for (let id in data) {
			let o = data[id];

			let v = new CharpterMissionVO();
			v.missionId = parseInt(o.id);
			v.title = o.title;
			v.type = parseInt(o.type);
			v.content = o.content;
			v.des = o.des;
			v.times = o.time;
			v.setDialog(o.dialog);

			let cid = Math.floor(parseInt(id) / 100);
			let vo:CharpterVO = this.charpters[cid];
			if(vo == null){
				vo = new CharpterVO();
				vo.id = cid;
				vo.missions = [];
				if(cid == this.crtChapter){
					vo.state = 1;
					v.state = mid < v.missionId ? 2 : (mid > v.missionId ? 0 : 1);
				}
				else{
					vo.state = cid < this.crtChapter ? 2 : 0;
				}
				
			}
			
			vo.missions.push(v);
			this.charpters[cid] = vo;
		}
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
		var obj_class: any = egret.getDefinitionByName("GameUI" + vo.type);
		GameLogic.getInstance().main.addChild(new obj_class(vo));
	}

}