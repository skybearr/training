class TimeUtil {
	public constructor() {
	}

	/** 判断这个时间是否是今天
	 * @param t 时间 秒
	 */
	public static checkToday(t:number):boolean{
		let today0 = Math.floor(TimeUtil.getTodayZero() / 1000);
		return t >= today0;
	}

	/** 获取今日的0点的时间 
	 * @return 毫秒
	*/
	public static getTodayZero():number{
		let d = new Date();
		let h = d.getHours();
		let m = d.getMinutes();
		let s = d.getSeconds();
		let secs = h * 3600 + m * 60 + s;
		return d.getTime() - secs * 1000;
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
	public static GetDayInYear(t: number): number {
		var time: Date = new Date(t);
		var month = time.getMonth() + 1;
		var year = time.getFullYear();
		var days = time.getDate();
		var sum = 0;

		let a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let b = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
			for (var i: number = 0; i < month - 1; i++) {
				sum += b[i];
			}
			return sum + days;
		} else {
			for (var i: number = 0; i < month - 1; i++) {
				sum += a[i];
			}
			return sum + days;
		}
	}

	/**
	 * 返回时间点在当天的秒数
	 */
	public static getSecondInDay(date: Date) {
		return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
	}

	/**
	 * 倒计时转换为时间格式（h:m:s） ，可自定义
	 * @param t 秒
	 * @param f 格式
	 */
	public static ParseTime2Format(t: number, f: string = "h:m:s"): string {
		var d: number = Math.floor(t / 24 / 3600);
		var h: number = Math.floor((t / 3600) % 24);
		var m: number = Math.floor((t % 3600) / 60);
		var s: number = (t % 3600) % 60;

		function parse_format(t: number): string {
			var s: string = t.toString();
			if (t < 10) {
				s = "0" + t;
			}
			return s;
		}
		if (f.indexOf("d") != -1) {
			f = f.replace(/d/g, parse_format(d));
		}
		else {
			h += d * 24;
		}
		if (f.indexOf("h") != -1) {
			f = f.replace(/h/g, parse_format(h));
		} else {
			m += h * 60;
		}
		if (f.indexOf("m") != -1) {
			f = f.replace(/m/g, parse_format(m));
		} else {
			if (f.indexOf("h") != -1) {
				s += m * 60;
			} else {
				s = t;
			}
		}
		if (f.indexOf("s") != -1) {
			f = f.replace(/s/g, parse_format(s));
		}
		return f;
	}

	/**
	 * 转换为日期格式
	 * @param t 毫秒
	 * @param f 格式 Y/M/D h:m:s
	 */
	public static ParseTime2Date(t: number, f: string = "Y-M-D h:m:s") {
		var d: Date = new Date(t);
		var Y: number = d.getFullYear();
		var M: number = d.getMonth() + 1;
		var D: number = d.getDate();
		var h: number = d.getHours();
		var m: number = d.getMinutes();
		var s: number = d.getSeconds();

		function parse_format(t: number): string {
			var s: string = t.toString();
			if (t < 10) {
				s = "0" + t;
			}
			return s;
		}

		if (f.indexOf("Y") != -1) {
			f = f.replace(/Y/g, parse_format(Y));
		}
		if (f.indexOf("M") != -1) {
			f = f.replace(/M/g, parse_format(M));
		}
		if (f.indexOf("D") != -1) {
			f = f.replace(/D/g, parse_format(D));
		}
		if (f.indexOf("h") != -1) {
			f = f.replace(/h/g, parse_format(h));
		}
		if (f.indexOf("m") != -1) {
			f = f.replace(/m/g, parse_format(m));
		}
		if (f.indexOf("s") != -1) {
			f = f.replace(/s/g, parse_format(s));
		}
		return f;
	}

	/**
	 * 将时间转换为天/小时/分钟/秒
	 * @param t 秒
	 */
	public static ParseTimeChangeToUtil(t: number) {
		var str: string = "";

		if (t >= 3600 * 24) {
			str = Math.floor(t / (3600 * 24)) + "天";
		} else if (t >= 3600) {
			str = Math.floor(t / 3600) + "小时";
		} else if (t >= 60) {
			str = Math.floor(t / 60) + "分钟";
		} else if (t < 60 && t > 0) {
			str = t + "秒";
		}
		return str;
	}

	/**
	 * 获得带单位的时间字符串
	 * * @param t 秒
	 * @param f 格式 "d" "h" "m" "s"
	 */
	public static ParseTime2Units(t: number, f: string = "h"): string {
		var str: string = "";

		if (f == "d") {
			str = Math.ceil(t / (3600 * 24)) + "天";
		} else if (f == "h") {
			str = Math.ceil(t / 3600) + "小时";
		} else if (f == "m") {
			str = Math.ceil(t / 60) + "分钟";
		} else if (f == "s") {
			str = t + "秒";
		} else {
			var d = Math.floor(t / (3600 * 24));
			var h = Math.floor(t / 3600);
			var m = Math.floor(t / 60);
			var s = t % 60;
			str = d + "天" + h + "时" + m + "分" + s + "秒";
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
	public static CreateCD(fun: Function, reg: any, tim: number, rep: number = 0): egret.Timer {
		var t: egret.Timer = new egret.Timer(tim, rep);
		t.addEventListener(egret.TimerEvent.TIMER, fun, reg);
		return t;
	}

	public static RemoveCD(tim: egret.Timer, fun: Function, reg: any) {
		if (tim != null) {
			tim.stop();
			tim.removeEventListener(egret.TimerEvent.TIMER, fun, reg);
		}
	}

}