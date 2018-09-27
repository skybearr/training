class GameEvent extends egret.Event{
	public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }

    public data: any = null;

	public static REWARDAD_CLOSE_EVENT:string = "REWARDAD_CLOSE_EVENT";
}