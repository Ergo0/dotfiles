PreferencesAsync={set:function(e,o){Preferences.set(e,o)},get:function(e,o,t){t(Preferences.get(e,o))}},Preferences=function(){var e={},o=function(e,o){var t=LPPlatform.getPreference(e);if(o=void 0===o?n[e]:o,void 0===t)return o;if(typeof t!=typeof n[e])switch(typeof n[e]){case"boolean":return"true"===t||1===parseInt(t);case"number":return t=-1===t.indexOf(".")?parseInt(t):parseFloat(t),isNaN(t)?o:t;case"object":return JSON.parse(t)}return t},t=function(e){switch(typeof e){case"object":return JSON.stringify(e);case"boolean":return e?1:0;default:return e.toString()}},r={logoffWhenCloseBrowser:!0,logoffWhenCloseBrowserVal:!0,showvault:!0,hideContextMenus:!0,notificationsBottom:!0,usepopupfill:!0,openloginstart:!0,storeLostOTP:!0,enablenamedpipes:!0,enablenewlogin:!0,htmlindialog:!0,language:!0,Icon:!0,generateHkKeyCode:!0,generateHkMods:!0,recheckHkKeyCode:!0,recheckHkMods:!0,searchHkKeyCode:!0,searchHkMods:!0,nextHkKeyCode:!0,nextHkMods:!0,prevHkKeyCode:!0,prevHkMods:!0,homeHkKeyCode:!0,homeHkMods:!0,openpopoverHkKeyCode:!0,openpopoverHkMods:!0,rememberpassword:!0,dialogSizePrefs:!0},n={logoffWhenCloseBrowser:!1,logoffWhenCloseBrowserVal:0,idleLogoffEnabled:!1,idleLogoffVal:"",openpref:"tabs",htmlindialog:!1,highlightFields:!0,automaticallyFill:!0,showvault:!1,showAcctsInGroups:!0,hideContextMenus:!1,defaultffid:"0",donotoverwritefilledfields:!1,showNotifications:!0,showGenerateNotifications:!1,showFormFillNotifications:!1,showSaveSiteNotifications:!1,notificationsBottom:!1,showNotificationsAfterClick:!1,showFillNotificationBar:!1,showSaveNotificationBar:!0,showChangeNotificationBar:!0,usepopupfill:!0,showmatchingbadge:!0,autoautoVal:25,warninsecureforms:!1,infieldPopupEnabled:!1,dontfillautocompleteoff:!1,pollServerVal:15,clearClipboardSecsVal:60,recentUsedCount:10,searchNotes:!0,openloginstart:!1,storeLostOTP:!0,enablenamedpipes:!0,enablenewlogin:!1,clearfilledfieldsonlogoff:!1,toplevelmatchingsites:!1,language:"",Icon:1,generate_length:12,generate_upper:!0,generate_lower:!0,generate_digits:!0,generate_special:!1,generate_mindigits:1,generate_ambig:!1,generate_reqevery:!0,generate_pronounceable:!1,generate_allcombos:!0,generate_advanced:!1,gridView:!0,compactView:!1,"seenVault4.0":!1,leftMenuMaximize:!0,disablepasswordmanagerasked:!0,rememberemail:!0,rememberpassword:!1,dialogSizePrefs:{},tempID:0,lastreprompttime:0,identity:"",alwayschooseprofilecc:!1,showIntroTutorial:!0};LPPlatform.adjustPreferenceDefaults(n),LPPlatform.isMac()?(n.generateHkKeyCode=0,n.generateHkMods="",n.recheckHkKeyCode=0,n.recheckHkMods="",n.searchHkKeyCode=76,n.searchHkMods="shift meta",n.nextHkKeyCode=33,n.nextHkMods="meta",n.prevHkKeyCode=34,n.prevHkMods="meta",n.homeHkKeyCode=0,n.homeHkMods="",n.openpopoverHkKeyCode=220,n.openpopoverHkMods="meta"):(n.generateHkKeyCode=71,n.generateHkMods="alt",n.recheckHkKeyCode=73,n.recheckHkMods="alt",n.searchHkKeyCode=87,n.searchHkMods="alt",n.nextHkKeyCode=33,n.nextHkMods="alt",n.prevHkKeyCode=34,n.prevHkMods="alt",n.homeHkKeyCode=72,n.homeHkMods="control alt",n.openpopoverHkKeyCode=220,n.openpopoverHkMods="alt");var a=function(o,t){LPPlatform.setUserPreference(o,t),r[o]&&LPPlatform.setGlobalPreference(o,t),(e[o]||[]).forEach(function(e){e(t)})};return{getDefault:function(e){switch(typeof e){case"object":var o={};for(var t in e)o[t]=n[t];return o;case"string":return n[e];default:return null}},get:function(e,t){switch(typeof e){case"object":var r={};for(var n in e)r[n]=o(n,t?t[n]:void 0);return r;case"string":return o(e,t);default:return null}},set:function(e,o){switch(typeof e){case"object":for(var r in e)a(r,t(e[r]));break;default:a(e,t(o))}LPPlatform.writePreferences()},addListener:function(o,t){var r=e[o]||[];r.push(t),e[o]=r},removeListener:function(o,t){var r=e[o]||[];e[o]=r.filter(function(e){return e!==t})}}}();
//# sourceMappingURL=sourcemaps/preferences.js.map