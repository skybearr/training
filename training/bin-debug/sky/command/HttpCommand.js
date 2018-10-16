var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var HttpCommand = (function () {
    function HttpCommand() {
        /** ---------------------游戏接口   ------------------------------- */
        this.api = "http://httpbin.org/";
    }
    HttpCommand.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    };
    /**测试 */
    HttpCommand.prototype.testGet = function () {
        var url = this.api + "get";
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        this.sendRequest(INTERFACEAPI.TESTGET, url, [header]);
    };
    /**测试 */
    HttpCommand.prototype.testPost = function () {
        var url = this.api + "post";
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        this.sendRequest(INTERFACEAPI.TESTPOST, url, [header], null, egret.HttpMethod.POST);
    };
    HttpCommand.prototype.sendRequest = function (interf, url, headers, data, method) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "GET"; }
        console.log("发送消息:", interf, url, headers, data);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, method); //isget ? egret.HttpMethod.GET : egret.HttpMethod.POST);
        for (var i = 0; i < headers.length; i++) {
            var o = headers[i];
            request.setRequestHeader(o['type'], o['value']);
        }
        request.once(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.once(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.once(egret.Event.COMPLETE, function (e) {
            var response = JSON.parse(e.currentTarget.response);
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
    };
    HttpCommand.prototype.onGetIOError = function (e) {
        var request = e.currentTarget.response;
        console.log("onGetIOError:", e);
    };
    HttpCommand.prototype.onGetProgress = function (e) {
    };
    return HttpCommand;
}());
__reflect(HttpCommand.prototype, "HttpCommand");
//# sourceMappingURL=HttpCommand.js.map