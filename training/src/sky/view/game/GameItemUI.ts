class GameItemUI extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "GameItemSkin";
    }

    private rect_bg: eui.Rect;
	private rect_click:eui.Rect;
    private lbl: eui.Label;

    protected childrenCreated(){
        super.childrenCreated();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.end,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }

    private begin(){
        this.rect_click.fillColor = GameLogic.getInstance().crtClickStr == this.data.id ? 0x42F907 : 0xFF0000;
		this.rect_click.visible = true;
    }
    private end(){
        this.rect_click.visible = false;
    }
    private clear(){
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.end,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }

    protected dataChanged(): void {
        if (this.data == null) {
            return;
        }
        let len = 720 / this.data.row;
        this.width = this.height = this.rect_bg.width = 
            this.rect_bg.height = this.rect_click.width = this.rect_click.height = len - 30;
        this.lbl.size = this.data.size;
        this.lbl.text = this.data.id + "";
    }
}
window['MissionItemUI'] = MissionItemUI;