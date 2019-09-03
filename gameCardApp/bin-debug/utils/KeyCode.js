var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * keycode枚举
 * @author Maliu
 */
var KeyCode = (function () {
    function KeyCode() {
    }
    /* 主键盘区的数字 */
    KeyCode.KC_1 = 49;
    KeyCode.KC_2 = 50;
    KeyCode.KC_3 = 51;
    KeyCode.KC_4 = 52;
    KeyCode.KC_5 = 53;
    KeyCode.KC_6 = 54;
    KeyCode.KC_7 = 55;
    KeyCode.KC_8 = 56;
    KeyCode.KC_9 = 57;
    KeyCode.KC_0 = 48;
    /* 字母键 */
    KeyCode.KC_A = 65;
    KeyCode.KC_B = 66;
    KeyCode.KC_C = 67;
    KeyCode.KC_D = 68;
    KeyCode.KC_E = 69;
    KeyCode.KC_F = 70;
    KeyCode.KC_G = 71;
    KeyCode.KC_H = 72;
    KeyCode.KC_I = 73;
    KeyCode.KC_J = 74;
    KeyCode.KC_K = 75;
    KeyCode.KC_L = 76;
    KeyCode.KC_M = 77;
    KeyCode.KC_N = 78;
    KeyCode.KC_O = 79;
    KeyCode.KC_P = 80;
    KeyCode.KC_Q = 81;
    KeyCode.KC_R = 82;
    KeyCode.KC_S = 83;
    KeyCode.KC_T = 84;
    KeyCode.KC_U = 85;
    KeyCode.KC_V = 86;
    KeyCode.KC_W = 87;
    KeyCode.KC_X = 88;
    KeyCode.KC_Y = 89;
    KeyCode.KC_Z = 90;
    /* F功能区 */
    KeyCode.KC_F1 = 112;
    KeyCode.KC_F2 = 113;
    KeyCode.KC_F3 = 114;
    KeyCode.KC_F4 = 115;
    KeyCode.KC_F5 = 116;
    KeyCode.KC_F6 = 117;
    KeyCode.KC_F7 = 118;
    KeyCode.KC_F8 = 119;
    KeyCode.KC_F9 = 120;
    KeyCode.KC_F10 = 121;
    KeyCode.KC_F11 = 122;
    KeyCode.KC_F12 = 123;
    KeyCode.KC_F13 = 124;
    KeyCode.KC_F14 = 125;
    KeyCode.KC_F15 = 126;
    /* 数字小键盘区 */
    KeyCode.KC_NUMPAD_0 = 96;
    KeyCode.KC_NUMPAD_1 = 97;
    KeyCode.KC_NUMPAD_2 = 98;
    KeyCode.KC_NUMPAD_3 = 99;
    KeyCode.KC_NUMPAD_4 = 100;
    KeyCode.KC_NUMPAD_5 = 101;
    KeyCode.KC_NUMPAD_6 = 102;
    KeyCode.KC_NUMPAD_7 = 103;
    KeyCode.KC_NUMPAD_8 = 104;
    KeyCode.KC_NUMPAD_9 = 105;
    KeyCode.KC_NUMPAD_MULTIPLY = 106; //*
    KeyCode.KC_NUMPAD_ADD = 107; //+
    KeyCode.KC_NUMPAD_ENTER = 108; //enter
    KeyCode.KC_NUMPAD_SUBTRACT = 109; //-
    KeyCode.KC_NUMPAD_DECIMAL = 110; //.
    KeyCode.KC_NUMPAD_DIVIDE = 111; ///
    /* 主键盘功能键 */
    KeyCode.KC_BACKSPACE = 8; //backspace 退格键
    KeyCode.KC_TAB = 9; //tab 换行键
    KeyCode.KC_ENTER = 13; //main ENTER 回车键（主键盘区）
    KeyCode.KC_SHIFT = 16; //shift 
    KeyCode.KC_CONTROL = 17; //ctrl
    KeyCode.KC_ESCAPE = 27; //esc
    KeyCode.KC_SPACE = 32; //space 空格键
    KeyCode.KC_WINDOWS = 91; //windows
    KeyCode.KC_MENU = 93; //menu
    /* 三个锁定键 */
    KeyCode.KC_CAPS_LOCK = 20; //caps lock
    KeyCode.KC_NUM_LOCK = 144; //num lock
    KeyCode.KC_SCROLL_LOCK = 145; //scroll lock
    /* 功能键 */
    KeyCode.KC_PAUSE = 19; //pause / break
    KeyCode.KC_PAGE_UP = 33; //page up
    KeyCode.KC_PAGE_DOWN = 34; //page down
    KeyCode.KC_END = 35; //end
    KeyCode.KC_HOME = 36; //home
    KeyCode.KC_INSERT = 45; //insert
    KeyCode.KC_DELETE = 46; //delete
    /* 方向键 */
    KeyCode.KC_LEFT = 37; //left arrow
    KeyCode.KC_UP = 38; //up arrow
    KeyCode.KC_RIGHT = 39; //right arrow
    KeyCode.KC_DOWN = 40; //down arrow
    /* 标点符号 */
    KeyCode.KC_SEMICOLON_COLON = 186; //;:
    KeyCode.KC_EQUAL_PLUS = 187; //=+
    KeyCode.KC_MINUS_UNDERLINE = 189; //-_
    KeyCode.KC_SLASH_QUESTIONMARK = 191; // /?
    KeyCode.KC_SPECIALCOMMA_EARTHWORM = 192; //`~
    KeyCode.KC_LEFT_BRACKET_BRACE = 219; //[{
    KeyCode.KC_BACKSLASH_VERTICALBAR = 220; //\|
    KeyCode.KC_RIGHT_BRACKET_BRACE = 221; //]}
    KeyCode.KC_QUOTE = 222; //'"
    KeyCode.KC_COMMA = 188; //,<
    KeyCode.KC_PERIOD = 190; //.>
    return KeyCode;
}());
__reflect(KeyCode.prototype, "KeyCode");
//# sourceMappingURL=KeyCode.js.map