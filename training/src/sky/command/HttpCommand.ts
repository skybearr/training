/**
 *
 * @author 
 *
 */
class HttpCommand {
    public constructor() {
    }

    private static instance: HttpCommand;
    public static getInstance(): HttpCommand {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    }

    /** ---------------------游戏接口   ------------------------------- */

    private api: string = "http://httpbin.org/";

    /**测试 */
    public testGet() {
        let url = "http://122.152.202.220:8044/WXGAPI/GetUserData.ashx";
        let header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        let header1 = { type: "AppKey", value: "shuerte" };
        let data = {skybear:"1001:1;101;1:2:3:4"};
        this.sendRequest(INTERFACEAPI.TESTGET, url, [header,header1],data);
    }

    /**测试 */
    public testPost() {
        let url = this.api + "post";
        let header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        this.sendRequest(INTERFACEAPI.TESTPOST, url, [header],null,egret.HttpMethod.POST)
    }

    private sendRequest(interf: number, url: string, headers: Object[], data: any = null, method: string = "GET") {
        console.log("发送消息:", interf, url, headers, data);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, method);//isget ? egret.HttpMethod.GET : egret.HttpMethod.POST);
        for (let i = 0; i < headers.length; i++) {
            let o = headers[i];
            request.setRequestHeader(o['type'], o['value']);
        }


        request.once(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.once(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.once(egret.Event.COMPLETE, (e: egret.Event) => {
            let response: any = JSON.parse((e.currentTarget as egret.HttpRequest).response);
            console.log("收到消息:", interf, response);

            if (response['code'] != 200) {
                console.log("请求" + interf + "失败，错误代码：" + response['code']);
                return;
            }

            switch (interf) {
                case INTERFACEAPI.TESTGET:

                    break;
                case INTERFACEAPI.TESTPOST:

                    break;
            }
        }, this);
        request.send(data);
    }

    private onGetIOError(e: egret.Event): void {
        var request: egret.HttpRequest = (e.currentTarget as egret.HttpRequest).response;
        console.log("onGetIOError:", e);
    }

    private onGetProgress(e: egret.Event): void {

    }

}
