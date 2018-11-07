module fw {
    export class SocketManager extends egret.EventDispatcher {
        public constructor() {

            super();
        }

        private static instance: SocketManager;
        public static getInstance(): SocketManager {
            if (this.instance == null) {
                this.instance = new SocketManager();

            }
            return this.instance;

        }
        private socket: egret.WebSocket;
        public isConnect: boolean = false;

        public initSocket(): void {
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.socketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);

            this.socket.connectByUrl("ws://10.0.0.225:8080/websocket");
        }

        private onReceiveMessage(e: egret.ProgressEvent): void {
            var byte: egret.ByteArray = new egret.ByteArray();
            byte.endian = egret.Endian.LITTLE_ENDIAN;
            this.socket.readBytes(byte);
            console.log("onReceiveMessage:", byte);
        }

        private onSocketOpen(e: egret.Event): void {
            this.isConnect = true;
            console.log("onSocketOpen:");

        }

        public sendMessage(byte: egret.ByteArray): void {
            console.log("sendMessage:");
            if (this.isConnect == true) {
                this.socket.type = egret.WebSocket.TYPE_BINARY;
                byte.position = 0;
                this.socket.writeBytes(byte, 0, byte.bytesAvailable);
                this.socket.flush();
            }
            else {

            }
        }

        public socketClose(e: egret.Event): void {
            this.isConnect = false;
        }

        public stopPingPong(): void {
            if (this.timer != null) {
                this.timer.reset();
            }
            if (this.timer1 != null) {
                this.timer1.reset();
            }
        }

        private timer: egret.Timer;
        private timer1: egret.Timer;
        private heartBool: boolean;
        private heartCount: number;
        private startPingPong(): void {
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
        }
        private t1_handler(e: egret.TimerEvent): void {
            if (this.heartBool) {
                this.heartCount = 0;
            }
            else {
                this.heartCount++;
            }
        }

        private sendping: number;
        //发送心跳
        private sendPingPong(e: egret.TimerEvent): void {
            if (this.heartBool) {
                this.sendping = new Date().getTime();
            }
            this.heartBool = false;
        }
        //收到心跳
        public pong(): void {
            this.heartBool = true;
            var ping: number = new Date().getTime() - this.sendping;
        }

        private onSocketError(e: egret.IOErrorEvent): void {
            console.log("onSocketError:", e);
        }
    }
}