class RankUI extends BaseUI {
	public constructor(ticket: string = null) {
		super("RankSkin");
		this.shareticket = ticket;
		this.skinName = "RankSkin";
	}

	private rect_bg: eui.Rect;
	private img_close: eui.Image;
	private img_rankgp: eui.Image;
	private lbl_title: eui.Label;
	private lbl_2: eui.Label;

	private shareticket: string;

	/**初始化数据 */
	protected initData(){

	}

	protected initView() {
		this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";

		this.initDataContext();
	}

	protected initEvent() {
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
		this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
	}

	private bmp_context: egret.Bitmap;
	private bitmapdata: egret.BitmapData;
	private initDataContext() {
		//开放域主体
		let platform: any = window.platform;
		if (platform.openDataContext == null) {
			return;
		}
		// this.bmp_context = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);

		this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
		this.bitmapdata.$deleteSource = false;
		const texture = new egret.Texture();
		texture._setBitmapData(this.bitmapdata);
		this.bmp_context = new egret.Bitmap(texture);
		this.bmp_context.width = GameConst.GameStage.stageWidth;
		this.bmp_context.height = GameConst.GameStage.stageHeight;
		this.bmp_context.x = this.bmp_context.y = 0;

		this.addChildAt(this.bmp_context, 4);//盖在底图上面，各种按钮下面

		egret.stopTick(this.tickerHandler, this);
		egret.startTick(this.tickerHandler, this);

		WxApi.getInstance().postToDataContext({
			shareTicket: this.shareticket,
			userinfo: WxApi.getInstance().userInfo,
			stageW: GameConst.GameStage.stageWidth,
			stageH: GameConst.GameStage.stageHeight,
			command: "open"
		})
	}

	private tickerHandler(timeStarmp: number): boolean {
		egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
		this.bitmapdata.webGLTexture = null;
		return false;
	}

	
	private clickGroupRank() {
		WxApi.getInstance().share("grouprank=1");
	}

	private clickClose() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	protected clear() {
		super.clear();

		this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
		this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);

		WxApi.getInstance().postToDataContext({
			command: "close"
		});

		if (this.bmp_context != null && this.bmp_context.parent != null) {
			this.bmp_context.parent.removeChild(this.bmp_context);
		}
		egret.stopTick(this.tickerHandler, this);
		this.bmp_context = null;
		this.bitmapdata = null;

	}
}
window["RankUI"] = RankUI;