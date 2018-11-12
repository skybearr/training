class PlanItemUI extends eui.Component {
	public constructor(v:PlanVO) {
		super();
		this.vo = v;
		this.skinName = "PlanItemSkin";
		
	}

	private vo:PlanVO;
	private rect_bg:eui.Rect;
	private lbl:eui.Label
	protected childrenCreated(){
		super.childrenCreated();

		this.lbl.text = "第" + (this.vo.id + 1) + "天";
		this.rect_bg.y = 300 - this.vo.time * 50 / 15 / 1000; 
	}
}