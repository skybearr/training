/**
 * 过关模式基类
 * 过关类型
 * 1：舒尔特方格 tar：规定时间内完成，time最后一个
 * 2：速记 tar：记住所有
 * 3：舒尔特方格，坑爹游戏 tar：完成最后一步 star：time
 * 4：猜成语 tar：
 */
class GameBaseUI extends eui.Component{
	public constructor(skinname,vo:CharpterMissionVO) {
		super();
		this.skinName = skinname;
		this.vo = vo;
	}

	protected img_bg:eui.Image;
	protected img_1:eui.Image;
	public vo:CharpterMissionVO;
	
	protected childrenCreated(){
		super.childrenCreated();

		this.checkFit();
		this.initData();
		this.initView();
		this.initEvent();

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
	}

	/**适配处理 */
	protected checkFit(){
		this.img_bg.height = this.img_1.height = GameConst.stageHeight;
	}

	/**初始化数据 */
	protected initData(){

	}

	/**初始化界面 */
	protected initView(){
		
	}

	/**初始化事件 */
	protected initEvent(){
		
	}

	protected clear(){
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
		this.vo = null;
	}
}