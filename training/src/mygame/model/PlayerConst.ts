class PlayerConst {
	public constructor() {
	}

	/** 在服务端的appid序号 */
	public static appid_server: string;


	public static openId: string;
	public static token: string;

	/** 用户唯一id */
	public static uid: string;

	/** 微信用户信息，包含昵称和头像 和 游戏数据*/
	public static userInfo: UserInfo = new UserInfo();

	/** 登录信息 */
	public static checkInfo: CheckInVO = new CheckInVO();
	
	/** 后台设置 */
	public static settingInfo:SettingVO = new SettingVO();

	/** 更新公告 */
	public static noticeInfo:NoticeVO = new NoticeVO();
	

	
	/** 是否新用户 */
	public isNewhand:boolean;
}

