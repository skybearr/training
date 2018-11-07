class TurnItemUI extends eui.Component{
	public constructor(i:number,vo:TurnVO) {
		super();
		this.skinName = "TurnItemSkin";

		this.vo = vo;
		this.index = i;
	}	

	private rect:eui.Rect;
	private lbl:eui.Label;

	public vo:TurnVO;
	public index:number;

	protected childrenCreated(){
		super.childrenCreated();

		this.lbl.text = this.vo.name;
	}

	public selected(b:boolean){
		this.rect.fillColor = b ? 0xDD930D : 0x07F4EF;
	}

	public clear(){
		this.vo = null;
	}
}