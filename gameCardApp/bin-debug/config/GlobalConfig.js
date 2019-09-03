var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalConfig = (function () {
    function GlobalConfig() {
    }
    GlobalConfig.setData = function (data) {
        this.config = data;
    };
    GlobalConfig.parserData = function () {
        if (this.init)
            return;
        if (!this.config)
            return;
        var _loop_1 = function (key) {
            var value = this_1.config[key];
            var objCls = egret.getDefinitionByName(key);
            if (objCls) {
                //用来存储配置一个默认实例
                var objKey_1 = "_obj" + key;
                this_1[objKey_1] = new objCls();
                //用来确认配置表是否已经设置 __proto__ 为 储存的实例（this[objKey])
                var boolKey_1 = "_bool" + key;
                this_1[boolKey_1] = false;
                //将真正的配置存放在this[newKey]中
                var newKey_1 = "_" + key + "_";
                //创建key引用配置
                Object.defineProperty(this_1, key, {
                    get: function () {
                        var obj = this[newKey_1];
                        if (this[boolKey_1])
                            return obj;
                        var proto = this[objKey_1];
                        this.parseKeys(obj, proto, GlobalConfig.keys[key] || 0);
                        this[boolKey_1] = true;
                        return obj;
                    },
                    set: function (val) {
                        this[newKey_1] = val;
                    }
                });
            }
            //赋值
            this_1[key] = value;
        };
        var this_1 = this;
        for (var key in this.config) {
            _loop_1(key);
        }
        //数据初始完毕
        this.init = true;
        this.config = null;
    };
    GlobalConfig.parseKeys = function (obj, proto, key) {
        if (key == 0) {
            obj.__proto__ = proto;
        }
        else {
            for (var i in obj) {
                this.parseKeys(obj[i], proto, key - 1);
            }
        }
    };
    GlobalConfig.keys = {
        "QuestionCfg": 1
    };
    return GlobalConfig;
}());
__reflect(GlobalConfig.prototype, "GlobalConfig");
//# sourceMappingURL=GlobalConfig.js.map