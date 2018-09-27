/**
 *
 * @author 
 *
 */
class FilterUtil {
	public constructor() {
	}	
	
    /**灰色滤镜*/
    public static getGrayFilter(): egret.ColorMatrixFilter[] {
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    }
    

    /**绿色滤镜*/
    public static getColorFilter(): egret.ColorMatrixFilter[] {
        var colorMatrix = [
            0,0,0,0,0,
            0,1,0,0,255,
            0,0,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    }
    

    /**模糊滤镜*/
    public static getBlurFilter(): egret.BlurFilter[] {
        var blurFliter = new egret.BlurFilter(1,1);
        return [blurFliter];
    }

    /**文字滤镜 */
    public static getTxtFilter(color:number=0x000000):egret.GlowFilter[]
    {
        return [new egret.GlowFilter(color, 1, 2, 2, 4, 1, false, false)];
    }

    public static getDropFilter():egret.DropShadowFilter[]
    {

        var distance:number = 3;           /// 阴影的偏移距离，以像素为单位
        var angle:number = 45;              /// 阴影的角度，0 到 360 度
        var color:number = 0x000000;        /// 阴影的颜色，不包含透明度
        var alpha:number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
        var blurX:number = 0;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 0;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 1.5;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
        var inner:boolean = false;            /// 指定发光是否为内侧发光
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果
        var dropShadowFilter:egret.DropShadowFilter =  new egret.DropShadowFilter( distance, angle, color, alpha, blurX, blurY,
        strength, quality, inner, knockout );
 
        return [dropShadowFilter];
    }

}
