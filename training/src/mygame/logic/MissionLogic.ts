/**
 * 
 * 关卡逻辑类
 * 
 * 
 */
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

	private missions: fw.Map<MissionVO>;
	private charpters: fw.Map<CharpterVO> = {};

	private lastMissionId: number;
	private crtChapter: number;
	public crtMissionVO: MissionVO;


	/** 初始化关卡 */
	public initMissions() {
		this.missions = {};
		let data = RES.getRes("mission_json");
		for (let id in data) {
			let o = data[id];
			let v = new MissionVO();
			v.id = parseInt(o.id);
			v.title = o.title;
			v.type = parseInt(o.type);
			v.content = o.content;
			v.des = o.des;
			v.times = o.time;
			v.setDialog(o.dialog);
			this.missions[v.id] = v;
		}
	}

	/** 初始化所有关卡配置 */
	private missionAllResponse(e: HttpEvent) {
		//本地配置
		let data = RES.getRes("mission_json");
		for (let id in data) {
			let o = data[id];
			let v = new MissionVO();
			v.id = parseInt(o.id);
			v.title = o.title;
			v.type = parseInt(o.type);
			v.content = o.content;
			v.des = o.des;
			v.times = o.time;
			v.setDialog(o.dialog);
			this.missions[v.id] = v;
		}

		// //章节处理
		// let cid = Math.floor(parseInt(id) / 100);
		// let vo: CharpterVO = this.charpters[cid];
		// if (vo == null) {
		// 	vo = new CharpterVO();
		// 	vo.id = cid;
		// 	vo.missions = [];
		// 	if (cid == this.crtChapter) {
		// 		vo.state = 1;
		// 		v.state = mid < v.missionId ? 2 : (mid > v.missionId ? 0 : 1);
		// 	}
		// 	else {
		// 		vo.state = cid < this.crtChapter ? 2 : 0;
		// 	}

		// }

		// vo.missions.push(v);
		// this.charpters[cid] = vo;

	}

	/**  */
	public getNextMissionVO(id: number): MissionVO {
		let nextid = id + 1;
		if (this.missions[nextid] != null) {
			return this.missions[nextid];
		}
		else {
			nextid = id - (id % 100) + 101;
			return this.missions[nextid];
		}
	}
}