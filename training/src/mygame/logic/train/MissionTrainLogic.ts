class MissionTrainLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: MissionTrainLogic;
	public static getInstance(): MissionTrainLogic {
		if (this._instance == null) {
			this._instance = new MissionTrainLogic();
		}
		return this._instance;
	}


	private charpters: fw.Map<CharpterVO> = {};
	public crtChapter: number = 1;
	public crtMission: number = 101;
	private passdata:fw.Map<number>;


	public initData(){
		this.initPassData();
		GameTrainLogic.getInstance().initData();
		this.initCharpter();
	}

	private initPassData(){
		this.passdata = {};
		//格式  101=1151&102=313
		let str:string = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_DATA);
		if(str != null){
			let arr:string[] = str.split("&");
			for(let i=0;i<arr.length;i++){
				let a1 = arr[i].split("=");
				this.passdata[a1[0]] = parseInt(a1[1]);
			}
		}
		
	}

	public updatePassData(id:number,score:number){
		this.passdata[id] = score;
		let s1 = "";                        
		for(let id in this.passdata){
			if(s1 != ""){
				s1 += "&";
			}
			s1 += (id + "=" + this.passdata[id]);
		}
		GameLogic.getInstance().updateMyDataValue(MYDATA.MISSION_DATA,s1);
	}

	public getPassData():fw.Map<number>{
		return this.passdata;
	}

	public updateCrtMission(id:number){
		this.crtMission = id;
		GameLogic.getInstance().updateMyDataValue(MYDATA.MISSION_CRT,this.crtMission + "");
	}

	public initCharpter() {
		let s1 = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_CRT);
		if(s1 == null){
			this.updateCrtMission(101);
		}
		else{
			this.crtMission = parseInt(s1);
		}
		this.crtChapter = Math.floor(this.crtMission / 100);
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
			v.times = o.time.split(":");
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

	public getChaprters(): fw.Map<CharpterVO> {
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


	public startMissionGame(vo: CharpterMissionVO) {
		var obj_class: any = egret.getDefinitionByName("GameUI" + vo.type);
		fw.UIManager.getInstance().main.addChild(new obj_class(vo));
	}

}