//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            var _this = _super.call(this) || this;
            _this.createView();
            return _this;
        }
        LoadingUI.prototype.createView = function () {
            this.bg = GameUtil.getShape(GameConst.stageWidth, GameConst.stageHeight, 0x000000, 0.1);
            this.bg.touchEnabled = true;
            this.addChild(this.bg);
            this.tf_progress = GameUtil.createTextField(null, 300, GameConst.stageWidth, null, 480, 100);
            this.addChild(this.tf_progress);
        };
        LoadingUI.prototype.onProgress = function (current, total) {
            this.tf_progress.text = "Loading..." + current + "/" + total;
        };
        LoadingUI.prototype.setLoadType = function (type) {
            switch (type) {
                case fw.LOADINGTYPE.RESET:
                    return;
                case fw.LOADINGTYPE.CIRCLE:
                    if (this.img_circle == null) {
                        this.createCircle();
                    }
                    else {
                        this.img_circle.visible = true;
                    }
                    egret.Tween.get(this.img_circle, { loop: true }).to({ rotation: 360 }, 5000);
                    break;
                case fw.LOADINGTYPE.LOADING:
                    this.tf_progress.visible = true;
                    break;
            }
        };
        LoadingUI.prototype.reset = function () {
            this.tf_progress.visible = false;
            if (this.img_circle == null) {
                this.createCircle();
            }
            else {
                this.img_circle.visible = false;
                egret.Tween.removeTweens(this.img_circle);
            }
        };
        LoadingUI.prototype.createCircle = function () {
            this.img_circle = GameUtil.createBitmap("logo_png", null, null, GameConst.stageWidth, GameConst.stageHeight, 4, null, null);
            this.img_circle.anchorOffsetX = this.img_circle.width / 2;
            this.img_circle.anchorOffsetY = this.img_circle.height / 2;
            this.img_circle.x = GameConst.stageWidth / 2;
            this.img_circle.y = GameConst.stageHeight / 2;
            this.addChild(this.img_circle);
        };
        return LoadingUI;
    }(egret.Sprite));
    fw.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "fw.LoadingUI", ["RES.PromiseTaskReporter"]);
})(fw || (fw = {}));
//# sourceMappingURL=LoadingUI.js.map