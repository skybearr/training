/**
 * 根据开放域好友数据生成的图片
 * 创建后加载到指定位置，然后通过start开始刷新，通过command生成不同类型
 * 
 * @author sky
 */
class BitmapOpenDataContext extends egret.Bitmap {
	/** 根据开放域好友数据生成的图片
	 * @param w 宽
	 * @param h 高
	 * @param dis 图片刷新间隔
	 */
	public constructor(dis = 48) {
		super();

		this.dis = dis;

		this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
		this.bitmapdata.$deleteSource = false;
		const texture = new egret.Texture();
		texture._setBitmapData(this.bitmapdata);
		this.texture = texture;

		this.width = GameConst.stageWidth;
		this.height = GameConst.stageHeight;
	}

	private bitmapdata: egret.BitmapData;
	private dis: number;


	public start() {
		egret.stopTick(this.tickerHandler, this);
		egret.startTick(this.tickerHandler, this);
	}

	public stop() {
		egret.stopTick(this.tickerHandler, this);
	}

	private lasttime: number;
	private tickerHandler(timeStarmp: number): boolean {		
		let newtime = egret.getTimer();
		if (this.lasttime != null && newtime - this.lasttime < this.dis) {
			return;
		}
		this.lasttime = newtime;

		egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
		this.bitmapdata.webGLTexture = null;
		return false;
	}


	/** 传入我的当前分数，显示下一个好友的分数
	 * @param commandstr 命令  UICONST.command_xxxx;
	 * @param params 额外参数
	 * @param sortkey 排序参数
	 * @param sorttype 排序规则 fw.RANKSORTTYPE.ASC升序/DESC降序 
	 * @param shareTicket 如果是群排行 传入群的ticket
	 */
	public command(commandstr: string, params: any = null, sortkey: string = "score", sorttype: number = 2, shareTicket: string = null) {
		WxApi.getInstance().postMessageToDataContext({
			userinfo: PlayerConst.userInfo,
			width: GameConst.stageWidth,
			height: GameConst.stageHeight,
			command: commandstr,
			sortkey: sortkey,
			sorttype: sorttype,
			shareTicket: shareTicket,
			params: params
		})
	}

	public clear() {
		this.command(UIConst.command_clear);
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
		egret.stopTick(this.tickerHandler, this);
		this.bitmapdata = null;
	}
}