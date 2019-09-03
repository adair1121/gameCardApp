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
var AnswerPopUp = (function (_super) {
    __extends(AnswerPopUp, _super);
    function AnswerPopUp() {
        var _this = _super.call(this) || this;
        //游戏需要消耗的元宝数
        _this.singleCost = 200;
        //答题时间 秒为单位
        _this.countTime = 10;
        //回答正确的经验的奖励值
        _this.expRewardNum = 40;
        //答题的数量
        _this.totalCount = 3;
        _this.curAnswerCount = 1;
        _this.answerData = [];
        _this.count = 10;
        _this.selectIndex = -1;
        _this.correctNum = 0;
        _this.getExpNum = 0;
        _this._ifWild = false;
        _this.singleComState = false;
        _this.wildRewrd = { name: "", num: 0 };
        return _this;
    }
    AnswerPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param && param.length && param[0].isWild) {
            this.singleCost = 0;
            this.totalCount = 1;
            this.expRewardNum = 0;
            this._ifWild = param[0].isWild;
            this._cb = param[0].cb;
            this._arg = param[0].arg;
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        this.title.text = "\u95EE\u9898(" + this.curAnswerCount + "/" + this.totalCount + ")";
        this.costNumLab.text = this.singleCost.toString();
        this.addTouchEvent(this.startBtn, this.onStart, true);
        this.addTouchEvent(this.submitBtn, this.onSubmit, true);
        this.addTouchEvent(this.btnClose, this.onClose, true);
        this.timer = new egret.Timer(1000, this.countTime);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    AnswerPopUp.prototype.onTap = function (evt) {
        if (this.selectIndex != -1) {
            this["answer_" + this.selectIndex].selected = false;
        }
        switch (evt.target) {
            case this.rect_0:
                this.selectIndex = 0;
                break;
            case this.rect_1:
                this.selectIndex = 1;
                break;
            case this.rect_2:
                this.selectIndex = 2;
                break;
            case this.rect_3:
                this.selectIndex = 3;
                break;
        }
        if (this.selectIndex != -1) {
            this["answer_" + this.selectIndex].selected = true;
        }
    };
    AnswerPopUp.prototype.onStart = function () {
        var ownGoldNum = GameApp.ins().role_gold;
        if (ownGoldNum < this.singleCost) {
            UserTips.ins().showTips("元宝不足");
            return;
        }
        else {
            GameApp.ins().gold -= this.singleCost;
            this.skin.currentState = "answer";
            this.createAnswerData();
            this.refreshQuestion();
            this.timer.start();
            if (this._cb && this._arg) {
                this._cb.call(this._arg);
            }
        }
    };
    AnswerPopUp.prototype.onTimer = function (evt) {
        this.count -= 1;
        if (this.count <= 0) {
            this.count = 0;
        }
        this.countTimeLab.text = this.count + "s";
    };
    AnswerPopUp.prototype.onTimerCom = function (evt) {
        var _this = this;
        if (this.singleComState) {
            return;
        }
        this.singleComState = true;
        this.curAnswerCount += 1;
        this.timer.reset();
        this.timer.stop();
        if (this.curAnswerCount > this.totalCount) {
            //本次答题结束
            this.showResult(function () {
                _this.singleComState = false;
                _this.onClose();
                if (_this._ifWild) {
                    if (_this.wildRewrd.num <= 0) {
                        UserTips.ins().showTips("很遗憾,未获得奖励");
                    }
                    else {
                        UserTips.ins().showTips("\u83B7\u5F97<font color=0x00ff00>" + _this.wildRewrd.name + "</font>+" + _this.wildRewrd.num);
                    }
                }
                else {
                    UserTips.ins().showTips("本次答题结束,共答对" + _this.correctNum + "道题,获得经验x" + _this.getExpNum);
                }
            });
        }
        else {
            this.showResult(function () {
                _this.singleComState = false;
                _this.count = _this.countTime;
                _this.countTimeLab.text = _this.count + "s";
                _this.refreshQuestion();
                _this.timer.start();
            });
        }
        if (this.curAnswerCount > this.totalCount) {
            this.curAnswerCount = this.totalCount;
        }
        this.title.text = "\u95EE\u9898(" + this.curAnswerCount + "/" + this.totalCount + ")";
    };
    /**显示结果 */
    AnswerPopUp.prototype.showResult = function (cb) {
        var self = this;
        if (this.selectIndex == -1 || (this.selectIndex == this.correctIndex)) {
            //当前未选择
            if ((this.selectIndex == this.correctIndex)) {
                if (!this._ifWild) {
                    UserTips.ins().showTips("恭喜您获得经验x" + this.expRewardNum);
                }
                this.correctDeal();
            }
            this["answerLab_" + this.correctIndex].textColor = "0x00ff00";
            var timeout_1 = setTimeout(function () {
                clearTimeout(timeout_1);
                self["answerLab_" + self.correctIndex].textColor = "0x423C3C";
                cb();
            }, 1000);
        }
        else if (this.selectIndex != this.correctIndex) {
            this["answerLab_" + this.correctIndex].textColor = "0x00ff00";
            this["answerLab_" + this.selectIndex].textColor = "0xff0000";
            var timeout_2 = setTimeout(function () {
                clearTimeout(timeout_2);
                self["answerLab_" + self.correctIndex].textColor = "0x423C3C";
                self["answerLab_" + self.selectIndex].textColor = "0x423C3C";
                cb();
            }, 1000);
        }
    };
    /**刷新题 */
    AnswerPopUp.prototype.refreshQuestion = function () {
        this.selectIndex = -1;
        var obj = this.answerData.shift();
        this.answer.text = obj.question;
        for (var i = 0; i < obj.select.length; i++) {
            this["answerLab_" + i].text = obj.select[i];
            this["answerLab_" + i].textColor = 0xA8A3A3;
            this["answer_" + i].selected = false;
        }
        this.expRewardNum = (Math.random() * 40 + 40) >> 0;
        this.rewardStr.text = this.expRewardNum + "经验";
        this.correctIndex = obj.correct;
    };
    //创建题库数据
    AnswerPopUp.prototype.createAnswerData = function () {
        var answerData = GlobalConfig.QuestionCfg;
        for (var i = 0; i < this.totalCount; i++) {
            var len = Object.keys(answerData).length;
            var index = (Math.random() * len + 1) >> 0;
            var questionCfg = answerData[index];
            var obj = {};
            obj["question"] = questionCfg.question;
            obj["select"] = [questionCfg.select_0, questionCfg.select_1, questionCfg.select_2, questionCfg.select_3];
            obj["correct"] = questionCfg.answer;
            this.answerData.push(obj);
        }
    };
    AnswerPopUp.prototype.onSubmit = function () {
        if (this.selectIndex == -1) {
            UserTips.ins().showTips("请先选择再提交");
            return;
        }
        this.onTimerCom(null);
    };
    AnswerPopUp.prototype.onClose = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.ins().close(AnswerPopUp);
        }, this);
    };
    //回答正确后的判断
    AnswerPopUp.prototype.correctDeal = function () {
        // let curExp:number = GameApp.ins<GameApp>().curExp + this.expRewardNum;
        // if(curExp >= GameApp.ins<GameApp>().curLevelMaxExp){
        // 	GameApp.ins<GameApp>().exp = curExp - GameApp.ins<GameApp>().curLevelMaxExp;
        // 	//触发升级 。以下还需要刷新 GameApp.ins<GameApp>().Texp 出发升级相关功能  之后迭代
        // }else{
        if (!this._ifWild) {
            GameApp.ins().exp += this.expRewardNum;
            this.getExpNum += this.expRewardNum;
            this.correctNum += 1;
        }
        else {
            var resObj = GlobalFun.getResUrl();
            //最后一个为宝箱 所以length -1
            var index = (Math.random() * (resObj.resArr.length - 1)) >> 0;
            var itemnum = MapView.ins().refreshGoods(resObj.resArr[index], resObj.attrArr[index]["name"], 10, 15);
            this.wildRewrd.name = resObj.attrArr[index]["name"];
            this.wildRewrd.num = itemnum;
        }
    };
    AnswerPopUp.prototype.close = function () {
        this.removeTouchEvent(this.startBtn, this.onStart);
        this.removeTouchEvent(this.submitBtn, this.onSubmit);
        this.removeTouchEvent(this.btnClose, this.onClose);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return AnswerPopUp;
}(BaseEuiView));
__reflect(AnswerPopUp.prototype, "AnswerPopUp");
ViewManager.ins().reg(AnswerPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=AnswerPopUp.js.map