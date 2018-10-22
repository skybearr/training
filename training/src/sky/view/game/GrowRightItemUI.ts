class GrowRightItemUI extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "GrowRightItemSkin";
    }

    private rect_select: eui.Rect;
    private lbl_title: eui.Label;
    private lbl_best: eui.Label;
    private rect_state: eui.Rect;


    public setVO(vo: CharpterMissionVO) {
        this.initView(vo);
    }

    protected dataChanged(): void {
        if (this.data == null) {
            return;
        }
        let vo = this.data as CharpterMissionVO;
        this.initView(vo);
    }

    private initView(vo: CharpterMissionVO) {
        this.lbl_title.text = vo.title;
        this.lbl_best.text = "最好成绩：" + TimeUtil.formatSecondT(vo.best);
        if (vo.state == 2) {
            for (let i = 1; i <= 5; i++) {
                this['star' + i].source = RES.getRes(i <= vo.stars ? "star_a_png" : "star_b_png");
            }
        }
        this.rect_state.visible = vo.state == 0;
    }

    public isSelected(b) {
        this.rect_select.visible = b;
    }
}
window['GrowRightItemUI'] = GrowRightItemUI;