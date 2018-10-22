class TimerManager {
	public constructor() {
		this.init();
	}
    private static instance: TimerManager;
    public static getInstance(): TimerManager {
        if(this.instance == null) {
            this.instance = new TimerManager();
        }
        return this.instance;
    }

	private timerFunList:TimerVo[] =[];


	/**添加每秒的时间回调
	 * @param fun 回调的函数
	 * @param _t this域
	 * @param time 以秒为单位
	 */
	public addTimerCallBack(fun:Function,_t:any,time:number = 1):void
	{ 
		if (!this.checkHasCallBack(fun, _t)) {
			var timerVo:TimerVo = new TimerVo();
			timerVo.fun = fun;
			timerVo.time = time;
			timerVo.totalTime = time;
			timerVo.thisObj = _t;
			this.timerFunList.push(timerVo);
		}
	}

	/***
	 * 检查是添加过相同的回调
	 */
	private checkHasCallBack(fun:Function,_t:any):boolean
	{
		for(var i:number = 0;i<this.timerFunList.length;i++)
		{
			var obj:TimerVo = this.timerFunList[i];
			if(fun == obj.fun && _t == obj.thisObj )
			{ 
				console.warn("on this same fun by TimerManager this: "+ egret.getQualifiedClassName(_t) +",fun:"+egret.getQualifiedClassName(fun)+",please check!!!");
				
				return true;
			}
		}
		return false;
	}
 

	private init():void
	{
		var timer:egret.Timer = new egret.Timer(1000);

		timer.addEventListener(egret.TimerEvent.TIMER,this.timerFun,this);
		timer.start();

		// GlobalConst.GameStage.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
	}

	private clipFrameStatus:boolean = true;
	public clipFrameChange():void
	{
		if(this.clipFrameStatus)
		{
			GameConst.GameStage.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
		}else
		{
			GameConst.GameStage.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
			GameConst.GameStage.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
		}
		this.clipFrameStatus = !this.clipFrameStatus;
	}
   
	private timerFun(e:egret.TimerEvent):void
	{
		for(var i:number = 0;i<this.timerFunList.length;i++)
		{
			var timerVo:TimerVo = this.timerFunList[i];
			var fun:Function = timerVo.fun;
			var t:any = timerVo.thisObj
			timerVo.time -- ;
			if(timerVo.time <=0)
			{
				timerVo.time = timerVo.totalTime;

				fun.call(t);
			}
		}
	}

	/**删除时间回调
	 * fun 回调的函数
	 * _t  执行回调函数的域
	 */
	public removeFun(f:Function,_t:any):void
	{
		for(var i:number = this.timerFunList.length-1;i>=0;i--)
		{
			var timerVo:TimerVo  = this.timerFunList[i];
			var fun:Function = timerVo.fun
			var t:any = timerVo.thisObj;

			if(fun == f&& _t == t )
			{
				this.timerFunList.splice(i,1)
			}
		}
	}


	private frameList:frameVo[] = [];

	private enterFrame():void
	{
		var len:number = this.frameList.length;
		for(var i:number = 0;i<this.frameList.length;i++)
		{
			var vo:frameVo = this.frameList[i];
			vo.fun.call(vo.thisObj);
		}
		//console.log("enter Frame count :" +len);
		
	}

	public addEnterFrame(fun:Function,thisobj:any):void
	{
		var frame:frameVo = new frameVo();
		frame.fun = fun;
		frame.thisObj = thisobj;
		this.frameList.push(frame);
	}

	public removeEnterFrame(fun:Function,thisobj:any):void
	{
		var len:number = this.frameList.length;
		for(var i:number = 0;i<len;i++)
		{
			var vo:frameVo = this.frameList[i];
			if(fun == vo.fun && thisobj == vo.thisObj)
			{
				this.frameList.splice(i,1);
				break;
			}
		}
	}
}
class TimerVo
{
	public totalTime:number = 0;
	public time:number = 0;
	public fun:Function	;
	public thisObj:any;
}

class frameVo
{
	public fun:Function;
	public thisObj:any;
}