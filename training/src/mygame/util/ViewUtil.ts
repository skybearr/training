/**
 *
 * @author
 *
 */
class ViewUtil {
    public constructor() {
    }

    /**把一个DisObject画成一个位图
    * @param disobject 要画的disobject
    * @param scale 缩放比例
    */
    public static drawBitmapFromDisObject(disobject: egret.DisplayObject, clipBounds?: egret.Rectangle, scale?: number): egret.Bitmap {
        var renderTexture: egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(disobject, clipBounds, scale);
        var bitmap: egret.Bitmap = new egret.Bitmap(renderTexture);
        return bitmap;
    }

    private static isShake: Boolean = false;
    /**屏幕或组件抖动 （为确保精确参数尽量用2的幂数）
     * @param dis 要抖动的容器 不能是stage
     * @param times 抖动次数
     * @param offset 抖动幅度
     * @param speed 抖动频率
     */
    public static shake(dis: egret.DisplayObject, times: number = 1.5, offset: number = 0.5, speed: number = 50): void {
        if (this.isShake) {
            return;
        }
        this.isShake = true;
        var point: egret.Point = new egret.Point(dis.x, dis.y);
        var offsetXYArray: number[] = [0, 0];
        var num: number = 0;
        var u: number = egret.setInterval(() => {
            offsetXYArray[num % 2] = (num++) % 4 < 2 ? 0 : offset;
            if (num > (times * 4 + 1)) {
                egret.clearInterval(u);
                num = 0;
                this.isShake = false;
            }
            dis.x = offsetXYArray[0] + point.x;
            dis.y = offsetXYArray[1] + point.y;
        }, this, speed);
    }

    /**画一个箭头,默认箭头指向右侧*/
    public static drawArrow(width: number = 50, color: number = 0xffff00): egret.Shape {
        var sp: egret.Shape = new egret.Shape();
        sp.graphics.lineStyle(1, 0, 1);
        sp.graphics.beginFill(0xffff00);
        sp.graphics.moveTo(-width, -width / 2);
        sp.graphics.lineTo(0, -width / 2);
        sp.graphics.lineTo(0, -width);
        sp.graphics.lineTo(width, 0);
        sp.graphics.lineTo(0, width);
        sp.graphics.lineTo(0, width / 2);
        sp.graphics.lineTo(-width, width / 2);
        sp.graphics.lineTo(-width, -width / 2);
        sp.graphics.endFill();
        return sp;
    }

    public static getShape(width: number = 640, height: number = 960, color: number = 0x000000, alpha: number = 0.7): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    }

    public static getArtNum(art_src: string, src: string): egret.Sprite {
        var con: egret.Sprite = new egret.Sprite();
        var i: number = 0;
        while (i < src.length) {
            var texture: egret.Texture = RES.getRes(art_src + src.charAt(i));
            var bmp: egret.Bitmap = new egret.Bitmap(texture);
            bmp.x = con.width + 1;
            bmp.y = -texture.textureHeight / 2;
            con.addChild(bmp);
        }

        return con;
    }

    /**检测碰撞*/
    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();
        var rect2: egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }

}