class GrowLeftItemUI extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "GrowLeftItemSkin";
    }

    private lbl: eui.Label;
    private lbl_state:eui.Label;
    private rect_select: eui.Rect;
    private rect_state: eui.Rect;

    public setVO(vo: CharpterVO) {
        this.initView(vo);
    }

    protected dataChanged(): void {
        if (this.data == null) {
            return;
        }
        let vo = this.data as CharpterVO;
        this.initView(vo);
    }

    private initView(vo: CharpterVO) {
        this.lbl.text = "第" + vo.id + "章";
        this.lbl_state.visible = vo.state != 1;
        this.lbl_state.text = vo.state == 0 ? "未解锁" : "通关";
        this.lbl_state.textColor = vo.state == 0 ? 0x8FFC02 : 0xF7DF07;
        this.rect_state.visible = vo.state == 0;
    }

    public isSelected(b){
        this.rect_select.visible = b;
    }
}
window['GrowLeftItemUI'] = GrowLeftItemUI;