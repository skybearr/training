class PlatUI extends fw.BaseUI {
	public constructor() {
		super("PlatSkin");
	}

	private lbl:eui.Label;
	private btn_start:eui.Button;
	private btn_back:eui.Button;

	/**初始化数据 */
	protected initData() {
		
	}

	/**初始化界面 */
	protected initView() {
		//1，连续坚持天数，最快，最慢，平均，
		//2，加油
		let str = "";
		this.lbl.text = str;
	}

	/**初始化事件 */
	protected initEvent() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this);
	}

	private clickBack(){
		fw.UIManager.getInstance().openUI(UIConst.START);
	}

	private clickStart(){
		fw.UIManager.getInstance().openUI(UIConst.MISSION);
	}


	protected clickClose() {
		super.clickClose();
	}

	protected clear() {
		super.clear();

		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this);
		
	}
}
window['PlatUI'] = PlatUI;