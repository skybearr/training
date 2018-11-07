/**
 * 
 * 皮肤逻辑类
 * 
 * 
 */
class SkinLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: SkinLogic;
	public static getInstance(): SkinLogic {
		if (this._instance == null) {
			this._instance = new SkinLogic();
		}
		return this._instance;
	}

	private skins: fw.Map<SkinVO>;
	/** 初始化皮肤 */
	public initSkins(arr: Object[]) {
		this.skins = {};
		HttpCommand.getInstance().addEventListener(HttpEvent.getSkinsInfo, this.skinAllResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.getSkinsGot, this.skinGotResponse, this, false, 1);
		HttpCommand.getInstance().addEventListener(HttpEvent.postSkinGot, this.skinGotResponse, this, false, 1);
		this.updateskins(arr);
	}

	private skinGotResponse(e: HttpEvent) {
		this.updateskins(e.data);
	}

	/** 初始化所有皮肤 */
	private skinAllResponse(e: HttpEvent) {
		let arr: any[] = e.data;
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = this.skins[o.id];
			if (vo == null) {
				vo = new SkinVO();
				vo.id = parseInt(o.id);
				vo.imgurl = o.imgurl;
				vo.name = o.title;
			}
			vo.appid = o.appid;
			vo.baseline = o.baseline;
			this.skins[vo.id] = vo;
		}
	}

	/** 更新已拥有皮肤 */
	private updateskins(arr: any[]) {
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = this.skins[o.skin_id];
			if (vo == null) {
				vo = new SkinVO();
				vo.id = parseInt(o.skin_id);
				vo.imgurl = o.imgurl;
				vo.name = o.title;
			}
			vo.isdefault = o.is_default == "1";
			vo.create_time = parseInt(o.create_time);
			this.skins[vo.id] = vo;
		}
	}


	/** 获得皮肤
	 * @param id 皮肤id
	*/
	public getSkin(id: number) {
		let vo = this.skins[id];
		if (vo == null) {
			console.log("没有找到成就" + id + "，请联系GM");
		}
		else {
			HttpCommand.getInstance().postSkinGet(id);
		}
	}
}
