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
	public missionui: MissionUI;
	public crt_missionId: number;
	/** 初始化已通关关卡 */
	public initMissions(arr: Object[]) {
		this.missions = {};
		HttpCommand.getInstance().addEventListener(HttpEvent.getMissionsInfo, this.missionAllResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getMissionsPass, this.missionPassResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.postMission, this.missionPassResponse, this, false, 1);

		this.updatemissions(arr);
	}

	public startGame(id: number) {
		let vo = this.getMissionVOById(id);
		if (vo == null) {
			console.log("关卡错误", id);
			return;
		}
		fw.UIManager.getInstance().openUI(UIConst.GAME, vo);
	}

	public getMissionVOById(id): MissionVO {
		return this.missions[id];
	}

	public getAllMissions(): fw.Map<MissionVO> {
		return this.missions;
	}

	/** 初始化已通关关卡 */
	private missionPassResponse(e: HttpEvent) {
		this.updatemissions(e.data);
	}

	/** 初始化所有关卡配置 */
	private missionAllResponse(e: HttpEvent) {
		let mid = GameLogic.getInstance().getMyDataValueByID(MYDATA.CRT_MISSION);
		console.log("init:", mid);

		this.crt_missionId = mid == null ? 101 : parseInt(mid);
		let arr: any[] = e.data;
		arr.sort(this.sortfun);
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
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = this.missions[o.flow_id];
			if (vo == null) {
				vo = new MissionVO();
				vo.id = parseInt(o.flow_id);
				vo.imgurl = o.imgurl;
				vo.name = o.title;
			}

			vo.starline = [];
			let a1: string[] = o.extradata1.split(":");
			for (let j = 0; j < a1.length; j++) {
				vo.starline.push(parseInt(a1[j]));
			}

			vo.appid = o.appid;
			vo.baseline = parseInt(o.baseline);
			console.log("state:", vo.id, this.crt_missionId);

			vo.state = vo.id < this.crt_missionId ? 2 : (vo.id == this.crt_missionId ? 1 : 0);
			vo.grade = vo.grade;
			this.missions[vo.id] = vo;
		}
	}

	private sortfun(a: any, b: any): number {
		if (parseInt(a.flow_id) < parseInt(b.flow_id)) {
			return -1;
		}
		else {
			return 1;
		}
	}


	/** 更新所有已达成关卡 */
	private updatemissions(arr: any[]) {
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = this.missions[o.flow_id];
			if (vo == null) {
				vo = new MissionVO();
				vo.id = parseInt(o.flow_id);
				vo.imgurl = o.imgurl;
				vo.name = o.title;
			}
			vo.grade = parseInt(o.grade);
			vo.create_time = parseInt(o.create_time);
			vo.remark = o.remark;
			this.missions[vo.id] = vo;
		}
		if (this.missionui != null) {
			this.missionui.update();
		}
	}

	/** 关卡更新
	 * @param id 关卡id
	 * @param grade 关卡的成绩
	 * @param remark 备用参数 可选
	*/
	public updatemission(id: number, grade: number, remark: string = "") {
		let vo = this.missions[id];
		if (vo == null) {
			console.log("没有找到关卡" + id + "，请联系GM");
		}
		else {
			if(grade <= vo.grade){
				return;
			}
			HttpCommand.getInstance().postMission(id, grade, remark);
			console.log("updateMission:", vo, grade);

			if (grade >= vo.baseline) {
				//更新当前关卡
				if (vo.state == 1) {
					vo.state = 2;
					let nextid = id + 1;
					let nextvo = this.missions[nextid];
					if (nextvo == null) {//当前章节没有了，寻找下一章节的第一关
						nextid = (id - id % 100) + 101;
					}
					console.log("nextid:",nextid);
					
					nextvo = this.missions[nextid];
					if (nextvo != null) {
						this.crt_missionId = nextid;
						nextvo.state = 1;
						console.log("updateCrtMission:",this.crt_missionId);
						GameLogic.getInstance().updateMyDataValue(MYDATA.CRT_MISSION, this.crt_missionId);
					}
				}
			}
		}

	}

}