/**
 * 
 * 道具逻辑类
 * 
 * 
 */
class PropLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: PropLogic;
	public static getInstance(): PropLogic {
		if (this._instance == null) {
			this._instance = new PropLogic();
		}
		return this._instance;
	}


	private props: fw.Map<PropVO> = {};
	/** 初始化道具货币 */
	public initProps(arr: Object[]) {
		this.props = {};
		HttpCommand.getInstance().addEventListener(HttpEvent.getProps, this.propResponse, this, false, 1);

		this.updateProps(arr);
	}

	/** 服务器只返回成功失败，不返回其他数据，不处理 */
	private propResponse(e: HttpEvent) {
		
	}

	private updateProps(arr: any[]) {
		this.props = {};
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = new PropVO();
			vo.id = parseInt(o.type);
			vo.num = parseInt(o.num);
			vo.extradata1 = o.id;
			vo.extradata2 = o.uid;
			this.props[vo.id] = vo;
		}
	}

	/** 根据id获取一个道具的名字 (含货币)*/
	public getPropNameByID(id: number): string {
		if (id < 10) {
			return DataBase.COIN_NAME[id];
		}
		else{
			let vo = this.getPropByID(id);
			return vo == null ? id + "" : vo.name;
		}
	}


	/** 货币道具的变化
	 * @param id 道具id
	 * @param num 增加减少的数量
	*/
	public updateProp(id: number, num: number) {
		let vo = this.props[id];
		if (vo != null) {
			if (vo.num + num <= 0) {
				num = -vo.num;
			}
			vo.num += num;
		}
		else {
			vo = new PropVO();
			vo.id = id;
			if (num < 0) {
				num = 0;
			}
			vo.num = num;
			this.props[id] = vo;
		}
		let str = DataBase.COIN_NAME[id] +  (num > 0 ? "增加" : "减少") + " " + num;
		WxApi.getInstance().toast(str);
		HttpCommand.getInstance().postProps(id, num);

		let event = new GameEvent(GameEvent.PROP_NUM_CHANGE);
		event.data = {id:id,num:num};
		this.dispatchEvent(event);
	}

	/** 获取奖励
	 * @param reward 格式  1:100;2:200;3001:1
	 */
	public getReward(reward:string){
		let arr = reward.split(";");
		for(let i=0;i<arr.length;i++){
			let aaa = arr[i].split(":");			
			PropLogic.getInstance().updateProp(parseInt(aaa[0]), parseInt(aaa[1]));
		}
	}

	/** 获取道具 */
	public getPropByID(id:number):PropVO{
		return this.props[id];
	}

}