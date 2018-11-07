var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 预设动画特效
 */
var EffectUtil = (function () {
    function EffectUtil() {
    }
    EffectUtil.Center = function (ui) {
        //锚点居中
        ui.anchorOffsetX = ui.width / 2;
        ui.anchorOffsetY = ui.height / 2;
        //位置居中
        if (ui.width == GameConst.stageWidth) {
            ui.x = ui.width / 2;
        }
        else if (ui.parent.width < GameConst.stageWidth) {
            ui.x = ui.parent.width / 2;
        }
        else {
            ui.x = GameConst.stageWidth / 2;
        }
        if (ui.height == GameConst.stageHeight) {
            ui.y = ui.height / 2;
        }
        else if (ui.parent.height < GameConst.stageHeight) {
            ui.y = ui.parent.height / 2;
        }
        else {
            ui.y = GameConst.stageHeight / 2;
        }
    };
    /**
     * 清除
     */
    EffectUtil.Clear = function (ui) {
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
    };
    /**
     * 列表
     */
    EffectUtil.List = function (ui, delay) {
        if (delay === void 0) { delay = 0; }
        if (ui == null) {
            return;
        }
        for (var i = 0; i < ui.numChildren; i++) {
            var item = ui.getChildAt(i);
            item.y -= 10;
            item.alpha = 0;
            egret.Tween.get(item).wait(i * 100 + delay).to({ y: item.y + 10, alpha: 1 }, 100);
        }
    };
    /**
     * 纵向滚动到目标位置
     */
    EffectUtil.RollV = function (group, index, delay, ani) {
        if (delay === void 0) { delay = 0; }
        if (ani === void 0) { ani = true; }
        if (group == null || group.numChildren == 0 || index < 0 || index >= group.numChildren) {
            return;
        }
        //容器的Scroller
        var src = group.parent;
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
        }
        else if (end > size - src.height) {
            end = size - src.height;
        }
        //执行滚动
        src.stopAnimation();
        if (ani) {
            egret.Tween.get(src.viewport).wait(delay).to({ scrollV: end }, 500, egret.Ease.circOut);
        }
        else {
            src.viewport.scrollV = end;
        }
    };
    /**
     * 横向滚动到目标位置
     */
    EffectUtil.RollH = function (group, index, delay, offset, ani) {
        if (delay === void 0) { delay = 0; }
        if (offset === void 0) { offset = 0; }
        if (ani === void 0) { ani = true; }
        if (group == null || group.numChildren == 0 || index < 0 || index >= group.numChildren) {
            return;
        }
        //容器的Scroller
        var src = group.parent;
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
        }
        else if (end > size - src.width) {
            end = size - src.width + offset;
        }
        //执行滚动
        src.stopAnimation();
        if (ani) {
            egret.Tween.get(src.viewport).wait(delay).to({ scrollH: end }, 500, egret.Ease.circOut);
        }
        else {
            src.viewport.scrollH = end;
        }
    };
    /**
     * 打开
     */
    EffectUtil.Open = function (ui, back, reg) {
        if (back === void 0) { back = null; }
        if (reg === void 0) { reg = null; }
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
    };
    /**
     * 关闭
     */
    EffectUtil.Close = function (ui, back, reg) {
        if (back === void 0) { back = null; }
        if (reg === void 0) { reg = null; }
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
    };
    /**
     * 淡入
     */
    EffectUtil.FadeIn = function (ui, time, delay) {
        if (time === void 0) { time = 500; }
        if (delay === void 0) { delay = 0; }
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
    };
    /**
     * 淡出
     */
    EffectUtil.FadeOut = function (ui, time, delay) {
        if (time === void 0) { time = 500; }
        if (delay === void 0) { delay = 0; }
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
    };
    /**
     * 变大
     */
    EffectUtil.Big = function (ui, delay) {
        if (delay === void 0) { delay = 0; }
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
    };
    /**
     * 缩小
     */
    EffectUtil.small = function (ui, time, back, reg) {
        if (time === void 0) { time = 500; }
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
    };
    /**
     * 漂浮
     */
    EffectUtil.Float = function (ui) {
        if (ui == null) {
            return;
        }
        var speed = 1500;
        function move() {
            egret.Tween.get(ui).to({ y: ui.y + 10 }, speed).call(function () {
                egret.Tween.get(ui).to({ y: ui.y - 10 }, speed).call(move);
            });
        }
        move();
    };
    /**
     * 呼吸
     */
    EffectUtil.breathe = function (ui, speed) {
        if (speed === void 0) { speed = 800; }
        if (ui == null) {
            return;
        }
        function move() {
            egret.Tween.get(ui).to({ scaleX: 0.9, scaleY: 0.9 }, speed).call(function () {
                egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, speed).call(move);
            });
        }
        move();
    };
    /**
     * 移动
     */
    EffectUtil.Move = function (ui, back, reg, prop) {
        if (back === void 0) { back = null; }
        if (reg === void 0) { reg = null; }
        if (prop === void 0) { prop = {}; }
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
    };
    /**
     * 数字变化
     * t Label或BitmapLabel
     */
    EffectUtil.NumChange = function (t, begin, end, time) {
        if (time === void 0) { time = 500; }
        var o = { n: begin };
        t.text = begin.toString();
        egret.Tween.get(o, {
            onChange: function () {
                t.text = Math.round(o.n).toString();
            }
        }, this).to({ n: end }, time);
    };
    /****淡出 加变大 */
    EffectUtil.outAlphaScale = function (ui, outValue, inValue, speedO, speedIn) {
        if (outValue === void 0) { outValue = 1.2; }
        if (inValue === void 0) { inValue = 1; }
        if (speedO === void 0) { speedO = 500; }
        if (speedIn === void 0) { speedIn = 200; }
        if (ui == null) {
            return;
        }
        egret.Tween.removeTweens(ui);
        function move() {
            egret.Tween.get(ui).to({ scaleX: outValue, scaleY: outValue, alpha: 0.2 }, speedO).call(function () {
                egret.Tween.get(ui).to({ scaleX: inValue, scaleY: inValue, alpha: 1 }, speedIn).call(move);
            });
        }
        move();
    };
    /****淡出 加变大 */
    EffectUtil.clearTween = function (ui) {
        if (ui == null) {
            return;
        }
        egret.Tween.removeTweens(ui);
    };
    return EffectUtil;
}());
__reflect(EffectUtil.prototype, "EffectUtil");
//# sourceMappingURL=EffectUtil.js.map