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
var SkilItem = (function (_super) {
    __extends(SkilItem, _super);
    function SkilItem() {
        var _this = _super.call(this) || this;
        _this._isCd = false;
        _this.skinName = "SkillItemSkin";
        return _this;
    }
    SkilItem.prototype.dataChanged = function () {
        this.rect.visible = false;
        this.numLab.visible = false;
        if (this.data.skillIcon) {
            this.skillIcon.source = this.data.skillIcon;
        }
        if (this.data.skillTitle) {
            this.skillTitle.source = this.data.skillTitle;
        }
        if (this.data.skillId) {
            this._skillId = this.data.skillId;
        }
        this.cdGroup.visible = false;
    };
    SkilItem.prototype.setCd = function () {
        if (this.data.cd == 0) {
            return;
        }
        this.touchEnabled = false;
        this.touchChildren = false;
        // let cdTime:number = this.data.cd;
        this.cdGroup.visible = true;
        this.cdTime.text = this.data.cd.toString();
        this.count = 0;
        var self = this;
        this._isCd = true;
        this.cdInterval = setInterval(function () {
            self.count += 1;
            self.cdTime.text = (self.data.cd - self.count).toString();
            if (self.count >= self.data.cd) {
                clearInterval(self.cdInterval);
                self._isCd = false;
                self.touchEnabled = true;
                self.count = 0;
                self.touchChildren = true;
                self.cdGroup.visible = false;
            }
        }, 1000);
    };
    /**技能cd暂停 */
    SkilItem.prototype.pauseCd = function () {
        if (this.cdInterval) {
            clearInterval(this.cdInterval);
            this.cdInterval = null;
        }
    };
    /**技能cd取消暂停 */
    SkilItem.prototype.canclePause = function () {
        if (this.data.cd && this.count < this.data.cd && !this.cdInterval) {
            var self_1 = this;
            this.cdInterval = setInterval(function () {
                self_1.count += 1;
                self_1.cdTime.text = (self_1.data.cd - self_1.count).toString();
                if (self_1.count >= self_1.data.cd) {
                    clearInterval(self_1.cdInterval);
                    self_1._isCd = false;
                    self_1.count = 0;
                    self_1.touchEnabled = true;
                    self_1.touchChildren = true;
                    self_1.cdGroup.visible = false;
                }
            }, 1000);
        }
    };
    /**技能cd移除 */
    SkilItem.prototype.removeCd = function () {
        if (this.cdInterval) {
            clearInterval(this.cdInterval);
        }
        this.cdGroup.visible = false;
        this.touchEnabled = true;
        this.touchChildren = true;
        this.count = 0;
        this._isCd = false;
        this.cdTime.text = "0";
    };
    SkilItem.prototype.dongyixia = function () {
        var _this = this;
        egret.Tween.get(this.itemGroup).to({ rotation: this.itemGroup.rotation - 5 }, 50).to({ rotation: this.itemGroup.rotation + 5 }, 50).to({ rotation: this.itemGroup.rotation - 5 }, 50).to({ rotation: this.itemGroup.rotation + 5 }, 50).call(function () {
            _this.itemGroup.rotation = 0;
            egret.Tween.removeTweens(_this.itemGroup);
        }, this);
    };
    Object.defineProperty(SkilItem.prototype, "num", {
        get: function () {
            return parseInt(this.numLab.text);
        },
        set: function (value) {
            this.numLab.visible = true;
            this.numLab.text = value.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkilItem.prototype, "isCd", {
        get: function () {
            return this._isCd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkilItem.prototype, "skillId", {
        get: function () {
            return this._skillId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkilItem.prototype, "focus", {
        set: function (value) {
            this.rect.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return SkilItem;
}(eui.ItemRenderer));
__reflect(SkilItem.prototype, "SkilItem");
//# sourceMappingURL=SkilItem.js.map