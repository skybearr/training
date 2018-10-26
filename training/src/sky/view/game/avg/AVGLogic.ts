/**
 *
 * @author 
 *
 */
class AVGLogic {
	public constructor() {
	}
	
    private static instance: AVGLogic;
    public static getInstance(): AVGLogic {
        if(this.instance == null) {
            this.instance = new AVGLogic();
        }
        return this.instance;
    }
    
    public static BEGIN_AVG:number = 0;
    public static OVER_AVG:number = 1;
    
    private avg_data_arr:AvgVO[];
    
    
    /**开始剧情*/
    public startAVG(id: number,type:number): void {
        // UIManager.getInstance().storyCon.addChild(new AvgMainUI(id,type));
    }
    
    public getAVGVOByID(id:number):AvgVO
    {
        return this.avg_data_arr[id-1];
    }
    
    /**初始化json数据*/
    public iniData():void
    {
        this.avg_data_arr = [];
        var arr = RES.getRes("avg_list_json");
        for(var i: number = 0;i < arr.length;i++) {
            var vo: AvgVO = new AvgVO();
            var o: Object = arr[i];
            vo.id = o['id'];
            vo.name = o['name'];
            vo.bg = o['bg'];
            vo.dialogs = this.getDialog(o['dialog']);
            this.avg_data_arr.push(vo);
        }
    }
    
    private getDialog(a:Object[]):AvgDialogVO[]
    {
        var arr:AvgDialogVO[] = [];
        for(var i:number=0;i<a.length;i++){
            var v:AvgDialogVO = new AvgDialogVO();
            var o: Object = a[i];
            v.head = o['head'];
            v.words = o['words'];
            v.bg = o['bg'];
            v.name = o['name'];
            v.is_left = o['pos'] == 0;
            arr.push(v);
        }
        return arr;
    }
}
