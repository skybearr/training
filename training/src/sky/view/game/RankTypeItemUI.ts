class RankTypeItemUI extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "RankTypeItemSkin";
    }

    private img_bg: eui.Image;
    private lbl: eui.Label;
    private star1: eui.Image;
    private star2: eui.Image;
    private star3: eui.Image;
    private rect_bg:eui.Rect;

    public setVO(vo: TrainMissionVO) {
        this.initView(vo);
    }

    public setSelected(b){
        this.rect_bg.fillColor = b ? 0xF48B07 : 0xF2FC8D;
    }
    protected dataChanged(): void {
        if (this.data == null) {
            return;
        }
        let vo = this.data as TrainMissionVO;
        this.initView(vo);
    }

    private initView(vo: TrainMissionVO) {
        this.lbl.text = vo.name;
        
    }
}
window['RankTypeItemUI'] = RankTypeItemUI;