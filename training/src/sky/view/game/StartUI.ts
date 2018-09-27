class StartUI extends BaseUI{
	public constructor() {
		super("StartSkin");
	}
	private btn_start:eui.Button;
	private btn_rank:eui.Label;
	private btn_share:eui.Label;
	private btn_mission:eui.Button;

	/**初始化数据 */
	protected initData(){

	}

	/**初始化界面 */
	protected initView(){
		
	}

	/**初始化事件 */
	protected initEvent(){
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this);
		this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRank,this);
		this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShare,this);
		this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
	}

	private clickStart(){
		GameLogic.getInstance().startGame(GameLogic.getInstance().getStartMission());
	}

	private clickRank(){
		this.addChild(new RankUI());
	}

	private clickShare(){
		WxApi.getInstance().share();
	}

	private clickMission(){
		GameLogic.getInstance().openMission();
	}

	protected clear(){
		super.clear();

		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this);
		this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRank,this);
		this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShare,this);
		this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
	}
}