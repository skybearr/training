var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fw;
(function (fw) {
    var SocketManager = (function (_super) {
        __extends(SocketManager, _super);
        function SocketManager() {
            var _this = _super.call(this) || this;
            _this.isConnect = false;
            return _this;
        }
        SocketManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new SocketManager();
            }
            return this.instance;
        };
        SocketManager.prototype.initSocket = function () {
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.socketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.socket.connectByUrl("ws://10.0.0.225:8080/websocket");
        };
        SocketManager.prototype.onReceiveMessage = function (e) {
            var byte = new egret.ByteArray();
            byte.endian = egret.Endian.LITTLE_ENDIAN;
            this.socket.readBytes(byte);
            console.log("onReceiveMessage:", byte);
        };
        SocketManager.prototype.onSocketOpen = function (e) {
            this.isConnect = true;
            console.log("onSocketOpen:");
        };
        SocketManager.prototype.sendMessage = function (byte) {
            console.log("sendMessage:");
            if (this.isConnect == true) {
                this.socket.type = egret.WebSocket.TYPE_BINARY;
                byte.position = 0;
                this.socket.writeBytes(byte, 0, byte.bytesAvailable);
                this.socket.flush();
            }
            else {
            }
        };
        SocketManager.prototype.socketClose = function (e) {
            this.isConnect = false;
        };
        SocketManager.prototype.stopPingPong = function () {
            if (this.timer != null) {
                this.timer.reset();
            }
            if (this.timer1 != null) {
                this.timer1.reset();
            }
        };
        SocketManager.prototype.startPingPong = function () {
            if (this.timer == null) {
                this.timer = new egret.Timer(5000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.sendPingPong, this);
            }
            this.timer.start();
            this.heartCount = 0;
            if (this.timer1 == null) {
                this.timer1 = new egret.Timer(6000);
                this.timer1.addEventListener(egret.TimerEvent.TIMER, this.t1_handler, this);
            }
            this.timer1.start();
        };
        SocketManager.prototype.t1_handler = function (e) {
            if (this.heartBool) {
                this.heartCount = 0;
            }
            else {
                this.heartCount++;
            }
        };
        //发送心跳
        SocketManager.prototype.sendPingPong = function (e) {
            if (this.heartBool) {
                this.sendping = new Date().getTime();
            }
            this.heartBool = false;
        };
        //收到心跳
        SocketManager.prototype.pong = function () {
            this.heartBool = true;
            var ping = new Date().getTime() - this.sendping;
        };
        SocketManager.prototype.onSocketError = function (e) {
            console.log("onSocketError:", e);
        };
        return SocketManager;
    }(egret.EventDispatcher));
    fw.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "fw.SocketManager");
})(fw || (fw = {}));
//# sourceMappingURL=SocketManager.js.map