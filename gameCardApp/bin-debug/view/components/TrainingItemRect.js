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
var TrainingItemRect = (function (_super) {
    __extends(TrainingItemRect, _super);
    function TrainingItemRect(offest, resPath, col, row, type, scaleX, dis) {
        if (resPath === void 0) { resPath = EFFECT + "pratice_soldier"; }
        if (col === void 0) { col = 2; }
        if (row === void 0) { row = 4; }
        if (type === void 0) { type = 1; }
        if (scaleX === void 0) { scaleX = 1; }
        if (dis === void 0) { dis = 40; }
        var _this = _super.call(this) || this;
        _this._resPath = EFFECT + "pratice_soldier";
        _this._col = 2;
        _this._row = 4;
        _this._interval = null;
        _this._col = col;
        _this._row = row;
        _this._offset = offest;
        _this._type = type;
        _this._resPath = resPath;
        _this._scaleX = scaleX;
        _this._dis = dis;
        return _this;
    }
    TrainingItemRect.prototype.childrenCreated = function () {
        this._entitys = [];
        this.soldierGroup = new eui.Group();
        this.addChild(this.soldierGroup);
        if (this._type == 1) {
            this.createTraining();
        }
        else {
            this.createReadRect();
        }
    };
    /**创建阅兵方阵 */
    TrainingItemRect.prototype.createReadRect = function () {
        for (var i = 0; i < this._col; i++) {
            for (var j = 0; j < this._row; j++) {
                var itemMc = new MovieClip();
                itemMc.scaleX = itemMc.scaleY = 0.9;
                itemMc.scaleX *= this._scaleX;
                this.soldierGroup.addChild(itemMc);
                itemMc.playFile(this._resPath, -1, null, false, "stand");
                itemMc.y = j * (itemMc.height * itemMc.scaleY + 35);
                itemMc.x = i * (itemMc.width * itemMc.scaleX + 35) + j * this._offset;
                this._entitys.push(itemMc);
            }
        }
        this.intervalDoAction(5000);
    };
    /**创建练兵方阵 */
    TrainingItemRect.prototype.createTraining = function () {
        for (var i = 0; i < this._col; i++) {
            for (var j = 0; j < this._row; j++) {
                var itemMc = new MovieClip();
                itemMc.scaleX = itemMc.scaleY = this._scaleX;
                this.soldierGroup.addChild(itemMc);
                itemMc.playFile(this._resPath, -1, null, false, "run");
                itemMc.y = j * (itemMc.height * itemMc.scaleY + this._dis);
                itemMc.x = i * (itemMc.width * itemMc.scaleX + this._dis) + j * this._offset;
                this._entitys.push(itemMc);
            }
        }
        // this.intervalDoAction(2000)
    };
    TrainingItemRect.prototype.intervalDoAction = function (time) {
        var self = this;
        this._interval = setInterval(function () {
            var _loop_1 = function (i) {
                var itemMc = self._entitys[i];
                itemMc.playFile(self._resPath, 1, null, false, "attack");
                var timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    itemMc.playFile(self._resPath, -1, null, false, "stand");
                }, 700);
            };
            for (var i = 0; i < self._entitys.length; i++) {
                _loop_1(i);
            }
        }, time);
    };
    TrainingItemRect.prototype.dispose = function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
    };
    return TrainingItemRect;
}(eui.Component));
__reflect(TrainingItemRect.prototype, "TrainingItemRect");
//# sourceMappingURL=TrainingItemRect.js.map