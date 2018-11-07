class InviteLogic extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: InviteLogic;
	public static getInstance(): InviteLogic {
		if (this._instance == null) {
			this._instance = new InviteLogic();
		}
		return this._instance;
	}


	private invites: InviteVO[];
	public initInvite() {
		this.invites = [];
		HttpCommand.getInstance().addEventListener(HttpEvent.getInvite, this.getInviteResponse, this, false, 1);
	}

	private getInviteResponse(e: HttpEvent) {
		this.invites = [];


		let str = GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_GET);
		let aaa = str == null ? [] : str.split("_");

		let arr: any[] = e.data;
		for (let i = 0; i < arr.length; i++) {
			let o = arr[i];
			let vo = new InviteVO();
			vo.avatarurl = o.avatarurl;
			vo.name = o.nickname;
			vo.uid = o.uid;
			vo.hasget = aaa.indexOf(vo.uid) != -1;
			vo.coinId1 = COINTYPE.HP;
			vo.num1 = DataBase.HP_ADD_INVITE;
			if (i % 5 == 4) {
				vo.num1 *= 2;
			}
			this.invites.push(vo);
		}
	}

	public getReward(uid: string) {
		for (let i = 0; i < this.invites.length; i++) {
			let vo = this.invites[i];
			if (vo.uid == uid) {
				vo.hasget = true;
				let str = GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_GET);
				if(str == null || str == ""){
					str = vo.uid;
				}
				else{
					str += ("_" + vo.uid);
				}
				GameLogic.getInstance().updateMyDataValue(MYDATA.INVITE_GET,str);
				PropLogic.getInstance().updateProp(vo.coinId1, vo.num1);
				return;
			}
		}
	}

	public getInvites(): InviteVO[] {
		return this.invites;
	}
}