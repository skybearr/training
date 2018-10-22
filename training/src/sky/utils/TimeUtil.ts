class TimeUtil {
	public constructor() {
	}

	/**
	 * 真正的当前时间
	 */
	public static getCurrentTime():number
	{
		var time:Date = new Date();
		return time.getTime();// + time.getTimezoneOffset() * 60 * 1000; 这个时间不对，直接getTime是对的，除非这取的不是本地时间@zhang
	}

	private static localTime:number;
	private static offTime:number;
	/**获取当前的服务器时间 */
	public static getCrtServerTime():number{
		return new Date().getTime() / 1000 + this.offTime;
	}

	/**
	 * 获取服务器日期
	 */
	public static getServerDate(){
		return new Date(TimeUtil.getCrtServerTime()*1000);
	}

	/** 00:00:000格式 */
	public static formatSecondT(t){
		let s = TimeUtil.ParseTime2Format(Math.floor(t / 1000), "m:s");
		let hs = t % 1000;
		let ss = "";
		if (hs < 10) {
			ss = "00" + hs;
		}
		else if (hs < 100) {
			ss = "0" + hs;
		}
		else {
			ss = hs + "";;
		}
		return s + ":" + ss;
	}

	/**
	 * 返回一年中的第N天
	 * @param t 秒
	 */
	public static GetDayInYear(t:number):number{
		var time:Date = new Date(t);
		var month = time.getUTCMonth()+1;
		var year = time.getFullYear();
		var days = time.getDate();

		function get_month_days(m){
			var d = 0;
			if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12)
				d = 31;
			else if(m==4 || m==6 || m==9 || m==11)
				d = 30;
			else if(year%400==0 || (year%4==0 && year%100!=0))
				d = 29;
			else
				d = 28;
			return d;
		}
		
		var all_days = 0
		for(var i = 1; i<=month; i++){
			if(i == month){
				all_days += days
			}else{
				all_days += get_month_days(i);
			}
		}
		
		return all_days;
	}

	/**
	 * 返回时间点在当天的秒数
	 */
	public static getSecondInDay(date:Date){
		return date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
	}

	/**
	 * 倒计时转换为时间格式（h:m:s） ，可自定义
	 * @param t 秒
	 * @param f 格式
	 */
	public static ParseTime2Format(t:number, f:string = "h:m:s"):string{
		
		var h:number = Math.floor(t/3600);
		var m:number = Math.floor((t%3600)/60);
		var s:number = (t%3600)%60;

		function parse_format(t:number):string{
			var s:string = t.toString();
			if (t < 10){
				s = "0" + t;
			}
			return s;
		}

		if (f.indexOf("h") != -1){
			f = f.replace(/h/g, parse_format(h));
		}else{
			m += h*60;
		}
		if (f.indexOf("m") != -1){
			f = f.replace(/m/g, parse_format(m));
		}else{
			if (f.indexOf("h") != -1){
				s += m*60;
			}else{
				s = t;
			}
		}
		if (f.indexOf("s") != -1){
			f = f.replace(/s/g, parse_format(s));
		}
		return f;
	}

	/**
	 * 转换为日期格式
	 * @param t 毫秒
	 * @param f 格式 Y/M/D h:m:s
	 */
	public static ParseTime2Date(t:number, f:string = "Y-M-D h:m:s"){
		var d:Date = new Date(t);
		var Y:number = d.getFullYear();
		var M:number = d.getMonth()+1;
		var D:number = d.getDate();
		var h:number = d.getHours();
		var m:number = d.getMinutes();
		var s:number = d.getSeconds();

		function parse_format(t:number):string{
			var s:string = t.toString();
			if (t < 10){
				s = "0" + t;
			}
			return s;
		}

		if (f.indexOf("Y") != -1){
			f = f.replace(/Y/g, parse_format(Y));
		}
		if (f.indexOf("M") != -1){
			f = f.replace(/M/g, parse_format(M));
		}
		if (f.indexOf("D") != -1){
			f = f.replace(/D/g, parse_format(D));
		}
		if (f.indexOf("h") != -1){
			f = f.replace(/h/g, parse_format(h));
		}
		if (f.indexOf("m") != -1){
			f = f.replace(/m/g, parse_format(m));
		}
		if (f.indexOf("s") != -1){
			f = f.replace(/s/g, parse_format(s));
		}
		return f;
	}

	/**
	 * 获得带单位的时间字符串
	 * * @param t 秒
	 */
	public static ParseTime2Units(t:number):string{
		var str:string = "";
		if(t >= 3600*24){
			str = Math.floor(t/(3600*24)) + "天";
		}else if (t >= 3600){
			str = Math.floor(t/3600) + "小时";
		}else if(t >= 60){
			str = Math.floor(t/60) + "分钟";
		}else if(t > 0){
			str = t + "秒";
		}
		return str;
	}

	/**
	 * 注册倒计时
	 * @param fun 回调
	 * @param reg 域
	 * @param tim 延时
	 * @param rep 次数
	 */
	public static CreateCD(fun:Function, reg:any, tim:number, rep:number = 0):egret.Timer{
		var t:egret.Timer = new egret.Timer(tim, rep);
		t.addEventListener(egret.TimerEvent.TIMER, fun, reg);
		return t;
	}

	public static RemoveCD(tim:egret.Timer, fun:Function, reg:any){
		if (tim != null){
			tim.stop();
			tim.removeEventListener(egret.TimerEvent.TIMER, fun, reg);
		}
	}

}