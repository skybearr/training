/**
 * 所有后台配置数据
 * 根据自己需要在set data中处理数据  
 */
class SettingVO {
	public constructor() {
	}

	private _data:any;
	/** 所有后台配置数据在这 */
	public set data(o:any){
		this._data = o;
		//自定义

	}
	public get data():any{
		return this._data;
	}

	/** 播放视频间隔 */
	public rewardCD:number = 180;
}