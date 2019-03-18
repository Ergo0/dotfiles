if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'browser-ext-platform'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'browser-ext-platform'.");
}
this['browser-ext-platform'] = function (_, Kotlin) {
  'use strict';
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Exception_init = Kotlin.kotlin.Exception_init_pdl1vj$;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Throwable = Error;
  var equals = Kotlin.equals;
  var toString = Kotlin.toString;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;
  var HashSet_init = Kotlin.kotlin.collections.HashSet_init_287e2$;
  var IllegalStateException_init = Kotlin.kotlin.IllegalStateException_init_pdl1vj$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Exception_init_0 = Kotlin.kotlin.Exception_init;
  var throwCCE = Kotlin.throwCCE;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var toShort = Kotlin.toShort;
  var Exception = Kotlin.kotlin.Exception;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  var contains_0 = Kotlin.kotlin.text.contains_li3zpu$;
  var endsWith = Kotlin.kotlin.text.endsWith_7epoxm$;
  var getCallableRef = Kotlin.getCallableRef;
  var matches = Kotlin.kotlin.text.matches_rjktp$;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var wrapFunction = Kotlin.wrapFunction;
  WindowTimer.prototype = Object.create(Timer.prototype);
  WindowTimer.prototype.constructor = WindowTimer;
  var LOG;
  function QueueProcessor(processor) {
    this.processor_0 = processor;
    this.queue_0 = ArrayList_init();
    this.processing_0 = false;
    this.done_0 = QueueProcessor$done$lambda(this);
  }
  QueueProcessor.prototype.add_11rb$ = function (item) {
    this.queue_0.add_11rb$(item);
    if (!this.processing_0) {
      this.processing_0 = true;
      this.process_0(item);
    }
  };
  QueueProcessor.prototype.process_0 = function (item) {
    this.processor_0(item, this.done_0);
  };
  function QueueProcessor$done$lambda(this$QueueProcessor) {
    return function () {
      if (!this$QueueProcessor.processing_0) {
        throw Exception_init('processing must be true');
      }
      this$QueueProcessor.queue_0.removeAt_za3lpa$(0);
      if (this$QueueProcessor.queue_0.isEmpty()) {
        this$QueueProcessor.processing_0 = false;
      }
       else {
        this$QueueProcessor.process_0(this$QueueProcessor.queue_0.get_za3lpa$(0));
      }
      return Unit;
    };
  }
  QueueProcessor.$metadata$ = {kind: Kind_CLASS, simpleName: 'QueueProcessor', interfaces: []};
  function TabService() {
  }
  TabService.prototype.query_gtonov$ = function (errorCallback, callback, callback$default) {
    if (errorCallback === void 0)
      errorCallback = null;
    callback$default ? callback$default(errorCallback, callback) : this.query_gtonov$$default(errorCallback, callback);
  };
  TabService.prototype.reload_iuyhfk$ = function (tab, bypassCache, callback$default) {
    if (bypassCache === void 0)
      bypassCache = true;
    callback$default ? callback$default(tab, bypassCache) : this.reload_iuyhfk$$default(tab, bypassCache);
  };
  function TabService$load$lambda(closure$callback) {
    return function (t) {
      closure$callback(t, true);
    };
  }
  TabService.prototype.load_nucheq$$default = function (url, uriToOpen, existingTab, newTab, focusWindow, errorCallback, callback) {
    var normalizedUriToOpen = uriToOpen != null ? uriToOpen : url;
    if (existingTab == null) {
      if (newTab == null) {
        this.createTab_vz3n90$(normalizedUriToOpen, focusWindow, callback == null ? null : TabService$load$lambda(callback));
      }
       else {
        this.updateTab_pllbul$(newTab, normalizedUriToOpen, focusWindow, errorCallback, callback);
      }
    }
     else {
      this.updateTab_pllbul$(existingTab, uriToOpen, focusWindow, errorCallback, callback);
    }
  };
  TabService.prototype.load_nucheq$ = function (url, uriToOpen, existingTab, newTab, focusWindow, errorCallback, callback, callback$default) {
    if (errorCallback === void 0)
      errorCallback = null;
    callback$default ? callback$default(url, uriToOpen, existingTab, newTab, focusWindow, errorCallback, callback) : this.load_nucheq$$default(url, uriToOpen, existingTab, newTab, focusWindow, errorCallback, callback);
  };
  TabService.prototype.updateTab_pllbul$ = function (tab, uri, focusWindow, errorCallback, callback, callback$default) {
    if (errorCallback === void 0)
      errorCallback = null;
    callback$default ? callback$default(tab, uri, focusWindow, errorCallback, callback) : this.updateTab_pllbul$$default(tab, uri, focusWindow, errorCallback, callback);
  };
  TabService.$metadata$ = {kind: Kind_INTERFACE, simpleName: 'TabService', interfaces: []};
  var LOG_0;
  function Disposable() {
  }
  Disposable.prototype.register_o14v8n$ = function (dispose) {
    disposer_getInstance().register_akikjb$(this, dispose);
  };
  Disposable.prototype.register_l4f6h6$ = function (child) {
    disposer_getInstance().register_3ytrl4$(this, child);
  };
  Disposable.prototype.disposeTree = function () {
    disposer_getInstance().dispose_7nwg3n$(this);
  };
  Disposable.$metadata$ = {kind: Kind_INTERFACE, simpleName: 'Disposable', interfaces: []};
  function ObjectNode(tree, parent, o) {
    this.tree_0 = tree;
    this.o = o;
    this.parent_obf95f$_0 = parent;
    this.children_0 = null;
  }
  Object.defineProperty(ObjectNode.prototype, 'parent', {get: function () {
    return this.parent_obf95f$_0;
  }, set: function (parent) {
    this.parent_obf95f$_0 = parent;
  }});
  ObjectNode.prototype.removeChild_fe3guo$ = function (child) {
    var index = ensureNotNull(this.children_0).lastIndexOf_11rb$(child);
    if (index !== -1) {
      ensureNotNull(this.children_0).removeAt_za3lpa$(index);
    }
  };
  ObjectNode.prototype.addChild_fe3guo$ = function (child) {
    if (this.children_0 == null) {
      this.children_0 = ArrayList_init();
    }
    ensureNotNull(this.children_0).add_11rb$(child);
    child.parent = this;
  };
  function ObjectNode$execute$lambda(this$ObjectNode, closure$disposeTree, closure$action) {
    return function (it) {
      var tmp$;
      var list = this$ObjectNode.children_0;
      if (list != null) {
        var n = list.size;
        while ((tmp$ = n, n = tmp$ - 1 | 0, tmp$) > 0) {
          list.get_za3lpa$(n).execute_hryzrn$(closure$disposeTree, closure$action);
        }
      }
      if (closure$disposeTree) {
        this$ObjectNode.children_0 = null;
      }
      try {
        closure$action(this$ObjectNode.o);
      }
       catch (e) {
        if (Kotlin.isType(e, Throwable)) {
          LOG_0.error_tcv7n7$(e);
        }
         else
          throw e;
      }
      if (closure$disposeTree) {
        this$ObjectNode.remove_0();
      }
      return Unit;
    };
  }
  ObjectNode.prototype.execute_hryzrn$ = function (disposeTree, action) {
    executeActionWithRecursiveGuard(this, this.tree_0.executedNodes, ObjectNode$execute$lambda(this, disposeTree, action));
  };
  ObjectNode.prototype.remove_0 = function () {
    this.tree_0.objectToNodeMap.remove_11rb$(this.o);
    if (this.parent == null) {
      this.tree_0.rootObjects.remove_11rb$(this.o);
    }
     else {
      ensureNotNull(this.parent).removeChild_fe3guo$(this);
    }
  };
  ObjectNode.$metadata$ = {kind: Kind_CLASS, simpleName: 'ObjectNode', interfaces: []};
  function executeActionWithRecursiveGuard(o, recursiveGuard, action) {
    if (recursiveGuard.indexOf_11rb$(o) !== -1) {
      return;
    }
    recursiveGuard.add_11rb$(o);
    try {
      action(o);
    }
    finally {
      recursiveGuard.remove_11rb$(o);
    }
  }
  function ObjectTree() {
    this.objectToNodeMap = HashMap_init();
    this.rootObjects = HashSet_init();
    this.executedUnregisteredNodes_0 = ArrayList_init();
    this.executedNodes = ArrayList_init();
  }
  ObjectTree.prototype.register_jav50q$ = function (parent, child) {
    var tmp$;
    var parentNode = this.getOrCreateNodeFor_0(parent, null);
    var childNode = this.objectToNodeMap.get_11rb$(child);
    if (childNode == null) {
      childNode = this.createNodeFor_0(child, parentNode);
    }
     else {
      (tmp$ = childNode.parent) != null ? (tmp$.removeChild_fe3guo$(childNode), Unit) : null;
    }
    this.rootObjects.remove_11rb$(child);
    this.checkWasNotAddedAlready_0(childNode, child);
    parentNode.addChild_fe3guo$(childNode);
  };
  ObjectTree.prototype.getOrCreateNodeFor_0 = function (o, defaultParent) {
    var node = this.objectToNodeMap.get_11rb$(o);
    if (node != null) {
      return node;
    }
    return this.createNodeFor_0(o, defaultParent);
  };
  ObjectTree.prototype.createNodeFor_0 = function (o, parentNode) {
    var node = new ObjectNode(this, parentNode, o);
    if (parentNode == null) {
      this.rootObjects.add_11rb$(o);
    }
    this.objectToNodeMap.put_xwzc9p$(o, node);
    return node;
  };
  ObjectTree.prototype.checkWasNotAddedAlready_0 = function (childNode, child) {
    var parent = childNode.parent;
    while (parent != null) {
      if (equals(parent.o, child)) {
        LOG_0.error_61zpoe$(' was already added as a child of: ' + toString(parent));
      }
      parent = parent.parent;
    }
  };
  ObjectTree.prototype.executeUnregistered_0 = function (o, action) {
    executeActionWithRecursiveGuard(o, this.executedUnregisteredNodes_0, action);
  };
  ObjectTree.prototype.executeAll_9apn97$ = function (o, disposeTree, action, processUnregistered) {
    var node = this.objectToNodeMap.get_11rb$(o);
    if (node == null) {
      if (processUnregistered) {
        this.executeUnregistered_0(o, action);
        return true;
      }
       else {
        return false;
      }
    }
    node.execute_hryzrn$(disposeTree, action);
    return true;
  };
  ObjectTree.$metadata$ = {kind: Kind_CLASS, simpleName: 'ObjectTree', interfaces: []};
  function newDisposable$ObjectLiteral() {
  }
  newDisposable$ObjectLiteral.prototype.dispose = function () {
  };
  newDisposable$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: [Disposable]};
  function newDisposable() {
    return new newDisposable$ObjectLiteral();
  }
  function disposer() {
    disposer_instance = this;
    this.tree_0 = new ObjectTree();
    this.disposeAction_0 = disposer$disposeAction$lambda;
  }
  function disposer$register$ObjectLiteral(closure$dispose) {
    this.closure$dispose = closure$dispose;
  }
  disposer$register$ObjectLiteral.prototype.dispose = function () {
    this.closure$dispose();
  };
  disposer$register$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: [Disposable]};
  disposer.prototype.register_akikjb$ = function (parent, dispose) {
    this.tree_0.register_jav50q$(parent, new disposer$register$ObjectLiteral(dispose));
  };
  disposer.prototype.register_3ytrl4$ = function (parent, child) {
    if (equals(parent, child)) {
      throw IllegalStateException_init('Cannot register to itself');
    }
    this.tree_0.register_jav50q$(parent, child);
  };
  disposer.prototype.dispose_7nwg3n$ = function (disposable, processUnregistered) {
    if (processUnregistered === void 0)
      processUnregistered = true;
    this.tree_0.executeAll_9apn97$(disposable, true, this.disposeAction_0, processUnregistered);
  };
  function disposer$disposeAction$lambda(o) {
    o.dispose();
  }
  disposer.$metadata$ = {kind: Kind_OBJECT, simpleName: 'disposer', interfaces: []};
  var disposer_instance = null;
  function disposer_getInstance() {
    if (disposer_instance === null) {
      new disposer();
    }
    return disposer_instance;
  }
  function SelectorSubjects() {
    SelectorSubjects_instance = this;
    this.AS_IS = new SelectorSubject();
    this.PARENT = new SelectorSubject();
    this.HTML = new SelectorSubject();
  }
  SelectorSubjects.prototype.valueOf_za3lpa$ = function (ordinal) {
    switch (ordinal) {
      case 0:
        return SelectorSubjects_getInstance().AS_IS;
      case 1:
        return SelectorSubjects_getInstance().PARENT;
      case 2:
        return SelectorSubjects_getInstance().HTML;
      default:throw Exception_init_0();
    }
  };
  SelectorSubjects.$metadata$ = {kind: Kind_OBJECT, simpleName: 'SelectorSubjects', interfaces: []};
  var SelectorSubjects_instance = null;
  function SelectorSubjects_getInstance() {
    if (SelectorSubjects_instance === null) {
      new SelectorSubjects();
    }
    return SelectorSubjects_instance;
  }
  function SelectorSubject() {
  }
  SelectorSubject.$metadata$ = {kind: Kind_CLASS, simpleName: 'SelectorSubject', interfaces: []};
  function Dom() {
  }
  Dom.$metadata$ = {kind: Kind_INTERFACE, simpleName: 'Dom', interfaces: []};
  function DomService(pageManager) {
    this.pageManager_0 = pageManager;
  }
  DomService.prototype.execute_0 = function (projectId, handler) {
    var tmp$;
    if (typeof projectId === 'string') {
      this.pageManager_0.execute_pyo6iy$(projectId, handler);
    }
     else {
      this.pageManager_0.executeForTabById_pjak46$(typeof (tmp$ = projectId) === 'number' ? tmp$ : throwCCE(), true, handler);
    }
  };
  function DomService$setProperty$lambda(closure$selector, closure$selectorSubjectOrdinal, closure$name, closure$value, closure$isStyle) {
    return function (it) {
      it.setProperty_mt1oxu$(closure$selector, SelectorSubjects_getInstance().valueOf_za3lpa$(closure$selectorSubjectOrdinal), closure$name, closure$value, closure$isStyle);
      return Unit;
    };
  }
  DomService.prototype.setProperty = function (projectId, selector, selectorSubjectOrdinal, name, value, isStyle) {
    this.execute_0(projectId, DomService$setProperty$lambda(selector, selectorSubjectOrdinal, name, value, isStyle));
  };
  function DomService$setOuterHtml$lambda(closure$selector, closure$selectorSubjectOrdinal, closure$value) {
    return function (it) {
      it.setOuterHtml_a6b54s$(closure$selector, SelectorSubjects_getInstance().valueOf_za3lpa$(closure$selectorSubjectOrdinal), closure$value);
      return Unit;
    };
  }
  DomService.prototype.setOuterHtml = function (projectId, selector, selectorSubjectOrdinal, value) {
    this.execute_0(projectId, DomService$setOuterHtml$lambda(selector, selectorSubjectOrdinal, value));
  };
  function DomService$reloadPagesContainingElement$lambda(closure$selector) {
    return function (it) {
      it.reloadPageIfContains_61zpoe$(closure$selector);
      return Unit;
    };
  }
  DomService.prototype.reloadPagesContainingElement = function (projectId, selector) {
    this.execute_0(projectId, DomService$reloadPagesContainingElement$lambda(selector));
  };
  function DomService$openUrl$lambda(this$DomService) {
    return function (tab, created) {
      if (!created) {
        this$DomService.pageManager_0.tabService.reload_iuyhfk$(tab);
      }
      return Unit;
    };
  }
  DomService.prototype.openUrl = function (url) {
    this.pageManager_0.getOrCreateTab_z105ws$(url, void 0, void 0, void 0, DomService$openUrl$lambda(this));
  };
  function DomService$highlightElement$lambda(closure$selector, closure$selectorSubject) {
    return function (it) {
      it.highlightElement_6czoem$(closure$selector, closure$selectorSubject);
      return Unit;
    };
  }
  DomService.prototype.highlightElement = function (projectId, selector, selectorSubjectOrdinal) {
    var selectorSubject = SelectorSubjects_getInstance().valueOf_za3lpa$(selectorSubjectOrdinal);
    this.execute_0(projectId, DomService$highlightElement$lambda(selector, selectorSubject));
  };
  function DomService$hideHighlight$lambda(it) {
    it.hideHighlight();
    return Unit;
  }
  DomService.prototype.hideHighlight = function (tabId) {
    var tabIdOrDefault = tabId === null || tabId === undefined ? -1 : tabId;
    var handler = DomService$hideHighlight$lambda;
    if (tabIdOrDefault === -1) {
      this.pageManager_0.execute_24t5b2$(null, true, handler);
    }
     else {
      this.pageManager_0.executeForTabById_pjak46$(tabId, true, handler);
    }
  };
  DomService.$metadata$ = {kind: Kind_CLASS, simpleName: 'DomService', interfaces: []};
  var queryOrFragmentRegExp;
  function trimQueryOrFragment($receiver) {
    return jsReplace($receiver, queryOrFragmentRegExp, '');
  }
  function get_isDataUri($receiver) {
    return startsWith($receiver, 'data:');
  }
  function get_asParsedUrl($receiver) {
    return parseUrl($receiver);
  }
  var LOG_1;
  function JsonRpcServer(socket) {
    this.socket_0 = socket;
    this.messageIdCounter_0 = 0;
    this.callbacks_0 = HashMap_init();
    this.domains_0 = HashMap_init();
    this.socket_0.message = JsonRpcServer_init$lambda(this);
  }
  JsonRpcServer.prototype.safeGet_0 = function (a, index) {
    var tmp$;
    return index < a.length ? Kotlin.isArray(tmp$ = a[index]) ? tmp$ : throwCCE() : null;
  };
  JsonRpcServer.prototype.registerDomain_bm4g0d$ = function (name, commands) {
    if (this.domains_0.containsKey_11rb$(name)) {
      throw Exception_init_0();
    }
    this.domains_0.put_xwzc9p$(name, commands);
  };
  JsonRpcServer.prototype.send_buzeal$ = function (domain, command, encodedMessage) {
    if (encodedMessage === void 0)
      encodedMessage = null;
    this.send_vdb88t$(domain, command, encodedMessage, null);
  };
  JsonRpcServer.prototype.send_vdb88t$ = function (domain, command, encodedMessage, callback) {
    if (encodedMessage === void 0)
      encodedMessage = null;
    if (callback === void 0)
      callback = null;
    var tmp$, tmp$_0;
    var message = '[';
    if (callback != null) {
      var id = (tmp$ = this.messageIdCounter_0, this.messageIdCounter_0 = tmp$ + 1 | 0, tmp$);
      this.callbacks_0.put_xwzc9p$(id, typeof (tmp$_0 = callback) === 'function' ? tmp$_0 : throwCCE());
      message += id.toString() + ', ';
    }
    message += '"' + domain + '"' + ', ' + '"' + command + '"';
    if (encodedMessage != null) {
      message += ', ' + toString(encodedMessage);
    }
    message += ']';
    this.socket_0.send_61zpoe$(message);
  };
  JsonRpcServer.prototype.send_kyzpwe$ = function (domain, message) {
    this.send_vdb88t$(domain, message.method, message.toString(), null);
  };
  JsonRpcServer.prototype.send_dk4oim$ = function (domain, message, callback) {
    if (callback === void 0)
      callback = null;
    this.send_vdb88t$(domain, message.method, message.toString(), callback);
  };
  function JsonRpcServer_init$lambda$lambda(this$JsonRpcServer, closure$id) {
    return function (result) {
      this$JsonRpcServer.socket_0.send_61zpoe$('[' + closure$id + ', ' + '"' + 'r' + '"' + ', ' + JSON.stringify(result) + ']');
    };
  }
  function JsonRpcServer_init$lambda$lambda_0(this$JsonRpcServer, closure$id) {
    return function (it) {
      this$JsonRpcServer.socket_0.send_61zpoe$('[' + closure$id + ', ' + '"' + 'e' + '"' + ', ' + JSON.stringify(it) + ']');
      return Unit;
    };
  }
  var Map = Kotlin.kotlin.collections.Map;
  var Array_0 = Array;
  function JsonRpcServer_init$lambda(this$JsonRpcServer) {
    return function (message) {
      var tmp$, tmp$_0, tmp$_1;
      if (LOG_1.debugEnabled) {
        LOG_1.debug_yhszz7$(['IN ' + message]);
      }
      var data = JSON.parse(message);
      if (data.length === 1 || (data.length === 2 && !(typeof data[1] === 'string'))) {
        var $receiver = this$JsonRpcServer.callbacks_0;
        var key = data[0];
        var tmp$_2;
        var f = ensureNotNull((Kotlin.isType(tmp$_2 = $receiver, Map) ? tmp$_2 : throwCCE()).get_11rb$(key));
        var singletonArray = this$JsonRpcServer.safeGet_0(data, 1);
        if (singletonArray == null)
          (typeof (tmp$ = f) === 'function' ? tmp$ : throwCCE())();
        else
          f(singletonArray[0]);
      }
       else {
        var id;
        var offset;
        if (typeof data[0] === 'string') {
          id = -1;
          offset = 0;
        }
         else {
          id = typeof (tmp$_0 = data[0]) === 'number' ? tmp$_0 : throwCCE();
          offset = 1;
        }
        var args = this$JsonRpcServer.safeGet_0(data, offset + 2 | 0);
        var errorCallback;
        if (id !== -1) {
          var resultCallback = JsonRpcServer_init$lambda$lambda(this$JsonRpcServer, id);
          errorCallback = JsonRpcServer_init$lambda$lambda_0(this$JsonRpcServer, id);
          if (args == null) {
            args = [resultCallback, errorCallback];
          }
           else {
            var regularArgs = args;
            var array = Array_0(regularArgs.length + 2 | 0);
            var tmp$_3;
            tmp$_3 = array.length - 1 | 0;
            for (var i = 0; i <= tmp$_3; i++) {
              var closure$errorCallback = errorCallback;
              var init$result;
              if (i < regularArgs.length) {
                init$result = regularArgs[i];
              }
               else if (i === regularArgs.length) {
                init$result = resultCallback;
              }
               else {
                init$result = closure$errorCallback;
              }
              array[i] = init$result;
            }
            args = array;
          }
        }
         else {
          errorCallback = null;
        }
        try {
          var $receiver_0 = this$JsonRpcServer.domains_0;
          var key_0 = data[offset];
          var tmp$_4;
          kt_invoke(ensureNotNull((Kotlin.isType(tmp$_4 = $receiver_0, Map) ? tmp$_4 : throwCCE()).get_11rb$(key_0)), typeof (tmp$_1 = data[offset + 1 | 0]) === 'string' ? tmp$_1 : throwCCE(), args);
        }
         catch (e) {
          if (Kotlin.isType(e, Throwable)) {
            LOG_1.error_tcv7n7$(e);
            if (errorCallback != null) {
              errorCallback(ensureNotNull(e.message));
            }
          }
           else
            throw e;
        }
      }
      return Unit;
    };
  }
  JsonRpcServer.$metadata$ = {kind: Kind_CLASS, simpleName: 'JsonRpcServer', interfaces: []};
  var ourLogger;
  function getLogger(category) {
    if (ourLogger == null) {
      ourLogger = new ConsoleLogger();
    }
    return ourLogger;
  }
  function Logger() {
  }
  Logger.$metadata$ = {kind: Kind_INTERFACE, simpleName: 'Logger', interfaces: []};
  function ConsoleLogger() {
    this.debugEnabled_9n9hck$_0 = true;
  }
  Object.defineProperty(ConsoleLogger.prototype, 'debugEnabled', {get: function () {
    return this.debugEnabled_9n9hck$_0;
  }, set: function (debugEnabled) {
    this.debugEnabled_9n9hck$_0 = debugEnabled;
  }});
  ConsoleLogger.prototype.info_61zpoe$ = function (message) {
    console.info(message);
  };
  ConsoleLogger.prototype.warn_61zpoe$ = function (message) {
    console.warn(message);
  };
  ConsoleLogger.prototype.error_61zpoe$ = function (message) {
    console.error(message);
  };
  ConsoleLogger.prototype.error_tcv7n7$ = function (e) {
    console.error(e, e.stack);
  };
  ConsoleLogger.prototype.debug_yhszz7$ = function (objects) {
    if (this.debugEnabled) {
      console.log(objects);
    }
  };
  ConsoleLogger.$metadata$ = {kind: Kind_CLASS, simpleName: 'ConsoleLogger', interfaces: [Logger]};
  var DEFAULT_JB_HOST;
  var DEFAULT_JB_PORT;
  function BuildInfo(name, productName, baselineVersion, buildNumber) {
    if (productName === void 0)
      productName = null;
    this.name = name;
    this.productName = productName;
    this.baselineVersion = baselineVersion;
    this.buildNumber = buildNumber;
  }
  BuildInfo.$metadata$ = {kind: Kind_CLASS, simpleName: 'BuildInfo', interfaces: []};
  function greaterOrEquals($receiver, oBaseline, oBuild) {
    if ($receiver.baselineVersion !== oBaseline) {
      return $receiver.baselineVersion > oBaseline;
    }
    var bn = $receiver.buildNumber;
    if (bn != null && bn !== 0 && bn < oBuild) {
      return false;
    }
    return true;
  }
  function connect(version, family, host, port, reconnectTimeout, callback) {
    if (host === void 0)
      host = DEFAULT_JB_HOST;
    if (port === void 0)
      port = DEFAULT_JB_PORT;
    if (reconnectTimeout === void 0)
      reconnectTimeout = 5000;
    if (callback === void 0)
      callback = null;
    var socket = new Socket(null, reconnectTimeout);
    var rpcServer = new JsonRpcServer(socket);
    callback != null ? callback(socket, rpcServer) : null;
    socket.connect_61zpoe$('ws://' + host + ':' + port + '/jsonRpc?v=' + version + '&f=' + family);
    return rpcServer;
  }
  function registerDomService(pageManager, rpcServer) {
    rpcServer.registerDomain_bm4g0d$('Dom', new DomService(pageManager));
  }
  function DebuggerService(pageManager) {
    this.pageManager = pageManager;
    this.queueProcessor = new QueueProcessor(DebuggerService$queueProcessor$lambda);
  }
  function DebuggerService$attach$lambda$lambda(this$DebuggerService, closure$usePreliminaryPage, closure$callback, closure$done, closure$rejectedCallback) {
    return function (tab, created) {
      this$DebuggerService.pageManager.attachDebugger_hbhrwf$(tab, !closure$usePreliminaryPage, this$DebuggerService.wrapCallFinally_9sjsk8$(closure$callback, closure$done), closure$rejectedCallback);
      return Unit;
    };
  }
  function DebuggerService$attach$lambda(closure$usePreliminaryPage, closure$url, this$DebuggerService, closure$errorCallback, closure$callback) {
    return function (done) {
      try {
        var urlToOpen = closure$usePreliminaryPage ? this$DebuggerService.createPreliminaryPageUrl_61zpoe$(closure$url) : null;
        var rejectedCallback = this$DebuggerService.wrapCallFinally_9sjsk8$(closure$errorCallback, done);
        this$DebuggerService.pageManager.getOrCreateTab_z105ws$(closure$url, urlToOpen, true, rejectedCallback, DebuggerService$attach$lambda$lambda(this$DebuggerService, closure$usePreliminaryPage, closure$callback, done, rejectedCallback));
      }
       catch (e) {
        if (Kotlin.isType(e, Exception)) {
          try {
            closure$errorCallback(e.toString());
          }
          finally {
            done();
          }
        }
         else
          throw e;
      }
      return Unit;
    };
  }
  DebuggerService.prototype.attach = function (url, usePreliminaryPage, callback, errorCallback) {
    this.queueProcessor.add_11rb$(DebuggerService$attach$lambda(usePreliminaryPage, url, this, errorCallback, callback));
  };
  DebuggerService.prototype.createPreliminaryPageUrl_61zpoe$ = function (url) {
    return 'data:text/html;base64,' + window.btoa('<!DOCTYPE html><title>Loading ' + url + '<\/title>');
  };
  function DebuggerService$wrapCallFinally$lambda(closure$callback, closure$finallyCallback) {
    return function (it) {
      try {
        closure$callback(it);
      }
      finally {
        closure$finallyCallback();
      }
      return Unit;
    };
  }
  DebuggerService.prototype.wrapCallFinally_9sjsk8$ = function (callback, finallyCallback) {
    return DebuggerService$wrapCallFinally$lambda(callback, finallyCallback);
  };
  function DebuggerService$queueProcessor$lambda(item, done) {
    item(done);
    return Unit;
  }
  DebuggerService.$metadata$ = {kind: Kind_CLASS, simpleName: 'DebuggerService', interfaces: []};
  function compareUrls(a, b) {
    if (a == null)
      return false;
    if (equals(a, b)) {
      return true;
    }
    var filePrefix = 'file://';
    if (startsWith(a, filePrefix) && startsWith(b, filePrefix)) {
      return equals(normalizeFileUrl(a), normalizeFileUrl(b));
    }
    return equals(trimTrailing(trimQueryOrFragment(a), 47), trimTrailing(trimQueryOrFragment(b), 47));
  }
  function trimTrailing($receiver, char) {
    var index = $receiver.length - 1 | 0;
    while (index >= 0 && $receiver.charCodeAt(index) === char) {
      index = index - 1 | 0;
    }
    var endIndex = index + 1 | 0;
    return $receiver.substring(0, endIndex);
  }
  var LOCALHOST_FILE_PREFIX;
  function normalizeFileUrl(url) {
    if (startsWith(url, LOCALHOST_FILE_PREFIX)) {
      var startIndex = LOCALHOST_FILE_PREFIX.length;
      return 'file:///' + url.substring(startIndex);
    }
     else {
      return url;
    }
  }
  function normalizeTabUriPath(path) {
    return equals(path, '/') ? null : path;
  }
  function isInspectableBackedByPattern(scheme, host) {
    if (equals(scheme, 'file') || equals(scheme, 'data')) {
      return 1;
    }
     else if (!(equals(scheme, 'http') || equals(scheme, 'https'))) {
      return -1;
    }
    if (host == null) {
      throw IllegalArgumentException_init('host can be null only if protocol equals file');
    }
    if (!contains_0(host, '.') || endsWith(host, '.localhost') || endsWith(host, '.local') || endsWith(host, '.dev')) {
      return 1;
    }
    return 0;
  }
  function PageManager(tabService, rpcServer) {
    this.tabService = tabService;
    this.rpcServer = rpcServer;
  }
  PageManager.prototype.filterInspectable_pfvek$ = function (projectId, hostAndPathPairs, callback) {
    this.rpcServer.send_vdb88t$('Pages', 'filterInspectable', '"' + toString(projectId) + '"' + ', ' + JSON.stringify(hostAndPathPairs), callback);
  };
  PageManager.prototype.execute_pyo6iy$ = function (projectId, handler) {
    this.execute_24t5b2$(projectId, false, handler);
  };
  function PageManager$execute$lambda(closure$onlyIfAttached, closure$handler, this$PageManager) {
    return function (it) {
      this$PageManager.executeForTab_sjxqwo$(it, closure$onlyIfAttached, closure$handler);
      return Unit;
    };
  }
  PageManager.prototype.execute_24t5b2$ = function (projectId, onlyIfAttached, handler) {
    this.process_6p75vv$(projectId, PageManager$execute$lambda(onlyIfAttached, handler, this));
  };
  function PageManager$reload$lambda(this$PageManager) {
    return function (it) {
      this$PageManager.tabService.reload_iuyhfk$(it);
      return Unit;
    };
  }
  PageManager.prototype.reload = function () {
    this.process_6p75vv$(null, PageManager$reload$lambda(this));
  };
  PageManager.prototype.getOrCreateTab_z105ws$ = function (url, urlToOpen, focusWindow, errorCallback, callback, callback$default) {
    if (urlToOpen === void 0)
      urlToOpen = null;
    if (focusWindow === void 0)
      focusWindow = true;
    if (errorCallback === void 0)
      errorCallback = null;
    if (callback === void 0)
      callback = null;
    callback$default ? callback$default(url, urlToOpen, focusWindow, errorCallback, callback) : this.getOrCreateTab_z105ws$$default(url, urlToOpen, focusWindow, errorCallback, callback);
  };
  PageManager.$metadata$ = {kind: Kind_CLASS, simpleName: 'PageManager', interfaces: []};
  var LOG_2;
  function Socket(uri, reconnectTimeout) {
    if (uri === void 0)
      uri = null;
    if (reconnectTimeout === void 0)
      reconnectTimeout = 5000;
    this.uri_0 = uri;
    this.reconnectTimeout_0 = reconnectTimeout;
    this.socket_0 = null;
    this.connecting_0 = false;
    this.reconnectTimer_0 = null;
    this.opened = null;
    this.closed = null;
    this.message = null;
    if (this.uri_0 != null) {
      this.connect();
    }
  }
  Socket.prototype.send_61zpoe$ = function (data) {
    ensureNotNull(this.socket_0).send(data);
  };
  Socket.prototype.disconnect = function () {
    var s = this.socket_0;
    if (s != null) {
      this.socket_0 = null;
      s.close();
      LOG_2.info_61zpoe$('WebSocket connection closed');
    }
  };
  Socket.prototype.connect_61zpoe$ = function (uri) {
    this.uri_0 = uri;
    this.connect();
  };
  function Socket$connect$lambda$lambda(this$Socket) {
    return function (it) {
      if (this$Socket.message != null) {
        ensureNotNull(this$Socket.message)(it.data);
      }
      return Unit;
    };
  }
  function Socket$connect$lambda(this$Socket, closure$socket) {
    return function (it) {
      this$Socket.connecting_0 = false;
      this$Socket.reconnectTimer_0 = null;
      closure$socket.onmessage = Socket$connect$lambda$lambda(this$Socket);
      if (this$Socket.opened != null) {
        ensureNotNull(this$Socket.opened)();
      }
      return Unit;
    };
  }
  function Socket$connect$lambda$lambda_0(this$Socket) {
    return function () {
      this$Socket.connect();
      return Unit;
    };
  }
  function Socket$connect$lambda_0(this$Socket) {
    return function (it) {
      this$Socket.socket_0 = null;
      if (!this$Socket.connecting_0 && this$Socket.closed != null) {
        try {
          ensureNotNull(this$Socket.closed)();
        }
         catch (e) {
          if (Kotlin.isType(e, Throwable)) {
            LOG_2.error_tcv7n7$(e);
          }
           else
            throw e;
        }
      }
      if (this$Socket.reconnectTimeout_0 > 0) {
        if (this$Socket.reconnectTimer_0 == null) {
          this$Socket.reconnectTimer_0 = setTimeout(this$Socket.reconnectTimeout_0, Socket$connect$lambda$lambda_0(this$Socket));
        }
         else {
          ensureNotNull(this$Socket.reconnectTimer_0).start();
        }
      }
      return Unit;
    };
  }
  function Socket$connect$lambda_1(this$Socket) {
    return function (it) {
      if (this$Socket.reconnectTimeout_0 === -1) {
        LOG_2.error_61zpoe$('onerror ' + it);
      }
      return Unit;
    };
  }
  Socket.prototype.connect = function () {
    this.connecting_0 = true;
    var socket = new WebSocket(ensureNotNull(this.uri_0));
    this.socket_0 = socket;
    socket.onopen = Socket$connect$lambda(this, socket);
    socket.onclose = Socket$connect$lambda_0(this);
    socket.onerror = Socket$connect$lambda_1(this);
  };
  Socket.$metadata$ = {kind: Kind_CLASS, simpleName: 'Socket', interfaces: []};
  var ourTimerFactory;
  function setTimeout(delay, callback) {
    var timer = ourTimerFactory(delay, callback);
    timer.start();
    return timer;
  }
  function Timer(callback) {
    this.callback = callback;
  }
  Timer.$metadata$ = {kind: Kind_CLASS, simpleName: 'Timer', interfaces: []};
  function WindowTimer(delay, callback) {
    Timer.call(this, callback);
    this.timeoutId_0 = -1;
    this.delay_d9qew6$_0 = delay;
    this.callbackWrapper_0 = WindowTimer$callbackWrapper$lambda(this, callback);
  }
  Object.defineProperty(WindowTimer.prototype, 'delay', {get: function () {
    return this.delay_d9qew6$_0;
  }, set: function (value) {
    this.delay = value;
    if (this.running) {
      this.stop();
      this.start();
    }
  }});
  Object.defineProperty(WindowTimer.prototype, 'running', {get: function () {
    return this.timeoutId_0 !== -1;
  }});
  WindowTimer.prototype.start = function () {
    if (!this.running) {
      this.timeoutId_0 = window.setTimeout(this.callbackWrapper_0, this.delay);
    }
  };
  WindowTimer.prototype.stop = function () {
    if (!this.running) {
      return;
    }
    window.clearTimeout(this.timeoutId_0);
    this.timeoutId_0 = -1;
  };
  function WindowTimer$callbackWrapper$lambda(this$WindowTimer, closure$callback) {
    return function () {
      this$WindowTimer.timeoutId_0 = -1;
      closure$callback();
      return Unit;
    };
  }
  WindowTimer.$metadata$ = {kind: Kind_CLASS, simpleName: 'WindowTimer', interfaces: [Timer]};
  function ThreeState() {
    ThreeState_instance = this;
    this.YES = 1;
    this.NO = -1;
    this.UNSURE = 0;
  }
  ThreeState.$metadata$ = {kind: Kind_OBJECT, simpleName: 'ThreeState', interfaces: []};
  var ThreeState_instance = null;
  function ThreeState_getInstance() {
    if (ThreeState_instance === null) {
      new ThreeState();
    }
    return ThreeState_instance;
  }
  function jsReplace(s, jsRegExp, substitution) {
    return s.replace(jsRegExp, substitution);
  }
  function jsSplit(s, jsRegExp) {
    return s.split(jsRegExp);
  }
  function GetInlineStylesForNodeMessage(nodeId) {
    var obj = {};
    obj.nodeId = nodeId;
    return obj;
  }
  function SetPropertyTextMessage(styleId, propertyIndex, text, overwrite) {
    var obj = {};
    obj.styleId = styleId;
    obj.propertyIndex = propertyIndex;
    obj.text = text;
    obj.overwrite = overwrite;
    return obj;
  }
  function RGBA(r, g, b, a) {
    var obj = {};
    obj.r = r;
    obj.g = g;
    obj.b = b;
    obj.a = a;
    return obj;
  }
  function HighlightConfig(contentColor, paddingColor, borderColor, marginColor, showInfo) {
    var obj = {};
    obj.contentColor = contentColor;
    obj.paddingColor = paddingColor;
    obj.borderColor = borderColor;
    obj.marginColor = marginColor;
    obj.showInfo = showInfo;
    return obj;
  }
  function HighlightNodeMessage(nodeId, highlightConfig) {
    var obj = {};
    obj.nodeId = nodeId;
    obj.highlightConfig = highlightConfig;
    return obj;
  }
  function ResolveNodeMessage(nodeId) {
    var obj = {};
    obj.nodeId = nodeId;
    return obj;
  }
  function RequestChildNodesMessage(nodeId) {
    var obj = {};
    obj.nodeId = nodeId;
    return obj;
  }
  function RequestNodeMessage(objectId) {
    var obj = {};
    obj.objectId = objectId;
    return obj;
  }
  function SetOuterHTMLMessage(nodeId, outerHTML) {
    var obj = {};
    obj.nodeId = nodeId;
    obj.outerHTML = outerHTML;
    return obj;
  }
  function SetNodeValueMessage(nodeId, value) {
    var obj = {};
    obj.nodeId = nodeId;
    obj.value = value;
    return obj;
  }
  function SetAttributeValueMessage(nodeId, name, value) {
    var obj = {};
    obj.nodeId = nodeId;
    obj.name = name;
    obj.value = value;
    return obj;
  }
  function QuerySelectorMessage(nodeId, selector) {
    var obj = {};
    obj.nodeId = nodeId;
    obj.selector = selector;
    return obj;
  }
  function ReloadMessage(ignoreCache) {
    var obj = {};
    obj.ignoreCache = ignoreCache;
    return obj;
  }
  function CallFunctionOnMessage(objectId, functionDeclaration, returnByValue) {
    var obj = {};
    obj.objectId = objectId;
    obj.functionDeclaration = functionDeclaration;
    obj.returnByValue = returnByValue;
    return obj;
  }
  function ReleaseObjectMessage(objectId) {
    var obj = {};
    obj.objectId = objectId;
    return obj;
  }
  var package$org = _.org || (_.org = {});
  var package$jetbrains = package$org.jetbrains || (package$org.jetbrains = {});
  var package$util = package$jetbrains.util || (package$jetbrains.util = {});
  var package$concurrency = package$util.concurrency || (package$util.concurrency = {});
  package$concurrency.QueueProcessor = QueueProcessor;
  var package$browserConnection = package$jetbrains.browserConnection || (package$jetbrains.browserConnection = {});
  package$browserConnection.TabService = TabService;
  package$util.Disposable = Disposable;
  package$util.newDisposable = newDisposable;
  Object.defineProperty(package$util, 'disposer', {get: disposer_getInstance});
  var package$com = _.com || (_.com = {});
  var package$jetbrains_0 = package$com.jetbrains || (package$com.jetbrains = {});
  var package$browserConnection_0 = package$jetbrains_0.browserConnection || (package$jetbrains_0.browserConnection = {});
  Object.defineProperty(package$browserConnection_0, 'SelectorSubjects', {get: SelectorSubjects_getInstance});
  package$browserConnection_0.SelectorSubject = SelectorSubject;
  package$browserConnection_0.Dom = Dom;
  package$browserConnection_0.DomService = DomService;
  var package$io = package$jetbrains.io || (package$jetbrains.io = {});
  package$io.trimQueryOrFragment_pdl1vz$ = trimQueryOrFragment;
  package$io.get_isDataUri_pdl1vz$ = get_isDataUri;
  package$io.get_asParsedUrl_pdl1vz$ = get_asParsedUrl;
  var package$jsonRpc = package$io.jsonRpc || (package$io.jsonRpc = {});
  package$jsonRpc.JsonRpcServer = JsonRpcServer;
  var package$logging = package$jetbrains.logging || (package$jetbrains.logging = {});
  package$logging.getLogger_61zpoe$ = getLogger;
  package$logging.Logger = Logger;
  package$logging.ConsoleLogger = ConsoleLogger;
  Object.defineProperty(package$browserConnection_0, 'DEFAULT_JB_HOST', {get: function () {
    return DEFAULT_JB_HOST;
  }});
  Object.defineProperty(package$browserConnection_0, 'DEFAULT_JB_PORT', {get: function () {
    return DEFAULT_JB_PORT;
  }});
  package$browserConnection_0.BuildInfo = BuildInfo;
  package$browserConnection_0.greaterOrEquals_6rfeek$ = greaterOrEquals;
  package$browserConnection_0.connect_h3bnlv$ = connect;
  package$browserConnection_0.registerDomService_oht6vw$ = registerDomService;
  package$browserConnection_0.DebuggerService = DebuggerService;
  package$browserConnection_0.compareUrls_f5e6j7$ = compareUrls;
  package$browserConnection_0.normalizeFileUrl_61zpoe$ = normalizeFileUrl;
  package$browserConnection_0.normalizeTabUriPath_pdl1vj$ = normalizeTabUriPath;
  package$browserConnection_0.isInspectableBackedByPattern_jyasbz$ = isInspectableBackedByPattern;
  package$browserConnection_0.PageManager = PageManager;
  var package$webSocket = package$io.webSocket || (package$io.webSocket = {});
  package$webSocket.Socket = Socket;
  package$util.setTimeout_n53o35$ = setTimeout;
  package$util.Timer = Timer;
  Object.defineProperty(package$util, 'ThreeState', {get: ThreeState_getInstance});
  package$util.jsReplace_ro6aap$ = jsReplace;
  package$util.jsSplit_ofwppt$ = jsSplit;
  var package$wip = _.wip || (_.wip = {});
  var package$css = package$wip.css || (package$wip.css = {});
  package$css.GetInlineStylesForNodeMessage_za3lpa$ = GetInlineStylesForNodeMessage;
  package$css.SetPropertyTextMessage_gzen9n$ = SetPropertyTextMessage;
  var package$dom = package$wip.dom || (package$wip.dom = {});
  package$dom.RGBA_gb4hak$ = RGBA;
  package$dom.HighlightConfig_acyns5$ = HighlightConfig;
  package$dom.HighlightNodeMessage_vux3hl$ = HighlightNodeMessage;
  package$dom.ResolveNodeMessage_za3lpa$ = ResolveNodeMessage;
  package$dom.RequestChildNodesMessage_za3lpa$ = RequestChildNodesMessage;
  package$dom.RequestNodeMessage_61zpoe$ = RequestNodeMessage;
  package$dom.SetOuterHTMLMessage_19mbxw$ = SetOuterHTMLMessage;
  package$dom.SetNodeValueMessage_19mbxw$ = SetNodeValueMessage;
  package$dom.SetAttributeValueMessage_s4fhmi$ = SetAttributeValueMessage;
  package$dom.QuerySelectorMessage_19mbxw$ = QuerySelectorMessage;
  var package$page = package$wip.page || (package$wip.page = {});
  package$page.ReloadMessage_1v8dbw$ = ReloadMessage;
  var package$runtime = package$wip.runtime || (package$wip.runtime = {});
  package$runtime.CallFunctionOnMessage_qz9155$ = CallFunctionOnMessage;
  package$runtime.ReleaseObjectMessage_61zpoe$ = ReleaseObjectMessage;
  newDisposable$ObjectLiteral.prototype.register_o14v8n$ = Disposable.prototype.register_o14v8n$;
  newDisposable$ObjectLiteral.prototype.register_l4f6h6$ = Disposable.prototype.register_l4f6h6$;
  newDisposable$ObjectLiteral.prototype.disposeTree = Disposable.prototype.disposeTree;
  disposer$register$ObjectLiteral.prototype.register_o14v8n$ = Disposable.prototype.register_o14v8n$;
  disposer$register$ObjectLiteral.prototype.register_l4f6h6$ = Disposable.prototype.register_l4f6h6$;
  disposer$register$ObjectLiteral.prototype.disposeTree = Disposable.prototype.disposeTree;
  LOG = getLogger('org.jetbrains.util.concurrency');
  LOG_0 = getLogger('org.jetbrains.disposable');
  queryOrFragmentRegExp = new RegExp('(\\?|#|;).*$', 'g');
  LOG_1 = getLogger('org.jetbrains.io.jsonRpc');
  ourLogger = new ConsoleLogger();
  DEFAULT_JB_HOST = '127.0.0.1';
  DEFAULT_JB_PORT = '63342';
  LOCALHOST_FILE_PREFIX = 'file://localhost/';
  LOG_2 = getLogger('org.jetbrains.io.webSocket');
  ourTimerFactory = getCallableRef('WindowTimer', function (delay, callback) {
    return new WindowTimer(delay, callback);
  });
  return _;
}(typeof this['browser-ext-platform'] === 'undefined' ? {} : this['browser-ext-platform'], kotlin);

//# sourceMappingURL=browser-ext-platform.js.map
