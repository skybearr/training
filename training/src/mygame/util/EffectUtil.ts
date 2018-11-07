/**
 * 预设动画特效
 */
class EffectUtil {
	public constructor() {
	}

	public static Center(ui: egret.DisplayObject) {
		//锚点居中
		ui.anchorOffsetX = ui.width / 2;
		ui.anchorOffsetY = ui.height / 2;

		//位置居中
		if (ui.width == GameConst.stageWidth) {
			ui.x = ui.width / 2;
		} else if (ui.parent.width < GameConst.stageWidth) {
			ui.x = ui.parent.width / 2;
		} else {
			ui.x = GameConst.stageWidth / 2;
		}

		if (ui.height == GameConst.stageHeight) {
			ui.y = ui.height / 2;
		} else if (ui.parent.height < GameConst.stageHeight) {
			ui.y = ui.parent.height / 2;
		} else {
			ui.y = GameConst.stageHeight / 2;
		}
	}

	/**
	 * 清除
	 */
	public static Clear(ui: egret.DisplayObjectContainer) {
		if (ui == null) {
			return;
		}
		for (var i = 0; i < ui.numChildren; i++) {
			var item = ui.getChildAt(i);
			egret.Tween.removeTweens(item);
		}
		egret.Tween.removeTweens(ui);
		if (ui.filters) {
			ui.filters = null;
		}
	}

	/**
	 * 列表
	 */
	public static List(ui: egret.DisplayObjectContainer, delay: number = 0) {
		if (ui == null) {
			return;
		}
		for (var i = 0; i < ui.numChildren; i++) {
			var item = ui.getChildAt(i);
			item.y -= 10;
			item.alpha = 0;
			egret.Tween.get(item).wait(i * 100 + delay).to({ y: item.y + 10, alpha: 1 }, 100);
		}
	}

	/**
	 * 纵向滚动到目标位置
	 */
	public static RollV(group: eui.Group, index: number, delay: number = 0, ani: boolean = true) {
		if (group == null || group.numChildren == 0 || index < 0 || index >= group.numChildren) {
			return;
		}

		//容器的Scroller
		var src: eui.Scroller = <eui.Scroller>group.parent;

		//目标
		var item = group.getChildAt(index);

		//列表的中点位置
		var tar = (src.height - item.height) / 2;

		//目标点
		var end = item.y - tar;

		//列表实际高度(高度+间距)
		var gap = group.layout["gap"] != null ? group.layout["gap"] : 0;
		var size = (item.height + gap) * group.numChildren - gap;
		if (size <= src.height) {
			return;
		}

		//判断临界点
		if (end < 0) {
			end = 0;
		} else if (end > size - src.height) {
			end = size - src.height;
		}

		//执行滚动
		src.stopAnimation();
		if (ani) {
			egret.Tween.get(src.viewport).wait(delay).to({ scrollV: end }, 500, egret.Ease.circOut);
		} else {
			src.viewport.scrollV = end;
		}
	}

	/**
	 * 横向滚动到目标位置
	 */
	public static RollH(group: eui.Group, index: number, delay: number = 0, offset: number = 0, ani: boolean = true) {
		if (group == null || group.numChildren == 0 || index < 0 || index >= group.numChildren) {
			return;
		}

		//容器的Scroller
		var src: eui.Scroller = <eui.Scroller>group.parent;

		//目标
		var item = group.getChildAt(index);

		//列表的中点位置
		var tar = (src.width - item.width) / 2;

		//目标点
		var end = item.x - tar;

		//列表实际宽度(宽度+间距)
		var gap = group.layout["gap"] != null ? group.layout["gap"] : 0;
		var size = (item.width + gap) * group.numChildren - gap;
		if (size <= src.width) {
			return;
		}

		//判断临界点
		if (end < 0) {
			end = 0;
		} else if (end > size - src.width) {
			end = size - src.width + offset;
		}

		//执行滚动
		src.stopAnimation();
		if (ani) {
			egret.Tween.get(src.viewport).wait(delay).to({ scrollH: end }, 500, egret.Ease.circOut);
		} else {
			src.viewport.scrollH = end;
		}
	}

	/**
	 * 打开
	 */
	public static Open(ui: egret.DisplayObject, back: Function = null, reg: any = null) {
		if (ui == null) {
			return;
		}
		function remove() {
			// egret.Tween.removeTweens(ui);
			if (back) {
				back.call(reg);
			}
		}
		// egret.Tween.removeTweens(ui);

		EffectUtil.Center(ui);
		ui.scaleX = ui.scaleY = 0.1;
		egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut).call(remove);
	}

	/**
	 * 关闭
	 */
	public static Close(ui: egret.DisplayObject, back: Function = null, reg: any = null) {
		if (ui == null) {
			return;
		}
		function remove() {
			// egret.Tween.removeTweens(ui);
			// ui.scaleX = ui.scaleY = 1;
			if (back) {
				back.call(reg);
			}
		}
		// egret.Tween.removeTweens(ui);
		ui.anchorOffsetX = ui.width / 2;
		ui.anchorOffsetY = ui.height / 2;
		egret.Tween.get(ui).to({ scaleX: 0.5, scaleY: 0.5 }, 100).call(remove);
	}

	/**
	 * 淡入
	 */
	public static FadeIn(ui: egret.DisplayObject, time: number = 500, delay: number = 0) {
		if (ui == null) {
			return;
		}
		// function remove(){
		// 	if(back){
		// 		back.call(reg);
		// 	}
		// }
		// if(scale != 1){
		// 	if(ui.anchorOffsetX == 0){
		// 		ui.x += ui.width/2;
		// 	}
		// 	if(ui.anchorOffsetY == 0){
		// 		ui.y += ui.height/2;
		// 	}
		// 	ui.anchorOffsetX = ui.width/2;
		// 	ui.anchorOffsetY = ui.height/2;
		// 	ui.scaleX = ui.scaleY = scale;
		// }
		ui.alpha = 0;
		egret.Tween.get(ui).wait(delay).to({ alpha: 1 }, time);
	}

	/**
	 * 淡出
	 */
	public static FadeOut(ui: egret.DisplayObject, time: number = 500, delay: number = 0) {
		if (ui == null) {
			return;
		}
		// function remove(){
		// 	if(back){
		// 		back.call(reg);
		// 	}
		// }
		// if(scale != 1){
		// if(ui.anchorOffsetX == 0){
		// 	ui.x += ui.width/2;
		// }
		// if(ui.anchorOffsetY == 0){
		// 	ui.y += ui.height/2;
		// }
		// ui.anchorOffsetX = ui.width/2;
		// ui.anchorOffsetY = ui.height/2;
		// ui.scaleX = ui.scaleY = scale;
		// }
		egret.Tween.get(ui).wait(delay).to({ alpha: 0 }, time);
	}

	/**
	 * 变大
	 */
	public static Big(ui: egret.DisplayObject, delay: number = 0) {
		if (ui == null) {
			return;
		}
		// function remove(){
		// 	if(back){
		// 		back.call(reg);
		// 	}
		// }
		if (ui.anchorOffsetX == 0) {
			ui.x += ui.width / 2;
		}
		if (ui.anchorOffsetY == 0) {
			ui.y += ui.height / 2;
		}
		ui.anchorOffsetX = ui.width / 2;
		ui.anchorOffsetY = ui.height / 2;
		ui.scaleX = ui.scaleY = 0.8;
		egret.Tween.get(ui).wait(delay).to({ scaleX: 1, scaleY: 1 }, 500);
	}

	/**
	 * 缩小
	 */
	public static small(ui: egret.DisplayObject, time: number = 500, back: Function, reg: any) {
		if (ui == null) {
			return;
		}
		function remove() {
			if (back) {
				back.call(reg);
			}
		}
		if (ui.anchorOffsetX == 0) {
			ui.x += ui.width / 2;
		}
		if (ui.anchorOffsetY == 0) {
			ui.y += ui.height / 2;
		}
		ui.anchorOffsetX = ui.width / 2;
		ui.anchorOffsetY = ui.height / 2;
		// ui.scaleX = ui.scaleY = 0.8;
		egret.Tween.get(ui).to({ scaleX: 0, scaleY: 0 }, time).call(remove);
	}

	/**
	 * 漂浮
	 */
	public static Float(ui: egret.DisplayObject) {
		if (ui == null) {
			return;
		}
		var speed = 1500;
		function move() {
			egret.Tween.get(ui).to({ y: ui.y + 10 }, speed).call(
				function () {
					egret.Tween.get(ui).to({ y: ui.y - 10 }, speed).call(move);
				}
			);
		}
		move();
	}

	/**
	 * 呼吸
	 */
	public static breathe(ui: egret.DisplayObject, speed: number = 800) {
		if (ui == null) {
			return;
		}
		function move() {
			egret.Tween.get(ui).to({ scaleX: 0.9, scaleY: 0.9 }, speed).call(
				function () {
					egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, speed).call(move);
				}
			);
		}
		move();
	}

	/**
	 * 移动
	 */
	public static Move(ui: egret.DisplayObject, back: Function = null, reg: any = null, prop: any = {}) {
		if (ui == null) {
			return;
		}
		function remove() {
			if (back) {
				back.call(reg);
			}
		}
		if (prop.x == null) {
			prop.x = ui.x;
		}
		if (prop.y == null) {
			prop.y = ui.y;
		}
		egret.Tween.get(ui).to({ x: prop.x, y: prop.y }, 300, egret.Ease.circOut).call(remove);
	}

	/**
	 * 数字变化
	 * t Label或BitmapLabel
	 */
	public static NumChange(t: any, begin: number, end: number, time: number = 500) {
		var o = { n: begin };
		t.text = begin.toString();
		egret.Tween.get(o, {
			onChange: function () {
				t.text = Math.round(o.n).toString();
			}
		}, this).to({ n: end }, time);
	}

	/****淡出 加变大 */
	public static outAlphaScale(ui: egret.DisplayObject, outValue: number = 1.2, inValue: number = 1, speedO: number = 500, speedIn: number = 200) {
		if (ui == null) {
			return;
		}
		egret.Tween.removeTweens(ui);
		function move() {
			egret.Tween.get(ui).to({ scaleX: outValue, scaleY: outValue, alpha: 0.2 }, speedO).call(
				function () {
					egret.Tween.get(ui).to({ scaleX: inValue, scaleY: inValue, alpha: 1 }, speedIn).call(move);
				}
			);
		}
		move();
	}

	/****淡出 加变大 */
	public static clearTween(ui: egret.DisplayObject) {
		if (ui == null) {
			return;
		}
		egret.Tween.removeTweens(ui);

	}
}
