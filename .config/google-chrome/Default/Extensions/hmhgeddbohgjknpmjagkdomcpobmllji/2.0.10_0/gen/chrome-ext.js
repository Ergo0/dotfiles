if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'chrome-ext'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'chrome-ext'.");
}
if (typeof this['browser-ext-platform'] === 'undefined') {
  throw new Error("Error loading module 'chrome-ext'. Its dependency 'browser-ext-platform' was not found. Please, check whether 'browser-ext-platform' is loaded prior to 'chrome-ext'.");
}
if (typeof this['jb-chrome-ext-api'] === 'undefined') {
  throw new Error("Error loading module 'chrome-ext'. Its dependency 'jb-chrome-ext-api' was not found. Please, check whether 'jb-chrome-ext-api' is loaded prior to 'chrome-ext'.");
}
this['chrome-ext'] = function (_, Kotlin, $module$browser_ext_platform, $module$jb_chrome_ext_api) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var getURL = chrome.runtime.getURL;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var sendCommand = chrome.debugger.sendCommand;
  var equals = Kotlin.equals;
  var throwCCE = Kotlin.throwCCE;
  var toString = Kotlin.toString;
  var handlerBehaviorChanged = chrome.webRequest.handlerBehaviorChanged;
  var webRequestBeforeRequested = $module$jb_chrome_ext_api.org.jetbrains.chrome.webRequestBeforeRequested_hvk052$;
  var update = chrome.tabs.update;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var trimQueryOrFragment = $module$browser_ext_platform.org.jetbrains.io.trimQueryOrFragment_pdl1vz$;
  var endsWith = Kotlin.kotlin.text.endsWith_7epoxm$;
  var get_asParsedUrl = $module$browser_ext_platform.org.jetbrains.io.get_asParsedUrl_pdl1vz$;
  var DebuggerService = $module$browser_ext_platform.com.jetbrains.browserConnection.DebuggerService;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var detach = chrome.debugger.detach;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var isInspectableBackedByPattern = $module$browser_ext_platform.com.jetbrains.browserConnection.isInspectableBackedByPattern_jyasbz$;
  var normalizeTabUriPath = $module$browser_ext_platform.com.jetbrains.browserConnection.normalizeTabUriPath_pdl1vj$;
  var Exception_init = Kotlin.kotlin.Exception_init;
  var attach = chrome.debugger.attach;
  var compareUrls = $module$browser_ext_platform.com.jetbrains.browserConnection.compareUrls_f5e6j7$;
  var PageManager = $module$browser_ext_platform.com.jetbrains.browserConnection.PageManager;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;
  var get_isDataUri = $module$browser_ext_platform.org.jetbrains.io.get_isDataUri_pdl1vz$;
  var util = $module$browser_ext_platform.org.jetbrains.util;
  var tabsUpdated = $module$jb_chrome_ext_api.org.jetbrains.chrome.tabsUpdated_68tacu$;
  var tabsRemoved = $module$jb_chrome_ext_api.org.jetbrains.chrome.tabsRemoved_j4naqd$;
  var debuggerDetached = $module$jb_chrome_ext_api.org.jetbrains.chrome.debuggerDetached_v7nyhc$;
  var disconnected = $module$jb_chrome_ext_api.org.jetbrains.chrome.disconnected_baxt95$;
  var message = $module$jb_chrome_ext_api.org.jetbrains.chrome.message_qla3q$;
  var runtimeConnected = $module$jb_chrome_ext_api.org.jetbrains.chrome.runtimeConnected_e9ms59$;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var debuggerEventEmitted = $module$jb_chrome_ext_api.org.jetbrains.chrome.debuggerEventEmitted_8wvdox$;
  var Disposable = $module$browser_ext_platform.org.jetbrains.util.Disposable;
  var Exception = Kotlin.kotlin.Exception;
  var query = chrome.tabs.query;
  var reload = chrome.tabs.reload;
  var create = chrome.windows.create;
  var create_0 = chrome.tabs.create;
  var get_isNormal = $module$jb_chrome_ext_api.org.jetbrains.chrome.get_isNormal_z8zl4w$;
  var getAll = chrome.windows.getAll;
  var getLastFocused = chrome.windows.getLastFocused;
  var focusWindow = $module$jb_chrome_ext_api.org.jetbrains.chrome.focusWindow_3p81yu$;
  var newDisposable = $module$browser_ext_platform.org.jetbrains.util.newDisposable;
  var Exception_init_0 = Kotlin.kotlin.Exception_init_pdl1vj$;
  var TabService = $module$browser_ext_platform.org.jetbrains.browserConnection.TabService;
  var debug = $module$jb_chrome_ext_api.org.jetbrains.chromium.debug;
  var browserConnection = $module$browser_ext_platform.com.jetbrains.browserConnection;
  var escapeQuotes = $module$jb_chrome_ext_api.org.jetbrains.chromium.debug.escapeQuotes_pdl1vz$;
  var RemoteCss = $module$jb_chrome_ext_api.org.jetbrains.chromium.debug.RemoteCss;
  var RemotePage = $module$jb_chrome_ext_api.org.jetbrains.chromium.debug.RemotePage;
  var RemoteDebugger = $module$jb_chrome_ext_api.org.jetbrains.chromium.debug.RemoteDebugger;
  var Dom = $module$browser_ext_platform.com.jetbrains.browserConnection.Dom;
  var getLogger = $module$browser_ext_platform.org.jetbrains.logging.getLogger_61zpoe$;
  var update_0 = chrome.contextMenus.update;
  var getManifest = chrome.runtime.getManifest;
  var greaterOrEquals = $module$browser_ext_platform.com.jetbrains.browserConnection.greaterOrEquals_6rfeek$;
  var registerDomService = $module$browser_ext_platform.com.jetbrains.browserConnection.registerDomService_oht6vw$;
  var enable = chrome.browserAction.enable;
  var setTitle = chrome.browserAction.setTitle;
  var browserActionClicked = $module$jb_chrome_ext_api.org.jetbrains.chrome.browserActionClicked_qo3us1$;
  var disable = chrome.browserAction.disable;
  var contextMenusClicked = $module$jb_chrome_ext_api.org.jetbrains.chrome.contextMenusClicked_qed3y4$;
  var successfully = $module$jb_chrome_ext_api.org.jetbrains.chrome.successfully;
  var create_1 = chrome.contextMenus.create;
  var connect = $module$browser_ext_platform.com.jetbrains.browserConnection.connect_h3bnlv$;
  ChromeDebugService.prototype = Object.create(DebuggerService.prototype);
  ChromeDebugService.prototype.constructor = ChromeDebugService;
  ChromePageManager.prototype = Object.create(PageManager.prototype);
  ChromePageManager.prototype.constructor = ChromePageManager;
  function ChromeDebugService(pageManager, rpcServer, host, port) {
    DebuggerService.call(this, pageManager);
    this.rpcServer_0 = rpcServer;
    this.host_0 = host;
    this.port_0 = port;
  }
  ChromeDebugService.prototype.sendError_0 = function (tabId, command, error) {
    this.rpcServer_0.send_buzeal$('Debugger', 'handleError', tabId.toString() + ', ' + command.id + ', ' + JSON.stringify(error.message));
  };
  ChromeDebugService.prototype.sendResult_0 = function (tabId, command, result) {
    if (result === void 0)
      result = null;
    var message = tabId.toString() + ', ' + command.id;
    if (result != null) {
      message += ', ' + JSON.stringify(result);
    }
    this.rpcServer_0.send_buzeal$('Debugger', 'handleResult', message);
  };
  ChromeDebugService.prototype.createPreliminaryPageUrl_61zpoe$ = function (url) {
    return getURL('loading.html?url=') + encodeURIComponent(url);
  };
  function ChromeDebugService$sendCommand$lambda$lambda(closure$tabId, closure$command, this$ChromeDebugService) {
    return function () {
      this$ChromeDebugService.sendError_0(closure$tabId, closure$command, ensureNotNull(chrome.runtime.lastError));
      return Unit;
    };
  }
  function ChromeDebugService$sendCommand$lambda$lambda_0(closure$tabId, closure$command, this$ChromeDebugService, closure$done) {
    return function () {
      try {
        this$ChromeDebugService.sendResult_0(closure$tabId, closure$command);
      }
      finally {
        closure$done();
      }
      return Unit;
    };
  }
  function ChromeDebugService$sendCommand$lambda(closure$domainToEnable, closure$tabId, closure$command, this$ChromeDebugService) {
    return function (done) {
      closure$domainToEnable.enable_k1pks$(ChromeDebugService$sendCommand$lambda$lambda(closure$tabId, closure$command, this$ChromeDebugService), ChromeDebugService$sendCommand$lambda$lambda_0(closure$tabId, closure$command, this$ChromeDebugService, done));
      return Unit;
    };
  }
  function ChromeDebugService$sendCommand$lambda_0(closure$tabId, closure$command, this$ChromeDebugService) {
    return function (it) {
      this$ChromeDebugService.handleChromeCommandResult_0(closure$tabId, closure$command, it);
      return Unit;
    };
  }
  function ChromeDebugService$sendCommand$lambda$lambda_1(closure$tabId, closure$command, this$ChromeDebugService, closure$done) {
    return function (it) {
      try {
        this$ChromeDebugService.handleChromeCommandResult_0(closure$tabId, closure$command, it);
      }
      finally {
        closure$done();
      }
      return Unit;
    };
  }
  function ChromeDebugService$sendCommand$lambda_1(closure$command, closure$dom, closure$tabId, this$ChromeDebugService) {
    return function (done) {
      LOG.debug_yhszz7$(['DC ' + closure$command.method]);
      sendCommand(closure$dom.debuggee, closure$command.method, closure$command.params, ChromeDebugService$sendCommand$lambda$lambda_1(closure$tabId, closure$command, this$ChromeDebugService, done));
      return Unit;
    };
  }
  ChromeDebugService.prototype.sendCommand = function (tabId, command) {
    var tmp$;
    var dom = this.pageManager.getDom_za3lpa$(tabId);
    switch (command.method) {
      case 'Debugger.enable':
        tmp$ = dom.debugger;
        break;
      case 'Page.enable':
        tmp$ = dom.page;
        break;
      default:tmp$ = null;
        break;
    }
    var domainToEnable = tmp$;
    if (domainToEnable != null) {
      this.queueProcessor.add_11rb$(ChromeDebugService$sendCommand$lambda(domainToEnable, tabId, command, this));
    }
     else if (dom.debugSessionInitialized) {
      sendCommand(dom.debuggee, command.method, command.params, ChromeDebugService$sendCommand$lambda_0(tabId, command, this));
    }
     else {
      this.queueProcessor.add_11rb$(ChromeDebugService$sendCommand$lambda_1(command, dom, tabId, this));
    }
  };
  ChromeDebugService.prototype.handleChromeCommandResult_0 = function (tabId, command, result) {
    var tmp$, tmp$_0;
    var lastError = chrome.runtime.lastError;
    if (lastError == null) {
      if (result != null && equals(command.method, 'DOM.getDocument')) {
        var dom = this.pageManager.findDom_3p81yu$(tabId);
        if (dom != null) {
          dom.documentNodeId = (Kotlin.isType(tmp$_0 = (Kotlin.isType(tmp$ = result, Object) ? tmp$ : throwCCE())['root'], Object) ? tmp$_0 : throwCCE()).nodeId;
        }
      }
      this.sendResult_0(tabId, command, result);
    }
     else {
      this.sendError_0(tabId, command, lastError);
      LOG.error_61zpoe$('Error while ' + command.method + ': ' + toString(lastError.message));
    }
  };
  function ChromeDebugService$queue$lambda(closure$task, this$ChromeDebugService, closure$tabId) {
    return function (it) {
      var doneAsync = false;
      try {
        doneAsync = closure$task(this$ChromeDebugService.pageManager.getDom_za3lpa$(closure$tabId), it);
      }
      finally {
        if (!doneAsync) {
          it();
        }
      }
      return Unit;
    };
  }
  ChromeDebugService.prototype.queue_0 = function (tabId, task) {
    this.queueProcessor.add_11rb$(ChromeDebugService$queue$lambda(task, this, tabId));
  };
  function ChromeDebugService$initialized$lambda() {
    handlerBehaviorChanged();
    return Unit;
  }
  ChromeDebugService.prototype.initialized = function (tabId) {
    var dom = this.pageManager.getDom_za3lpa$(tabId);
    dom.debugSessionInitialized = true;
    dom.initialUrl = dom.tabUrl;
    LOG.debug_yhszz7$(['Save ' + toString(dom.tabUrl) + ' as initial tab url']);
    this.addTransformWithAppendedSourceUrl_0(tabId, dom);
    dom.register_o14v8n$(ChromeDebugService$initialized$lambda);
  };
  function ChromeDebugService$addTransformWithAppendedSourceUrl$lambda(this$ChromeDebugService) {
    return function (it) {
      this$ChromeDebugService.transformWithAppendedSourceUrl_0(it);
      return Unit;
    };
  }
  function ChromeDebugService$addTransformWithAppendedSourceUrl$lambda_0() {
    handlerBehaviorChanged();
    return Unit;
  }
  ChromeDebugService.prototype.addTransformWithAppendedSourceUrl_0 = function (tabId, dom) {
    if (this.pageManager.appendSourceUrl) {
      var obj = {};
      obj.urls = ['<all_urls>'];
      obj.types = ['xmlhttprequest'];
      obj.tabId = tabId;
      webRequestBeforeRequested(dom, obj, true, ChromeDebugService$addTransformWithAppendedSourceUrl$lambda(this));
      dom.register_o14v8n$(ChromeDebugService$addTransformWithAppendedSourceUrl$lambda_0);
    }
  };
  function ChromeDebugService$navigate$lambda$lambda(closure$done) {
    return function (it) {
      closure$done();
      return Unit;
    };
  }
  function ChromeDebugService$navigate$lambda(closure$tabId, this$ChromeDebugService, closure$url) {
    return function (dom, done) {
      this$ChromeDebugService.addTransformWithAppendedSourceUrl_0(closure$tabId, dom);
      var tmp$ = closure$tabId;
      var obj = {};
      obj.url = closure$url;
      obj.active = true;
      update(tmp$, obj, ChromeDebugService$navigate$lambda$lambda(done));
      return true;
    };
  }
  ChromeDebugService.prototype.navigate = function (tabId, url) {
    this.queue_0(tabId, ChromeDebugService$navigate$lambda(tabId, this, url));
  };
  ChromeDebugService.prototype.transformWithAppendedSourceUrl_0 = function (it) {
    var tmp$, tmp$_0;
    if (!(!equals(it.method, 'GET') || !equals(it.method, 'get')) || contains(it.url, 'FDFA6052-1C12-4655-B658-0DBF2414422D')) {
      return null;
    }
    var url = trimQueryOrFragment(it.url);
    if (!(endsWith(url, '.js') || endsWith(url, '.dart')) || endsWith(url, '.map.js')) {
      return null;
    }
    var tabUrl = (tmp$_0 = (tmp$ = this.pageManager.findDom_3p81yu$(it.tabId)) != null ? tmp$.tabUrl : null) != null ? get_asParsedUrl(tmp$_0) : null;
    if (tabUrl == null) {
      return null;
    }
    if (equals(tabUrl.port, this.port_0)) {
      var obj = {};
      obj.redirectUrl = 'http://' + toString(tabUrl.authority) + '/' + (this.pageManager.buildInfo.baselineVersion > 131 ? 'FDFA6052-1C12-4655-B658-0DBF2414422D' : '__corsProxy__') + '/' + it.tabId.toString() + '/' + window.btoa(it.url);
      return obj;
    }
    return null;
  };
  function ChromeDebugService$detach$lambda(this$ChromeDebugService) {
    return function (dom, done) {
      this$ChromeDebugService.pageManager.detachDebugger_vo1rq0$(dom, done);
      return true;
    };
  }
  ChromeDebugService.prototype.detach = function (tabId) {
    var dom = this.pageManager.getDom_za3lpa$(tabId);
    dom.externalUsed = false;
    if (dom.detachIsAllowed) {
      this.queue_0(tabId, ChromeDebugService$detach$lambda(this));
    }
  };
  ChromeDebugService.$metadata$ = {kind: Kind_CLASS, simpleName: 'ChromeDebugService', interfaces: [DebuggerService]};
  function ChromePageManager(buildInfo, rpcServer, appendSourceUrl) {
    PageManager.call(this, new ChromeTabService(), rpcServer);
    this.buildInfo = buildInfo;
    this.appendSourceUrl = appendSourceUrl;
    this.attachedTabs_0 = HashMap_init();
    this.devToolInspectedTabs = HashMap_init();
    this.tabToInitialUrl = HashMap_init();
    tabsUpdated(this, ChromePageManager_init$lambda(this));
    tabsRemoved(this, ChromePageManager_init$lambda_0(this));
    debuggerDetached(this, ChromePageManager_init$lambda_1(this, rpcServer));
    runtimeConnected(this, ChromePageManager_init$lambda_2(this));
    debuggerEventEmitted(this, ChromePageManager_init$lambda_3(this, rpcServer));
  }
  ChromePageManager.prototype.getDom_za3lpa$ = function (tabId) {
    return ensureNotNull(this.findDom_3p81yu$(tabId));
  };
  ChromePageManager.prototype.findDom_3p81yu$ = function (tabId) {
    return this.attachedTabs_0.get_11rb$(tabId);
  };
  ChromePageManager.prototype.dispose = function () {
    var tmp$;
    try {
      tmp$ = this.attachedTabs_0.values.iterator();
      while (tmp$.hasNext()) {
        var dom = tmp$.next();
        try {
          dom.disposeTree();
        }
        finally {
          detach(dom.debuggee);
        }
      }
    }
    finally {
      this.attachedTabs_0.clear();
      this.devToolInspectedTabs.clear();
    }
  };
  function ChromePageManager$process$lambda$lambda(closure$processor, closure$postponed) {
    return function (it) {
      var tmp$;
      for (tmp$ = 0; tmp$ !== it.length; ++tmp$) {
        var index = it[tmp$];
        closure$processor(closure$postponed.get_za3lpa$(index));
      }
      return Unit;
    };
  }
  function ChromePageManager$process$lambda(closure$processor, closure$projectId, this$ChromePageManager) {
    return function (it) {
      var tmp$;
      var postponed = ArrayList_init();
      var hostAndPathPairs = ArrayList_init();
      while (it.hasNext()) {
        var tab = it.next();
        var parsedUrl = (tmp$ = tab.url) != null ? get_asParsedUrl(tmp$) : null;
        if (parsedUrl == null) {
          LOG.debug_yhszz7$(['Cannot parse tab url ' + tab + '.url']);
          continue;
        }
        if (!equals(parsedUrl.host, chrome.runtime.id)) {
          switch (isInspectableBackedByPattern(parsedUrl.scheme, parsedUrl.host)) {
            case -1:
              break;
            case 0:
              postponed.add_11rb$(tab);
              hostAndPathPairs.add_11rb$(parsedUrl.host);
              hostAndPathPairs.add_11rb$(normalizeTabUriPath(parsedUrl.path));
              break;
            case 1:
              closure$processor(tab);
              break;
            default:throw Exception_init();
          }
        }
         else {
          closure$processor(tab);
        }
      }
      if (!postponed.isEmpty()) {
        this$ChromePageManager.filterInspectable_pfvek$(closure$projectId, hostAndPathPairs, ChromePageManager$process$lambda$lambda(closure$processor, postponed));
      }
      return Unit;
    };
  }
  ChromePageManager.prototype.process_6p75vv$ = function (projectId, processor) {
    this.tabService.query_gtonov$(void 0, ChromePageManager$process$lambda(processor, projectId, this));
  };
  var Map = Kotlin.kotlin.collections.Map;
  ChromePageManager.prototype.executeForTabById_pjak46$ = function (tabId, onlyIfAttached, handler) {
    if (tabId == null)
      return;
    var dom = this.attachedTabs_0.get_11rb$(tabId);
    if (dom != null) {
      dom.detachIsAllowed = false;
      handler(dom);
    }
     else {
      var $receiver = this.devToolInspectedTabs;
      var tmp$;
      var devToolsBackedDom = (Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(tabId);
      if (devToolsBackedDom == null) {
        if (!onlyIfAttached) {
          this.attachDebugger_0(tabId, null, handler);
        }
      }
       else {
        handler(devToolsBackedDom);
      }
    }
  };
  ChromePageManager.prototype.executeForTab_sjxqwo$ = function (tab, onlyIfAttached, handler) {
    this.executeForTabById_pjak46$(tab.id, onlyIfAttached, handler);
  };
  function ChromePageManager$attachDebugger$lambda(closure$callback, closure$dom, this$ChromePageManager, closure$tabId, closure$errorCallback) {
    return function () {
      var tmp$;
      var lastError = (tmp$ = chrome.runtime.lastError) != null ? tmp$.message : null;
      if (lastError == null) {
        closure$callback(closure$dom);
      }
       else {
        this$ChromePageManager.attachedTabs_0.remove_11rb$(closure$tabId);
        LOG.error_61zpoe$(lastError);
        if (closure$errorCallback != null) {
          closure$errorCallback(lastError);
        }
      }
      return Unit;
    };
  }
  ChromePageManager.prototype.attachDebugger_0 = function (tabId, errorCallback, callback) {
    if (errorCallback === void 0)
      errorCallback = null;
    var obj = {};
    obj.tabId = tabId;
    var debuggee = obj;
    var dom = new DebuggerProtocolBackedDom(debuggee);
    this.attachedTabs_0.put_xwzc9p$(tabId, dom);
    attach(debuggee, '1.0', ChromePageManager$attachDebugger$lambda(callback, dom, this, tabId, errorCallback));
  };
  function ChromePageManager$getOrCreateTab$lambda(this$ChromePageManager, closure$url, closure$urlToOpen, closure$focusWindow, closure$errorCallback, closure$callback) {
    return function (it) {
      var candidate = null;
      var newTab = null;
      var existingTab = null;
      var memorizedTabUsed = false;
      if (!this$ChromePageManager.tabToInitialUrl.isEmpty()) {
        while (it.hasNext()) {
          var tab = it.next();
          if (equals(this$ChromePageManager.tabToInitialUrl.get_11rb$(tab.id), closure$url)) {
            this$ChromePageManager.tabToInitialUrl.remove_11rb$(tab.id);
            this$ChromePageManager.tabService.load_nucheq$(closure$url, closure$urlToOpen, tab, null, closure$focusWindow, closure$errorCallback, closure$callback);
            memorizedTabUsed = true;
            break;
          }
        }
      }
      if (!memorizedTabUsed) {
        while (it.hasNext()) {
          var tab_0 = it.next();
          if (!compareUrls(tab_0.url, closure$url)) {
            if (newTab == null && equals(tab_0.url, 'chrome://newtab/')) {
              newTab = tab_0;
            }
            continue;
          }
          var $receiver = this$ChromePageManager.devToolInspectedTabs;
          var key = tab_0.id;
          var tmp$;
          if ((Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).containsKey_11rb$(key)) {
            continue;
          }
          if (this$ChromePageManager.attachedTabs_0.isEmpty()) {
            existingTab = tab_0;
            break;
          }
          var $receiver_0 = this$ChromePageManager.attachedTabs_0;
          var key_0 = tab_0.id;
          var tmp$_0;
          var dom = (Kotlin.isType(tmp$_0 = $receiver_0, Map) ? tmp$_0 : throwCCE()).get_11rb$(key_0);
          if (dom != null) {
            if (dom.externalUsed) {
              continue;
            }
             else {
              existingTab = tab_0;
              break;
            }
          }
          if (candidate == null) {
            candidate = tab_0;
          }
        }
        if (existingTab == null) {
          LOG.debug_yhszz7$([closure$url + ': existing attached tab not found, candidate ' + (candidate == null ? 'not exists' : 'exists')]);
          existingTab = candidate;
        }
         else {
          LOG.debug_yhszz7$([closure$url + ': existing attached tab found, old url: ' + toString(ensureNotNull(existingTab).url)]);
        }
        this$ChromePageManager.tabService.load_nucheq$(closure$url, closure$urlToOpen, existingTab, newTab, closure$focusWindow, closure$errorCallback, closure$callback);
      }
      return Unit;
    };
  }
  ChromePageManager.prototype.getOrCreateTab_z105ws$$default = function (url, urlToOpen, focusWindow, errorCallback, callback) {
    this.tabService.query_gtonov$(errorCallback, ChromePageManager$getOrCreateTab$lambda(this, url, urlToOpen, focusWindow, errorCallback, callback));
  };
  function ChromePageManager$attachDebugger$lambda_0(closure$tab, closure$tabId, closure$callback) {
    return function (it) {
      it.tabUrl = closure$tab.url;
      it.detachIsAllowed = true;
      it.externalUsed = true;
      LOG.debug_yhszz7$(['attachDebugger: attached to ' + closure$tabId.toString()]);
      closure$callback(closure$tabId);
      return Unit;
    };
  }
  ChromePageManager.prototype.attachDebugger_hbhrwf$ = function (tab, externalEventEnabled, callback, errorCallback) {
    var tmp$;
    tmp$ = tab.id;
    if (tmp$ == null) {
      return;
    }
    var tabId = tmp$;
    var dom = this.attachedTabs_0.get_11rb$(tabId);
    this.tabToInitialUrl.remove_11rb$(tabId);
    if (dom != null) {
      LOG.debug_yhszz7$(['attachDebugger: existing dom ' + toString(dom)]);
      dom.externalUsed = true;
      callback(tabId);
    }
     else {
      LOG.debug_yhszz7$(['attachDebugger: existing dom not found']);
      this.attachDebugger_0(tabId, errorCallback, ChromePageManager$attachDebugger$lambda_0(tab, tabId, callback));
    }
  };
  var MutableMap = Kotlin.kotlin.collections.MutableMap;
  ChromePageManager.prototype.removeAndDisposeDom_0 = function (debuggee) {
    var $receiver = this.attachedTabs_0;
    var key = debuggee.tabId;
    var tmp$;
    var dom = (Kotlin.isType(tmp$ = $receiver, MutableMap) ? tmp$ : throwCCE()).remove_11rb$(key);
    dom != null ? (dom.disposeTree(), Unit) : null;
    return dom;
  };
  function ChromePageManager$detachDebugger$lambda(closure$dom, closure$callback) {
    return function () {
      LOG.debug_yhszz7$(['attempt to detachDebugger, ' + toString(closure$dom.debuggee.tabId)]);
      detach(closure$dom.debuggee, closure$callback);
      return Unit;
    };
  }
  ChromePageManager.prototype.detachDebugger_vo1rq0$ = function (dom, callback) {
    if (callback === void 0)
      callback = null;
    this.removeAndDisposeDom_0(dom.debuggee);
    var initialUrl = dom.initialUrl;
    if (initialUrl != null) {
      LOG.debug_yhszz7$(['add ' + toString(initialUrl) + ' to tabToInitialUrl map, ' + toString(dom.debuggee.tabId)]);
      var $receiver = this.tabToInitialUrl;
      var key = dom.debuggee.tabId;
      $receiver.put_xwzc9p$(key, initialUrl);
    }
    if (dom.debugger.enabled) {
      dom.debugger.disable_yo2cqg$(ChromePageManager$detachDebugger$lambda(dom, callback));
    }
     else {
      detach(dom.debuggee, callback);
    }
  };
  function ChromePageManager_init$lambda(this$ChromePageManager) {
    return function (tabId, changeInfo, tab) {
      var newUrl = changeInfo.url;
      if (newUrl != null) {
        var dom = this$ChromePageManager.attachedTabs_0.get_11rb$(tabId);
        if (dom != null) {
          dom.tabUrl = changeInfo.url;
          LOG.info_61zpoe$('new url ' + toString(newUrl));
          if (!dom.externalUsed && !get_isDataUri(newUrl)) {
            var parsedUrl = ensureNotNull(get_asParsedUrl(newUrl));
            if (!equals(parsedUrl.host, chrome.runtime.id) && isInspectableBackedByPattern(parsedUrl.scheme, parsedUrl.host) === util.ThreeState.NO) {
              LOG.info_61zpoe$('detach tab ' + dom.debuggee + ', new url ' + toString(newUrl) + ' is not inspectable');
              this$ChromePageManager.detachDebugger_vo1rq0$(dom);
            }
          }
        }
      }
      return Unit;
    };
  }
  function ChromePageManager_init$lambda_0(this$ChromePageManager) {
    return function (tabId, removeInfo) {
      var $receiver = this$ChromePageManager.devToolInspectedTabs;
      var tmp$;
      (Kotlin.isType(tmp$ = $receiver, MutableMap) ? tmp$ : throwCCE()).remove_11rb$(tabId);
      var url = this$ChromePageManager.tabToInitialUrl.remove_11rb$(tabId);
      if (url != null) {
        LOG.debug_yhszz7$(['url ' + toString(url) + ' removed from tabToInitialUrl map, tab removed']);
      }
      return Unit;
    };
  }
  function ChromePageManager_init$lambda_1(this$ChromePageManager, closure$rpcServer) {
    return function (debuggee, reason) {
      var dom = this$ChromePageManager.removeAndDisposeDom_0(debuggee);
      LOG.info_61zpoe$('tab detached ' + toString(debuggee.tabId) + ', reason ' + toString(reason) + ', dom ' + (dom != null ? 'exists and externalUsed ' + dom.externalUsed : 'not exists'));
      if (dom != null && dom.externalUsed) {
        closure$rpcServer.send_buzeal$('Debugger', 'detached', toString(debuggee.tabId));
      }
      return Unit;
    };
  }
  function ChromePageManager_init$lambda$lambda$lambda(this$ChromePageManager, closure$message) {
    return function (it) {
      this$ChromePageManager.devToolInspectedTabs.remove_11rb$(closure$message.tabId);
      return Unit;
    };
  }
  function ChromePageManager_init$lambda$lambda(this$ChromePageManager, closure$port) {
    return function (message, messagePort) {
      this$ChromePageManager.devToolInspectedTabs.put_xwzc9p$(message.tabId, new DevToolsBackedDom(messagePort));
      disconnected(closure$port, void 0, ChromePageManager_init$lambda$lambda$lambda(this$ChromePageManager, message));
      return Unit;
    };
  }
  function ChromePageManager_init$lambda_2(this$ChromePageManager) {
    return function (port) {
      var tmp$;
      LOG.debug_yhszz7$(['connected from devtools page', port]);
      if (((tmp$ = port.sender) != null ? tmp$.tab : null) != null) {
        message(port, void 0, ChromePageManager_init$lambda$lambda(this$ChromePageManager, port));
      }
      return Unit;
    };
  }
  function ChromePageManager_init$lambda_3(this$ChromePageManager, closure$rpcServer) {
    return function (debuggee, method, data) {
      if (LOG.debugEnabled && !(startsWith(method, 'DOM.') || startsWith(method, 'Network.') || startsWith(method, 'Console.'))) {
        var message = 'EV ' + toString(debuggee.tabId) + ' ' + method;
        if (equals(method, 'Debugger.scriptParsed')) {
          message += ' ' + data.url.toString() + ' ' + data.scriptId.toString();
        }
        LOG.debug_yhszz7$([message]);
      }
      var $receiver = this$ChromePageManager.attachedTabs_0;
      var key = debuggee.tabId;
      var tmp$;
      var dom = (Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(key);
      if (dom != null) {
        if (equals(method, 'DOM.documentUpdated'))
          dom.documentUpdated();
        if (dom.externalUsed && !startsWith(method, 'Profiler.')) {
          closure$rpcServer.send_buzeal$('Debugger', 'handleEvent', toString(debuggee.tabId) + ', ' + '"' + method + '"' + ', ' + JSON.stringify(data));
        }
      }
      return Unit;
    };
  }
  ChromePageManager.$metadata$ = {kind: Kind_CLASS, simpleName: 'ChromePageManager', interfaces: [Disposable, PageManager]};
  function ChromeTabService() {
    var obj = {};
    obj.status = 'complete';
    obj.windowType = 'normal';
    this.TABS_QUERY_0 = obj;
  }
  function ChromeTabService$query$lambda(closure$callback, closure$errorCallback) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      var lastError = (tmp$ = chrome.runtime.lastError) != null ? tmp$.message : null;
      if (lastError == null) {
        try {
          closure$callback(Kotlin.arrayIterator(it));
        }
         catch (e) {
          if (Kotlin.isType(e, Exception)) {
            try {
              LOG.error_tcv7n7$(e);
            }
            finally {
              tmp$_1 = (tmp$_0 = e.message) != null ? tmp$_0 : 'Internal error';
              closure$errorCallback != null ? closure$errorCallback(tmp$_1) : null;
            }
          }
           else
            throw e;
        }
      }
       else {
        closure$errorCallback != null ? closure$errorCallback(lastError) : null;
      }
      return Unit;
    };
  }
  ChromeTabService.prototype.query_gtonov$$default = function (errorCallback, callback) {
    query(this.TABS_QUERY_0, ChromeTabService$query$lambda(callback, errorCallback));
  };
  ChromeTabService.prototype.reload_iuyhfk$$default = function (tab, bypassCache) {
    var tmp$ = ensureNotNull(tab.id);
    var obj = {};
    obj.bypassCache = bypassCache;
    reload(tmp$, obj);
  };
  function ChromeTabService$createTab$lambda$createTab$lambda(closure$focusWindow, closure$callback, this$ChromeTabService) {
    return function (it) {
      this$ChromeTabService.postProcessCreatedTab_0(ensureNotNull(ensureNotNull(it).tabs)[0], it, closure$focusWindow, closure$callback);
      return Unit;
    };
  }
  function ChromeTabService$createTab$lambda$createTab$lambda_0(closure$proposedWindow, closure$focusWindow, closure$callback, this$ChromeTabService) {
    return function (it) {
      this$ChromeTabService.postProcessCreatedTab_0(it, closure$proposedWindow, closure$focusWindow, closure$callback);
      return Unit;
    };
  }
  function ChromeTabService$createTab$lambda$createTab(closure$uri, closure$focusWindow, closure$callback, this$ChromeTabService) {
    return function (proposedWindow) {
      if (proposedWindow == null) {
        var obj = {};
        var closure$uri_0 = closure$uri;
        var closure$focusWindow_0 = closure$focusWindow;
        obj.url = closure$uri_0;
        obj.focused = closure$focusWindow_0;
        create(obj, ChromeTabService$createTab$lambda$createTab$lambda(closure$focusWindow, closure$callback, this$ChromeTabService));
      }
       else {
        var obj_0 = {};
        obj_0.url = closure$uri;
        obj_0.windowId = proposedWindow.id;
        create_0(obj_0, ChromeTabService$createTab$lambda$createTab$lambda_0(proposedWindow, closure$focusWindow, closure$callback, this$ChromeTabService));
      }
    };
  }
  function ChromeTabService$createTab$lambda$lambda(closure$createTab) {
    return function (it) {
      var tmp$;
      var found = false;
      for (tmp$ = 0; tmp$ !== it.length; ++tmp$) {
        var window_0 = it[tmp$];
        if (get_isNormal(window_0)) {
          closure$createTab(window_0);
          found = true;
          break;
        }
      }
      if (!found) {
        closure$createTab(null);
      }
      return Unit;
    };
  }
  function ChromeTabService$createTab$lambda(closure$uri, closure$focusWindow, closure$callback, this$ChromeTabService) {
    return function (lastFocusedWindow) {
      var createTab = ChromeTabService$createTab$lambda$createTab(closure$uri, closure$focusWindow, closure$callback, this$ChromeTabService);
      if (lastFocusedWindow == null) {
        LOG.debug_yhszz7$(['lastFocusedWindow not found']);
        createTab(null);
      }
       else if (!get_isNormal(lastFocusedWindow)) {
        LOG.debug_yhszz7$(['lastFocusedWindow is not normal']);
        getAll(ChromeTabService$createTab$lambda$lambda(createTab));
      }
       else {
        LOG.debug_yhszz7$(['lastFocusedWindow found']);
        createTab(lastFocusedWindow);
      }
      return Unit;
    };
  }
  ChromeTabService.prototype.createTab_vz3n90$ = function (uri, focusWindow, callback) {
    LOG.debug_yhszz7$(['create tab: ' + uri]);
    getLastFocused(ChromeTabService$createTab$lambda(uri, focusWindow, callback, this));
  };
  ChromeTabService.prototype.postProcessCreatedTab_0 = function (tab, window_0, isFocusWindow, callback) {
    if (isFocusWindow && !window_0.focused) {
      focusWindow(window_0.id);
    }
    if (callback != null) {
      callback(tab);
    }
  };
  function ChromeTabService$updateTab$completed(closure$done, closure$disposable, closure$callback) {
    return function (tab) {
      if (closure$done.v) {
        throw Exception_init_0("'completed' was called already");
      }
      closure$done.v = true;
      try {
        LOG.debug_yhszz7$(["remove 'updateTab' onUpdated listener"]);
        closure$disposable.disposeTree();
      }
      finally {
        closure$callback(tab, true);
      }
    };
  }
  function ChromeTabService$updateTab$lambda(closure$done, closure$completed) {
    return function (tabId, changeInfo, tab) {
      if (equals(tabId, tab.id)) {
        LOG.debug_yhszz7$(["'updateTab' onUpdated, done " + closure$done.v + ', changeInfo', changeInfo]);
        if (!closure$done.v && !equals(changeInfo.status, 'loading')) {
          closure$completed(tab);
        }
      }
      return Unit;
    };
  }
  function ChromeTabService$updateTab$lambda_0(closure$done, closure$completed) {
    return function (tab) {
      if (!closure$done.v && !equals(tab.status, 'loading')) {
        closure$completed(tab);
      }
      return Unit;
    };
  }
  function ChromeTabService$updateTab$lambda_1(closure$callback, closure$uri) {
    return function (it) {
      closure$callback(it, closure$uri != null);
      return Unit;
    };
  }
  function ChromeTabService$updateTab$lambda_2(closure$callback, closure$focusWindow, closure$doneCallback) {
    return function (it) {
      LOG.debug_yhszz7$(['tab updated: ' + toString(ensureNotNull(it).id) + ' ' + toString(it.url) + ' ' + toString(it.status) + ', callback ' + (closure$callback == null ? 'not exists' : 'exists')]);
      if (closure$focusWindow) {
        focusWindow(it.windowId);
      }
      if (closure$doneCallback != null) {
        closure$doneCallback(it);
      }
      return Unit;
    };
  }
  ChromeTabService.prototype.updateTab_pllbul$$default = function (tab, uri, focusWindow, errorCallback, callback) {
    var tmp$;
    LOG.debug_yhszz7$(['update tab: ' + toString(tab.id) + ' ' + toString(tab.url) + ', new url: ' + toString(uri)]);
    var doneCallback;
    if (uri != null && callback != null && get_isDataUri(uri)) {
      var done = {v: false};
      var disposable = newDisposable();
      var completed = ChromeTabService$updateTab$completed(done, disposable, callback);
      tabsUpdated(disposable, ChromeTabService$updateTab$lambda(done, completed));
      doneCallback = ChromeTabService$updateTab$lambda_0(done, completed);
    }
     else {
      if (callback == null)
        tmp$ = null;
      else {
        tmp$ = ChromeTabService$updateTab$lambda_1(callback, uri);
      }
      doneCallback = tmp$;
    }
    var tmp$_0 = ensureNotNull(tab.id);
    var obj = {};
    obj.url = uri;
    obj.active = true;
    update(tmp$_0, obj, ChromeTabService$updateTab$lambda_2(callback, focusWindow, doneCallback));
  };
  ChromeTabService.$metadata$ = {kind: Kind_CLASS, simpleName: 'ChromeTabService', interfaces: [TabService]};
  function DebuggerProtocolBackedDom(debuggee) {
    this.debuggee = debuggee;
    this.css_0 = new RemoteCss(this.debuggee);
    this.page = new RemotePage(this.debuggee);
    this.debugger = new RemoteDebugger(this.debuggee);
    this.detachIsAllowed = false;
    this.externalUsed = false;
    this.debugSessionInitialized = false;
    this.tabUrl = null;
    this.initialUrl = null;
    this.documentNodeId = -1;
    this.lastHighlightedNodeId_0 = -1;
    this.hasAngular_0 = true;
  }
  DebuggerProtocolBackedDom.prototype.documentUpdated = function () {
    this.documentNodeId = -1;
    this.lastHighlightedNodeId_0 = -1;
    this.hasAngular_0 = true;
  };
  DebuggerProtocolBackedDom.prototype.dispose = function () {
  };
  function DebuggerProtocolBackedDom$findNode$lambda$lambda$lambda(closure$callback, closure$nodeId) {
    return function (it) {
      if (it) {
        closure$callback(closure$nodeId);
      }
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$findNode$lambda$lambda$lambda_0(closure$callback) {
    return function (it) {
      closure$callback(it);
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$findNode$lambda$lambda(closure$findEmptyBody, this$DebuggerProtocolBackedDom, closure$callback, closure$selectorSubject) {
    return function (nodeId) {
      var tmp$;
      if (nodeId !== -1) {
        if (closure$findEmptyBody) {
          debug.RemoteDom.computeObject_df7f65$(this$DebuggerProtocolBackedDom.debuggee, nodeId, 'function(){return this.children.length == 0}', DebuggerProtocolBackedDom$findNode$lambda$lambda$lambda(closure$callback, nodeId));
        }
         else {
          tmp$ = closure$selectorSubject;
          if (equals(tmp$, browserConnection.SelectorSubjects.AS_IS))
            closure$callback(nodeId);
          else if (equals(tmp$, browserConnection.SelectorSubjects.PARENT))
            debug.RemoteDom.computeNode_mo48qs$(this$DebuggerProtocolBackedDom.debuggee, nodeId, 'function(){return this.parentNode}', DebuggerProtocolBackedDom$findNode$lambda$lambda$lambda_0(closure$callback));
          else if (equals(tmp$, browserConnection.SelectorSubjects.HTML))
            this$DebuggerProtocolBackedDom.findNode_0('html', browserConnection.SelectorSubjects.AS_IS, closure$callback);
          else
            throw Exception_init();
        }
      }
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$findNode$lambda(closure$selector, this$DebuggerProtocolBackedDom, closure$callback, closure$selectorSubject) {
    return function (it) {
      var findEmptyBody = equals(closure$selector, '$0');
      debug.RemoteDom.querySelector_mo48qs$(this$DebuggerProtocolBackedDom.debuggee, it, findEmptyBody ? 'html > body' : closure$selector, DebuggerProtocolBackedDom$findNode$lambda$lambda(findEmptyBody, this$DebuggerProtocolBackedDom, closure$callback, closure$selectorSubject));
      return Unit;
    };
  }
  DebuggerProtocolBackedDom.prototype.findNode_0 = function (selector, selectorSubject, callback) {
    this.forDocumentNode_0(DebuggerProtocolBackedDom$findNode$lambda(selector, this, callback, selectorSubject));
  };
  function DebuggerProtocolBackedDom$forDocumentNode$lambda(this$DebuggerProtocolBackedDom, closure$callback) {
    return function (it) {
      this$DebuggerProtocolBackedDom.documentNodeId = it.nodeId;
      closure$callback(this$DebuggerProtocolBackedDom.documentNodeId);
      return Unit;
    };
  }
  DebuggerProtocolBackedDom.prototype.forDocumentNode_0 = function (callback) {
    if (this.documentNodeId !== -1) {
      callback(this.documentNodeId);
    }
     else {
      debug.RemoteDom.getDocument_n2ffmu$(this.debuggee, DebuggerProtocolBackedDom$forDocumentNode$lambda(this, callback));
    }
  };
  function DebuggerProtocolBackedDom$setOuterHtml$lambda$lambda$lambda(this$DebuggerProtocolBackedDom) {
    return function (it) {
      this$DebuggerProtocolBackedDom.hasAngular_0 = it;
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$setOuterHtml$lambda$lambda(this$DebuggerProtocolBackedDom, closure$nodeId) {
    return function (it) {
      if (this$DebuggerProtocolBackedDom.hasAngular_0) {
        debug.RemoteDom.computeObject_df7f65$(this$DebuggerProtocolBackedDom.debuggee, closure$nodeId, "function(){if (typeof angular === 'undefined') { return false; }" + 'try {var node = this; angular.element(node).injector().invoke(function($' + 'compile) {' + 'var scope = angular.element(node).scope();' + '$' + 'compile(node)(scope);' + 'scope.$' + 'digest();' + '});' + 'return true;} catch (e) { console.log(e); return false; }}', DebuggerProtocolBackedDom$setOuterHtml$lambda$lambda$lambda(this$DebuggerProtocolBackedDom));
      }
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$setOuterHtml$lambda(closure$outerHtml, this$DebuggerProtocolBackedDom) {
    return function (nodeId) {
      this$DebuggerProtocolBackedDom.setOuterHtml_0(nodeId, closure$outerHtml, DebuggerProtocolBackedDom$setOuterHtml$lambda$lambda(this$DebuggerProtocolBackedDom, nodeId));
      return Unit;
    };
  }
  DebuggerProtocolBackedDom.prototype.setOuterHtml_a6b54s$ = function (selector, selectorSubject, outerHtml) {
    this.findNode_0(selector, selectorSubject, DebuggerProtocolBackedDom$setOuterHtml$lambda(outerHtml, this));
  };
  DebuggerProtocolBackedDom.prototype.setOuterHtml_0 = function (nodeId, outerHtml, callback) {
    if (callback === void 0)
      callback = null;
    debug.RemoteDom.setOuterHtml_lyro8t$(this.debuggee, nodeId, outerHtml, callback);
  };
  function DebuggerProtocolBackedDom$setProperty$lambda(this$DebuggerProtocolBackedDom, closure$value) {
    return function (it) {
      debug.RemoteDom.computeObject_df7f65$(this$DebuggerProtocolBackedDom.debuggee, it, "function(){this.title='" + escapeQuotes(ensureNotNull(closure$value)) + "'}");
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$setProperty$lambda$lambda(this$DebuggerProtocolBackedDom, closure$name, closure$value) {
    return function (inlineStyle, attributesStyle) {
      if (inlineStyle != null) {
        this$DebuggerProtocolBackedDom.css_0.setProperty_3vdabv$(inlineStyle, closure$name, closure$value, false);
      }
      return Unit;
    };
  }
  function DebuggerProtocolBackedDom$setProperty$lambda_0(closure$isStyle, this$DebuggerProtocolBackedDom, closure$name, closure$value) {
    return function (it) {
      if (closure$isStyle) {
        this$DebuggerProtocolBackedDom.css_0.getInlineStylesForNode_nmjw0j$(it, DebuggerProtocolBackedDom$setProperty$lambda$lambda(this$DebuggerProtocolBackedDom, closure$name, closure$value));
      }
       else {
        debug.RemoteDom.setAttributeValue_9ysi8r$(this$DebuggerProtocolBackedDom.debuggee, it, closure$name, ensureNotNull(closure$value));
      }
      return Unit;
    };
  }
  DebuggerProtocolBackedDom.prototype.setProperty_mt1oxu$ = function (selector, selectorSubject, name, value, isStyle) {
    if (equals(selector, '@title')) {
      this.forDocumentNode_0(DebuggerProtocolBackedDom$setProperty$lambda(this, value));
      return;
    }
    this.findNode_0(selector, selectorSubject, DebuggerProtocolBackedDom$setProperty$lambda_0(isStyle, this, name, value));
  };
  function DebuggerProtocolBackedDom$reloadPageIfContains$lambda(this$DebuggerProtocolBackedDom) {
    return function (it) {
      this$DebuggerProtocolBackedDom.page.reload();
      return Unit;
    };
  }
  DebuggerProtocolBackedDom.prototype.reloadPageIfContains_61zpoe$ = function (selector) {
    this.findNode_0(selector, browserConnection.SelectorSubjects.AS_IS, DebuggerProtocolBackedDom$reloadPageIfContains$lambda(this));
  };
  function DebuggerProtocolBackedDom$highlightElement$lambda(this$DebuggerProtocolBackedDom) {
    return function (it) {
      debug.RemoteDom.highlightNode_3sx3ep$(this$DebuggerProtocolBackedDom.debuggee, it);
      this$DebuggerProtocolBackedDom.lastHighlightedNodeId_0 = it;
      return Unit;
    };
  }
  DebuggerProtocolBackedDom.prototype.highlightElement_6czoem$ = function (selector, selectorSubject) {
    if (this.lastHighlightedNodeId_0 !== -1) {
      this.hideHighlight();
    }
    this.findNode_0(selector, selectorSubject, DebuggerProtocolBackedDom$highlightElement$lambda(this));
  };
  DebuggerProtocolBackedDom.prototype.hideHighlight = function () {
    if (this.documentNodeId === -1) {
      return;
    }
    debug.RemoteDom.hideHighlight_vv56hf$(this.debuggee);
    this.lastHighlightedNodeId_0 = -1;
  };
  DebuggerProtocolBackedDom.prototype.toString = function () {
    return toString(this.debuggee.tabId);
  };
  DebuggerProtocolBackedDom.$metadata$ = {kind: Kind_CLASS, simpleName: 'DebuggerProtocolBackedDom', interfaces: [Disposable, Dom]};
  function DevToolsBackedDom(port) {
    this.port = port;
  }
  DevToolsBackedDom.prototype.setOuterHtml_a6b54s$ = function (selector, selectorSubject, outerHtml) {
    this.port.postMessage(new SelectorMessage(selector));
  };
  DevToolsBackedDom.prototype.reloadPageIfContains_61zpoe$ = function (selector) {
    this.port.postMessage(new SelectorMessage(selector));
  };
  DevToolsBackedDom.prototype.setProperty_mt1oxu$ = function (selector, selectorSubject, name, value, isStyle) {
    if (isStyle) {
      return;
    }
    this.port.postMessage(new SetPropertyMessage(selector, name, value));
  };
  DevToolsBackedDom.prototype.highlightElement_6czoem$ = function (selector, selectorSubject) {
  };
  DevToolsBackedDom.prototype.hideHighlight = function () {
  };
  DevToolsBackedDom.$metadata$ = {kind: Kind_CLASS, simpleName: 'DevToolsBackedDom', interfaces: [Dom]};
  var LOG;
  var registeredContextMenuItems;
  function enableContextMenuItems(enabled) {
    var tmp$;
    tmp$ = registeredContextMenuItems.iterator();
    while (tmp$.hasNext()) {
      var id = tmp$.next();
      var obj = {};
      obj.enabled = enabled;
      update_0(id, obj);
    }
  }
  function connect$lambda$lambda$lambda(closure$socket) {
    return function () {
      closure$socket.disconnect();
      return Unit;
    };
  }
  function connect$lambda$lambda$lambda_0(closure$rpcServer) {
    return function (it) {
      closure$rpcServer.send_buzeal$('Ide', 'focusProjectWindow', JSON.stringify(it.url));
      return Unit;
    };
  }
  function connect$lambda$lambda$lambda_1() {
    disable();
    var obj = {};
    obj.title = 'Not connected';
    setTitle(obj);
    return Unit;
  }
  function connect$lambda$lambda$lambda$lambda(closure$rpcServer, closure$tab) {
    return function (it) {
      closure$rpcServer.send_buzeal$('Debugger', 'inspect', JSON.stringify(closure$tab.url) + ', ' + toString(it));
      return Unit;
    };
  }
  function connect$lambda$lambda$lambda$lambda_0(it) {
    return Unit;
  }
  function connect$lambda$lambda$lambda_2(closure$pageManager, closure$rpcServer) {
    return function (data, tab) {
      var tmp$, tmp$_0;
      if (equals(typeof (tmp$ = data.menuItemId) === 'string' ? tmp$ : throwCCE(), 'inspect')) {
        var tmp$_1 = closure$pageManager.v != null;
        if (tmp$_1) {
          var $receiver = ensureNotNull(closure$pageManager.v).devToolInspectedTabs;
          var key = ensureNotNull(tab).id;
          var tmp$_2;
          tmp$_1 = !(Kotlin.isType(tmp$_2 = $receiver, Map) ? tmp$_2 : throwCCE()).containsKey_11rb$(key);
        }
        if (tmp$_1) {
          var dom = ensureNotNull(closure$pageManager.v).findDom_3p81yu$(ensureNotNull(tab.id));
          if (dom == null || !dom.externalUsed) {
            (tmp$_0 = closure$pageManager.v) != null ? (tmp$_0.attachDebugger_hbhrwf$(tab, true, connect$lambda$lambda$lambda$lambda(closure$rpcServer, tab), connect$lambda$lambda$lambda$lambda_0), Unit) : null;
          }
        }
      }
      return Unit;
    };
  }
  function connect$lambda$lambda$lambda_3() {
    successfully();
    return Unit;
  }
  function connect$lambda$lambda$lambda_4() {
    enableContextMenuItems(false);
    return Unit;
  }
  function connect$lambda$lambda(closure$disposable, closure$socket, closure$buildInfo, closure$rpcServer, closure$appendSourceUrl, closure$pageManager, closure$host, closure$port, closure$connected) {
    return function () {
      try {
        closure$disposable.register_o14v8n$(connect$lambda$lambda$lambda(closure$socket));
        closure$pageManager.v = new ChromePageManager(closure$buildInfo, closure$rpcServer, closure$appendSourceUrl);
        registerDomService(ensureNotNull(closure$pageManager.v), closure$rpcServer);
        closure$rpcServer.registerDomain_bm4g0d$('Debugger', new ChromeDebugService(ensureNotNull(closure$pageManager.v), closure$rpcServer, closure$host, closure$port));
        closure$connected();
      }
      finally {
        enable();
        var obj = {};
        obj.title = 'Connected to ' + closure$buildInfo.name;
        setTitle(obj);
        browserActionClicked(closure$disposable, connect$lambda$lambda$lambda_0(closure$rpcServer));
        closure$disposable.register_o14v8n$(connect$lambda$lambda$lambda_1);
        if (greaterOrEquals(closure$buildInfo, 134, 312)) {
          contextMenusClicked(closure$disposable, connect$lambda$lambda$lambda_2(closure$pageManager, closure$rpcServer));
          if (registeredContextMenuItems.isEmpty()) {
            var tmp$ = registeredContextMenuItems;
            var obj_0 = {};
            var closure$buildInfo_0 = closure$buildInfo;
            var tmp$_0;
            obj_0.id = 'inspect';
            obj_0.title = 'Inspect in ' + ((tmp$_0 = closure$buildInfo_0.productName) != null ? tmp$_0 : closure$buildInfo_0.name);
            obj_0.documentUrlPatterns = ['http://*/*', 'https://*/*'];
            obj_0.contexts = ['all'];
            tmp$.add_11rb$(create_1(obj_0, connect$lambda$lambda$lambda_3));
          }
           else {
            enableContextMenuItems(true);
          }
          closure$disposable.register_o14v8n$(connect$lambda$lambda$lambda_4);
        }
      }
      return Unit;
    };
  }
  function connect$lambda$lambda_0(closure$pageManager, closure$disposable) {
    return function () {
      try {
        if (closure$pageManager.v != null) {
          ensureNotNull(closure$pageManager.v).disposeTree();
          closure$pageManager.v = null;
        }
      }
      finally {
        closure$disposable.disposeTree();
      }
      return Unit;
    };
  }
  function connect$lambda(closure$disposable, closure$buildInfo, closure$appendSourceUrl, closure$pageManager, closure$host, closure$port, closure$connected) {
    return function (socket, rpcServer) {
      socket.opened = connect$lambda$lambda(closure$disposable, socket, closure$buildInfo, rpcServer, closure$appendSourceUrl, closure$pageManager, closure$host, closure$port, closure$connected);
      socket.closed = connect$lambda$lambda_0(closure$pageManager, closure$disposable);
      return Unit;
    };
  }
  function connect_0(buildInfo, host, port, connected, disposable, appendSourceUrl) {
    var tmp$, tmp$_0;
    var pageManager = {v: null};
    tmp$ = getManifest().version;
    if (greaterOrEquals(buildInfo, 138, 1410))
      tmp$_0 = encodeURIComponent(window.navigator.userAgent);
    else if (contains(window.navigator.userAgent, '(Dart)'))
      tmp$_0 = 'DARTIUM';
    else
      tmp$_0 = 'CHROME';
    connect(tmp$, tmp$_0, host, port, -1, connect$lambda(disposable, buildInfo, appendSourceUrl, pageManager, host, port, connected));
  }
  $$importsForInline$$['browser-ext-platform'] = $module$browser_ext_platform;
  var package$com = _.com || (_.com = {});
  var package$jetbrains = package$com.jetbrains || (package$com.jetbrains = {});
  var package$browserConnection = package$jetbrains.browserConnection || (package$jetbrains.browserConnection = {});
  var package$chrome = package$browserConnection.chrome || (package$browserConnection.chrome = {});
  package$chrome.ChromeDebugService = ChromeDebugService;
  package$chrome.ChromePageManager = ChromePageManager;
  package$chrome.ChromeTabService = ChromeTabService;
  package$chrome.DebuggerProtocolBackedDom = DebuggerProtocolBackedDom;
  package$chrome.DevToolsBackedDom = DevToolsBackedDom;
  package$chrome.connect = connect_0;
  ChromePageManager.prototype.disposeTree = Disposable.prototype.disposeTree;
  ChromePageManager.prototype.register_o14v8n$ = Disposable.prototype.register_o14v8n$;
  ChromePageManager.prototype.register_l4f6h6$ = Disposable.prototype.register_l4f6h6$;
  ChromeTabService.prototype.load_nucheq$$default = TabService.prototype.load_nucheq$$default;
  ChromeTabService.prototype.query_gtonov$ = TabService.prototype.query_gtonov$;
  ChromeTabService.prototype.reload_iuyhfk$ = TabService.prototype.reload_iuyhfk$;
  ChromeTabService.prototype.updateTab_pllbul$ = TabService.prototype.updateTab_pllbul$;
  ChromeTabService.prototype.load_nucheq$ = TabService.prototype.load_nucheq$;
  DebuggerProtocolBackedDom.prototype.disposeTree = Disposable.prototype.disposeTree;
  DebuggerProtocolBackedDom.prototype.register_o14v8n$ = Disposable.prototype.register_o14v8n$;
  DebuggerProtocolBackedDom.prototype.register_l4f6h6$ = Disposable.prototype.register_l4f6h6$;
  LOG = getLogger('com.jetbrains.browserConnection.chrome');
  registeredContextMenuItems = ArrayList_init();
  return _;
}(typeof this['chrome-ext'] === 'undefined' ? {} : this['chrome-ext'], kotlin, this['browser-ext-platform'], this['jb-chrome-ext-api']);

//# sourceMappingURL=chrome-ext.js.map
