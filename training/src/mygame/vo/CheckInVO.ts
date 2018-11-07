class CheckInVO {
	public constructor() {
	}

	private _data: any;
	public set data(o: any) {
		this._data = o;
		if (o == null) {
			
		}
		else {
			//自定义
			this.uid = o.uid;
			this.checkin_date = parseInt(o.checkin_date);
			this.continue_num = parseInt(o.continue_num);
			this.update_time = parseInt(o.update_time);
			this.total_num = parseInt(o.total_num);

			this.signed_today = TimeUtil.checkToday(this.checkin_date);
			
		}


	}
	public get data(): any {
		return this._data;
	}

	/** 今日首次登陆 */
	public login_first_today:boolean = true;

	/** 请使用PlayerConst中的uid */
	public uid: string;

	/** 连续签到天数 */
	public continue_num: number = 0;

	/** 更新时间 */
	public update_time: number;

	/** 上次签到时间(精确到天) */
	public checkin_date: number = 0;

	/** 今日是否已签到 */
	public signed_today:boolean = false;

	/** 累计签到天数 */
	public total_num: number;

}
