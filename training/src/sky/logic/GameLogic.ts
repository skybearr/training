class GameLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: GameLogic;
	public static getInstance(): GameLogic {
		if (this._instance == null) {
			this._instance = new GameLogic();
		}
		return this._instance;
	}


	public GameStage: egret.Stage;
	public main: eui.UILayer;

	private data: MissionVO[][];
	private config: any;


	public init() {
		this.initData();
		this.openStart();

		WxApi.getInstance().userInfo = platform.getUserInfo();
		console.log("userinfo:", WxApi.getInstance().userInfo);
	}

	public setNextMission(type,id,state){
		let arr = this.data[type];
		if(arr != null){
			let vo = arr[id];
			if(vo != null){
				vo.state = state;
			}
		}
	}

	private initData() {
		this.data = [, [], [], []];
		this.config = RES.getRes("config_json");
		let localdata = WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);
		console.log("initdata:", localdata, localdata == "");

		if (localdata == null || localdata == "") {
			localdata = [, [], [], []];
		}
		if (this.config != null) {
			for (let i in this.config) {
				let o = this.config[i];
				if (i.length < 8) {
					continue;
				}
				let vo = new MissionVO();
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
				if (localdata != null) {
					let brr = localdata[vo.type];
					if (brr != null) {
						let o = brr[vo.id];
						if (o != null) {
							let t = parseInt(o);
							for (let k = vo.times.length - 1; k >= 0; k--) {
								if (t <= vo.times[k] * 1000) {
									vo.stars++;
								}
							}
							if (vo.state == 0) {
								vo.state = vo.stars > 0 ? 1 : 0;
							}
						}
					}
				}
				this.data[vo.type].push(vo);
			}
		}
		WxApi.getInstance().setLocalData(GameConst.localkey_missiondata, localdata);
	}

	/**本地数据 {id:time} */
	private localdata: any;
	public saveLocal(type: number, id: number, time: number) {
		let localdata = WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);
		console.log("savelocal:", localdata);

		if (localdata == null) {
			localdata = [, [], [], []];
		}
		if (localdata[type] == null) {
			localdata[type] = [];
		}
		localdata[type][id] = time;
		WxApi.getInstance().setLocalData(GameConst.localkey_missiondata, localdata);
	}
	public getRecond(type: number, id: number): number {
		let key = type + "_" + id;
		let value = WxApi.getInstance().getLocalData(key);
		if (value == null || value == "") {
			value = 0;
		}
		return value;
	}

	public openStart() {
		this.main.removeChildren();
		this.main.addChild(new StartUI());
	}

	public startGame(vo: MissionVO) {
		this.main.removeChildren();
		this.main.addChild(new GameUI(vo));
	}

	public openMission() {
		this.main.removeChildren();
		this.main.addChild(new MissionUI());
	}

	public openGrow(){
		this.main.removeChildren();
		this.main.addChild(new MissionUI());
	}


	public getMissionData(): MissionVO[][] {
		return this.data;
	}

	public getStartMission(): MissionVO {
		return this.data[1][2];
	}

	public getStringByStar(n: number): string {
		return this.config["str" + n];
	}

	public crtclick: number;
	public crtClickStr: string;
}