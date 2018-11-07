class GameTrainLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: GameTrainLogic;
	public static getInstance(): GameTrainLogic {
		if (this._instance == null) {
			this._instance = new GameTrainLogic();
		}
		return this._instance;
	}


	public GameStage: egret.Stage;
	public main: eui.UILayer;

	private data: TrainMissionVO[][];
	private config: any;


	public init() {
		// this.initData();
		// MissionTrainLogic.getInstance().initCharpter();
		// this.openStart();

		// WxApi.getInstance().userInfo = platform.getUserInfo();
		// console.log("userinfo:", WxApi.getInstance().userInfo);
	}

	public setNextMission(type, id, state) {
		let arr = this.data[type];
		if (arr != null) {
			let vo = arr[id];
			if (vo != null) {
				vo.state = state;
			}
		}
	}

	public initData() {
		this.data = [, [], [], []];
		this.config = RES.getRes("config_json");

		for (let i in this.config) {
			let o = this.config[i];
			if (i.length < 8) {
				continue;
			}
			let vo = new TrainMissionVO();
			vo.id = o['id'];
			vo.type = o['type'];
			vo.des = o['des'];
			vo.content = o['content'];
			vo.name = o['name'];
			vo.times = [];
			let ta = o['time'].split(":");
			for (let j = 0; j < ta.length; j++) {
				vo.times.push(parseInt(ta[j]));
			}
			vo.state = vo.type == 1 ? 0 : 1;
			if (vo.type == 1 && vo.id == 1) {
				vo.state = 1;
			}
			vo.stars = 0;
			let previewvo = this.data[vo.type][vo.id - 1];
			if (previewvo != null) {
				if (previewvo.state == 2) {
					vo.state = 1;
				}
			}
			this.data[vo.type].push(vo);
		}
	}

	/**本地数据 {id:time} */
	private localdata: any;
	public saveLocal(type: number, id: number, time: number) {
		// let localdata = WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);
		// console.log("savelocal:", localdata);

		// if (localdata == null) {
		// 	localdata = [, [], [], []];
		// }
		// if (localdata[type] == null) {
		// 	localdata[type] = [];
		// }
		// localdata[type][id] = time;
		// WxApi.getInstance().setLocalData(GameConst.localkey_missiondata, localdata);
	}

	public getRecond(id: number): number {
		let value: number = 0;
		let str = GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE);
		if (str == null) {
			value = 0;
		}
		else {
			let arr: string[] = str.split("&");
			p1: for (let i = 0; i < arr.length; i++) {
				let brr = arr[i].split("=");
				if (id + "" == brr[0]) {
					value = parseInt(brr[1]);
					break p1;
				}
			}
		}

		return value;
	}
	public setRecond(id: number, time: number) {
		let sss = id + "=" + time;
		let str = GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE);
		if (str == null) {
			str = sss;
		}
		else {
			str += ("&" + sss);
		}
		GameLogic.getInstance().updateMyDataValue(MYDATA.BEST_SCORE, str);
		WxApi.getInstance().setScore("score_" + id, time);
	}

	public openStart() {
		fw.UIManager.getInstance().openUI(UIConst.START);
	}

	public startGame(vo: TrainMissionVO) {
		fw.UIManager.getInstance().openUI(UIConst.GAME,vo);
	}

	public openMission() {
		fw.UIManager.getInstance().openUI(UIConst.MISSION);
	}

	public openGrow() {
		fw.UIManager.getInstance().openUI(UIConst.GROW);
	}


	public getMissionData(): TrainMissionVO[][] {
		return this.data;
	}

	public getStartMission(): TrainMissionVO {
		return this.data[1][2];
	}

	public getStringByStar(n: number): string {
		return this.config["str" + n];
	}

	public crtclick: number;
	public crtClickStr: string;
}