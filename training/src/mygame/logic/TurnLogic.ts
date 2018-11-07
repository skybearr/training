/**
 * 
 * 转盘逻辑类
 * 
 * 
 */
class TurnLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: TurnLogic;
	public static getInstance(): TurnLogic {
		if (this._instance == null) {
			this._instance = new TurnLogic();
		}
		return this._instance;
	}

	private turns: TurnVO[] = [];
	public freetimes:number = 0;
	/** 初始化转盘 */
	public initTurns() {
		this.turns = [];

		HttpCommand.getInstance().addEventListener(HttpEvent.getTurntable, this.turnResponse, this, false, 1);
	}

	private turnResponse(e: HttpEvent) {
		this.updateTurns(e.data);
	}

	/** 初始化转盘数据 */
	private updateTurns(arr: any[]) {
		this.turns = [];
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = new TurnVO();
			vo.id = parseInt(o.id);
			vo.appid = o.appid;
			vo.imgurl = o.imgurl;
			vo.num = parseInt(o.num);
			vo.name = o.title;
			vo.type = parseInt(o.type);
			vo.weight = parseInt(o.weights);
			this.turns.push(vo);
		}

		this.turns = [];
		//读取本地配置
		for (let i = 0; i < 16; i++) {
			let vo = new TurnVO();
			vo.id = i + 1;
			vo.num = GameUtil.between(10,1000);
			vo.name = "奖励"+ vo.id;
			vo.weight = GameUtil.between(10,100);
			this.turns.push(vo);
		}
	}

	/** 获取转盘信息 */
	public getTurnVOs():TurnVO[]{
		return this.turns;
	}

	/** 免费抽奖的cd 0表示可以免费抽奖 */
	public getFreeShareCD():number{
		if(this.freetimes == 0){
			let a = 24 * 3600;
			let d = new Date();
			let h = d.getHours();
			let m = d.getMinutes();
			let s = d.getSeconds();
			return a - h * 3600 - m * 60 - s;
		}
		else{
			return 0;
		}
	}

	public setFreeTurn() {
		let date = new Date();
		let todaykey = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate();
		let todayturnkey = todaykey + GameConst.localdata_key_turn;
		WxApi.getInstance().setStorage(todayturnkey, "true");
		this.freetimes = 0;
	}
}