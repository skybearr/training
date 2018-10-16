class StartUI extends BaseUI{
	public constructor() {
		super("StartSkin");
	}
	private btn_rank:eui.Label;
	private btn_share:eui.Label;
	private btn_mission:eui.Button;
	private btn_grow:eui.Button;

	/**初始化数据 */
	protected initData(){

	}

	private button:any;
	/**初始化界面 */
	protected initView(){
		if(!WxApi.getInstance().checkWx()){
			return;
		}
		this.button = wx.createGameClubButton({
			icon: 'white',
			style: {
				left: 10,
				top: 80,
				width: 32,
				height: 32,
				text: "游戏圈"
			}
		})
	}

	/**初始化事件 */
	protected initEvent(){
		this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRank,this);
		this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShare,this);
		this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
		this.btn_grow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGrow,this);
		WxApi.getInstance().addEventListener(GameEvent.OPENRANK, this.openRank, this);
	}

	private clickGrow(){
		GameLogic.getInstance().openGrow();
	}

	private clickRank(){
		this.addChild(new RankUI());
	}

	private openRank(e: GameEvent) {
		let ticket = e == null ? null : e.data;
		this.addChild(new RankUI(ticket));
	}

	private clickShare(){
		WxApi.getInstance().share();
	}

	private clickMission(){
		GameLogic.getInstance().openMission();
	}

	protected clear(){
		super.clear();
		if (this.button != null) {
			this.button.destroy();
		}

		this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRank,this);
		this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShare,this);
		this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
		this.btn_grow.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGrow,this);
		WxApi.getInstance().removeEventListener(GameEvent.OPENRANK, this.openRank, this);
	}
}