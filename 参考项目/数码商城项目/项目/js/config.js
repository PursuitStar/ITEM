/**
 * Created by Administrator on 2016/12/16.
 */
var Tm = Tm || {};
Tm.Config = {
    "chat": {
        "enabled": true,
        "rooms": [{"name": "support", "locales": {"en": "1"}}, {
            "name": "billing",
            "locales": {"en": "1"}
        }, {"name": "pre-sales", "locales": {"en": "1", "ru": "1", "de": "1"}}],
        "signInUrl": "http:\/\/chat.template-help.com\/connect.jsp",
        "blockedCountry": ["AS", "PW", "AM", "KP", "ST", "TL", "FM", "TJ", "TV", "BF", "MN", "KG", "VE", "KM", "DJ", "IR", "KE", "EG", "NP", "FJ", "ER", "WS", "VA", "LA", "CM", "RW", "WF", "TC", "BN", "BA", "BW", "AL", "GH", "MW", "PM", "SD", "VN", "SY", "ET", "LY", "KR", "BD", "VC", "TG", "BJ", "CI", "BT", "TN", "MD", "MM", "GI", "DZ", "PH", "ID", "MP", "TZ", "NR", "UZ", "VU", "KH", "AX", "CV", "AN", "CU", "PS", "RS", "MG", "SZ", "YE", "ME", "GW", "TD", "MH", "MK", "IO", "GQ", "SC", "KI", "NF", "GE", "SL", "UG"],
        "timers": {"autoOpenTimeout": 7, "autoCloseTimeout": 15, "autoCloseAfterManualOpenTimeout": 999}
    },
    "notifications": {"webSocketUrl": "https:\/\/ws.templatemonster.com\/"},
    "locales": [],
    "cookieDomain": ".templatemonster.com",
    "softcubeTrackingEnable": true
};