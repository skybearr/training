class WxApi extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: WxApi;
	public static getInstance(): WxApi {
		if (this._instance == null) {
			this._instance = new WxApi();
		}
		return this._instance;
	}

	private rewardAd;

	/**登录 code */
	public logincode: string;

	/**初始化是否完成 */
	public inited: boolean;

	/** 初始化游戏所需 api */
	public async init() {
		this.inited = false;
		//登录
		let res = await platform.login();
		if(res == null){
			platform.toast("因人数太多，服务器忙碌，请关闭后重新登录尝试，非常抱歉")
		}
		this.logincode = res.code;
		console.log("logincod:", res.code);


		//获取用户信息
		let userinfo = await platform.getUserInfo();
		PlayerConst.userInfo.avatarUrl = userinfo.avatarUrl;
		PlayerConst.userInfo.city = userinfo.city;
		PlayerConst.userInfo.country = userinfo.country;
		PlayerConst.userInfo.gender = parseInt(userinfo.gender);
		PlayerConst.userInfo.language = userinfo.language;
		PlayerConst.userInfo.nickname = userinfo.nickName;
		PlayerConst.userInfo.province = userinfo.province;
		console.log("获取微信用户信息：", PlayerConst.userInfo);

		//本地debug版本测试
		if (PlayerConst.userInfo.nickname == "debug_nickName") {
			PlayerConst.token = "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C";
			HttpCommand.getInstance().once(HttpEvent.postUser, this.postUsersResponse, this);
			HttpCommand.getInstance().postUser(PlayerConst.userInfo);
		}
		else {
			//一，根据logincode请求接口
			HttpCommand.getInstance().once(HttpEvent.getToken, this.getTokenResponse, this);
			HttpCommand.getInstance().getToken(this.logincode);
		}

	}

	/** 二，得到token以后把微信的用户信息以后发给服务器 */
	private getTokenResponse(e: HttpEvent) {
		PlayerConst.token = e.data.token;

		HttpCommand.getInstance().once(HttpEvent.postUser, this.postUsersResponse, this);
		HttpCommand.getInstance().postUser(PlayerConst.userInfo);
	}

	/** 三，从服务器获取用户的所有信息 */
	private postUsersResponse(e: HttpEvent) {
		HttpCommand.getInstance().once(HttpEvent.getUser, this.getUserResponse, this);
		HttpCommand.getInstance().getUser();
	}

	/** 四，获取用户信息，初始化所有数据 */
	private getUserResponse(e: HttpEvent) {
		PlayerConst.openId = e.data.openid;
		PlayerConst.appid_server = e.data.appid;
		PlayerConst.uid = e.data.id;

		PropLogic.getInstance().initProps(e.data.prop);
		InviteLogic.getInstance().initInvite();
		TurnLogic.getInstance().initTurns();

		GameLogic.getInstance().init(e.data);

		MissionTrainLogic.getInstance().initData();
		AchieveLogic.getInstance().initAchieves();

		//被动分享
		this.share(4);
		this.initRewardVideoAd();
		this.checkLauchOptions();

		this.initOver();
	}

	/** 初始化OK，关闭loading */
	private initOver() {
		console.log("api与接口初始化ok，可以开始游戏");

		this.inited = true;

		fw.UIManager.getInstance().showLoading(false);
	}

	/** 是否需要打开群排行 */
	public checkLauchOptions() {
		let info: any = platform.getLaunchOptionsSync();
		console.log("checkLauchOptions", info);

		if (info.query != null) {
			if (info.query.invite != null) {//邀请礼包
				HttpCommand.getInstance().postInvite(info.query.invite);
			}
			if (info.query.grouprank != null && info.shareTicket != null && info.shareTicket != "") {//查看群排行
				fw.UIManager.getInstance().openUI(UIConst.RANK, info.shareTicket);
			}

		}
	}

	/**分享
	 * @param type fw.SHARETYPE.XXX分享类型 1主动分享  2炫耀  3当前分数 4被动分享 5群排行
	 */
	public share(type: number = 1, title: string = null, img: any = null) {
		let query: string = "invite=" + PlayerConst.uid
		switch (type) {
			case fw.SHARETYPE.ACTIVE:
				platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query)
				break;
			case fw.SHARETYPE.SHOWOFF:
				platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query)
				break;
			case fw.SHARETYPE.CRTSCORE:
				platform.share(title, img, query)
				break;
			case fw.SHARETYPE.PASSIVE:
				platform.showShareMenu();
				platform.updateShareMenu(true);
				platform.onShareAppMessage("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query)
				break;
			case fw.SHARETYPE.GROUPRANK:
				query += "&grouprank=1";
				platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query)
				break;
			case fw.SHARETYPE.INVITE:
				platform.share("玩了舒尔特方格，我上课注意力变的集中了，你也来试试吧", "resource/assets/share.jpg", query);
				break;
			case fw.SHARETYPE.INVITE_DAILY:

				break;
		}
	}

	/**联系客服 */
	public connectGM() {
		platform.openCustomerServiceConversation();
	}

	/** 在左上角创建游戏圈按钮 */
	public createGameClubButton(btnstr = "游戏圈") {
		platform.createGameClubButton(btnstr);
	}

	/** 手机振动
	 * @param short  true短震动  false长振动
	 */
	public vibrate(short = true) {
		platform.vibrate(short);
	}

	/** 跳转到其他小程序
	 * @param appid 其他小程序的appid
	 * @param extraData 其他参数 obj
	 */
	public skipToProgram(appid, extraData) {
		platform.skipToProgram(appid, extraData);
	}

	/**	对用户托管数据进行写数据操作，允许同时写多组 KV 数据
		* @param KVDataList     [{ key: "newscore", value:"9999"}]
	  */
	public setUserCloudStorage(KVDataList) {
		platform.setUserCloudStorage(KVDataList);
	}

	/** 游戏结束 记录数据到服务器和开放域
	 * @param type
	 * @param id
	 * @param score 
	 */
	public setScore(type:number,id:number,score: number) {
		HttpCommand.getInstance().postWorldRank(score,"1",type+"_"+id);
		let key = "score_" + type + "_" + id;
		let KVDataList = [{ key: key, value: score + "" }];
		this.setUserCloudStorage(KVDataList);
	}

	/** 存储本地数据
	 * @param key 
	 * @param value   string|obj
	 * @param isobj 是否为obj，本地缓存数据时需要用，微信不需要
	 */
	public setStorage(key, value, isobj = false) {
		platform.setStorageSync(key, value, isobj);
	}

	/** 获取本地缓存
	 * @param key 
	 * @param isobj 是否为obj，本地缓存数据时需要用，微信不需要
	 * @return 如果没有 返回空字符串 ""
	 */
	public getStorage(key, isobj = false) {
		return platform.getStorageSync(key, isobj);
	}

	/** 向开放域发数据
	* @param data  shareTicket: this.shareticket,
				userinfo: WxApi.getInstance().userInfo,
				stageW: GlobalConst.GameStage.stageWidth,
				stageH: GlobalConst.GameStage.stageHeight,
				command: "open"
	*/
	public postMessageToDataContext(data) {
		platform.postMessage(data);
	}

	/** 埋点统计 */
	public initBuryingSDK() {
		platform.initBuryingSDK();
	}

	/** 埋点统计 */
	public buryingPoint(key: string, value: any = null) {
		platform.buryingPoint(key, value);
	}

	/** 弹出提示
	 * @param content 内容
	 * @param type 1悬浮 2弹出窗
	 * @param title 弹出窗时的标题
	 */
	public toast(content, type = 1, title = "友情提示", surestr = "确定") {
		if (type == 1) {
			platform.toast(content);
		}
		else if (type == 2) {
			platform.showModal(content, title, surestr);
		}
	}

	/** 展示banner广告 */
	public bannershow() {
		platform.bannershow(GameConst.bannerId);
	}

	/** 隐藏banner广告 */
	public bannerhide() {
		platform.bannerhide();
	}

	/** 销毁banner广告 */
	public bannerdestroy() {
		platform.bannerdestroy();
	}



	/** 获取开放域的资源形成一个图片 */
	public getOpenDataBMP(): egret.Bitmap {
		if (platform.isdebug()) {
			return null;
		}

	}

	/** 激励视频相关 */
	public starttime: number;
	private rewardAdCDStart() {
		this.starttime = new Date().getTime();

		this.setStorage(GameConst.localdata_key_reward_cd, this.starttime + "");
	}
	public getRewardCD(): number {
		let nowtime = new Date().getTime();

		if (this.starttime == null) {
			return 0;
		}
		else {
			return PlayerConst.settingInfo.rewardCD - Math.floor((nowtime - this.starttime) / 1000);
		}
	}

	/** 预加载激励视频 */
	public initRewardVideoAd() {
		let wx = window["wx"];
		if (wx == null) {
			return;
		}
		this.rewardAd = wx.createRewardedVideoAd({ adUnitId: GameConst.rewardAdId });

		this.rewardAd.onLoad(() => {
			console.log('激励视频 广告加载成功')
		})

		this.rewardAd.onError(err => {
			platform.toast("广告拉取失败，请稍后尝试")
		})

		this.rewardAd.onClose(res => {
			// 用户点击了【关闭广告】按钮
			let state: number;
			// 小于 2.1.0 的基础库版本，res 是一个 undefined
			if (res && res.isEnded || res === undefined) {
				// 正常播放结束，可以下发游戏奖励
				state = 0;
				this.rewardAdCDStart();
			}
			else {
				// 播放中途退出，不下发游戏奖励
				state = 1;
				this.rewardAdCDStart();
			}
			this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
		})

	}

	private adtype: number;
	/** 观看视频 关闭视频监听GameEvent.REWARDAD_CLOSE_EVENT
	 * @param type 观看视频来源类型 WATCHTYPE.XXXX
	 */
	public showRewardAd(type: number) {
		this.adtype = type;
		if (this.rewardAd != null) {
			try {
				this.rewardAd.show()
					.catch(err => {
						this.toast("广告加载失败")

						this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
					})
			}
			catch (e) {
				this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
			}
		}
		else {
			this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
		}
	}
	private dispatchGameEvent(eventname: string, data: any) {
		console.log("dispatchGameEvent:", eventname, this.adtype, data);
		if (eventname == GameEvent.REWARDAD_CLOSE_EVENT && data == 2) {
			this.toast("暂无视频可观看，过会再来看看吧");
		}
		let event = new GameEvent(eventname);
		event.data = { type: this.adtype, data: data };
		this.dispatchEvent(event);
	}

}