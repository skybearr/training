/**
 *
 * @author 
 *
 */
class AvgMainUI extends eui.Component
{
    private bg: eui.Group;
    private txt: eui.Label;
    private bg_img: eui.Image;
    private head: eui.Image;
    private finger: eui.Image;

    private words: string[];
    private timer: egret.Timer;
    private vo: AvgVO;
    private current_dialog_index: number;
    private current_dialog: AvgDialogVO;
    private words_index: number;
    /**类型 0开始的  1结束时的*/
    private avg_type: number;
    private dialog_bg:eui.Image;
    private dialog_bg_src:string;

    public constructor(id: number, type: number)
    {
        super();
        this.avg_type = type;
        this.vo = AVGLogic.getInstance().getAVGVOByID(id);
        this.skinName = "AvgMainSkin";
    }

    protected childrenCreated(): void
    {
        super.childrenCreated();
        this.bg_img = new eui.Image(RES.getRes(this.vo.bg));
        this.bg_img.bottom = 0;
        this.bg.addChild(this.bg_img);

        this.finger = new eui.Image(RES.getRes("finger_png"));
        this.finger.smoothing = true;
        this.finger.scaleX = this.finger.scaleY = 0.4;
        this.finger.right = 120;
        this.finger.bottom = 12;
        this.finger.visible = false;
        this.addChild(this.finger);

        this.timer = new egret.Timer(100);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.delay, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dialogSubOver, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);

        this.current_dialog_index = 0;
        this.start();
    }

    private start(): void
    {
        this.finger.visible = false;
        this.current_dialog = this.vo.dialogs[this.current_dialog_index];
        this.words_index = 0;
        this.txt.text = "";
        this.words = this.current_dialog.words.split("");
        if(this.dialog_bg == null)
        {
            this.dialog_bg = new eui.Image();
        }
        if (this.dialog_bg_src != this.current_dialog.bg)
        {
            this.dialog_bg.texture = RES.getRes(this.current_dialog.bg);
        }
        
        if (this.head == null)
        {
            this.head = new eui.Image();
        }
        this.head.texture = RES.getRes(this.current_dialog.head);
        if (this.current_dialog.is_left)
        {
            this.head.left = 150;
            this.head.right = null;
        }
        else
        {
            this.head.left = null;
            this.head.right = 150;
        }
        this.head.bottom = 560;
        this.addChild(this.head);

        this.timer.start();
    }

    private delay(): void
    {
        if (this.words_index >= this.words.length)
        {
            this.dialogSubOver();
        }
        else
        {
            this.txt.text += this.words[this.words_index];
            this.words_index++;
        }
    }

    private dialogSubOver(): void
    {
        this.timer.reset();
        this.txt.text = this.current_dialog.words;
        this.finger.visible = true;
    }

    private click(): void
    {
        if (this.timer.running)
        {//如果正在进行，直接全部显示
            this.dialogSubOver();
        }
        else
        {//显示完毕，点击下一条
            this.current_dialog_index++;
            if (this.current_dialog_index >= this.vo.dialogs.length)
            {
                this.over();
            }
            else
            {
                this.start();
            }
        }
    }

    /**剧情结束*/
    private over(): void
    {
        if (this.parent != null)
        {
            this.parent.removeChild(this);
            this.clear();
        }
    }

    private clear(): void
    {
        this.timer.start();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.delay, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dialogSubOver, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.current_dialog = null;
        this.vo = null;
    }

}
