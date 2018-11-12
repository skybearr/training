/**
 * 
 * 游戏逻辑类
 * 
 * 
 */
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

	public startui: StartUI;

	/** 初始化游戏数据
	 * @param o 数据
	 */
	public init(o: any) {
		HttpCommand.getInstance().addEventListener(HttpEvent.checkIn, this.checkInResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getNotice, this.noticeResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.postInvite, this.postInviteResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getSetting, this.getSettingResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getShareSetting, this.getShareResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getAd, this.getAdResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getMyData, this.getMyDataResponse, this, false, 1);

		this.updateCheckInfo(o.checkin);
		this.updateSetting(o.setting);
		this.updateMyData(o.mydata);
		this.checkNotice();

		this.checkLoginData();
	}

	public setTodayScore(time: number) {
		let nowtime = Math.floor(new Date().getTime() / 1000);
		let today0 = Math.floor(TimeUtil.getTodayZero() / 1000);

		let update = (begin: string, str: string) => {
			this.updateMyDataValue(MYDATA.PLAY_DATA, str);
			this.updateMyDataValue(MYDATA.PLAN_BEGIN, begin);
		}

		let begin0 = parseInt(this.getMyDataValueByID(MYDATA.PLAN_BEGIN));
		// begin0 = today0 - 24 * 3600 * 30;//测试
		if (begin0 == null) {//还没开始训练
			update(today0 + "", "0=" + time);
		}
		else {
			//今天第几天 0开始 对应data数组有1个
			let n = Math.floor((today0 - begin0) / 24 / 3600);
			let s2 = this.getMyDataValueByID(MYDATA.PLAY_DATA);
			//测试
			// s2 = ""
			// for(let i=0;i<30;i++){
			// 	s2 += (i + "=" + GameUtil.between(0,90000));
			// 	if(i < 29){
			// 		s2 += "&";
			// 	}
			// }
			
			if (s2 == null) {
				update(today0 + "", "0=" + time);
			}
			else {
				let arr = s2.split("&");
				if(arr.length < n){//没坚持
					update(today0 + "", "0=" + time);
				}
				else{
					arr[n] = n + "=" + time;
					if(arr.length > 30){//超过30天减去前面一天
						arr = arr.slice(arr.length - 30);
						begin0 = today0 - 24 * 3600 * 29;
					}
					let s1:string = "";
					for(let i=0;i<arr.length;i++){
						s1 += arr[i];
						if(i < arr.length - 1){
							s1 += "&";
						}
					}
					update(begin0 + "",s1);
				}
			}
		}
	}

	private checkNotice() {
		// let s1 = this.getMyDataValueByID(MYDATA.VERSION);
		// if(s1 == null || s1 != GameConst.version){
		// 	PlayerConst.noticeInfo.content = GameConst.notice_content;
		// 	PlayerConst.noticeInfo.version_client = GameConst.version;

		// 	fw.UIManager.getInstance().openUI(UIConst.NOTICE,null,fw.UITYPE.SECOND);
		// 	this.updateMyDataValue(MYDATA.VERSION,GameConst.version);
		// }
	}

	/** 每次登陆检测   */
	private checkLoginData() {
		let date = new Date();

		let todaykey = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate();

		//免费转盘
		let todayturnkey = todaykey + GameConst.localdata_key_turn;
		let todayturnvalue = WxApi.getInstance().getStorage(todayturnkey);
		if (todayturnvalue == null || todayturnvalue == "") {
			TurnLogic.getInstance().freetimes = 1;
		}
		else {
			TurnLogic.getInstance().freetimes = 1;
		}

		//视频cd
		let cd = WxApi.getInstance().getStorage(GameConst.localdata_key_reward_cd);
		WxApi.getInstance().starttime = cd == null || cd == "" ? null : parseInt(cd);

		//判断是否每日第一次登录
		let todayloginkey = todaykey + GameConst.localdata_key_lastlogintime;
		let lasttime = WxApi.getInstance().getStorage(todayloginkey);
		if (lasttime != "") {
			PlayerConst.checkInfo.login_first_today = false;
		}
		WxApi.getInstance().setStorage(todayloginkey, date.getTime() + "");
	}

	/** ------------------ 其他数据 ------------------------------ */
	private mydata: fw.Map<string> = {};
	/** 更新我的数据
	 * @param id MYDATA.xxxx
	 * @param value 为字符串，禁止含有‘:’ ‘;’2种符号
	 */
	public updateMyDataValue(id: number, value: any) {
		this.mydata[id] = value;
		this.PostMyData();
	}
	public PostMyData() {
		let str = "";
		for (let id in this.mydata) {
			str += (id + ":" + this.mydata[id] + ";");
		}
		str = str.slice(0, str.length - 1);
		HttpCommand.getInstance().postMyData(str);
	}
	/** 根据id获取我的数据
	 * @param id MYDATA.xxxx
	 * @return 自定义的一个字符串，没有返回null
	 */
	public getMyDataValueByID(id): string {
		return this.mydata[id];
	}
	private getMyDataResponse(e: HttpEvent) {
		this.updateMyData(e.data);
	}
	/** 其他数据 key为 MYDATA.XXX
	 * @param str 格式为 0:value;1:value;2:value
	 */
	private updateMyData(str: string) {
		this.mydata = {};
		let arr = str.split(";");
		for (let i = 0; i < arr.length; i++) {
			let sss = arr[i];
			let aaa = sss.split(":");
			this.mydata[aaa[0]] = aaa[1];
		}
	}
	/** 警告，勿用 */
	private clearMyData() {
		HttpCommand.getInstance().postMyData("")
	}



	/** 获取更新公告,检测是否更新了新版本，是的话弹出更新公告  */
	private noticeResponse(e: HttpEvent) {
		PlayerConst.noticeInfo.data = e.data;
	}


	/** 点击分享进入游戏后 发送邀请好友信息 受邀成功获取奖励 */
	private postInviteResponse(e: HttpEvent) {
		// e.data.uid;//自己的
		// e.data.share_uid;//发送者的
		// e.data.create_time;//邀请成功时间
		//这里处理 受邀成功后的奖励
	}


	/** 后台配置数据列表
	 */
	private getSettingResponse(e: HttpEvent) {
		this.updateSetting(e.data);
	}
	private updateSetting(data) {
		//保存设置信息
		PlayerConst.settingInfo.data = data;
	}

	/** 后台配置数据列表 可放在setting中 */
	private getShareResponse(e: HttpEvent) {

	}

	/**  */
	private getAdResponse(e: HttpEvent) {

	}



	/** 签到 */
	public signIn() {
		if (!PlayerConst.checkInfo.signed_today) {
			HttpCommand.getInstance().checkIn();
		}
		else {
			WxApi.getInstance().toast("今日已签到");
		}
	}

	/** 签到成功*/
	private checkInResponse(e: HttpEvent) {
		this.updateCheckInfo(e.data);


		PropLogic.getInstance().getReward(DataBase.REWARD_ADD_SIGNIN);
	}
	private updateCheckInfo(data) {
		PlayerConst.checkInfo.data = data;
		if (this.startui != null) {
			this.startui.updateCheckIn();
		}
	}
}
