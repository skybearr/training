class GrowLeftItemUI extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "GrowLeftItemSkin";
    }

    private lbl: eui.Label;

    public setVO(vo: MissionVO) {
        this.initView(vo);
    }

    protected dataChanged(): void {
        if (this.data == null) {
            return;
        }
        let vo = this.data as MissionVO;
        this.initView(vo);
    }

    private initView(vo: MissionVO) {
        this.lbl.text = vo.name;
        this.lbl.textColor = 0xffffff;
        if (vo.state == 2) {
            for (let i = 1; i <= 3; i++) {
                this['star' + i].source = RES.getRes(i <= vo.stars ? "star_a_png" : "star_b_png");
            }
        }
    }
}
window['GrowLeftItemUI'] = GrowLeftItemUI;