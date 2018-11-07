class ObjectUtil {
	public constructor() {
	}

	//删除所有数据
	public static delObjectProp(o:Object):void
	{
		for(var key in o)
		{
			delete o[key];
		}
	}


	public static cloneObject(o:Object):any
	{ 
		var str:string = egret.getQualifiedClassName(o);
		var objClass = egret.getDefinitionByName(str);

		var obj:Object = new objClass(); 

		if(str == "function")
		{
			return obj.constructor;
		}
		for (var k in o)
		{
			if(k == "callBackList")
			{
				continue;
			}
			if(k =="function")
			{
				return 
			}
			var value:any = o[k];
			if(typeof(value) == "number" || 
			   typeof(value) == "string" ||
			   typeof(value) == "boolean")
			{
				obj[k] = value;
			}else 
			{
				var str:string = egret.getQualifiedClassName(value);
				if(str == "")
				{
					continue;
				} 
				obj[k] = this.cloneObject(value);
			}
		}
		return obj;
	}

	/**
	 * 获取状态位
	 * @param result  结果 值 
	 * @param crtV    当前值
	 * @ return   Boolean  返回状态
	 */
	public static getState(result:number,crtV:number):boolean
	{
		var boo:boolean =false;
		if( (1<< crtV) & result)
		{
			boo = true;
		}
		return boo;
	}

	/**
	 * 将num 左移 bit位。
	 */
	public static push_bit(num:number,bit:number):number
	{
		return  num<<bit;
	}
	
}