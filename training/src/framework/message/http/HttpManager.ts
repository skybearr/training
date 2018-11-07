/**
 *
 * @author 
 *
 */
module fw {
    export class HttpManager extends egret.EventDispatcher {
        public constructor() {
            super();
        }

        private static instance: HttpManager;
        public static getInstance(): HttpManager {
            if (this.instance == null) {
                this.instance = new HttpManager();
            }
            return this.instance;
        }

        /**发送http请求
         * @param interf 接口编号
         * @param url   接口链接
         * @param headers 协议头
         * @param data 携带参数
         * @param method 请求类型 仅支持egret.HttpMethod.GET / egret.HttpMethod.POST
         */
        public sendRequest(interf: string, url: string, headers: Object[], data: any = null, method: string = "GET") {
            console.log("发送消息:", interf, url, data);

            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, method);
            for (let i = 0; i < headers.length; i++) {
                let o = headers[i];
                request.setRequestHeader(o['type'], o['value']);
            }

            

            request.once(egret.IOErrorEvent.IO_ERROR, (e: egret.Event) => {
                console.log("IOERROR:", interf, e.currentTarget);
                WxApi.getInstance().toast("HttpIOERROR:" + interf);
            }, this);

            request.once(egret.ProgressEvent.PROGRESS, (e: egret.Event) => { }, this);

            request.once(egret.Event.COMPLETE, (e: egret.Event) => {
                let response: any = JSON.parse((e.currentTarget as egret.HttpRequest).response);

                let code = response['code'];
                if (code != 200) {
                    console.log("请求--" + interf + "--失败，错误代码：" + response['code']);
                    WxApi.getInstance().toast("HttpFailed:" + interf + ",  code:" + code);
                }
                else {
                    console.log("收到消息:", interf, response);
                    let event = new HttpEvent(interf);
                    event.data = response.data;
                    HttpCommand.getInstance().dispatchEvent(event);
                }

            }, this);
            request.send(data);
        }

    }
}
