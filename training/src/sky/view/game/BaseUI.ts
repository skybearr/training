class BaseUI extends eui.Component{
	public constructor(skinname) {
		super();
		this.skinName = skinname;
	}

	protected img_bg:eui.Image;
	
	protected childrenCreated(){
		super.childrenCreated();

		this.checkFit();
		this.initData();
		this.initView();
		this.initEvent();

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
	}

	/**适配处理 */
	protected checkFit(){
		this.img_bg.height = GameLogic.getInstance().GameStage.stageHeight;
	}

	/**初始化数据 */
	protected initData(){

	}

	/**初始化界面 */
	protected initView(){
		
	}

	/**初始化事件 */
	protected initEvent(){
		
	}

	protected clear(){
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
	}
}