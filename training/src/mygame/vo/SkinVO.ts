class SkinVO {
	public constructor() {
	}

	/** id */
	public id:number;
	/** 激活条件 */
	public baseline:string;

	
	public imgurl:string;
	public name:string;
	/** 是否默认皮肤 */
	public isdefault:boolean;
	/** 激活时间 null表示未达成 */
	public create_time:number;

	/** 服务器使用区分游戏 */
	public appid:string;
}