var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var fw;
(function (fw) {
    var SoundManager = (function () {
        function SoundManager() {
            this.bg_position = 0;
            this.sound_switch = true;
            this.sound_effect_switch = false;
        }
        SoundManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new SoundManager();
            }
            return this.instance;
        };
        /**打开/关闭背景音乐*/
        SoundManager.prototype.playBgSound = function (b) {
            this.sound_switch = b;
            if (b) {
                if (this.bgSound == null) {
                    this.bgSound = RES.getRes("bgm_1_mp3");
                }
                if (this.bgChannel != null) {
                    this.bgChannel.stop();
                    this.bgChannel = null;
                }
                this.bgChannel = this.bgSound.play(this.bg_position, 0);
            }
            else {
                if (this.bgChannel != null) {
                    this.bg_position = this.bgChannel.position;
                    this.bgChannel.stop();
                    this.bgChannel = null;
                }
                else {
                    this.bg_position = 0;
                }
            }
        };
        SoundManager.prototype.hideSound = function (b) {
            if (b) {
                if (this.sound_switch) {
                    if (this.bgSound == null) {
                        this.bgSound = RES.getRes("bgm_1_mp3");
                    }
                    if (this.bgChannel != null) {
                        this.bgChannel.stop();
                        this.bgChannel = null;
                    }
                    this.bgChannel = this.bgSound.play(this.bg_position, 0);
                    this.bg_position = 0;
                }
            }
            else {
                if (this.bgChannel != null) {
                    this.bg_position = this.bgChannel.position;
                    this.bgChannel.stop();
                    this.bgChannel = null;
                }
                else {
                    this.bg_position = 0;
                }
            }
        };
        /**音效开关*/
        SoundManager.prototype.setSoundEffectSwitch = function (b) {
            this.sound_effect_switch = b;
        };
        /**播放音效*/
        SoundManager.prototype.playEffectSound = function (str) {
            if (str === void 0) { str = "sound_11_wav"; }
            console.log("playEffectSound:", this.sound_effect_switch);
            if (!this.sound_switch) {
                return;
            }
            var sound = RES.getRes(str);
            if (sound != null) {
                var channel = sound.play(0, 1);
                var obj = { s: sound, c: channel };
                var complete = function () {
                    this.c.stop();
                    this.c = null;
                    this.s = null;
                };
                channel.addEventListener(egret.Event.SOUND_COMPLETE, complete, obj);
            }
        };
        return SoundManager;
    }());
    fw.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "fw.SoundManager");
})(fw || (fw = {}));
//# sourceMappingURL=SoundManager.js.map