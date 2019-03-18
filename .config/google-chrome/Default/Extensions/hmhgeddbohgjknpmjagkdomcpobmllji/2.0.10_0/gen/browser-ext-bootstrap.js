if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'browser-ext-bootstrap'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'browser-ext-bootstrap'.");
}
if (typeof this['browser-ext-platform'] === 'undefined') {
  throw new Error("Error loading module 'browser-ext-bootstrap'. Its dependency 'browser-ext-platform' was not found. Please, check whether 'browser-ext-platform' is loaded prior to 'browser-ext-bootstrap'.");
}
if (typeof this['jb-chrome-ext-api'] === 'undefined') {
  throw new Error("Error loading module 'browser-ext-bootstrap'. Its dependency 'jb-chrome-ext-api' was not found. Please, check whether 'jb-chrome-ext-api' is loaded prior to 'browser-ext-bootstrap'.");
}
if (typeof this['chrome-ext-options'] === 'undefined') {
  throw new Error("Error loading module 'browser-ext-bootstrap'. Its dependency 'chrome-ext-options' was not found. Please, check whether 'chrome-ext-options' is loaded prior to 'browser-ext-bootstrap'.");
}
if (typeof this['chrome-ext'] === 'undefined') {
  throw new Error("Error loading module 'browser-ext-bootstrap'. Its dependency 'chrome-ext' was not found. Please, check whether 'chrome-ext' is loaded prior to 'browser-ext-bootstrap'.");
}
this['browser-ext-bootstrap'] = function (_, Kotlin, $module$browser_ext_platform, $module$jb_chrome_ext_api, $module$chrome_ext_options, $module$chrome_ext) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var getLogger = $module$browser_ext_platform.org.jetbrains.logging.getLogger_61zpoe$;
  var disable = chrome.browserAction.disable;
  var equals = Kotlin.equals;
  var Unit = Kotlin.kotlin.Unit;
  var newDisposable = $module$browser_ext_platform.org.jetbrains.util.newDisposable;
  var storageLocalChanged = $module$jb_chrome_ext_api.org.jetbrains.chrome.storageLocalChanged_6rodtz$;
  var getSettings = $module$chrome_ext_options.com.jetbrains.browserConnection.chrome.options.getSettings_h4s2vd$;
  var Throwable = Error;
  var setTimeout = $module$browser_ext_platform.org.jetbrains.util.setTimeout_n53o35$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var toShort = Kotlin.toShort;
  var BuildInfo = $module$browser_ext_platform.com.jetbrains.browserConnection.BuildInfo;
  var connect = $module$chrome_ext.com.jetbrains.browserConnection.chrome.connect;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;
  var jsSplit = $module$browser_ext_platform.org.jetbrains.util.jsSplit_ofwppt$;
  var get_asParsedUrl = $module$browser_ext_platform.org.jetbrains.io.get_asParsedUrl_pdl1vz$;
  var get = chrome.tabs.get;
  var webRequestBeforeSendHeaders = $module$jb_chrome_ext_api.org.jetbrains.chrome.webRequestBeforeSendHeaders_uibj4l$;
  var webRequestHeadersReceived = $module$jb_chrome_ext_api.org.jetbrains.chrome.webRequestHeadersReceived_9bs5gk$;
  var webRequestCompleted = $module$jb_chrome_ext_api.org.jetbrains.chrome.webRequestCompleted_ql7z06$;
  var webRequestErrorOccurred = $module$jb_chrome_ext_api.org.jetbrains.chrome.webRequestErrorOccurred_3509xg$;
  var handlerBehaviorChanged = chrome.webRequest.handlerBehaviorChanged;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_us0mfu$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var LOG;
  function main(args) {
    disable();
    loadSettingsAndConnect();
  }
  var lastHost;
  var lastPort;
  var lastAppendSourceUrl;
  var localChangedListenerRegistered;
  var connectedDisposable;
  function loadSettingsAndConnect$lambda$lambda(closure$connectDisposable) {
    return function (f, f_0) {
      closure$connectDisposable.disposeTree();
      return Unit;
    };
  }
  function loadSettingsAndConnect$lambda$lambda_0(f, f_0) {
    loadSettingsAndConnect();
    return Unit;
  }
  function loadSettingsAndConnect$lambda(it) {
    if (!equals(it.host, lastHost) || !equals(it.port, lastPort)) {
      lastHost = it.host;
      lastPort = it.port;
      lastAppendSourceUrl = it.appendSourceUrl;
      connectedDisposable != null ? (connectedDisposable.disposeTree(), Unit) : null;
      var connectDisposable = newDisposable();
      connect_0(equals(it.host, 'localhost') ? '127.0.0.1' : it.host, it.port, connectDisposable, lastAppendSourceUrl);
      storageLocalChanged(connectDisposable, loadSettingsAndConnect$lambda$lambda(connectDisposable));
      if (!localChangedListenerRegistered) {
        localChangedListenerRegistered = true;
        storageLocalChanged(void 0, loadSettingsAndConnect$lambda$lambda_0);
      }
    }
    applyCors(it);
    return Unit;
  }
  function loadSettingsAndConnect() {
    getSettings(loadSettingsAndConnect$lambda);
  }
  function connect$lambda(closure$request) {
    return function () {
      closure$request.abort();
      return Unit;
    };
  }
  function connect$scheduleSendAttempt$lambda(closure$scheduleSendAttempt) {
    return function () {
      closure$scheduleSendAttempt(true);
      return Unit;
    };
  }
  function connect$scheduleSendAttempt$lambda_0(closure$reconnectTimer) {
    return function () {
      if (closure$reconnectTimer.v != null) {
        ensureNotNull(closure$reconnectTimer.v).stop();
        closure$reconnectTimer.v = null;
      }
      return Unit;
    };
  }
  function connect$scheduleSendAttempt(closure$request, closure$url, closure$reconnectTimer, closure$disposable, closure$attemptsCount) {
    return function closure$scheduleSendAttempt(immediately) {
      var tmp$;
      if (immediately) {
        try {
          closure$request.open('GET', closure$url.v, true);
          closure$request.send();
        }
         catch (e) {
          if (Kotlin.isType(e, Throwable)) {
            LOG.error_tcv7n7$(e);
            closure$scheduleSendAttempt(false);
          }
           else
            throw e;
        }
        return;
      }
      closure$request.abort();
      if (closure$reconnectTimer.v == null) {
        closure$reconnectTimer.v = setTimeout(5000, connect$scheduleSendAttempt$lambda(closure$scheduleSendAttempt));
        closure$disposable.register_o14v8n$(connect$scheduleSendAttempt$lambda_0(closure$reconnectTimer));
      }
       else {
        if (closure$attemptsCount.v === 50) {
          ensureNotNull(closure$reconnectTimer.v).delay = 10000;
        }
         else if (closure$attemptsCount.v < 100) {
          tmp$ = closure$attemptsCount.v;
          closure$attemptsCount.v = tmp$ + 1 | 0;
        }
        ensureNotNull(closure$reconnectTimer.v).start();
      }
    };
  }
  function connect$lambda$lambda$lambda(closure$ideLogName) {
    return function () {
      LOG.info_61zpoe$('System disconnected from ' + closure$ideLogName);
      lastHost = null;
      lastPort = null;
      loadSettingsAndConnect();
      return Unit;
    };
  }
  function connect$lambda$lambda(closure$ideLogName, closure$currentConnectedDisposable) {
    return function () {
      LOG.info_61zpoe$('System connected to ' + closure$ideLogName);
      closure$currentConnectedDisposable.register_o14v8n$(connect$lambda$lambda$lambda(closure$ideLogName));
      return Unit;
    };
  }
  function connect$lambda_0(closure$request, closure$attemptsCount, closure$disposable, closure$tryIdea120x, closure$host, closure$port, closure$appendSourceUrl, closure$url, closure$scheduleSendAttempt) {
    return function (it) {
      if (closure$request.status === toShort(200)) {
        closure$attemptsCount.v = 0;
        var responseText = closure$request.responseText;
        closure$disposable.disposeTree();
        var currentConnectedDisposable = newDisposable();
        connectedDisposable = currentConnectedDisposable;
        var buildInfo = closure$tryIdea120x.v ? new BuildInfo('123.0', null, 0, -1) : JSON.parse(responseText);
        var ideLogName = buildInfo.name + ' (' + closure$host + ':' + closure$port + ')';
        connect(buildInfo, closure$host, closure$port, connect$lambda$lambda(ideLogName, currentConnectedDisposable), currentConnectedDisposable, closure$appendSourceUrl);
      }
       else if (closure$request.status === toShort(404)) {
        closure$attemptsCount.v = 0;
        if (closure$tryIdea120x.v) {
          LOG.info_61zpoe$(closure$host + ':' + closure$port + ' returns 404, JavaScript Debugger plugin is not installed, skip host');
        }
         else {
          LOG.info_61zpoe$(closure$host + ':' + closure$port + ' returns 404, may be it is IntelliJ Idea 12.0.x?');
          closure$url.v = 'http://' + closure$host + ':' + closure$port + '/startTime';
          closure$tryIdea120x.v = true;
          closure$scheduleSendAttempt(false);
        }
      }
       else {
        LOG.info_61zpoe$(closure$host + ':' + closure$port + ' returns ' + closure$request.status);
        closure$scheduleSendAttempt(false);
      }
      return Unit;
    };
  }
  function connect_0(host, port, disposable, appendSourceUrl) {
    var request = new XMLHttpRequest();
    disposable.register_o14v8n$(connect$lambda(request));
    var url = {v: 'http://' + host + ':' + port + '/browserConnection/buildInfo'};
    var attemptsCount = {v: 0};
    var tryIdea120x = {v: false};
    var reconnectTimer = {v: null};
    var scheduleSendAttempt = connect$scheduleSendAttempt(request, url, reconnectTimer, disposable, attemptsCount);
    request.onloadend = connect$lambda_0(request, attemptsCount, disposable, tryIdea120x, host, port, appendSourceUrl, url, scheduleSendAttempt);
    scheduleSendAttempt(true);
  }
  var corsPatternsSeparator;
  var allowMaxAge;
  var allowMethods;
  var allowCredentials;
  var allowHeaders;
  var lastCorsUrlPatterns;
  var corsFilterDisposable;
  var requestIdToOriginUrl;
  function applyCors$lambda$lambda(closure$requestId) {
    return function (it) {
      var tmp$;
      var url = (tmp$ = it.url) != null ? get_asParsedUrl(tmp$) : null;
      if (url != null) {
        requestIdToOriginUrl.put_xwzc9p$(closure$requestId, url.scheme + '://' + url.authority);
      }
      return Unit;
    };
  }
  function applyCors$lambda(it) {
    if (!equals(it.tabId, -1)) {
      var requestId = it.requestId;
      get(it.tabId, applyCors$lambda$lambda(requestId));
    }
    return Unit;
  }
  function applyCors$lambda_0(it) {
    return addAllowAnyOrigin(it, equals(it.tabId, -1) ? null : requestIdToOriginUrl.get_11rb$(it.requestId));
  }
  function applyCors$lambda_1(it) {
    if (!equals(it.tabId, -1)) {
      requestIdToOriginUrl.remove_11rb$(it.requestId);
    }
    return Unit;
  }
  function applyCors(settings) {
    var corsUrls = settings.corsUrl;
    if (corsUrls != null) {
      var urlPatterns = jsSplit(corsUrls, corsPatternsSeparator);
      var changed = false;
      var last = lastCorsUrlPatterns;
      if (last != null) {
        if (equals(last, urlPatterns)) {
          return;
        }
        changed = true;
        lastCorsUrlPatterns = urlPatterns;
        corsFilterDisposable != null ? (corsFilterDisposable.disposeTree(), Unit) : null;
        requestIdToOriginUrl.clear();
      }
      corsFilterDisposable = newDisposable();
      var obj = {};
      obj.types = ['xmlhttprequest'];
      obj.urls = urlPatterns;
      var filter = obj;
      webRequestBeforeSendHeaders(corsFilterDisposable, filter, void 0, applyCors$lambda);
      webRequestHeadersReceived(corsFilterDisposable, filter, true, applyCors$lambda_0);
      var clearRequestToOriginUrlEntry = applyCors$lambda_1;
      webRequestCompleted(corsFilterDisposable, filter, clearRequestToOriginUrlEntry);
      webRequestErrorOccurred(corsFilterDisposable, filter, clearRequestToOriginUrlEntry);
      if (changed) {
        handlerBehaviorChanged();
      }
    }
     else if (lastCorsUrlPatterns != null) {
      lastCorsUrlPatterns = null;
      corsFilterDisposable != null ? (corsFilterDisposable.disposeTree(), Unit) : null;
      corsFilterDisposable = null;
      requestIdToOriginUrl.clear();
      handlerBehaviorChanged();
    }
  }
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function addAllowAnyOrigin(data, requestorUrlWithoutPath) {
    var tmp$, tmp$_0;
    var allowValue = requestorUrlWithoutPath == null ? '*' : requestorUrlWithoutPath;
    if (requestorUrlWithoutPath != null && startsWith(data.url, requestorUrlWithoutPath) && (data.url.length === requestorUrlWithoutPath.length || data.url.charCodeAt(requestorUrlWithoutPath.length) === 47)) {
      return null;
    }
    if (data.responseHeaders == null) {
      var obj = {};
      obj.responseHeaders = [new HttpHeaderImpl('Access-Control-Allow-Origin', allowValue), allowHeaders, allowCredentials, allowMethods, allowMaxAge];
      return obj;
    }
    var responseHeaders = {v: data.responseHeaders};
    tmp$ = ensureNotNull(responseHeaders.v);
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var header = tmp$[tmp$_0];
      if (equals(header.name, 'Access-Control-Allow-Origin')) {
        if (header.value == null || (!equals(header.value, '*') && !contains(ensureNotNull(header.value), allowValue))) {
          header.value = allowValue;
          var obj_0 = {};
          obj_0.responseHeaders = responseHeaders.v;
          return obj_0;
        }
         else {
          return null;
        }
      }
    }
    var responseHeadersList = toMutableList(responseHeaders.v);
    responseHeadersList.add_11rb$(new HttpHeaderImpl('Access-Control-Allow-Origin', allowValue));
    responseHeadersList.add_11rb$(allowCredentials);
    responseHeadersList.add_11rb$(allowHeaders);
    responseHeadersList.add_11rb$(allowMethods);
    responseHeadersList.add_11rb$(allowMaxAge);
    var obj_1 = {};
    obj_1.responseHeaders = copyToArray(responseHeadersList);
    return obj_1;
  }
  function HttpHeaderImpl(name, value) {
    this.name_4dvjqb$_0 = name;
    this.value_2bpf6z$_0 = value;
  }
  Object.defineProperty(HttpHeaderImpl.prototype, 'name', {get: function () {
    return this.name_4dvjqb$_0;
  }, set: function (name) {
    this.name_4dvjqb$_0 = name;
  }});
  Object.defineProperty(HttpHeaderImpl.prototype, 'value', {get: function () {
    return this.value_2bpf6z$_0;
  }, set: function (value) {
    this.value_2bpf6z$_0 = value;
  }});
  HttpHeaderImpl.$metadata$ = {kind: Kind_CLASS, simpleName: 'HttpHeaderImpl', interfaces: []};
  var package$com = _.com || (_.com = {});
  var package$jetbrains = package$com.jetbrains || (package$com.jetbrains = {});
  var package$browserConnection = package$jetbrains.browserConnection || (package$jetbrains.browserConnection = {});
  var package$bootstrap = package$browserConnection.bootstrap || (package$browserConnection.bootstrap = {});
  package$bootstrap.main_kand9s$ = main;
  $$importsForInline$$['browser-ext-platform'] = $module$browser_ext_platform;
  package$bootstrap.applyCors_ie2ed9$ = applyCors;
  package$bootstrap.HttpHeaderImpl = HttpHeaderImpl;
  LOG = getLogger('com.jetbrains.browserConnection.bootstrap');
  lastHost = null;
  lastPort = null;
  lastAppendSourceUrl = true;
  localChangedListenerRegistered = false;
  connectedDisposable = null;
  corsPatternsSeparator = new RegExp('[\\s,]+');
  allowMaxAge = new HttpHeaderImpl('Access-Control-Max-Age', '1998000');
  allowMethods = new HttpHeaderImpl('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  allowCredentials = new HttpHeaderImpl('Access-Control-Allow-Credentials', 'true');
  allowHeaders = new HttpHeaderImpl('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cookie');
  lastCorsUrlPatterns = null;
  corsFilterDisposable = null;
  requestIdToOriginUrl = HashMap_init();
  main([]);
  return _;
}(typeof this['browser-ext-bootstrap'] === 'undefined' ? {} : this['browser-ext-bootstrap'], kotlin, this['browser-ext-platform'], this['jb-chrome-ext-api'], this['chrome-ext-options'], this['chrome-ext']);

//# sourceMappingURL=browser-ext-bootstrap.js.map
