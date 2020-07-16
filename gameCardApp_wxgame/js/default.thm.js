var egret = window.egret;window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.visible = false;
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/components/RebornItemSkin.exml'] = window.RebornItemSkin = (function (_super) {
	__extends(RebornItemSkin, _super);
	function RebornItemSkin() {
		_super.call(this);
		this.skinParts = ["headIcon","titleImg","rebornCostLab","descLab"];
		
		this.height = 186;
		this.width = 136;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RebornItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.headIcon_i(),this.titleImg_i(),this._Image2_i(),this.rebornCostLab_i(),this.descLab_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "reborn_item_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.headIcon_i = function () {
		var t = new eui.Image();
		this.headIcon = t;
		t.horizontalCenter = 9;
		t.source = "reborn_1_png";
		t.top = 28;
		return t;
	};
	_proto.titleImg_i = function () {
		var t = new eui.Image();
		this.titleImg = t;
		t.bottom = 158;
		t.horizontalCenter = 0;
		t.source = "reborn_title_1_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 14.33;
		t.source = "main_gold_png";
		t.width = 23;
		t.x = 29;
		t.y = 159.97;
		return t;
	};
	_proto.rebornCostLab_i = function () {
		var t = new eui.Label();
		this.rebornCostLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 19;
		t.size = 18;
		t.text = "1111";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 50;
		t.x = 52.5;
		t.y = 157.97;
		return t;
	};
	_proto.descLab_i = function () {
		var t = new eui.Label();
		this.descLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 19;
		t.size = 18;
		t.text = "1111";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 120.5;
		t.x = 9;
		t.y = 120.5;
		return t;
	};
	return RebornItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/components/SkillItemSkin.exml'] = window.SkillItemSkin = (function (_super) {
	__extends(SkillItemSkin, _super);
	function SkillItemSkin() {
		_super.call(this);
		this.skinParts = ["skillIcon","skillTitle","rect","numLab","cdTime","cdGroup","itemGroup"];
		
		this.height = 72;
		this.width = 71;
		this.elementsContent = [this.itemGroup_i()];
	}
	var _proto = SkillItemSkin.prototype;

	_proto.itemGroup_i = function () {
		var t = new eui.Group();
		this.itemGroup = t;
		t.anchorOffsetX = 45;
		t.anchorOffsetY = 45;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 36;
		t.y = 36;
		t.elementsContent = [this._Image1_i(),this.skillIcon_i(),this.skillTitle_i(),this.rect_i(),this.numLab_i(),this.cdGroup_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "main_item_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.skillIcon_i = function () {
		var t = new eui.Image();
		this.skillIcon = t;
		t.source = "skill_101_png";
		t.x = 15;
		t.y = 15;
		return t;
	};
	_proto.skillTitle_i = function () {
		var t = new eui.Image();
		this.skillTitle = t;
		t.source = "skill_101_title_png";
		t.x = 28.5;
		t.y = 58;
		return t;
	};
	_proto.rect_i = function () {
		var t = new eui.Image();
		this.rect = t;
		t.pixelHitTest = false;
		t.scale9Grid = new egret.Rectangle(9,9,57,56);
		t.source = "common_xuanzhong_png";
		t.touchEnabled = false;
		t.x = 6.25;
		t.y = 8.75;
		return t;
	};
	_proto.numLab_i = function () {
		var t = new eui.Label();
		this.numLab = t;
		t.right = 16;
		t.size = 20;
		t.text = "10";
		t.textColor = 0xffffff;
		t.top = 15;
		t.touchEnabled = false;
		return t;
	};
	_proto.cdGroup_i = function () {
		var t = new eui.Group();
		this.cdGroup = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0.5;
		t.elementsContent = [this._Rect1_i(),this.cdTime_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.5;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.fillColor = 0x000000;
		t.height = 63.81;
		t.width = 67.12;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.cdTime_i = function () {
		var t = new eui.Label();
		this.cdTime = t;
		t.fontFamily = "yt";
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "60";
		t.verticalCenter = 0;
		return t;
	};
	return SkillItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/components/UpgradeItemSkin.exml'] = window.UpgradeItemSkin = (function (_super) {
	__extends(UpgradeItemSkin, _super);
	function UpgradeItemSkin() {
		_super.call(this);
		this.skinParts = ["skillIcon","skillTitle","atkLab","skillDesc","rebornBtn","costLab","redP","upgradeBtn","levelLab"];
		
		this.height = 105;
		this.width = 550;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this.skillTitle_i(),this._Image3_i(),this._Image4_i(),this.atkLab_i(),this.skillDesc_i(),this.rebornBtn_i(),this.upgradeBtn_i(),this.levelLab_i()];
	}
	var _proto = UpgradeItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "upgrade_item_png";
		t.width = 550;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 9.34;
		t.y = 8;
		t.elementsContent = [this._Image2_i(),this.skillIcon_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "main_item_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.skillIcon_i = function () {
		var t = new eui.Image();
		this.skillIcon = t;
		t.horizontalCenter = 0;
		t.source = "skill_101_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.skillTitle_i = function () {
		var t = new eui.Image();
		this.skillTitle = t;
		t.source = "skill_101_title_png";
		t.x = 36.66;
		t.y = 69;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "skill_bottom_png";
		t.x = 99;
		t.y = 16;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "atkFont_png";
		t.x = 107;
		t.y = 25;
		return t;
	};
	_proto.atkLab_i = function () {
		var t = new eui.Label();
		this.atkLab = t;
		t.fontFamily = "yt";
		t.size = 18;
		t.text = "10000";
		t.x = 153;
		t.y = 26;
		return t;
	};
	_proto.skillDesc_i = function () {
		var t = new eui.Label();
		this.skillDesc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33.33;
		t.size = 16;
		t.text = "连续攻击敌人可造成大量伤害";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 263.67;
		t.x = 102;
		t.y = 60;
		return t;
	};
	_proto.rebornBtn_i = function () {
		var t = new eui.Image();
		this.rebornBtn = t;
		t.source = "rebornBtn_png";
		t.x = 350;
		t.y = 17;
		return t;
	};
	_proto.upgradeBtn_i = function () {
		var t = new eui.Group();
		this.upgradeBtn = t;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.x = 447;
		t.y = 17;
		t.elementsContent = [this._Image5_i(),this.costLab_i(),this.redP_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "goldBtn_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.costLab_i = function () {
		var t = new eui.Label();
		this.costLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "yt";
		t.height = 22;
		t.size = 16;
		t.text = "100000";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 53;
		t.x = 29.5;
		t.y = 5;
		return t;
	};
	_proto.redP_i = function () {
		var t = new eui.Image();
		this.redP = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 17;
		t.source = "readp_png";
		t.visible = false;
		t.width = 17.74;
		t.x = 71;
		t.y = -4;
		return t;
	};
	_proto.levelLab_i = function () {
		var t = new eui.Label();
		this.levelLab = t;
		t.fontFamily = "yt";
		t.size = 18;
		t.text = "Lv.1";
		t.x = 239;
		t.y = 27;
		return t;
	};
	return UpgradeItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/components/VirtualJoystickSkin.exml'] = window.VirtualJoystickSkin = (function (_super) {
	__extends(VirtualJoystickSkin, _super);
	function VirtualJoystickSkin() {
		_super.call(this);
		this.skinParts = ["circle","ball"];
		
		this.height = 147;
		this.width = 147;
		this.elementsContent = [this.circle_i(),this.ball_i()];
	}
	var _proto = VirtualJoystickSkin.prototype;

	_proto.circle_i = function () {
		var t = new eui.Image();
		this.circle = t;
		t.source = "vitural_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.ball_i = function () {
		var t = new eui.Image();
		this.ball = t;
		t.source = "vitural_point_png";
		t.x = 54;
		t.y = 54;
		return t;
	};
	return VirtualJoystickSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameMainViewSkin.exml'] = window.GameMainViewSkin = (function (_super) {
	__extends(GameMainViewSkin, _super);
	function GameMainViewSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","pos1","pos2","blood","addGoldBtn","addGemBtn","goldLab","gemLab","itemGroup","settingBtn","countNumLab","levelNumLab","levelGroup","progressBar","progressMark","hpGroup","upgradeBtn","list","scroller","skillGroup","boxLab","awardBox","descLab","clickRect","upred","monImg","monGroup","bar","barMask","proTxt","skillUseGroup"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this.bgImg_i(),this._Image1_i(),this.pos1_i(),this.pos2_i(),this._Image2_i(),this.blood_i(),this.itemGroup_i(),this.settingBtn_i(),this.levelGroup_i(),this.hpGroup_i(),this.upgradeBtn_i(),this.skillGroup_i(),this.awardBox_i(),this.descLab_i(),this.clickRect_i(),this.upred_i(),this.monImg_i(),this.monGroup_i(),this.skillUseGroup_i()];
	}
	var _proto = GameMainViewSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.anchorOffsetY = 0;
		t.bottom = -140;
		t.left = 0;
		t.right = 0;
		t.source = "main_bg1_jpg";
		t.top = -227;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 53;
		t.left = 0;
		t.right = 0;
		t.source = "main_top_bg_png";
		t.top = 0;
		return t;
	};
	_proto.pos1_i = function () {
		var t = new eui.Rect();
		this.pos1 = t;
		t.alpha = 0;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 11;
		t.height = 20;
		t.width = 20;
		t.x = 1003.67;
		t.y = 201;
		return t;
	};
	_proto.pos2_i = function () {
		var t = new eui.Rect();
		this.pos2 = t;
		t.alpha = 0;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 11;
		t.height = 20;
		t.width = 20;
		t.x = 995.66;
		t.y = 575;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.right = 32;
		t.source = "main_area_line_png";
		t.verticalCenter = 17.5;
		return t;
	};
	_proto.blood_i = function () {
		var t = new eui.Image();
		this.blood = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 20;
		t.right = 73;
		t.rotation = 0.07;
		t.source = "blood_png";
		t.top = 51;
		t.touchEnabled = false;
		t.width = 143.01;
		return t;
	};
	_proto.itemGroup_i = function () {
		var t = new eui.Group();
		this.itemGroup = t;
		t.left = 8;
		t.top = -50;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.addGoldBtn_i(),this.addGemBtn_i(),this.goldLab_i(),this.gemLab_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "main_font_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "main_font_bg_png";
		t.visible = false;
		t.x = 245;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "main_gold_png";
		t.x = 9.12;
		t.y = 12.08;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "main_gem_png";
		t.visible = false;
		t.x = 255.64;
		t.y = 7.58;
		return t;
	};
	_proto.addGoldBtn_i = function () {
		var t = new eui.Image();
		this.addGoldBtn = t;
		t.source = "main_add_btn_png";
		t.x = 184.16;
		t.y = 2;
		return t;
	};
	_proto.addGemBtn_i = function () {
		var t = new eui.Image();
		this.addGemBtn = t;
		t.source = "main_add_btn_png";
		t.visible = false;
		t.x = 429;
		t.y = 2.48;
		return t;
	};
	_proto.goldLab_i = function () {
		var t = new eui.Label();
		this.goldLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36.06;
		t.size = 20;
		t.text = "11111";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 136.12;
		t.x = 48.55;
		t.y = 4;
		return t;
	};
	_proto.gemLab_i = function () {
		var t = new eui.Label();
		this.gemLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36.06;
		t.size = 20;
		t.text = "11111";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 134.61;
		t.x = 292.24;
		t.y = 6.42;
		return t;
	};
	_proto.settingBtn_i = function () {
		var t = new eui.Image();
		this.settingBtn = t;
		t.right = -30;
		t.source = "main_setting_btn_png";
		t.top = 10;
		return t;
	};
	_proto.levelGroup_i = function () {
		var t = new eui.Group();
		this.levelGroup = t;
		t.right = 108;
		t.top = -50;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.elementsContent = [this._Image7_i(),this.countNumLab_i(),this.levelNumLab_i(),this._Image8_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "main_font_count_png";
		t.x = 144;
		t.y = 0;
		return t;
	};
	_proto.countNumLab_i = function () {
		var t = new eui.Label();
		this.countNumLab = t;
		t.anchorOffsetX = 0;
		t.size = 20;
		t.text = "5/6";
		t.width = 52;
		t.x = 209.67;
		t.y = 4;
		return t;
	};
	_proto.levelNumLab_i = function () {
		var t = new eui.Label();
		this.levelNumLab = t;
		t.anchorOffsetX = 0;
		t.size = 20;
		t.text = "100";
		t.width = 52;
		t.x = 61.67;
		t.y = 5;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "main_font_level_png";
		t.x = 0;
		t.y = 0.58;
		return t;
	};
	_proto.hpGroup_i = function () {
		var t = new eui.Group();
		this.hpGroup = t;
		t.bottom = -60;
		t.right = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.elementsContent = [this._Image9_i(),this.progressBar_i(),this.progressMark_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "main_progressBg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.Image();
		this.progressBar = t;
		t.anchorOffsetX = 0;
		t.source = "main_progressBar_png";
		t.width = 277;
		t.x = 14;
		t.y = 27.5;
		return t;
	};
	_proto.progressMark_i = function () {
		var t = new eui.Rect();
		this.progressMark = t;
		t.anchorOffsetX = 277;
		t.anchorOffsetY = 0;
		t.height = 22;
		t.width = 277;
		t.x = 291;
		t.y = 26.5;
		return t;
	};
	_proto.upgradeBtn_i = function () {
		var t = new eui.Image();
		this.upgradeBtn = t;
		t.right = -80;
		t.source = "main_upgrade_btn_png";
		t.top = 62;
		return t;
	};
	_proto.skillGroup_i = function () {
		var t = new eui.Group();
		this.skillGroup = t;
		t.right = -120;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 37.5;
		t.elementsContent = [this._Image10_i(),this.scroller_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 447;
		t.scale9Grid = new egret.Rectangle(44,66,44,399);
		t.source = "main_skill_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 384;
		t.scrollPolicyH = "off";
		t.width = 87.88;
		t.x = 18.12;
		t.y = 31;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.width = 89.4;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	_proto.awardBox_i = function () {
		var t = new eui.Group();
		this.awardBox = t;
		t.left = -180;
		t.top = 62;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.touchThrough = false;
		t.elementsContent = [this._Image11_i(),this.boxLab_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "main_icon_award_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.boxLab_i = function () {
		var t = new eui.Label();
		this.boxLab = t;
		t.fontFamily = "yt";
		t.left = 71;
		t.size = 20;
		t.text = "Label";
		t.textColor = 0x00ff00;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.descLab_i = function () {
		var t = new eui.Label();
		this.descLab = t;
		t.horizontalCenter = 0;
		t.text = "点击战场召唤";
		t.textColor = 0xffffff;
		t.top = 81;
		return t;
	};
	_proto.clickRect_i = function () {
		var t = new eui.Rect();
		this.clickRect = t;
		t.alpha = 0;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 466.58;
		t.width = 929;
		t.x = 6;
		t.y = 174;
		return t;
	};
	_proto.upred_i = function () {
		var t = new eui.Image();
		this.upred = t;
		t.right = -100;
		t.source = "readp_png";
		t.top = 59;
		t.visible = false;
		return t;
	};
	_proto.monImg_i = function () {
		var t = new eui.Image();
		this.monImg = t;
		t.anchorOffsetY = 0;
		t.bottom = -140;
		t.left = 0;
		t.right = 0;
		t.source = "main_bg1_jpg";
		t.top = -227;
		return t;
	};
	_proto.monGroup_i = function () {
		var t = new eui.Group();
		this.monGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 434;
		t.width = 1126;
		t.x = 6;
		t.y = 204;
		return t;
	};
	_proto.skillUseGroup_i = function () {
		var t = new eui.Group();
		this.skillUseGroup = t;
		t.bottom = 20;
		t.horizontalCenter = 0;
		t.visible = false;
		t.elementsContent = [this._Image12_i(),this.bar_i(),this.barMask_i(),this.proTxt_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.source = "progress_bg2_png";
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto.bar_i = function () {
		var t = new eui.Image();
		this.bar = t;
		t.source = "progress_pro_png";
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto.barMask_i = function () {
		var t = new eui.Rect();
		this.barMask = t;
		t.height = 15;
		t.width = 300;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.proTxt_i = function () {
		var t = new eui.Label();
		this.proTxt = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "施法时间:10";
		t.textColor = 0xeae8e8;
		t.verticalCenter = 0;
		return t;
	};
	return GameMainViewSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GuideViewSkin.exml'] = window.GuideViewSkin = (function (_super) {
	__extends(GuideViewSkin, _super);
	function GuideViewSkin() {
		_super.call(this);
		this.skinParts = ["bg_left","bg_bottom","bg_top","bg_right","rect"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this.bg_left_i(),this.bg_bottom_i(),this.bg_top_i(),this.bg_right_i(),this.rect_i()];
	}
	var _proto = GuideViewSkin.prototype;

	_proto.bg_left_i = function () {
		var t = new eui.Rect();
		this.bg_left = t;
		t.alpha = 0.3;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 320;
		t.left = 0;
		t.top = 0;
		t.width = 456;
		return t;
	};
	_proto.bg_bottom_i = function () {
		var t = new eui.Rect();
		this.bg_bottom = t;
		t.alpha = 0.3;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 320;
		t.left = 0;
		t.width = 530.66;
		t.x = 10;
		return t;
	};
	_proto.bg_top_i = function () {
		var t = new eui.Rect();
		this.bg_top = t;
		t.alpha = 0.3;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 245.33;
		t.right = 0;
		t.top = 0;
		t.width = 681.33;
		return t;
	};
	_proto.bg_right_i = function () {
		var t = new eui.Rect();
		this.bg_right = t;
		t.alpha = 0.3;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 396;
		t.right = 0;
		t.width = 608;
		return t;
	};
	_proto.rect_i = function () {
		var t = new eui.Image();
		this.rect = t;
		t.pixelHitTest = false;
		t.scale9Grid = new egret.Rectangle(9,9,57,56);
		t.source = "common_xuanzhong_png";
		t.touchEnabled = true;
		t.x = 454.75;
		t.y = 246;
		return t;
	};
	return GuideViewSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/BattleResultPopUpSkin.exml'] = window.BattleResultPopUpSkin = (function (_super) {
	__extends(BattleResultPopUpSkin, _super);
	function BattleResultPopUpSkin() {
		_super.call(this);
		this.skinParts = ["resultImg","winIcon","resultImg2","timeLab","nextBtn","goldNumLab","rewardGroup","continueBtn","exitBtn"];
		
		this.currentState = "win";
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this._Image1_i(),this.winIcon_i(),this._Label1_i(),this.timeLab_i(),this.rewardGroup_i()];
		this.resultImg_i();
		
		this.resultImg2_i();
		
		this.nextBtn_i();
		
		this.continueBtn_i();
		
		this.exitBtn_i();
		
		this.states = [
			new eui.State ("win",
				[
					new eui.AddItems("resultImg","",2,"winIcon"),
					new eui.AddItems("nextBtn","",2,"rewardGroup"),
					new eui.SetProperty("winIcon","scaleX",0.7),
					new eui.SetProperty("winIcon","scaleY",0.7),
					new eui.SetProperty("winIcon","left",140),
					new eui.SetProperty("winIcon","verticalCenter",-33),
					new eui.SetProperty("_Label1","visible",false),
					new eui.SetProperty("timeLab","visible",false),
					new eui.SetProperty("goldNumLab","top",28),
					new eui.SetProperty("goldNumLab","x",154.5),
					new eui.SetProperty("_Label2","left",37),
					new eui.SetProperty("_Label2","top",27),
					new eui.SetProperty("_Label2","text","获得:"),
					new eui.SetProperty("_Image2","left",116),
					new eui.SetProperty("_Image2","top",32),
					new eui.SetProperty("rewardGroup","anchorOffsetX",0),
					new eui.SetProperty("rewardGroup","width",334),
					new eui.SetProperty("rewardGroup","anchorOffsetY",0),
					new eui.SetProperty("rewardGroup","height",83.12),
					new eui.SetProperty("rewardGroup","horizontalCenter",243),
					new eui.SetProperty("rewardGroup","top",268)
				])
			,
			new eui.State ("fail",
				[
					new eui.AddItems("resultImg2","",2,"_Label1"),
					new eui.AddItems("continueBtn","",1,""),
					new eui.AddItems("exitBtn","",1,""),
					new eui.SetProperty("winIcon","source","fail_icon_png"),
					new eui.SetProperty("winIcon","scaleX",0.7),
					new eui.SetProperty("winIcon","scaleY",0.7),
					new eui.SetProperty("winIcon","left",87),
					new eui.SetProperty("winIcon","verticalCenter",-27),
					new eui.SetProperty("resultImg2","source","fail_font_png"),
					new eui.SetProperty("resultImg2","x",638),
					new eui.SetProperty("resultImg2","y",96),
					new eui.SetProperty("_Label1","visible",false),
					new eui.SetProperty("timeLab","visible",false),
					new eui.SetProperty("goldNumLab","x",164),
					new eui.SetProperty("goldNumLab","y",16.66),
					new eui.SetProperty("_Label2","x",32),
					new eui.SetProperty("_Label2","y",16.66),
					new eui.SetProperty("_Label2","text","获得:"),
					new eui.SetProperty("_Image2","x",118),
					new eui.SetProperty("_Image2","y",21.66),
					new eui.SetProperty("rewardGroup","anchorOffsetX",0),
					new eui.SetProperty("rewardGroup","width",279.33),
					new eui.SetProperty("rewardGroup","anchorOffsetY",0),
					new eui.SetProperty("rewardGroup","height",60),
					new eui.SetProperty("rewardGroup","horizontalCenter",211.5),
					new eui.SetProperty("rewardGroup","top",282)
				])
		];
	}
	var _proto = BattleResultPopUpSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "result_bg_png";
		t.top = 0;
		return t;
	};
	_proto.resultImg_i = function () {
		var t = new eui.Image();
		this.resultImg = t;
		t.horizontalCenter = 202.5;
		t.source = "win_font_png";
		t.top = 96;
		return t;
	};
	_proto.winIcon_i = function () {
		var t = new eui.Image();
		this.winIcon = t;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "win_icon_png";
		return t;
	};
	_proto.resultImg2_i = function () {
		var t = new eui.Image();
		this.resultImg2 = t;
		t.horizontalCenter = 202;
		t.top = 96;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.left = 638;
		t.text = "时间:";
		t.top = 302;
		return t;
	};
	_proto.timeLab_i = function () {
		var t = new eui.Label();
		this.timeLab = t;
		t.anchorOffsetX = 0;
		t.left = 736;
		t.text = "8.55";
		t.textAlign = "left";
		t.top = 302;
		t.verticalAlign = "middle";
		t.width = 189;
		return t;
	};
	_proto.nextBtn_i = function () {
		var t = new eui.Image();
		this.nextBtn = t;
		t.source = "nextLevelBtn_png";
		t.x = 673;
		t.y = 416;
		return t;
	};
	_proto.rewardGroup_i = function () {
		var t = new eui.Group();
		this.rewardGroup = t;
		t.elementsContent = [this.goldNumLab_i(),this._Label2_i(),this._Image2_i()];
		return t;
	};
	_proto.goldNumLab_i = function () {
		var t = new eui.Label();
		this.goldNumLab = t;
		t.anchorOffsetX = 0;
		t.text = "1000";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 189;
		t.x = 147;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.text = "奖励:";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "prompt_gold_png";
		t.x = 98;
		t.y = 5;
		return t;
	};
	_proto.continueBtn_i = function () {
		var t = new eui.Image();
		this.continueBtn = t;
		t.source = "continueBtn_png";
		t.x = 530;
		t.y = 415;
		return t;
	};
	_proto.exitBtn_i = function () {
		var t = new eui.Image();
		this.exitBtn = t;
		t.source = "exitBtn_png";
		t.x = 831;
		t.y = 415;
		return t;
	};
	return BattleResultPopUpSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/CommonPtomptSkin.exml'] = window.CommonPtomptSkin = (function (_super) {
	__extends(CommonPtomptSkin, _super);
	function CommonPtomptSkin() {
		_super.call(this);
		this.skinParts = ["returnBtn","cancleBtn","sureBtn","tipGroup"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this._Rect1_i(),this.tipGroup_i()];
	}
	var _proto = CommonPtomptSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.tipGroup_i = function () {
		var t = new eui.Group();
		this.tipGroup = t;
		t.horizontalCenter = 0.5;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 0.5;
		t.elementsContent = [this._Image1_i(),this.returnBtn_i(),this._Label1_i(),this._Label2_i(),this._Image2_i(),this.cancleBtn_i(),this.sureBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "prompt_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.returnBtn_i = function () {
		var t = new eui.Image();
		this.returnBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33.33;
		t.source = "common_close_2_png";
		t.width = 33.33;
		t.x = 403.17;
		t.y = 15.83;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "yt";
		t.size = 20;
		t.text = "是否花费200";
		t.textColor = 0xd1cccc;
		t.x = 117.5;
		t.y = 110.5;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "yt";
		t.size = 20;
		t.text = "刷新技能";
		t.textColor = 0xD1CCCC;
		t.x = 268.5;
		t.y = 111.5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "prompt_gold_png";
		t.x = 230.5;
		t.y = 111.5;
		return t;
	};
	_proto.cancleBtn_i = function () {
		var t = new eui.Image();
		this.cancleBtn = t;
		t.source = "prompt_cancleBtn_png";
		t.x = 95.5;
		t.y = 205.5;
		return t;
	};
	_proto.sureBtn_i = function () {
		var t = new eui.Image();
		this.sureBtn = t;
		t.source = "prompt_sureBtn_png";
		t.x = 290.5;
		t.y = 205.5;
		return t;
	};
	return CommonPtomptSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/RebornPanelSkin.exml'] = window.RebornPanelSkin = (function (_super) {
	__extends(RebornPanelSkin, _super);
	function RebornPanelSkin() {
		_super.call(this);
		this.skinParts = ["rect","list","scroller","btnReturn","rebornGroup"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this.rect_i(),this.rebornGroup_i()];
	}
	var _proto = RebornPanelSkin.prototype;

	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.alpha = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.rebornGroup_i = function () {
		var t = new eui.Group();
		this.rebornGroup = t;
		t.anchorOffsetY = 0;
		t.height = 304.12;
		t.left = -500;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.scroller_i(),this.btnReturn_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(175,38,93,230);
		t.source = "reborn_panel_png";
		t.width = 456.24;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 219.7;
		t.scrollPolicyV = "off";
		t.width = 416.66;
		t.x = 19.04;
		t.y = 50.6;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.useVirtualLayout = false;
		t.width = 436.36;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "contentJustify";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.btnReturn_i = function () {
		var t = new eui.Image();
		this.btnReturn = t;
		t.source = "upgarde_close_png";
		t.x = 388;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "title_png";
		t.x = 170.01;
		t.y = 14.06;
		return t;
	};
	return RebornPanelSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/RebornTipPopUpSkin.exml'] = window.RebornTipPopUpSkin = (function (_super) {
	__extends(RebornTipPopUpSkin, _super);
	function RebornTipPopUpSkin() {
		_super.call(this);
		this.skinParts = ["returnBtn","cancleBtn","sureBtn","costLab","tipLab","content"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this._Rect1_i(),this.content_i()];
	}
	var _proto = RebornTipPopUpSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.content_i = function () {
		var t = new eui.Group();
		this.content = t;
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = -600;
		t.elementsContent = [this._Image1_i(),this.returnBtn_i(),this._Image2_i(),this.cancleBtn_i(),this.sureBtn_i(),this.costLab_i(),this.tipLab_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "prompt_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.returnBtn_i = function () {
		var t = new eui.Image();
		this.returnBtn = t;
		t.source = "common_close_2_png";
		t.x = 410.5;
		t.y = 17.5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "prompt_gold_png";
		t.x = 148.62;
		t.y = 133.5;
		return t;
	};
	_proto.cancleBtn_i = function () {
		var t = new eui.Image();
		this.cancleBtn = t;
		t.source = "prompt_cancleBtn_png";
		t.x = 72;
		t.y = 195.17;
		return t;
	};
	_proto.sureBtn_i = function () {
		var t = new eui.Image();
		this.sureBtn = t;
		t.source = "prompt_sureBtn_png";
		t.x = 316;
		t.y = 195.17;
		return t;
	};
	_proto.costLab_i = function () {
		var t = new eui.Label();
		this.costLab = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "yt";
		t.size = 20;
		t.text = "111111";
		t.textAlign = "center";
		t.width = 140.33;
		t.x = 185.5;
		t.y = 133.5;
		return t;
	};
	_proto.tipLab_i = function () {
		var t = new eui.Label();
		this.tipLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "yt";
		t.height = 49;
		t.size = 25;
		t.text = "是否消耗次金币转生";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 381;
		t.x = 50.5;
		t.y = 67.02;
		return t;
	};
	return RebornTipPopUpSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/ShopItemSkin.exml'] = window.ShopItemSkin = (function (_super) {
	__extends(ShopItemSkin, _super);
	function ShopItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","desc","icon_title","costLab","shopBtn"];
		
		this.height = 254;
		this.width = 174;
		this.elementsContent = [this._Image1_i(),this.icon_i(),this.desc_i(),this.icon_title_i(),this.shopBtn_i()];
	}
	var _proto = ShopItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "shopItemBg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = -21.5;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "yt";
		t.height = 43.33;
		t.size = 20;
		t.stroke = 1;
		t.text = "这里是一个描述";
		t.textAlign = "center";
		t.textColor = 0xe0ae62;
		t.verticalAlign = "middle";
		t.width = 153.34;
		t.x = 10.33;
		t.y = 152.33;
		return t;
	};
	_proto.icon_title_i = function () {
		var t = new eui.Image();
		this.icon_title = t;
		t.source = "";
		t.x = 44;
		t.y = 14;
		return t;
	};
	_proto.shopBtn_i = function () {
		var t = new eui.Group();
		this.shopBtn = t;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.x = 36.5;
		t.y = 206.67;
		t.elementsContent = [this._Image2_i(),this.costLab_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "shopBtn_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.costLab_i = function () {
		var t = new eui.Label();
		this.costLab = t;
		t.fontFamily = "yt";
		t.horizontalCenter = 0;
		t.size = 20;
		t.stroke = 1;
		t.text = "1元";
		t.textColor = 0xe0ae62;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return ShopItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/ShopPopUpSkin.exml'] = window.ShopPopUpSkin = (function (_super) {
	__extends(ShopPopUpSkin, _super);
	function ShopPopUpSkin() {
		_super.call(this);
		this.skinParts = ["rect","list","scroller","returnBtn","content"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this.rect_i(),this.content_i()];
	}
	var _proto = ShopPopUpSkin.prototype;

	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.content_i = function () {
		var t = new eui.Group();
		this.content = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = -600;
		t.elementsContent = [this._Image1_i(),this.scroller_i(),this.returnBtn_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "shopBg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 327.88;
		t.scrollPolicyV = "off";
		t.width = 1094.7;
		t.x = 85.33;
		t.y = 268.33;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetY = 0;
		t.height = 327.88;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 40;
		t.horizontalAlign = "left";
		t.paddingLeft = 30;
		t.paddingRight = 10;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.returnBtn_i = function () {
		var t = new eui.Image();
		this.returnBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48.83;
		t.source = "common_close_2_png";
		t.width = 48.83;
		t.x = 1158.54;
		t.y = 25.99;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "shopTitlte_png";
		t.top = 30;
		return t;
	};
	return ShopPopUpSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/StoryPopUpSkin.exml'] = window.StoryPopUpSkin = (function (_super) {
	__extends(StoryPopUpSkin, _super);
	function StoryPopUpSkin() {
		_super.call(this);
		this.skinParts = ["font","returnBtn","fontMask","content"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this._Rect1_i(),this.content_i()];
	}
	var _proto = StoryPopUpSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.content_i = function () {
		var t = new eui.Group();
		this.content = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = -600;
		t.elementsContent = [this._Image1_i(),this.font_i(),this.returnBtn_i(),this.fontMask_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(134,80,805,484);
		t.source = "story_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.font_i = function () {
		var t = new eui.Image();
		this.font = t;
		t.right = 228;
		t.source = "story_font_png";
		t.top = 63;
		return t;
	};
	_proto.returnBtn_i = function () {
		var t = new eui.Image();
		this.returnBtn = t;
		t.source = "common_close_png";
		t.x = 1017.56;
		t.y = 41.79;
		return t;
	};
	_proto.fontMask_i = function () {
		var t = new eui.Rect();
		this.fontMask = t;
		t.anchorOffsetX = 735;
		t.anchorOffsetY = 0;
		t.height = 549.61;
		t.right = 209;
		t.top = 42;
		t.width = 733.94;
		return t;
	};
	return StoryPopUpSkin;
})(eui.Skin);generateEUI.paths['resource/skins/popup/UpgradePopUpSkin.exml'] = window.UpgradePopUpSkin = (function (_super) {
	__extends(UpgradePopUpSkin, _super);
	function UpgradePopUpSkin() {
		_super.call(this);
		this.skinParts = ["rect","list","scroller","btnClose","upgradeGroup"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this.rect_i(),this.upgradeGroup_i()];
	}
	var _proto = UpgradePopUpSkin.prototype;

	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.upgradeGroup_i = function () {
		var t = new eui.Group();
		this.upgradeGroup = t;
		t.right = -500;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.scroller_i(),this.btnClose_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 616.18;
		t.scale9Grid = new egret.Rectangle(74,87,448,524);
		t.source = "upgrade_panel_png";
		t.x = 0;
		t.y = 2.67;
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 536;
		t.scrollPolicyH = "off";
		t.width = 552;
		t.x = 22;
		t.y = 37;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.useVirtualLayout = false;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Image();
		this.btnClose = t;
		t.source = "upgarde_close_png";
		t.x = 545;
		t.y = 0;
		return t;
	};
	return UpgradePopUpSkin;
})(eui.Skin);generateEUI.paths['resource/skins/SettingPopUpSkin.exml'] = window.SettingPopUpSkin = (function (_super) {
	__extends(SettingPopUpSkin, _super);
	function SettingPopUpSkin() {
		_super.call(this);
		this.skinParts = ["rect","exitBtn","continueBtn","btnClose","musicBar","musicBarMask","effectBar","effectBarMask","m_sound_control","e_sound_control","content"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this.rect_i(),this.content_i()];
	}
	var _proto = SettingPopUpSkin.prototype;

	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.alpha = 0.3;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.content_i = function () {
		var t = new eui.Group();
		this.content = t;
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.verticalCenter = -600;
		t.elementsContent = [this._Image1_i(),this.exitBtn_i(),this.continueBtn_i(),this.btnClose_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.musicBar_i(),this.musicBarMask_i(),this.effectBar_i(),this.effectBarMask_i(),this.m_sound_control_i(),this.e_sound_control_i(),this._Label1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "setting_panel_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.exitBtn_i = function () {
		var t = new eui.Image();
		this.exitBtn = t;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "exitBtn_png";
		t.x = 256;
		t.y = 193.2;
		return t;
	};
	_proto.continueBtn_i = function () {
		var t = new eui.Image();
		this.continueBtn = t;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "continueBtn_png";
		t.x = 44;
		t.y = 193.2;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Image();
		this.btnClose = t;
		t.source = "common_close_2_png";
		t.x = 406.5;
		t.y = 18.33;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "autio_title_png";
		t.x = 139.83;
		t.y = 129;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "effect_title_png";
		t.visible = false;
		t.x = 139.83;
		t.y = 189.83;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "audio_bar_bg_png";
		t.x = 186.5;
		t.y = 127.5;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "audio_bar_bg_png";
		t.visible = false;
		t.x = 186.5;
		t.y = 186.83;
		return t;
	};
	_proto.musicBar_i = function () {
		var t = new eui.Image();
		this.musicBar = t;
		t.source = "audio_bar_png";
		t.x = 187.16;
		t.y = 127.16;
		return t;
	};
	_proto.musicBarMask_i = function () {
		var t = new eui.Rect();
		this.musicBarMask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26;
		t.width = 139;
		t.x = 186.83;
		t.y = 124.5;
		return t;
	};
	_proto.effectBar_i = function () {
		var t = new eui.Image();
		this.effectBar = t;
		t.source = "audio_bar_png";
		t.visible = false;
		t.x = 186.5;
		t.y = 187.16;
		return t;
	};
	_proto.effectBarMask_i = function () {
		var t = new eui.Rect();
		this.effectBarMask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26;
		t.visible = false;
		t.width = 139;
		t.x = 186.16;
		t.y = 182.49;
		return t;
	};
	_proto.m_sound_control_i = function () {
		var t = new eui.Image();
		this.m_sound_control = t;
		t.anchorOffsetX = 12.93;
		t.anchorOffsetY = 13.39;
		t.height = 25.5;
		t.source = "audio_icon_png";
		t.width = 25;
		t.x = 327.76;
		t.y = 138.56;
		return t;
	};
	_proto.e_sound_control_i = function () {
		var t = new eui.Image();
		this.e_sound_control = t;
		t.anchorOffsetX = 13.17;
		t.anchorOffsetY = 13;
		t.height = 25.5;
		t.source = "audio_icon_png";
		t.visible = false;
		t.width = 25;
		t.x = 328;
		t.y = 195.66;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bottom = 14;
		t.horizontalCenter = 0.5;
		t.size = 20;
		t.text = "QQ邮箱:1446344217@qq.com";
		t.textColor = 0xbfb5b5;
		return t;
	};
	return SettingPopUpSkin;
})(eui.Skin);generateEUI.paths['resource/skins/StartGameViewSkin.exml'] = window.StartGameViewSkin = (function (_super) {
	__extends(StartGameViewSkin, _super);
	var StartGameViewSkin$Skin1 = 	(function (_super) {
		__extends(StartGameViewSkin$Skin1, _super);
		function StartGameViewSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","enter_down_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StartGameViewSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "enter_up_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			t.visible = false;
			return t;
		};
		return StartGameViewSkin$Skin1;
	})(eui.Skin);

	function StartGameViewSkin() {
		_super.call(this);
		this.skinParts = ["roleimg2","enterBtn","storyBtn"];
		
		this.height = 640;
		this.width = 1136;
		this.elementsContent = [this._Image1_i(),this.roleimg2_i(),this.enterBtn_i(),this.storyBtn_i(),this._Label1_i()];
	}
	var _proto = StartGameViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg_jpg";
		t.top = 0;
		return t;
	};
	_proto.roleimg2_i = function () {
		var t = new eui.Image();
		this.roleimg2 = t;
		t.anchorOffsetX = 1.52;
		t.anchorOffsetY = 0;
		t.height = 640;
		t.rotation = 360;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dragon_png";
		t.width = 1136;
		t.x = 1.52;
		t.y = 0;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.bottom = 108;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.skinName = StartGameViewSkin$Skin1;
		return t;
	};
	_proto.storyBtn_i = function () {
		var t = new eui.Image();
		this.storyBtn = t;
		t.right = 39;
		t.source = "storyBtn_png";
		t.top = 28;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.left = 12;
		t.size = 20;
		t.text = "v0.0.1";
		t.textColor = 0xeddada;
		t.top = 14;
		return t;
	};
	return StartGameViewSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TipsSkin.exml'] = window.TipsSkin = (function (_super) {
	__extends(TipsSkin, _super);
	function TipsSkin() {
		_super.call(this);
		this.skinParts = ["pic","lab"];
		
		this.height = 50;
		this.width = 70;
		this.elementsContent = [this.pic_i(),this.lab_i()];
	}
	var _proto = TipsSkin.prototype;

	_proto.pic_i = function () {
		var t = new eui.Image();
		this.pic = t;
		t.height = 50;
		t.horizontalCenter = 0.25;
		t.scale9Grid = new egret.Rectangle(188,18,23,23);
		t.source = "common_tips_bg_png";
		t.verticalCenter = 0.25;
		t.width = 70;
		return t;
	};
	_proto.lab_i = function () {
		var t = new eui.Label();
		this.lab = t;
		t.fontFamily = "yt";
		t.horizontalCenter = 0.25;
		t.size = 30;
		t.text = "Tips";
		t.textColor = 0xdfd1b5;
		t.touchEnabled = false;
		t.verticalCenter = -1.25;
		return t;
	};
	return TipsSkin;
})(eui.Skin);