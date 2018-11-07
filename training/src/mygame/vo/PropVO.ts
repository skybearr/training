class PropVO {
	public constructor() {
	}

	public _id: number;
	/** id */
	public set id(v) {
		this._id = v;
		this.type = v < 10 ? PROPTYPE.COIN : PROPTYPE.PROP
	}
	public get id(): number {
		return this._id;
	}

	/** 类型 PROPTYPE 0货币 1道具 */
	public type: number;

	public num: number;

	public imgurl: number;

	public name:string;
	/** 备用参数 1*/
	public extradata1: string = "";
	/** 备用参数 2*/
	public extradata2: string = "";
}