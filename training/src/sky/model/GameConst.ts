class GameConst {
	public constructor() {
	}

	/**web测试 0微信  1web本地 */
	public static web:number = 1;

	public static version:string = "201808181130";

	public static GameStage:egret.Stage;




	public static localkey_missiondata:string = "localkey_missiondata";
}



enum INTERFACEAPI{
	TESTGET = 0,
	TESTPOST = 1,
}