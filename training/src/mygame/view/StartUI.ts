class StartUI extends fw.BaseUI {
	public constructor() {
		super("StartSkin");
	}

	private btn_ad: eui.Button;
	private btn_mission: eui.Button;
	private btn_grow: eui.Button;
	private btn_sign: eui.Button;
	private btn_turn: eui.Button;
	private btn_invite: eui.Button;
	private btn_achieve: eui.Button;
	private btn_rank: eui.Button;
	private btn_share: eui.Button;
	private lbl_hp: eui.Label;
	private lbl_coin: eui.Label;
	private lbl_diamond: eui.Label;


	/**初始化数据 */
	protected initData() {

	}

	/**初始化界面 */
	protected initView() {
		this.updateHp();

		this.updateCheckIn();

		GameLogic.getInstance().startui = this;

		platform.bannershow(GameConst.bannerId);
	}

	/**初始化事件 */
	protected initEvent() {
		for (let i = 0; i < 9; i++) {
			this['btn_' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		}

		this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_grow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_ad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_sign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_turn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_achieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);

		HttpCommand.getInstance().addEventListener(HttpEvent.checkIn, this.updateCheckIn, this);
		PropLogic.getInstance().addEventListener(GameEvent.PROP_NUM_CHANGE, this.propChange, this);
	}

	public updateHp() {
		let vo = PropLogic.getInstance().getPropByID(COINTYPE.HP);
		this.lbl_hp.text = "体力：" + (vo == null ? "0" : vo.num);
	}
	private updateCoin() {
		let vo = PropLogic.getInstance().getPropByID(COINTYPE.MONEY);
		this.lbl_coin.text = "金币：" + (vo == null ? "0" : vo.num);
	}
	private updateDiamond() {
		let vo = PropLogic.getInstance().getPropByID(COINTYPE.DIAMOND);
		this.lbl_diamond.text = "钻石：" + (vo == null ? "0" : vo.num);
	}

	private propChange(e: GameEvent) {
		switch (e.data.id) {
			case COINTYPE.HP:
				this.updateHp();
				break;
			case COINTYPE.MONEY:
				this.updateCoin();
				break;
			case COINTYPE.DIAMOND:
				this.updateDiamond();
				break;

		}
	}

	public updateCheckIn() {
		this.btn_sign.label = PlayerConst.checkInfo.signed_today ? "已签到" : "每日签到";
	}

	private bmp: BitmapOpenDataContext;
	private clickBtn(e: egret.TouchEvent) {
		switch (e.currentTarget) {
			case this.btn_ad:
				WxApi.getInstance().showRewardAd(1);
				break;
			case this.btn_mission:
				fw.UIManager.getInstance().openUI(UIConst.MISSION);
				break;
			case this.btn_grow:
				// fw.UIManager.getInstance().openUI(UIConst.GROW);
				fw.UIManager.getInstance().openUI(UIConst.PLAN);
				break;
			case this.btn_sign:
				GameLogic.getInstance().signIn();
				break;
			case this.btn_turn:
				fw.UIManager.getInstance().openUI(UIConst.TURN, null, fw.UITYPE.SECOND);
				break;
			case this.btn_invite:
				fw.UIManager.getInstance().openUI(UIConst.INVITE, null, fw.UITYPE.SECOND);
				break;
			case this.btn_achieve:
				platform.toast("尽情期待")
				// fw.UIManager.getInstance().openUI(UIConst.ACHIEVE, null, fw.UITYPE.SECOND);
				break;
			case this.btn_rank:
				fw.UIManager.getInstance().openUI(UIConst.RANK, { shareticket: null, openworld: false }, fw.UITYPE.SECOND);
				break;
			case this.btn_share:
				WxApi.getInstance().share(fw.SHARETYPE.ACTIVE);
				break;
		}
	}

	private addHP(e:GameEvent){
		if (e.data.type == WATCHTYPE.ADDHP && e.data.data == 0) {
			PropLogic.getInstance().updateProp(COINTYPE.HP,DataBase.REWARD_ADD_WATCHAD);
		}
	}

	protected clear() {
		super.clear();

		GameLogic.getInstance().startui = null;
		for (let i = 0; i < 8; i++) {
			this['btn_' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		}
		this.btn_ad.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_grow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_sign.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_turn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_invite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_achieve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);

		HttpCommand.getInstance().removeEventListener(HttpEvent.checkIn, this.updateCheckIn, this);
		PropLogic.getInstance().removeEventListener(GameEvent.PROP_NUM_CHANGE, this.propChange, this);

		platform.bannerdestroy();
	}
}
window['StartUI'] = StartUI;