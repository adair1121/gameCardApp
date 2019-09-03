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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this._total = 25.8;
        _this.createView();
        return _this;
    }
    LoadingUI.inst = function () {
        if (!this._instance) {
            this._instance = new LoadingUI();
        }
        return this._instance;
    };
    LoadingUI.prototype.hide = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    LoadingUI.prototype.createView = function () {
        this.progressPanel = new eui.Group();
        this.addChild(this.progressPanel);
        this._w = (StageUtils.ins().getWidth() - 200);
        this.progressPanel.horizontalCenter = 0;
        this.progressPanel.left = 100;
        this.progressPanel.right = 100;
        this.progressPanel.bottom = 80;
        this.progressBg = new eui.Image();
        this.progressBg.source = "progress_bg_png";
        this.progressPanel.addChild(this.progressBg);
        this.progressBg.left = 0;
        this.progressBg.right = 0;
        this.progressBar = new eui.Image();
        this.progressBar.source = "progress_pro_png";
        this.progressBar.left = 0;
        this.progressBar.right = 0;
        this.progressPanel.addChild(this.progressBar);
        this._loadHorse = new MovieClip();
        this.progressPanel.addChild(this._loadHorse);
        this._loadHorse.playFile(EFFECT + "loading_horse", -1);
        this.progressMask = new eui.Rect;
        this.progressMask.height = 37;
        this.progressMask.width = 0;
        this.progressPanel.addChild(this.progressMask);
        this._loadHorse.y = this.progressMask.y;
        this._loadHorse.x = this.progressMask.x + this.progressMask.width;
        this.progressBar.mask = this.progressMask;
        this.textField = new eui.Label();
        this.progressPanel.addChild(this.textField);
        this.textField.fontFamily = "HuaWen KaiTi";
        this.textField.size = 20;
        this.textField.y = -35;
        this.textField.horizontalCenter = 0;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var cutsize = (current / total * this._total).toFixed(1);
        var w = (current / total) * this._w;
        if (w >= this._w) {
            w = this._w, cutsize = this._total.toString();
        }
        this.textField.text = "\u6B63\u5728\u52A0\u8F7D\u6E38\u620F\u8D44\u6E90...\u8BF7\u7A0D\u5019(" + current + "/" + total + ")-(" + cutsize + "MB/" + this._total + "MB)";
        this.progressMask.width = w;
        this._loadHorse.x = this.progressMask.width;
    };
    return LoadingUI;
}(eui.UILayer));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map