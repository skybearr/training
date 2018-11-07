class InviteUI extends fw.BaseUI {
	public constructor() {
		super("InviteSkin");
	}	

	private scroller:eui.Scroller;
	private list:eui.List;
	private btn_invite:eui.Button;

	private arr_data:eui.ArrayCollection;
	private invites:InviteVO[];

	/**初始化数据 */
	protected initData() {
		HttpCommand.getInstance().getInvite();
		
	}

	/**初始化界面 */
	protected initView() {
		this.list.itemRenderer = InviteItemUI;
	}

	/**初始化事件 */
	protected initEvent() {
		this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
		HttpCommand.getInstance().addEventListener(HttpEvent.getInvite, this.getInviteResponse, this);
	}

	private clickBtn(){
		WxApi.getInstance().share(fw.SHARETYPE.INVITE);
	}

	/** 数据处理在logic里处理了，这里直接获取结果 */
	private getInviteResponse(){
		this.invites = InviteLogic.getInstance().getInvites();

		this.arr_data = new eui.ArrayCollection();
		this.invites = this.invites.concat(this.invites).concat(this.invites);
		for(let i=0;i<this.invites.length;i++){	
			this.arr_data.addItem(this.invites[i]);
		}
		this.list.dataProvider = this.arr_data;
	}

	protected clear() {
		super.clear();

		this.btn_invite.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
		HttpCommand.getInstance().removeEventListener(HttpEvent.getInvite, this.getInviteResponse, this);
	}
}

window['InviteUI'] = InviteUI;