class NoticeUI extends fw.BaseUI {
	public constructor() {
		super("NoticeSkin");
	}	

	private lbl_content:eui.Label;
	private lbl_version:eui.Label;

	/**初始化数据 */
	protected initData() {

	}

	/**初始化界面 */
	protected initView() {
		this.lbl_content.text = PlayerConst.noticeInfo.content;
		this.lbl_version.text = "版本号：" + PlayerConst.noticeInfo.version_server;
	}

	/**初始化事件 */
	protected initEvent() {
		this.img_bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this);
		
	}

	protected clear() {
		super.clear();
		this.img_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this);
	}
}

window['NoticeUI'] = NoticeUI;