class AchieveUI extends fw.BaseUI {
	public constructor() {
		super("AchieveSkin");
	}

	private scroller:eui.Scroller;
	private list:eui.List;
	private arr_data:eui.ArrayCollection;

	/**初始化数据 */
	protected initData() {
		
	}

	/**初始化界面 */
	protected initView() {
		this.list.itemRenderer = AchieveItemUI;
		this.arr_data = new eui.ArrayCollection();
		let dic = AchieveLogic.getInstance().getAllAchieves();
		for(let id in dic){
			this.arr_data.addItem(dic[id]);
		}
		this.list.dataProvider = this.arr_data;
	}

	/**初始化事件 */
	protected initEvent() {
		
	}


	protected clickClose() {
		super.clickClose();
	}

	protected clear() {
		super.clear();

		this.list.dataProvider = null;
		this.arr_data = null;
		
	}
}
window['AchieveUI'] = AchieveUI;