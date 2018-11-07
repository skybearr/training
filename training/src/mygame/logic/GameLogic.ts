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

		this.checkLoginData();
		this.checkNotice();
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
	public PostMyData(){
		let str = "";
		for(let id in this.mydata){
			str += (id + ":" + this.mydata[id] + ";"); 
		}
		str = str.slice(0,str.length - 1);
		HttpCommand.getInstance().postMyData(str);
	}
	/** 根据id获取我的数据
	 * @param id MYDATA.xxxx
	 * @return 自定义的一个字符串，没有返回null
	 */
	public getMyDataValueByID(id):string{
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
		for(let i=0;i<arr.length;i++){
			let sss = arr[i];
			let aaa = sss.split(":");
			this.mydata[aaa[0]] = aaa[1];
		}
	}
	/** 警告，勿用 */
	private clearMyData(){
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

		PropLogic.getInstance().updateProp(COINTYPE.HP, DataBase.HP_ADD_SIGNIN);
	}
	private updateCheckInfo(data) {
		PlayerConst.checkInfo.data = data;
	}
}
