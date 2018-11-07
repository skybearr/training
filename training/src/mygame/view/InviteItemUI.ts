class InviteItemUI extends eui.ItemRenderer{
	public constructor() {
		super();
		this.skinName = "InviteItemSkin";
	}	

	private rect_bg:eui.Rect;
	private lbl_name:eui.Label;
	private lbl_num1:eui.Label;
	private img:eui.Image;
	private btn_get:eui.Button;


	protected childrenCreated(){
		super.childrenCreated();

		this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGet,this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
	}
	
	protected dataChanged(): void {
		if(this.data == null){
			return;
		}
		let vo:InviteVO = this.data as InviteVO;
		this.lbl_name.text = vo.name;
		this.lbl_num1.text = vo.num1 + "";
		if(!platform.isdebug()){
			this.img.source = vo.avatarurl;
		}
		this.btn_get.label = vo.hasget ? "已领取" : "领取";
	}

	private clickGet(){
		if(this.data.hasget){
			return;
		}
		this.data.hasget = true;
		this.btn_get.label = this.data.hasget ? "已领取" : "领取";
		InviteLogic.getInstance().getReward(this.data.uid);
	}

	private clear(){
		this.btn_get.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGet,this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
		this.data = null;
	}
}