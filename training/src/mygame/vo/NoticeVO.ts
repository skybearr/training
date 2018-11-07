class NoticeVO {
	public constructor() {
	}

	private _data:any;
	public set data(o:any){
		this._data = o;
		//自定义
		this.content = o.content;
		this.update_time = parseInt(o.update_time);
		this.version_server = o.version;

		if(this.version_client != this.version_server){
			fw.UIManager.getInstance().openUI(UIConst.NOTICE,null,fw.UITYPE.SECOND);
			this.version_client = this.version_server;
		}
	}
	public get data():any{
		return this._data;
	}

	/** 公告内容 */
	public content:string;
	public update_time:number;
	/** 版本号  如果与客户端版本不一致  弹出 */
	public version_server:string;

	public version_client:string = "1.1";
}