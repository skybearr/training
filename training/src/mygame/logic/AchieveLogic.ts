/**
 * 
 * 成就逻辑类
 * 
 * 
 */
class AchieveLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: AchieveLogic;
	public static getInstance(): AchieveLogic {
		if (this._instance == null) {
			this._instance = new AchieveLogic();
		}
		return this._instance;
	}


	private achieves: fw.Map<AchieveVO>;
	private achievetypes: fw.Map<number>;
	/** 初始化成就 */
	public initAchieves() {
		this.achieves = {};
		this.achievetypes = {};
		HttpCommand.getInstance().addEventListener(HttpEvent.getAchievesAll, this.achieveAllResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getAchieveGot, this.achieveGotResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.postAchieve, this.achieveGotResponse, this, false, 1);

		
	}

	private achieveGotResponse(e: HttpEvent) {
		this.updateAchieves(e.data);
	}

	public getAllAchieves():fw.Map<AchieveVO>{
		return this.achieves;
	}

	/** 初始化所有成就 */
	private achieveAllResponse(e: HttpEvent) {
		let arr: any[] = e.data;
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = this.achieves[o.flow_id];
			if (vo == null) {
				vo = new AchieveVO();
				vo.id = parseInt(o.flow_id);
				vo.imgurl = o.imgurl;
				vo.title = o.title;
				vo.remark = o.remark;
			}
			vo.type = parseInt(o.extradata1);
			vo.appid = o.appid;
			vo.baseline = parseInt(o.baseline);

			//成绩
			vo.grade = this.achievetypes[vo.type];

			vo.reward = o.extradata2.split(";");

			let v = this.achievetypes[vo.type];
			if(vo.state != 2){
				// vo.state = v < vo.baseline ? 0 : (this.hasGet(vo.id) ? 2 : 1);
				vo.state = v < vo.baseline ? 0 : 1;
			}
			

			this.achieves[vo.id] = vo;
		}
	}

	/** 该成就是否已领取奖励 */
	public hasGet(id: number): boolean {
		let str = GameLogic.getInstance().getMyDataValueByID(MYDATA.ACHIEVE_GET);
		let aaa = str == null ? [] : str.split("_");
		return aaa.indexOf(id + "") != -1;

	}
	/** 领取奖励 */
	public getReward(id: number) {
		let vo = this.achieves[id];
		vo.state = 2;
		let str = GameLogic.getInstance().getMyDataValueByID(MYDATA.ACHIEVE_GET);
		if (str == null || str == "") {
			str = vo.id + "";
		}
		else {
			str += ("_" + vo.id);
		}
		// GameLogic.getInstance().updateMyDataValue(MYDATA.ACHIEVE_GET, str);//舒尔特测试用
		this.updateAchieve(id,"","");
		console.log("getrward:",vo);
		
		for(let i=0;i<vo.reward.length;i++){
			let aaa = vo.reward[i].split(":");
			console.log("udpateprop:",aaa);
			
			PropLogic.getInstance().updateProp(parseInt(aaa[0]), parseInt(aaa[1]));
		}
	}

	/** 更新已达成成就 已过期(因当时测试无法配表，所以用mydata处理，如有需求可以重新开启)*/
	private updateAchieves(arr: any[]) {
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = this.achieves[o.flow_id];
			if (vo == null) {
				vo = new AchieveVO();
				vo.id = parseInt(o.flow_id);
				vo.imgurl = o.imgurl;
				vo.title = o.title;
			}
			vo.type = parseInt(o.extradata1);
			vo.grade = parseInt(o.grade);
			vo.create_time = parseInt(o.create_time);
			vo.remark = o.remark;
			vo.state = 2;
			this.achieves[vo.id] = vo;
		}
	}


	/** 成就更新 已过期(因当时测试无法配表，所以用mydata处理，如有需求可以重新开启)
	 * @param id 成就id
	 * @param grade 成就的成绩
	 * @param remark 备用参数 可选
	*/
	public updateAchieve(id: number, grade: string, remark: string = "") {
		let vo = this.achieves[id];
		if (vo == null) {
			console.log("没有找到成就" + id + "，请联系GM");
		}
		else {
			HttpCommand.getInstance().postAchieve(id, grade, remark);
		}

	}

	/** 检测是否更新成就
	 * @param type 成就类型 ACHIEVETYPE.XXXX
	 * @param value 值
	 */
	public updateAchieveType(type: number, value: number) {
		if (value == null || value.toString() == "NaN") {
			value = 0;
		}
		this.achievetypes[type] = value;		
	}

	/** 获取成就进度 */
	public getAchieveTypeValue(type:number):number{
		return this.achievetypes[type] == null ? 0 : this.achievetypes[type];
	}

	/** 初始化Mydata中记录的成就数值 */
	public initAchieveType() {
		//累计登录天数
		this.updateAchieveType(ACHIEVETYPE.LOGIN_TOTAL, PlayerConst.checkInfo.total_num);
		//单局得分
		let s1 = parseInt(GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE));
		this.updateAchieveType(ACHIEVETYPE.SCORE_SINGLE, s1);
		//邀请好友数量
		let s2 = parseInt(GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_NUM));
		this.updateAchieveType(ACHIEVETYPE.INVITE_NUM, s2);
		//观看视频次数
		let s3 = parseInt(GameLogic.getInstance().getMyDataValueByID(MYDATA.REWARD_NUM));
		this.updateAchieveType(ACHIEVETYPE.REWARDAD_NUM, s3);
	}

	/** 更新观看视频次数成就 */
	public updateRewardAchieve(add: number = 0) {
		let s1 = GameLogic.getInstance().getMyDataValueByID(MYDATA.REWARD_NUM);
		let n: number;
		if (s1 == null) {
			n = 1;
		}
		else {
			n = parseInt(s1);
		}
		GameLogic.getInstance().updateMyDataValue(MYDATA.REWARD_NUM, n);
		AchieveLogic.getInstance().updateAchieveType(ACHIEVETYPE.REWARDAD_NUM, n);
	}
}