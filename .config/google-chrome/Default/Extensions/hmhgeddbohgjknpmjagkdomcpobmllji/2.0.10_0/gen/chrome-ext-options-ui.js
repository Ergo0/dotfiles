if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'chrome-ext-options-ui'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'chrome-ext-options-ui'.");
}
if (typeof this['browser-ext-platform'] === 'undefined') {
  throw new Error("Error loading module 'chrome-ext-options-ui'. Its dependency 'browser-ext-platform' was not found. Please, check whether 'browser-ext-platform' is loaded prior to 'chrome-ext-options-ui'.");
}
if (typeof this['chrome-ext-options'] === 'undefined') {
  throw new Error("Error loading module 'chrome-ext-options-ui'. Its dependency 'chrome-ext-options' was not found. Please, check whether 'chrome-ext-options' is loaded prior to 'chrome-ext-options-ui'.");
}
this['chrome-ext-options-ui'] = function (_, Kotlin, $module$browser_ext_platform, $module$chrome_ext_options) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var browserConnection = $module$browser_ext_platform.com.jetbrains.browserConnection;
  var Settings = $module$chrome_ext_options.com.jetbrains.browserConnection.chrome.options.Settings;
  function main$lambda$lambda(it) {
    saveOptions();
    return false;
  }
  function main$lambda(it) {
    var tmp$;
    restoreOptions();
    (Kotlin.isType(tmp$ = document.getElementById('apply'), HTMLInputElement) ? tmp$ : throwCCE()).onclick = main$lambda$lambda;
    return Unit;
  }
  function main(args) {
    document.addEventListener('DOMContentLoaded', main$lambda);
  }
  function getInput(id) {
    var tmp$;
    return Kotlin.isType(tmp$ = document.getElementById(id), HTMLInputElement) ? tmp$ : throwCCE();
  }
  function getTextArea(id) {
    var tmp$;
    return Kotlin.isType(tmp$ = document.getElementById(id), HTMLTextAreaElement) ? tmp$ : throwCCE();
  }
  function nullifyValue(id, nullValue) {
    var value = getInput(id).value;
    return ensureNotNull(nullify(value, nullValue));
  }
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  function nullify(value, nullValue) {
    var tmp$;
    var trimmed = trim(Kotlin.isCharSequence(tmp$ = value) ? tmp$ : throwCCE()).toString();
    return trimmed.length === 0 ? nullValue : trimmed;
  }
  function saveOptions() {
    chrome.storage.local.set(new Settings(nullifyValue('host', browserConnection.DEFAULT_JB_HOST), nullifyValue('port', browserConnection.DEFAULT_JB_PORT), nullify(getTextArea('corsUrls').value, null), getInput('appendSourceUrl').checked));
  }
  function restoreOptions$lambda(it) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    getInput('host').value = (tmp$_0 = typeof (tmp$ = it['host']) === 'string' ? tmp$ : null) != null ? tmp$_0 : browserConnection.DEFAULT_JB_HOST;
    getInput('port').value = (tmp$_2 = typeof (tmp$_1 = it['port']) === 'string' ? tmp$_1 : null) != null ? tmp$_2 : browserConnection.DEFAULT_JB_PORT;
    getTextArea('corsUrls').value = (tmp$_4 = typeof (tmp$_3 = it['corsUrls']) === 'string' ? tmp$_3 : null) != null ? tmp$_4 : '';
    getInput('appendSourceUrl').checked = (tmp$_6 = typeof (tmp$_5 = it['corsUrls']) === 'boolean' ? tmp$_5 : null) != null ? tmp$_6 : true;
    return Unit;
  }
  function restoreOptions() {
    chrome.storage.local.get(restoreOptions$lambda);
  }
  var package$com = _.com || (_.com = {});
  var package$jetbrains = package$com.jetbrains || (package$com.jetbrains = {});
  var package$browserConnection = package$jetbrains.browserConnection || (package$jetbrains.browserConnection = {});
  var package$chrome = package$browserConnection.chrome || (package$browserConnection.chrome = {});
  var package$options = package$chrome.options || (package$chrome.options = {});
  package$options.main_kand9s$ = main;
  main([]);
  return _;
}(typeof this['chrome-ext-options-ui'] === 'undefined' ? {} : this['chrome-ext-options-ui'], kotlin, this['browser-ext-platform'], this['chrome-ext-options']);

//# sourceMappingURL=chrome-ext-options-ui.js.map
