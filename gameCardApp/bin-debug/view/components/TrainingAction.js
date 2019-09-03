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
var TrainingAction = (function (_super) {
    __extends(TrainingAction, _super);
    function TrainingAction() {
        var _this = _super.call(this) || this;
        _this.trainRect = [];
        _this.rectNum = 10;
        _this.indexs = [0, 1, 4, 5, 6];
        _this.openState = false;
        _this.diction = 1;
        return _this;
    }
    TrainingAction.prototype.initialize = function (parent, parent2) {
        this._parent = parent;
        this._parent2 = parent2;
        this.trainRect = [];
        this.openState = true;
        this.startRun();
    };
    TrainingAction.prototype.startRun = function () {
        var w = StageUtils.ins().getWidth();
        var h = StageUtils.ins().getHeight();
        this.loopRect1(w, h);
        this.loopRect2(w, h);
    };
    TrainingAction.prototype.loopRect1 = function (w, h) {
        var _this = this;
        if (!this.openState) {
            return;
        }
        if (!this.group1) {
            this.group1 = new eui.Group();
            this._parent.addChild(this.group1);
        }
        if (!this.group2) {
            this.group2 = new eui.Group();
            this._parent.addChild(this.group2);
        }
        this.createWay1Rect(this.group1, 1);
        this.createWay1Rect(this.group2, -1);
        this._parent.top = 280;
        this.group1.x = w + 80;
        this.group2.x = -this.group2.width - 50;
        this.group2.y = 160;
        var offestX1 = (-(this.group1.width + 170));
        var offestX2 = (w + 170);
        egret.Tween.get(this.group1).to({ x: offestX1 }, 70000).call(function () {
            if (_this.group1) {
                egret.Tween.removeTweens(_this.group1);
                _this.group1.removeChildren();
            }
            for (var i = 0; i < _this.trainRect.length; i++) {
                var item = _this.trainRect[i];
                item.dispose();
            }
            _this.trainRect = [];
            if (_this.openState) {
                _this.loopRect1(w, h);
            }
        });
        egret.Tween.get(this.group2).to({ x: offestX2 }, 70000).call(function () {
            if (_this.group2) {
                egret.Tween.removeTweens(_this.group2);
                _this.group2.removeChildren();
            }
        });
    };
    TrainingAction.prototype.loopRect2 = function (w, h) {
        if (!this.openState) {
            return;
        }
        this.createWay2Rect();
        this._parent2.top = (this.diction % 2) ? (h - this._parent2.height - 70) : 220;
        this._parent2.x = (this.diction % 2) ? (-this._parent2.width - 100) : StageUtils.ins().getWidth() + 50;
        var offestX2 = (this.diction % 2) ? (w + 50) : (-(this._parent2.width + 50));
        var self = this;
        this._timeout = setTimeout(function () {
            clearTimeout(this._timeout);
            egret.Tween.get(self._parent2).to({ x: offestX2 }, 15000).call(function () {
                self.diction += 1;
                egret.Tween.removeTweens(self._parent2);
                self._parent2.removeChildren();
                self.loopRect2(w, h);
            });
        }, ((Math.random() * 2 + 3) >> 0) * 1000);
    };
    TrainingAction.prototype.createWay1Rect = function (parent, dic) {
        for (var i = 0; i < this.rectNum; i++) {
            var col = 4;
            var row = dic == 1 ? 4 : 3;
            var scale = (dic == 1) ? 0.8 : -0.8;
            var index = (Math.random() * this.indexs.length) >> 0;
            var id = this.indexs[index];
            var res = SOLDIER + "soldier_run_" + id;
            if (id == 3) {
                col = 1, row = 3, scale = 0.6;
            }
            // if(dic == 1){
            this.createTrainingItem({ x: (i * 380 + 50) }, -5, res, col, row, scale, parent, 45);
            // }else{
            // 	this.createTrainingItem({x:(i*300 + 50)},-5,res,col,row,scale,parent,85);
            // }
        }
    };
    TrainingAction.prototype.createWay2Rect = function () {
        for (var i = 0; i < this.rectNum; i++) {
            var col = 1;
            var row = 2;
            var scale = (this.diction % 2) ? -0.6 : 0.6;
            var index = (Math.random() * this.indexs.length) >> 0;
            var id = this.indexs[index];
            var res = SOLDIER + "soldier_run_2";
            this.createTrainingItem({ x: (i * 150 + 50) }, -5, res, col, row, scale, this._parent2, 80);
        }
    };
    TrainingAction.prototype.createTrainingItem = function (attr, offest, res, col, row, scale, p, dis) {
        if (col === void 0) { col = 2; }
        if (row === void 0) { row = 5; }
        if (scale === void 0) { scale = 0.9; }
        if (p === void 0) { p = null; }
        if (dis === void 0) { dis = 40; }
        var trainingItem = new TrainingItemRect(offest, res, col, row, 1, 1, dis);
        p.addChild(trainingItem);
        trainingItem.scaleX = trainingItem.scaleY = Math.abs(scale);
        if (scale < 0) {
            trainingItem.scaleX = -trainingItem.scaleX;
        }
        for (var key in attr) {
            trainingItem[key] = attr[key];
        }
        this.trainRect.push(trainingItem);
    };
    TrainingAction.prototype.clear = function () {
        egret.Tween.removeTweens(this._parent2);
        for (var i = 0; i < this.trainRect.length; i++) {
            var item = this.trainRect[i];
            item.dispose();
        }
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        this._parent.removeChildren();
        this._parent2.removeChildren();
        this.group1 = null;
        this.group2 = null;
        this.diction = 1;
        this.trainRect = [];
    };
    TrainingAction.prototype.dispose = function () {
        this.openState = false;
        this.clear();
    };
    return TrainingAction;
}(BaseClass));
__reflect(TrainingAction.prototype, "TrainingAction");
//# sourceMappingURL=TrainingAction.js.map