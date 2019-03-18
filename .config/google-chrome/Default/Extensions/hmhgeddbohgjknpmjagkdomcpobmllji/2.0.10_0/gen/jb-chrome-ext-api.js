if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'jb-chrome-ext-api'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'jb-chrome-ext-api'.");
}
if (typeof this['browser-ext-platform'] === 'undefined') {
  throw new Error("Error loading module 'jb-chrome-ext-api'. Its dependency 'browser-ext-platform' was not found. Please, check whether 'browser-ext-platform' is loaded prior to 'jb-chrome-ext-api'.");
}
this['jb-chrome-ext-api'] = function (_, Kotlin, $module$browser_ext_platform) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var getLogger = $module$browser_ext_platform.org.jetbrains.logging.getLogger_61zpoe$;
  var equals = Kotlin.equals;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Disposable = $module$browser_ext_platform.org.jetbrains.util.Disposable;
  var disable = chrome.browserAction.disable;
  var update = chrome.windows.update;
  var Any = Object;
  var throwCCE = Kotlin.throwCCE;
  var toString = Kotlin.toString;
  var sendCommand = chrome.debugger.sendCommand;
  var ReloadMessage = $module$browser_ext_platform.wip.page.ReloadMessage_1v8dbw$;
  var GetInlineStylesForNodeMessage = $module$browser_ext_platform.wip.css.GetInlineStylesForNodeMessage_za3lpa$;
  var SetPropertyTextMessage = $module$browser_ext_platform.wip.css.SetPropertyTextMessage_gzen9n$;
  var RGBA = $module$browser_ext_platform.wip.dom.RGBA_gb4hak$;
  var HighlightConfig = $module$browser_ext_platform.wip.dom.HighlightConfig_acyns5$;
  var jsReplace = $module$browser_ext_platform.org.jetbrains.util.jsReplace_ro6aap$;
  var ResolveNodeMessage = $module$browser_ext_platform.wip.dom.ResolveNodeMessage_za3lpa$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var RequestNodeMessage = $module$browser_ext_platform.wip.dom.RequestNodeMessage_61zpoe$;
  var QuerySelectorMessage = $module$browser_ext_platform.wip.dom.QuerySelectorMessage_19mbxw$;
  var SetAttributeValueMessage = $module$browser_ext_platform.wip.dom.SetAttributeValueMessage_s4fhmi$;
  var SetNodeValueMessage = $module$browser_ext_platform.wip.dom.SetNodeValueMessage_19mbxw$;
  var SetOuterHTMLMessage = $module$browser_ext_platform.wip.dom.SetOuterHTMLMessage_19mbxw$;
  var RequestChildNodesMessage = $module$browser_ext_platform.wip.dom.RequestChildNodesMessage_za3lpa$;
  var HighlightNodeMessage = $module$browser_ext_platform.wip.dom.HighlightNodeMessage_vux3hl$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var CallFunctionOnMessage = $module$browser_ext_platform.wip.runtime.CallFunctionOnMessage_qz9155$;
  var ReleaseObjectMessage = $module$browser_ext_platform.wip.runtime.ReleaseObjectMessage_61zpoe$;
  var Exception_init = Kotlin.kotlin.Exception_init;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  RemotePage.prototype = Object.create(RemoteCommandDomain.prototype);
  RemotePage.prototype.constructor = RemotePage;
  RemoteCss.prototype = Object.create(RemoteCommandDomain.prototype);
  RemoteCss.prototype.constructor = RemoteCss;
  RemoteDebugger.prototype = Object.create(RemoteCommandDomain.prototype);
  RemoteDebugger.prototype.constructor = RemoteDebugger;
  var LOG;
  function successfully() {
    var tmp$, tmp$_0;
    tmp$ = chrome.runtime.lastError;
    if (tmp$ == null) {
      return true;
    }
    var lastError = tmp$;
    LOG.error_61zpoe$((tmp$_0 = lastError.message) != null ? tmp$_0 : 'null');
    return false;
  }
  function get_isNormal($receiver) {
    return equals($receiver.type, 'normal');
  }
  function DisposableChromeEvent(event, listener) {
    this.event_0 = event;
    this.listener_0 = listener;
  }
  DisposableChromeEvent.prototype.dispose = function () {
    this.event_0.removeListener(this.listener_0);
  };
  DisposableChromeEvent.$metadata$ = {kind: Kind_CLASS, simpleName: 'DisposableChromeEvent', interfaces: [Disposable]};
  function browserActionClicked(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.browserAction.onClicked.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.browserAction.onClicked, listener)), Unit) : null;
  }
  function tabsUpdated(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.tabs.onUpdated.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.tabs.onUpdated, listener)), Unit) : null;
  }
  function tabsRemoved(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.tabs.onRemoved.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.tabs.onRemoved, listener)), Unit) : null;
  }
  function debuggerDetached(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.debugger.onDetach.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.debugger.onDetach, listener)), Unit) : null;
  }
  function debuggerEventEmitted(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.debugger.onEvent.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.debugger.onEvent, listener)), Unit) : null;
  }
  function runtimeConnected(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.runtime.onConnect.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.runtime.onConnect, listener)), Unit) : null;
  }
  function message($receiver, disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    $receiver.onMessage.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent($receiver.onMessage, listener)), Unit) : null;
  }
  function disconnected($receiver, disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    $receiver.onDisconnect.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent($receiver.onDisconnect, listener)), Unit) : null;
  }
  function storageChanged(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.storage.onChanged.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.storage.onChanged, listener)), Unit) : null;
  }
  function storageLocalChanged$lambda(closure$listener) {
    return function (changes, areaName) {
      if (equals(areaName, 'local')) {
        closure$listener(changes, areaName);
        disable();
      }
      return Unit;
    };
  }
  function storageLocalChanged(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    storageChanged(disposable, storageLocalChanged$lambda(listener));
  }
  function contextMenusClicked(disposable, listener) {
    if (disposable === void 0)
      disposable = null;
    chrome.contextMenus.onClicked.addListener(listener);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.contextMenus.onClicked, listener)), Unit) : null;
  }
  function webRequestBeforeRequested(disposable, filter, blocking, listener) {
    if (blocking === void 0)
      blocking = false;
    chrome.webRequest.onBeforeRequest.addListener(listener, filter, blocking ? ['blocking'] : null);
    disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.webRequest.onBeforeRequest, listener));
  }
  function webRequestHeadersReceived(disposable, filter, blocking, listener) {
    if (blocking === void 0)
      blocking = false;
    chrome.webRequest.onHeadersReceived.addListener(listener, filter, blocking ? ['blocking', 'responseHeaders'] : ['responseHeaders']);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.webRequest.onHeadersReceived, listener)), Unit) : null;
  }
  function webRequestBeforeSendHeaders(disposable, filter, blocking, listener) {
    if (blocking === void 0)
      blocking = false;
    chrome.webRequest.onBeforeSendHeaders.addListener(listener, filter, blocking ? ['blocking'] : null);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.webRequest.onBeforeSendHeaders, listener)), Unit) : null;
  }
  function webRequestCompleted(disposable, filter, listener) {
    chrome.webRequest.onCompleted.addListener(listener, filter);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.webRequest.onCompleted, listener)), Unit) : null;
  }
  function webRequestErrorOccurred(disposable, filter, listener) {
    chrome.webRequest.onErrorOccurred.addListener(listener, filter);
    disposable != null ? (disposable.register_l4f6h6$(new DisposableChromeEvent(chrome.webRequest.onErrorOccurred, listener)), Unit) : null;
  }
  function focusWindow(id) {
    var obj = {};
    obj.focused = true;
    update(id, obj);
  }
  var LOG_0;
  function sendCommand$lambda(closure$callback, closure$resultPropertyName) {
    return function (it) {
      var tmp$;
      closure$callback((tmp$ = it[closure$resultPropertyName]) == null || Kotlin.isType(tmp$, Any) ? tmp$ : throwCCE());
      return Unit;
    };
  }
  function sendCommand_0(debuggee, method, params, resultPropertyName, callback, errorCallback) {
    if (errorCallback === void 0)
      errorCallback = null;
    sendCommand_1(debuggee, method, params, errorCallback, sendCommand$lambda(callback, resultPropertyName));
  }
  function sendCommand$lambda_0(closure$debuggee, closure$method, closure$callback, closure$errorCallback) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      if (successfully()) {
        if (LOG_0.debugEnabled) {
          var m = 'DR ' + toString(closure$debuggee.tabId) + ' ' + closure$method;
          switch (closure$method) {
            case 'DOM.getDocument':
              LOG_0.debug_yhszz7$([m, (Kotlin.isType(tmp$ = it['root'], Object) ? tmp$ : throwCCE()).nodeId]);
              break;
            case 'CSS.setStyleSheetText':
              LOG_0.debug_yhszz7$([m]);
              break;
            default:LOG_0.debug_yhszz7$([m, it]);
              break;
          }
        }
        tmp$_1 = Kotlin.isType(tmp$_0 = it, Object) ? tmp$_0 : throwCCE();
        closure$callback != null ? closure$callback(tmp$_1) : null;
      }
       else {
        closure$errorCallback != null ? closure$errorCallback() : null;
      }
      return Unit;
    };
  }
  function sendCommand_1(debuggee, method, params, errorCallback, callback) {
    if (params === void 0)
      params = null;
    if (errorCallback === void 0)
      errorCallback = null;
    if (callback === void 0)
      callback = null;
    if (LOG_0.debugEnabled) {
      LOG_0.debug_yhszz7$(['DC ' + toString(debuggee.tabId) + ' ' + method + (params == null ? '' : JSON.stringify(params))]);
    }
    sendCommand(debuggee, method, params, sendCommand$lambda_0(debuggee, method, callback, errorCallback));
  }
  function RemoteCommandDomain(debuggee) {
    this.debuggee = debuggee;
    this.enabled_61rugf$_0 = false;
  }
  Object.defineProperty(RemoteCommandDomain.prototype, 'enabled', {get: function () {
    return this.enabled_61rugf$_0;
  }, set: function (enabled) {
    this.enabled_61rugf$_0 = enabled;
  }});
  RemoteCommandDomain.prototype.callWhenEnabled_o14v8n$ = function (callback) {
    if (this.enabled)
      callback();
    else
      this.enable_k1pks$(callback);
  };
  function RemoteCommandDomain$enable$lambda(this$RemoteCommandDomain, closure$callback) {
    return function (it) {
      this$RemoteCommandDomain.enabled = true;
      closure$callback != null ? closure$callback() : null;
      return Unit;
    };
  }
  RemoteCommandDomain.prototype.enable_k1pks$ = function (errorCallback, callback) {
    if (errorCallback === void 0)
      errorCallback = null;
    if (callback === void 0)
      callback = null;
    if (this.enabled) {
      callback != null ? callback() : null;
      return;
    }
    sendCommand_1(this.debuggee, this.domain + '.enable', null, errorCallback, RemoteCommandDomain$enable$lambda(this, callback));
  };
  function RemoteCommandDomain$disable$lambda(this$RemoteCommandDomain, closure$callback) {
    return function (it) {
      this$RemoteCommandDomain.enabled = false;
      closure$callback != null ? closure$callback() : null;
      return Unit;
    };
  }
  RemoteCommandDomain.prototype.disable_yo2cqg$ = function (callback) {
    if (callback === void 0)
      callback = null;
    if (this.enabled) {
      sendCommand_1(this.debuggee, this.domain + '.disable', null, callback, RemoteCommandDomain$disable$lambda(this, callback));
    }
  };
  RemoteCommandDomain.$metadata$ = {kind: Kind_CLASS, simpleName: 'RemoteCommandDomain', interfaces: []};
  function RemotePage(debuggee) {
    RemoteCommandDomain.call(this, debuggee);
  }
  Object.defineProperty(RemotePage.prototype, 'domain', {get: function () {
    return 'Page';
  }});
  RemotePage.prototype.reload = function () {
    sendCommand_1(this.debuggee, this.domain + '.reload', ReloadMessage(true));
  };
  RemotePage.$metadata$ = {kind: Kind_CLASS, simpleName: 'RemotePage', interfaces: [RemoteCommandDomain]};
  function RemoteCss(debuggee) {
    RemoteCommandDomain.call(this, debuggee);
  }
  Object.defineProperty(RemoteCss.prototype, 'domain', {get: function () {
    return 'CSS';
  }});
  function RemoteCss$getInlineStylesForNode$lambda$lambda(closure$callback) {
    return function (it) {
      var tmp$, tmp$_0;
      closure$callback(Kotlin.isType(tmp$ = it['inlineStyle'], Object) ? tmp$ : throwCCE(), Kotlin.isType(tmp$_0 = it['attributesStyle'], Object) ? tmp$_0 : throwCCE());
      return Unit;
    };
  }
  function RemoteCss$getInlineStylesForNode$lambda(this$RemoteCss, closure$nodeId, closure$callback) {
    return function () {
      sendCommand_1(this$RemoteCss.debuggee, 'CSS.getInlineStylesForNode', GetInlineStylesForNodeMessage(closure$nodeId), void 0, RemoteCss$getInlineStylesForNode$lambda$lambda(closure$callback));
      return Unit;
    };
  }
  RemoteCss.prototype.getInlineStylesForNode_nmjw0j$ = function (nodeId, callback) {
    this.callWhenEnabled_o14v8n$(RemoteCss$getInlineStylesForNode$lambda(this, nodeId, callback));
  };
  RemoteCss.prototype.setProperty_3vdabv$ = function (style, name, value, onlyExisting) {
    var tmp$, tmp$_0;
    var overwrite = false;
    var index = 0;
    tmp$ = style.cssProperties;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var property = tmp$[tmp$_0];
      if (equals(property.name, name)) {
        overwrite = true;
        break;
      }
      index = index + 1 | 0;
    }
    if (!overwrite && onlyExisting) {
      return false;
    }
    this.setProperty_0(style.styleId, index, name, value, overwrite);
    return true;
  };
  function RemoteCss$setProperty$lambda(closure$propertyIndex, closure$name, closure$value) {
    return function (it) {
      var property = it.cssProperties[closure$propertyIndex];
      var parsedOk = property.parsedOk;
      if (parsedOk != null && !parsedOk) {
        LOG_0.error_61zpoe$('parsedOk false for set css property, actual text: ' + toString(property.text) + ' passed name: ' + closure$name + ', actual name: ' + property.name + ', passed value: ' + toString(closure$value) + ', actual value: ' + property.value);
      }
      return Unit;
    };
  }
  RemoteCss.prototype.setProperty_0 = function (styleId, propertyIndex, name, value, overwrite) {
    var v = value == null ? '' : value;
    sendCommand_0(this.debuggee, 'CSS.setPropertyText', SetPropertyTextMessage(styleId, propertyIndex, name + ': ' + v + ';', overwrite), 'style', RemoteCss$setProperty$lambda(propertyIndex, name, value), null);
  };
  RemoteCss.$metadata$ = {kind: Kind_CLASS, simpleName: 'RemoteCss', interfaces: [RemoteCommandDomain]};
  var HIGHLIGHT_CONFIG;
  function escapeQuotes($receiver) {
    return jsReplace($receiver, new RegExp('(\'|")', 'g'), '\\$1');
  }
  function RemoteDom() {
    RemoteDom_instance = this;
  }
  RemoteDom.prototype.resolveNode_b5gy8v$ = function (debuggee, nodeId, callback) {
    sendCommand_0(debuggee, 'DOM.resolveNode', ResolveNodeMessage(nodeId), 'object', callback);
  };
  function RemoteDom$callFunctionOn$lambda$lambda(closure$disposer, closure$callback) {
    return function (remoteObject) {
      closure$disposer.add_srzb6d$(remoteObject);
      closure$callback(remoteObject, closure$disposer);
      return Unit;
    };
  }
  function RemoteDom$callFunctionOn$lambda(closure$debuggee, closure$functionDeclaration, closure$callback) {
    return function (remoteObject) {
      var disposer = new Disposer(closure$debuggee);
      disposer.add_srzb6d$(remoteObject);
      RemoteRuntime_getInstance().callFunctionOn_c6g62u$(closure$debuggee, ensureNotNull(remoteObject.objectId), closure$functionDeclaration, RemoteDom$callFunctionOn$lambda$lambda(disposer, closure$callback), disposer.releaseCallback);
      return Unit;
    };
  }
  RemoteDom.prototype.callFunctionOn_52u0fh$ = function (debuggee, nodeId, functionDeclaration, callback) {
    this.resolveNode_b5gy8v$(debuggee, nodeId, RemoteDom$callFunctionOn$lambda(debuggee, functionDeclaration, callback));
  };
  function RemoteDom$computeObject$lambda(closure$callback) {
    return function (remoteObject, disposer) {
      var tmp$;
      disposer.release();
      if (closure$callback != null) {
        closure$callback((tmp$ = remoteObject.value) == null || Kotlin.isType(tmp$, Any) ? tmp$ : throwCCE());
      }
      return Unit;
    };
  }
  RemoteDom.prototype.computeObject_df7f65$ = function (debuggee, nodeId, functionDeclaration, callback) {
    if (callback === void 0)
      callback = null;
    this.callFunctionOn_52u0fh$(debuggee, nodeId, functionDeclaration, RemoteDom$computeObject$lambda(callback));
  };
  function RemoteDom$computeNode$lambda$lambda(closure$disposer, closure$callback) {
    return function (nodeId) {
      closure$disposer.release();
      closure$callback(nodeId);
      return Unit;
    };
  }
  function RemoteDom$computeNode$lambda(closure$debuggee, closure$callback, this$RemoteDom) {
    return function (remoteObject, disposer) {
      this$RemoteDom.requestNode_1qfmu4$(closure$debuggee, ensureNotNull(remoteObject.objectId), RemoteDom$computeNode$lambda$lambda(disposer, closure$callback), disposer.releaseCallback);
      return Unit;
    };
  }
  RemoteDom.prototype.computeNode_mo48qs$ = function (debuggee, nodeId, functionDeclaration, callback) {
    this.callFunctionOn_52u0fh$(debuggee, nodeId, functionDeclaration, RemoteDom$computeNode$lambda(debuggee, callback, this));
  };
  RemoteDom.prototype.requestNode_1qfmu4$ = function (debuggee, objectId, callback, errorCallback) {
    if (errorCallback === void 0)
      errorCallback = null;
    sendCommand_0(debuggee, 'DOM.requestNode', RequestNodeMessage(objectId), 'nodeId', callback, errorCallback);
  };
  RemoteDom.prototype.getDocument_n2ffmu$ = function (debuggee, callback) {
    sendCommand_0(debuggee, 'DOM.getDocument', null, 'root', callback);
  };
  function RemoteDom$querySelector$lambda(closure$callback) {
    return function (nodeId) {
      closure$callback(nodeId == null || nodeId === 0 ? -1 : nodeId);
      return Unit;
    };
  }
  RemoteDom.prototype.querySelector_mo48qs$ = function (debuggee, nodeId, selector, callback) {
    sendCommand_0(debuggee, 'DOM.querySelector', QuerySelectorMessage(nodeId, selector), 'nodeId', RemoteDom$querySelector$lambda(callback));
  };
  RemoteDom.prototype.setAttributeValue_9ysi8r$ = function (debuggee, nodeId, name, value) {
    sendCommand_1(debuggee, 'DOM.setAttributeValue', SetAttributeValueMessage(nodeId, name, value));
  };
  RemoteDom.prototype.setNodeValue_n16f2r$ = function (debuggee, nodeId, value) {
    sendCommand_1(debuggee, 'DOM.setNodeValue', SetNodeValueMessage(nodeId, value));
  };
  RemoteDom.prototype.setOuterHtml_lyro8t$ = function (debuggee, nodeId, outerHtml, callback) {
    if (callback === void 0)
      callback = null;
    sendCommand_1(debuggee, 'DOM.setOuterHTML', SetOuterHTMLMessage(nodeId, outerHtml), null, callback);
  };
  RemoteDom.prototype.requestChildNodes_3sx3ep$ = function (debuggee, nodeId) {
    sendCommand_1(debuggee, 'DOM.requestChildNodes', RequestChildNodesMessage(nodeId));
  };
  RemoteDom.prototype.highlightNode_3sx3ep$ = function (debuggee, nodeId) {
    sendCommand_1(debuggee, 'DOM.highlightNode', HighlightNodeMessage(nodeId, HIGHLIGHT_CONFIG));
  };
  RemoteDom.prototype.hideHighlight_vv56hf$ = function (debuggee) {
    sendCommand_1(debuggee, 'DOM.hideHighlight');
  };
  RemoteDom.$metadata$ = {kind: Kind_OBJECT, simpleName: 'RemoteDom', interfaces: []};
  var RemoteDom_instance = null;
  function RemoteDom_getInstance() {
    if (RemoteDom_instance === null) {
      new RemoteDom();
    }
    return RemoteDom_instance;
  }
  function RemoteDebugger(debuggee) {
    RemoteCommandDomain.call(this, debuggee);
  }
  Object.defineProperty(RemoteDebugger.prototype, 'domain', {get: function () {
    return 'Debugger';
  }});
  RemoteDebugger.$metadata$ = {kind: Kind_CLASS, simpleName: 'RemoteDebugger', interfaces: [RemoteCommandDomain]};
  function RemoteRuntime() {
    RemoteRuntime_instance = this;
  }
  RemoteRuntime.prototype.callFunctionOn_c6g62u$ = function (debuggee, objectId, functionDeclaration, callback, errorCallback, args, returnByValue) {
    if (errorCallback === void 0)
      errorCallback = null;
    if (args === void 0)
      args = null;
    if (returnByValue === void 0)
      returnByValue = false;
    sendCommand_0(debuggee, 'Runtime.callFunctionOn', CallFunctionOnMessage(objectId, functionDeclaration, returnByValue), 'result', callback, errorCallback);
  };
  RemoteRuntime.prototype.releaseObject_f1vsjj$ = function (debuggee, objectId) {
    sendCommand_1(debuggee, 'Runtime.releaseObject', ReleaseObjectMessage(objectId));
  };
  RemoteRuntime.$metadata$ = {kind: Kind_OBJECT, simpleName: 'RemoteRuntime', interfaces: []};
  var RemoteRuntime_instance = null;
  function RemoteRuntime_getInstance() {
    if (RemoteRuntime_instance === null) {
      new RemoteRuntime();
    }
    return RemoteRuntime_instance;
  }
  function Disposer(debuggee) {
    this.debuggee = debuggee;
    this.ids_0 = ArrayList_init();
    this.released_0 = false;
    this.releaseCallback = Disposer$releaseCallback$lambda(this);
  }
  Disposer.prototype.add_srzb6d$ = function (remoteObject) {
    if (this.released_0) {
      throw Exception_init();
    }
    var objectId = remoteObject.objectId;
    if (objectId != null) {
      this.ids_0.add_11rb$(objectId);
    }
  };
  Disposer.prototype.release = function () {
    this.releaseCallback();
  };
  function Disposer$releaseCallback$lambda(this$Disposer) {
    return function () {
      var tmp$;
      if (this$Disposer.released_0) {
        throw Exception_init();
      }
      this$Disposer.released_0 = true;
      tmp$ = this$Disposer.ids_0.iterator();
      while (tmp$.hasNext()) {
        var id = tmp$.next();
        RemoteRuntime_getInstance().releaseObject_f1vsjj$(this$Disposer.debuggee, id);
      }
      return Unit;
    };
  }
  Disposer.$metadata$ = {kind: Kind_CLASS, simpleName: 'Disposer', interfaces: []};
  var package$org = _.org || (_.org = {});
  var package$jetbrains = package$org.jetbrains || (package$org.jetbrains = {});
  var package$chrome = package$jetbrains.chrome || (package$jetbrains.chrome = {});
  package$chrome.successfully = successfully;
  package$chrome.get_isNormal_z8zl4w$ = get_isNormal;
  package$chrome.browserActionClicked_qo3us1$ = browserActionClicked;
  package$chrome.tabsUpdated_68tacu$ = tabsUpdated;
  package$chrome.tabsRemoved_j4naqd$ = tabsRemoved;
  package$chrome.debuggerDetached_v7nyhc$ = debuggerDetached;
  package$chrome.debuggerEventEmitted_8wvdox$ = debuggerEventEmitted;
  package$chrome.runtimeConnected_e9ms59$ = runtimeConnected;
  package$chrome.message_qla3q$ = message;
  package$chrome.disconnected_baxt95$ = disconnected;
  package$chrome.storageChanged_6rodtz$ = storageChanged;
  package$chrome.storageLocalChanged_6rodtz$ = storageLocalChanged;
  package$chrome.contextMenusClicked_qed3y4$ = contextMenusClicked;
  package$chrome.webRequestBeforeRequested_hvk052$ = webRequestBeforeRequested;
  package$chrome.webRequestHeadersReceived_9bs5gk$ = webRequestHeadersReceived;
  package$chrome.webRequestBeforeSendHeaders_uibj4l$ = webRequestBeforeSendHeaders;
  package$chrome.webRequestCompleted_ql7z06$ = webRequestCompleted;
  package$chrome.webRequestErrorOccurred_3509xg$ = webRequestErrorOccurred;
  $$importsForInline$$['browser-ext-platform'] = $module$browser_ext_platform;
  package$chrome.focusWindow_3p81yu$ = focusWindow;
  var package$chromium = package$jetbrains.chromium || (package$jetbrains.chromium = {});
  var package$debug = package$chromium.debug || (package$chromium.debug = {});
  package$debug.sendCommand_8h75pg$ = sendCommand_0;
  package$debug.sendCommand_6wpb1z$ = sendCommand_1;
  package$debug.RemoteCommandDomain = RemoteCommandDomain;
  package$debug.RemotePage = RemotePage;
  package$debug.RemoteCss = RemoteCss;
  package$debug.escapeQuotes_pdl1vz$ = escapeQuotes;
  Object.defineProperty(package$debug, 'RemoteDom', {get: RemoteDom_getInstance});
  package$debug.RemoteDebugger = RemoteDebugger;
  Object.defineProperty(package$debug, 'RemoteRuntime', {get: RemoteRuntime_getInstance});
  package$debug.Disposer = Disposer;
  DisposableChromeEvent.prototype.disposeTree = Disposable.prototype.disposeTree;
  DisposableChromeEvent.prototype.register_o14v8n$ = Disposable.prototype.register_o14v8n$;
  DisposableChromeEvent.prototype.register_l4f6h6$ = Disposable.prototype.register_l4f6h6$;
  LOG = getLogger('org.jetbrains.chrome');
  LOG_0 = getLogger('org.jetbrains.chromium.debug');
  HIGHLIGHT_CONFIG = HighlightConfig(RGBA(111, 168, 220, 0.66), RGBA(147, 196, 125, 0.55), RGBA(255, 229, 153, 0.66), RGBA(246, 178, 107, 0.66), true);
  return _;
}(typeof this['jb-chrome-ext-api'] === 'undefined' ? {} : this['jb-chrome-ext-api'], kotlin, this['browser-ext-platform']);

//# sourceMappingURL=jb-chrome-ext-api.js.map
