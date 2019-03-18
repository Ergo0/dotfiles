if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'chrome-ext-options'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'chrome-ext-options'.");
}
if (typeof this['browser-ext-platform'] === 'undefined') {
  throw new Error("Error loading module 'chrome-ext-options'. Its dependency 'browser-ext-platform' was not found. Please, check whether 'browser-ext-platform' is loaded prior to 'chrome-ext-options'.");
}
this['chrome-ext-options'] = function (_, Kotlin, $module$browser_ext_platform) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var browserConnection = $module$browser_ext_platform.com.jetbrains.browserConnection;
  var Unit = Kotlin.kotlin.Unit;
  function Settings(host, port, corsUrl, appendSourceUrl) {
    this.host = host;
    this.port = port;
    this.corsUrl = corsUrl;
    this.appendSourceUrl = appendSourceUrl;
  }
  Settings.$metadata$ = {kind: Kind_CLASS, simpleName: 'Settings', interfaces: []};
  function getSettings$lambda(closure$callback) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
      if (it['host'] != null) {
        tmp$_3 = new Settings(typeof (tmp$ = it['host']) === 'string' ? tmp$ : throwCCE(), typeof (tmp$_0 = it['port']) === 'string' ? tmp$_0 : throwCCE(), (tmp$_1 = it['corsUrl']) == null || typeof tmp$_1 === 'string' ? tmp$_1 : throwCCE(), typeof (tmp$_2 = it['appendSourceUrl']) === 'boolean' ? tmp$_2 : throwCCE());
      }
       else
        tmp$_3 = new Settings(browserConnection.DEFAULT_JB_HOST, browserConnection.DEFAULT_JB_PORT, null, true);
      var settings = tmp$_3;
      closure$callback(settings);
      return Unit;
    };
  }
  function getSettings(callback) {
    chrome.storage.local.get(getSettings$lambda(callback));
  }
  var package$com = _.com || (_.com = {});
  var package$jetbrains = package$com.jetbrains || (package$com.jetbrains = {});
  var package$browserConnection = package$jetbrains.browserConnection || (package$jetbrains.browserConnection = {});
  var package$chrome = package$browserConnection.chrome || (package$browserConnection.chrome = {});
  var package$options = package$chrome.options || (package$chrome.options = {});
  package$options.Settings = Settings;
  package$options.getSettings_h4s2vd$ = getSettings;
  return _;
}(typeof this['chrome-ext-options'] === 'undefined' ? {} : this['chrome-ext-options'], kotlin, this['browser-ext-platform']);

//# sourceMappingURL=chrome-ext-options.js.map
