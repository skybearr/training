class StartUI extends BaseUI {
	public constructor() {
		super("StartSkin");
	}
	private btn_rank: eui.Label;
	private btn_share: eui.Label;
	private btn_mission: eui.Button;
	private btn_grow: eui.Button;
	private btn_ad: eui.Button;
	private lbl_cd: eui.Label;

	/**初始化数据 */
	protected initData() {

	}

	private canwatch: boolean;
	private rewardCD() {
		let cd = WxApi.getInstance().getRewardCD();

		this.canwatch = cd <= 0;
		if (cd > 0) {
			this.lbl_cd.text = TimeUtil.ParseTime2Format(cd);
			this.lbl_cd.visible = true;
		}
		else {
			this.lbl_cd.text = "";
		}
	}

	private button: any;
	/**初始化界面 */
	protected initView() {
		this.rewardCD();
		platform.bannershow();
		if (!WxApi.getInstance().checkWx()) {
			return;
		}
		this.button = wx.createGameClubButton({
			icon: 'white',
			style: {
				left: 10,
				top: 80,
				width: 32,
				height: 32,
				text: "分享圈"
			}
		})
	}

	/**初始化事件 */
	protected initEvent() {
		this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
		this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
		this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
		this.btn_grow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGrow, this);
		this.btn_ad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReward, this);
		WxApi.getInstance().addEventListener(GameEvent.OPENRANK, this.openRank, this);
		TimerManager.getInstance().addTimerCallBack(this.rewardCD, this);
		WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
	}

	private clickReward() {
		if (!this.canwatch) {
			let cd = WxApi.getInstance().getRewardCD();
			WxApi.getInstance().toast("为了保护眼睛，请不要连续观看，" + cd + "秒后再来鼓励")
			return;
		}
		WxApi.getInstance().showRewardAd(WATCHTYPE.THANKS);
	}
	private watchReward(e: GameEvent) {
		if (e.data.type == WATCHTYPE.THANKS && e.data.data == 0) {
			WxApi.getInstance().toast("谢谢您的鼓励，我会努力做出更好的游戏来帮助小朋友提高注意力");
		}
	}

	private clickGrow() {
		WxApi.getInstance().toast('即将推出');
		// GameLogic.getInstance().openGrow();
	}

	private clickRank() {
		this.addChild(new RankUI());
	}

	private openRank(e: GameEvent) {
		let ticket = e == null ? null : e.data;
		this.addChild(new RankUI(ticket));
	}

	private clickShare() {
		WxApi.getInstance().share();
	}

	private clickMission() {
		GameLogic.getInstance().openMission();
	}

	protected clear() {
		super.clear();
		if (this.button != null) {
			this.button.destroy();
		}
		platform.bannerdestroy();
		this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
		this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
		this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
		this.btn_grow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGrow, this);
		WxApi.getInstance().removeEventListener(GameEvent.OPENRANK, this.openRank, this);
		this.btn_ad.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReward, this);
		TimerManager.getInstance().removeFun(this.rewardCD, this);
		WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
	}
}