module fw {
	export class RankItemUI extends eui.ItemRenderer {
		public constructor() {
			super();
			this.skinName = "RankItemSkin";
		}

		private bg_rect: eui.Rect;
		private lbl_rank: eui.Label;
		private img_head: eui.Image;
		private lbl_name: eui.Label;
		private lbl_score: eui.Label;


		protected dataChanged(): void {
			if (this.data == null) {
				return;
			}
			let vo = this.data as fw.RankVO;
			let color = 0xffffff;
			if (vo.rank == 1) {
				color = 0xff094c;
			}
			else if (vo.rank == 2) {
				color = 0xff5317;
			}
			else if (vo.rank == 3) {
				color = 0xffe117;
			}
			this.bg_rect.fillColor = vo.rank % 2 == 1 ? 0x1f1e23 : 0x2b2a30;
			this.lbl_rank.text = vo.rank + "";
			this.lbl_rank.textColor = color;
			
			if (!platform.isdebug()) {
				this.img_head.source = vo.head;
			}
			this.lbl_name.text = vo.name;
			this.lbl_score.text = vo.score + "";
		}
	}
}
window['RankItemUI'] = fw.RankItemUI;