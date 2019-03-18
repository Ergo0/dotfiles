/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const Config = __webpack_require__(23); // eslint-disable-line import/no-unresolved
const Settings = __webpack_require__(25); // eslint-disable-line import/no-unresolved
const WebpageConnection = __webpack_require__(26); // eslint-disable-line import/no-unresolved
const ExtensionMessages = __webpack_require__(18); // eslint-disable-line
const ExtensionStates = __webpack_require__(24); // eslint-disable-line import/no-unresolved
const WebrtcSession = __webpack_require__(27); // eslint-disable-line import/no-unresolved
const AnalyticsEventTypes = __webpack_require__(20); // eslint-disable-line import/no-unresolved
const URL = __webpack_require__(45);

class ExtensionController {
	constructor() {
		this._tabCaptureTimeout = null;
		this._tabCaptureTimeoutValue = 10000;
		this._extensionReady = false;
		this._config = new Config();
		this._config.loadConfigFile('config.json').then(() => {
			this._settings = new Settings();
			this._settings.loadSettings();

			this._extensionState = ExtensionStates.Idle;
			this._webrtcSessions = new Map();
			this._tabStream = null;
			this._capturedTabId = null;
			this._capturedTabUpdated = null;
			this._screencasterConnection = null;
			this._connections = new Map();
			this._eventHandlers = new Map();
			this._roomRefreshPoll = null;
			this._eventHandlers.set(ExtensionMessages.msgCreateMediaSession, this._onCreateMediaSession.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgMediaSessionOffer, this._onMediaSessionOffer.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgStopScreenCapture, this.stopTabCapture.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgGetOpenedTabs, this._onGetOpenedTabs.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgSetupTabCapture, this._onSetupTabCapture.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgRoomChanged, this._onConnectionRoomChanged.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgRestartWebrtcConnection, this._onRestartWebrtcConnection.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgUpdateExtensionState, this._onUpdateExtensionState.bind(this));
			this._eventHandlers.set(ExtensionMessages.msgScreencastStarted, this._onScreencastStarted.bind(this));

			if (this._config.getEnvironment() !== 'production') {
				chrome.browserAction.setBadgeText({ text: this._config.getEnvironment() });
				chrome.browserAction.setBadgeBackgroundColor({ color: [255, 102, 0, 255] });
			}
			this._extensionReady = true;
			this._anouncePresence();
			this._setupPolling();
		});
	}

	saveSettings(settings) {
		// settings should only be saved when apply is pressed
		// this._settings.saveSettings(settings);
	}

	applySettings(settings) {
		const oldSettings = this.getCurrentSettings();
		this._settings.saveSettings(settings).then(() => {
			if (this._extensionState !== ExtensionStates.Running) {
				return;
			}

			const newSettings = settings;
			const changeBitrate = oldSettings.bitrate !== newSettings.bitrate;
			const replaceStreams = oldSettings.width !== newSettings.width || oldSettings.height !== newSettings.height || oldSettings.fps !== newSettings.fps;

			if (!changeBitrate && !replaceStreams) {
				return;
			}

			if (replaceStreams) {
				// we need to make the tab active first
				chrome.tabs.get(this._capturedTabId, tab => {
					chrome.windows.update(tab.windowId, { focused: true }, () => {
						chrome.tabs.update(this._capturedTabId, { active: true }, () => {
							this.setupTabCapture(0);
						});
					});
				});
				return;
			}

			if (this._webrtcSessions.size > 1) {
				// console.log('Multiple webrtc session. Ignoring bitrate change. This should not happen!!!');
				return;
			} else if (this._webrtcSessions.size === 0) {
				// console.log('No webrtc sessions. Invalid state. This should not happen!!!');
				return;
			}

			const webrtcId = this._webrtcSessions.values().next().value.getWebrtcId();
			this._sendMessage({
				event: ExtensionMessages.msgUpdateConstantBitrate,
				message: {
					constantBitrate: newSettings.bitrate * 1024,
					webrtcId: webrtcId
				}
			});
		});
	}

	getCurrentSettings() {
		return this._settings.getCurrentSettings();
	}

	getCapturedTabID() {
		return this._capturedTabId;
	}

	onWebpageConnection(connection) {
		if (!this._connections) {
			connection.disconnect();
			return;
		}

		const that = this;
		const connectionId = connection.sender.tab.id;

		const webpageConnection = new WebpageConnection(connectionId, connection);
		webpageConnection.addOnMessageListener((eventConnection, event) => {
			that.onMessage(eventConnection, event);
		});

		webpageConnection.addOnDisconnectListener(disconnectConnection => {
			const disconnectConnectionId = disconnectConnection.getConnectionId();
			that._connections.delete(disconnectConnectionId);
			if (that._screencasterConnection === disconnectConnection) {
				that._screencasterConnection = null;
				that.stopTabCapture();
			}
		});

		this._connections.set(connectionId, webpageConnection);
	}

	isTabStreamIdle() {
		return this._extensionState === ExtensionStates.Idle;
	}

	onMessage(connection, msg) {
		// console.log(connection, msg);
		const event = msg.event;
		const eventHandler = event && this._eventHandlers.get(event);
		if (eventHandler) {
			eventHandler(connection, msg.message);
		} else {
			// console.log(`onMessage --- unhandled message: ${JSON.stringify(msg)}`);
		}
	}

	onClick() {
		if (this._extensionReady) {
			chrome.browserAction.setPopup({ popup: 'popup.html' });
		}
	}

	_startCapture() {
		const that = this;

		const currentSettings = this._settings.getCurrentSettings();

		const captureOptions = {
			audio: true,
			video: true,
			videoConstraints: {
				mandatory: {
					minWidth: currentSettings.width,
					minHeight: currentSettings.height,
					maxWidth: currentSettings.width,
					maxHeight: currentSettings.height,
					maxFrameRate: currentSettings.fps
				}
			}
		};

		return new Promise(resolve => {
			chrome.tabCapture.capture(captureOptions, stream => {
				that._setupStreamEvents(stream);
				that._getActiveTab().then(activeTab => {
					that._setCapturedTab(activeTab);
					resolve(stream);
				});
			});
		});
	}

	_getActiveTab() {
		return new Promise(resolve => {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, tabs => {
				let activeTab = null;
				if (tabs.length > 0) {
					activeTab = tabs[0];
					if (tabs.length > 1) {
						// console.log('Multiple active tabs????');
					}
				} else {
						// console.log('No active tab????');
					}
				resolve(activeTab);
			});
		});
	}

	_tabCaptureStarted(screencasterConnection, _makeActive) {
		const startScreencast = this._screencasterConnection === null;
		const makeActive = _makeActive !== false;
		this._screencasterConnection = screencasterConnection;
		this._extensionState = ExtensionStates.Running;
		const tabId = this._screencasterConnection.getTabId();
		const currentSettings = this._settings.getCurrentSettings();

		if (makeActive) {
			chrome.tabs.get(tabId, tab => {
				chrome.windows.update(tab.windowId, { focused: true }, () => {
					chrome.tabs.update(tabId, { active: true }, () => {});
				});
			});
		}

		if (startScreencast) {
			this._startTabCaptureTimeout();
			chrome.tabs.get(this._capturedTabId, tab => {
				this._getOgTagsFromTab(tab.url, tab.id, ogTags => {
					this._sendMessage({
						event: ExtensionMessages.msgStartScreencast,
						message: {
							url: tab.url,
							title: ogTags.title || tab.title,
							image: ogTags.image,
							description: ogTags.description,
							video: ogTags.video
						}
					});
				});
			});
		} else {
			this._sendCreateMediaSession(currentSettings.bitrate);
		}
	}

	stopTabCapture() {

		const webrtcIds = [];
		for (const webrtcSession of this._webrtcSessions.values()) {
			webrtcIds.push(webrtcSession.getWebrtcId());
			webrtcSession.destroy();
		}

		this._sendMessage({
			event: ExtensionMessages.msgStopScreenCapture,
			message: {
				webrtcIds: webrtcIds
			}
		});

		this._setCapturedTab(null);

		if (this._tabStream) {
			const videoTracks = this._tabStream.getVideoTracks();
			if (videoTracks && videoTracks.length > 0) {
				videoTracks[0].onended = null;
				videoTracks[0].stop();
			}

			const audioTracks = this._tabStream.getAudioTracks();
			if (audioTracks && audioTracks.length > 0) {
				audioTracks[0].stop();
			}

			this._tabStream = null;
		}

		this._webrtcSessions.clear();
		this._screencasterConnection = null;
		this._extensionState = ExtensionStates.Idle;

		for (const connection of this._connections.values()) {
			connection.disconnect();
		}

		this._connections.clear();
		this._connections = null;

		// wait for 500ms and reload the extension
		// reloading the extension cleans up the webrtc-internals for the extension
		setTimeout(() => {
			window.location.reload(true);
		}, 500);
	}

	_sendMessage(msg) {
		if (!this._screencasterConnection) {
			// console.log('No _screencasterConnection');
			return;
		}
		this._sendMessageToConnection(this._screencasterConnection, msg);
	}

	_sendMessageToConnection(connection, msg) {
		if (!connection) {
			// console.log('No connection');
			return;
		}
		connection.send(msg);
	}

	_tabsWithURL(url) {
		return new Promise(resolve => {
			chrome.tabs.query({}, tabs => {
				const tabsArr = tabs.filter(value => {
					return value.url === url;
				});

				resolve(tabsArr);
			});
		});
	}

	_onCreateMediaSession(connection, msg) {
		// console.log('_onCreateMediaSession: ' + JSON.stringify(msg));
		const webrtcId = msg.webrtcId;
		if (!webrtcId) {
			// console.log('_onCreateMediaSession: No webrtcId');
			return;
		}

		if (this._webrtcSessions.get(webrtcId)) {
			// console.log('_onCreateMediaSession: already has an webrtcSession');
			return;
		}

		const webrtcSession = new WebrtcSession(webrtcId, msg.iceServers, this._tabStream);
		webrtcSession.onSignalingStateChange = this._onConnectionStateChange.bind(this, webrtcId);
		webrtcSession.onIceConnectionStateChange = this._onConnectionStateChange.bind(this, webrtcId);
		this._webrtcSessions.set(webrtcId, webrtcSession);
	}

	_onConnectionStateChange(webrtcId) {
		const webrtcSession = this._webrtcSessions.get(webrtcId);
		if (!webrtcSession) {
			// console.log('webrtcSession: No webrtc session');
			return;
		}

		const connectionState = webrtcSession.getConnectionState();
		if (connectionState.iceConnectionState === WebrtcSession.IceConnectionStates.Failed) {
			this._onWebrtcConnectionFailed(webrtcId);
		} else {
			this._sendMessage({
				event: ExtensionMessages.msgMediaSessionState,
				message: {
					webrtcId: webrtcId,
					signalingState: connectionState.signalingState,
					iceGatheringState: connectionState.iceGatheringState,
					iceConnectionState: connectionState.iceConnectionState
				}
			});
		}
	}

	_onMediaSessionOffer(connection, msg) {
		const webrtcId = msg.webrtcId;
		if (!webrtcId) {
			// console.log('_onMediaSessionOffer: No webrtcId');
			return;
		}

		const webrtcSession = this._webrtcSessions.get(webrtcId);
		if (!webrtcSession) {
			// console.log('_onMediaSessionOffer: No webrtc session');
			return;
		}

		webrtcSession.setRemoteDescription(msg.sessionDescription).then(() => {
			return webrtcSession.createAswer();
		}).then(answer => {
			return webrtcSession.setLocalDescription(answer);
		}).then(answer => {
			this._sendMessage({
				event: ExtensionMessages.msgMediaSessionAnswer,
				message: {
					webrtcId: webrtcId,
					sessionDescription: answer
				}
			});
		});
	}

	getOpenedTabs() {
		const that = this;
		return new Promise(resolve => {
			if (this._extensionState === ExtensionStates.Disabled) {
				resolve([]);
				return;
			}

			chrome.tabs.query({}, tabs => {
				chrome.tabs.query({ active: true }, activeTabs => {
					const openedTabs = [];
					const getOpenedTabsRecursively = _tabIdx => {
						let tabIdx = _tabIdx;
						if (tabIdx === tabs.length) {
							activeTabs.forEach(tab => {
								chrome.tabs.update(tab.id, { active: true });
							});
							resolve(openedTabs);
							return;
						}
						const tab = tabs[tabIdx];
						that._getOpenedTab(tab).then(capturedData => {
							if (capturedData) {
								openedTabs.push(capturedData);
							}
							++tabIdx;
							getOpenedTabsRecursively(tabIdx);
						});
					};
					getOpenedTabsRecursively(0);
				});
			});
		});
	}

	_getOpenedTab(tab) {
		return new Promise(resolve => {
			if (this._extensionState === ExtensionStates.Disabled) {
				resolve({});
				return;
			}

			// const activeTab = tab;
			// const capturedData = {
			// 	id: activeTab.id,
			// 	type: 'local',
			// 	kind: 'video',
			// 	title: activeTab.title,
			// 	subtitle: activeTab.title,
			// 	url: activeTab.url,
			// 	image: {
			// 		url: ''
			// 	},
			// 	promotional: false
			// };
			// resolve(capturedData);

			chrome.tabs.update(tab.id, { active: true }, activeTab => {
				setTimeout(() => {
					chrome.tabs.captureVisibleTab(activeTab.windowId, { format: 'png' }, _imageUrl => {
						let imageUrl = _imageUrl;
						if (chrome.runtime.lastError || !imageUrl) {
							// console.log('Cannot capture tab: ' + JSON.stringify(chrome.runtime.lastError))
							imageUrl = '';
						}
						const capturedData = {
							id: activeTab.id,
							type: 'local',
							kind: 'video',
							title: activeTab.title,
							subtitle: activeTab.title,
							url: activeTab.url,
							image: {
								url: imageUrl
							},
							promotional: false
						};
						resolve(capturedData);
					});
				}, 50);
			});
		});
	}

	_onGetOpenedTabs(connection) {
		return this.getOpenedTabs().then(openedTabs => {
			this._sendMessageToConnection(connection, {
				event: ExtensionMessages.msgGetOpenedTabs,
				message: {
					openedTabs: openedTabs
				}
			});
		});
	}

	_onSetupTabCapture(connection, msg) {
		const tabId = Number(msg.tabId);
		chrome.tabs.get(tabId, tab => {
			chrome.windows.update(tab.windowId, { focused: true });
		});

		chrome.tabs.update(tabId, { active: true }, () => {
			this._screencasterConnection = connection;
			this._extensionState = ExtensionStates.Setup;
			// chrome.browserAction.setPopup({popup: ''});
		});
	}

	_anouncePresence() {
		chrome.tabs.query({}, tabs => {
			for (const tab of tabs) {
				if (tab.url.indexOf('rabb.it') !== -1) {
					try {
						chrome.tabs.executeScript(tab.id, {
							file: 'presence.js'
						});
					} catch (err) {
						// console.debug('could not accounce extension presence on tab', err);
					}
				}
			}
		});
	}

	_sendRequestToServer(event, data) {
		const requestUrl = this._config.getServerDataHttp() ? `${this._config.getServerDataHttp()}/extension` : null;
		return new Promise(resolve => {
			if (!requestUrl) {
				resolve();
				return;
			}
			const request = new XMLHttpRequest();
			request.open('POST', requestUrl, true);
			request.setRequestHeader('Content-Type', 'application/json');
			request.onload = () => {
				if (request.status === 200 && request.response) {
					try {
						const responseData = JSON.parse(request.response);
						resolve(responseData);
					} catch (err) {
						resolve();
					}
				}
				return;
			};
			request.onerror = () => {
				resolve(null);
			};
			request.send(JSON.stringify({ event, data }));
		});
	}

	_createSpaceRoom(spaceId) {
		if (this._extensionState === ExtensionStates.Disabled) {
			return;
		}
		return this._sendRequestToServer(ExtensionMessages.msgCreateSpaceRoom, { spaceId }).then(response => {
			console.log(response);
			return response;
		});
	}

	_getMyRoomUrlFromServer() {
		if (this._extensionState === ExtensionStates.Disabled) {
			return;
		}
		const defaultRoomUrl = this._config.getServerHostUrl() ? `${this._config.getServerHostUrl()}/start` : null;
		return this._sendRequestToServer(ExtensionMessages.msgGetMyRoomUrl).then(response => {
			return response && response.roomUrl ? response.roomUrl : defaultRoomUrl;
		});
	}

	changeFocusedTab(tabID) {
		chrome.tabs.update(tabID, { active: true });
	}

	setupTabCapture(connectionIndex = 0, spaceId = undefined) {
		chrome.tabs.query({ active: true, currentWindow: true }, activeTabs => {
			const currentTab = activeTabs[0];

			this.sendAnalyticEvent({
				clientGeneric: true,
				externalType: 'StartingTabcast',
				eventType: AnalyticsEventTypes.keyTabcastStarting,
				externalCategory: AnalyticsEventTypes.keyCategoryFeature,
				eventData: {
					tabUrl: currentTab.url,
					tabTitle: currentTab.title
				}
			});
		});

		const func = this._extensionState === ExtensionStates.Running ? this._replaceStreams.bind(this) : this._startCapture.bind(this);
		func().then(stream => {
			this._tabStream = stream;
			const activeRoomsConnections = this._getActiveRoomsConnections();
			if (activeRoomsConnections.length === 0) {
				this._startTabCaptureTimeout();
				this._extensionState = ExtensionStates.Starting;
				if (spaceId) {
					// CREATE SPACE ROOM THEN ENTER IT
					this._createSpaceRoom(spaceId).then(result => {
						chrome.tabs.create({ url: `${this._config.getServerHostUrl()}/r/${result.roomId}` }, newTab => {});
					});
				} else {
					this._getMyRoomUrlFromServer().then(roomUrl => {
						if (!roomUrl) {
							this.stopTabCapture();
							return;
						}
						chrome.tabs.create({ url: roomUrl }, newTab => {});
					});
				}
			} else {
				this._tabCaptureStarted(activeRoomsConnections[connectionIndex]);
			}
		});
	}

	_replaceStreams() {
		this._sendMessage({
			event: ExtensionMessages.msgReplaceStreams
		});

		for (const webrtcSession of this._webrtcSessions.values()) {
			webrtcSession.destroy();
		}

		this._setCapturedTab(null);

		if (this._tabStream) {
			const videoTracks = this._tabStream.getVideoTracks();
			if (videoTracks && videoTracks.length > 0) {
				videoTracks[0].onended = null;
				videoTracks[0].stop();
			}

			const audioTracks = this._tabStream.getAudioTracks();
			if (audioTracks && audioTracks.length > 0) {
				audioTracks[0].stop();
			}

			this._tabStream = null;
		}

		this._webrtcSessions.clear();

		return this._startCapture();
	}

	getMySpaces() {
		return this._sendRequestToServer(ExtensionMessages.msgGetMySpaces).then(result => {
			return result.spaces;
		});
	}

	_getActiveRoomsConnections() {
		const activeRoomsConnections = [];
		if (this._connections) {
			for (const connection of this._connections.values()) {
				if (connection.getRoomId()) {
					activeRoomsConnections.push(connection);
				}
			}
		}

		return activeRoomsConnections;
	}

	_onConnectionRoomChanged(connection, msg) {

		connection.setRoomData(msg);

		if (this._extensionState === ExtensionStates.Starting && connection.getRoomId()) {
			this._tabCaptureStarted(connection);
		}
	}

	_onRestartWebrtcConnection(connection, msg) {
		this._removeWebrtcSession(msg.webrtcId);
		this._tabCaptureStarted(this._screencasterConnection, false);
	}

	_removeWebrtcSession(webrtcId) {
		if (!webrtcId) {
			// console.log('No webrtc id')
			return;
		}

		const webrtcSession = this._webrtcSessions.get(webrtcId);
		if (!webrtcSession) {
			// console.log('No webrtcSession');
			return;
		}

		webrtcSession.destroy();
		this._webrtcSessions.delete(webrtcId);
	}

	_onWebrtcConnectionFailed(webrtcId) {
		this._sendMessage({
			event: ExtensionMessages.msgWebrtcConnectionFailed,
			message: {
				webrtcId: webrtcId
			}
		});
	}

	_onUpdateExtensionState(connection, msg) {
		if (msg.state === ExtensionStates.Disabled) {
			if (this._extensionState !== ExtensionStates.Idle) {
				this.stopTabCapture();
			}
			this._extensionState = ExtensionStates.Disabled;
		} else if (msg.state === ExtensionStates.Enabled) {
			if (this._extensionState === ExtensionStates.Disabled) {
				this._extensionState = ExtensionStates.Idle;
			}
		}
		// console.info('connectiom state updated');
	}

	_setCapturedTab(tab) {
		if (this._capturedTabUpdated) {
			chrome.tabs.onUpdated.removeListener(this._capturedTabUpdated);
			this._capturedTabUpdated = null;
		}

		this._capturedTabId = tab ? tab.id : null;

		if (this._capturedTabId) {
			this._capturedTabUpdated = (tabId, changes, newTab) => {
				if (tabId !== this._capturedTabId) {
					return;
				}

				const updateContent = changes.status === 'complete' || tab.status === 'complete' && changes.title;

				if (!updateContent) {
					return;
				}
				this._getOgTagsFromTab(newTab.url, this._capturedTabId, ogTags => {
					this._sendMessage({
						event: ExtensionMessages.msgTabContentChanged,
						message: {
							url: newTab.url,
							title: newTab.title || ogTags.title,
							image: ogTags.image,
							description: ogTags.description,
							video: ogTags.video
						}
					});
				});

				this.sendAnalyticEvent({
					clientGeneric: true,
					externalType: 'tabcastContentChanged',
					eventType: AnalyticsEventTypes.keyTabcastContentChanged,
					externalCategory: AnalyticsEventTypes.keyCategoryFeature,
					eventData: {
						tabUrl: newTab.url,
						tabTitle: newTab.title
					}
				});
			};

			chrome.tabs.onUpdated.addListener(this._capturedTabUpdated);
		}
	}

	_getOgTagsFromTab(url, tabId, callback) {
		try {
			return chrome.tabs.executeScript(tabId, {
				code: `
						var result = {};

						var titleElement = document.querySelector("meta[property=\\"og:title\\"]");
						var imageElement = document.querySelector("meta[property=\\"og:image\\"]");
						var descriptionElement = document.querySelector("meta[property=\\"og:description\\"]");
						var videoElement = document.querySelector("meta[property=\\"og:video\\"]");
						
						if (titleElement != null) {
							result.title = titleElement.getAttribute("content");
						}
						if (imageElement != null) {
							result.image = imageElement.getAttribute("content");
						}
						if (descriptionElement != null) {
							result.description = descriptionElement.getAttribute("content");
						}
						if (videoElement != null) {
							result.video = videoElement.getAttribute("content");
						}
						
						result;
						`
			}, results => {
				callback({
					title: results[0].title,
					image: this._fixUrlProtocol(url, results[0] && results[0].image),
					description: results[0].description,
					video: this._fixUrlProtocol(url, results[0] && results[0].video)
				});
			});
		} catch (err) {
			callback({});
		}
	}

	_fixUrlProtocol(url, urlToFix) {
		let retUrl = urlToFix;
		if (url && urlToFix && urlToFix !== '') {
			if (!urlToFix.startsWith('http')) {
				retUrl = URL.resolve(url, urlToFix);
			}
		}
		return retUrl;
	}

	_showFeedbackPopup() {
		if (this._connections.size === 0) {
			chrome.tabs.create({ url: 'https://www.rabb.it/contact-us' });
		} else {
			for (const connection of this._connections) {
				this._sendMessageToConnection(connection[1], {
					event: ExtensionMessages.msgShowFeedback,
					message: {
						show: true
					}
				});
			}
		}
	}

	_startTabCaptureTimeout() {
		const that = this;
		this._stopTabCaptureTimeout();
		this._tabCaptureTimeout = setTimeout(() => {
			that._tabCaptureTimeout = null;
			that.stopTabCapture();
		}, this._tabCaptureTimeoutValue);
	}

	_stopTabCaptureTimeout() {
		if (!this._tabCaptureTimeout) {
			return;
		}

		clearTimeout(this._tabCaptureTimeout);
		this._tabCaptureTimeout = null;
	}

	_onScreencastStarted() {
		const currentSettings = this._settings.getCurrentSettings();
		this._stopTabCaptureTimeout();
		this._sendCreateMediaSession(currentSettings.bitrate);
	}

	sendAnalyticEvent(eventMessage) {
		for (const connection of this._connections) {
			this._sendMessageToConnection(connection[1], {
				event: ExtensionMessages.msgAnalyticEvent,
				message: eventMessage
			});
		}
	}

	stealRemote() {
		// console.error('steal', connection);
		for (const connection of this._connections) {
			this._sendMessageToConnection(connection[1], {
				event: ExtensionMessages.msgRequestStealRemote,
				message: {}
			});
		}
	}

	checkConnections() {
		// check that tabs are connected
		chrome.tabs.query({}, tabs => {
			for (const tab of tabs) {
				if (tab.url.indexOf(this._config.getServerHostUrl()) >= 0) {
					// tab ID ${tab.id} is in ${this._config.getServerHostUrl()} domain, check to be sure we are connected to it
					let tabConnected = false;
					for (const [key, value] of this._connections) {
						if (key === tab.id) {
							// tab connected
							tabConnected = true;
						}
					}

					if (!tabConnected) {
						// tab disconnected, send message to refresh room data
						chrome.tabs.sendMessage(tab.id, ExtensionMessages.msgExtensionPresent);
					}
				}
			}
		});
	}

	_setupPolling() {
		if (this._roomRefreshPoll !== null) {
			clearTimeout(this._roomRefreshPoll);
			this._roomRefreshPoll = null;
		}
		this._roomRefreshPoll = setInterval(this.checkConnections.bind(this), 10000);
	}

	_sendCreateMediaSession(bitrate) {
		if (!this._tabStream) {
			console.error('No tab stream???');
			return;
		}

		const mediaTypes = [];

		const videoTracks = this._tabStream.getVideoTracks();
		if (videoTracks && videoTracks.length > 0) {
			mediaTypes.push('Video');
		}

		const audioTracks = this._tabStream.getAudioTracks();
		if (audioTracks && audioTracks.length > 0) {
			mediaTypes.push('Audio');
		}

		this._sendMessage({
			event: ExtensionMessages.msgCreateMediaSession,
			message: {
				constantBitrate: bitrate * 1024,
				mediaTypes: mediaTypes
			}
		});
	}

	_setupStreamEvents(stream) {
		const videoTracks = stream.getVideoTracks();
		if (videoTracks && videoTracks.length > 0) {
			videoTracks[0].onended = () => {
				this.stopTabCapture();
			};
		}
	}
}

module.exports = ExtensionController;

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js?root=../!./extensionIcons.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js?root=../!./extensionIcons.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const NetworkMessageTypes = __webpack_require__(19); // cannot currently use import syntax with extension

class ExtensionMessageTypes {}

ExtensionMessageTypes.msgCreateMediaSession = NetworkMessageTypes.msgCreateMediaSession;
ExtensionMessageTypes.msgMediaSessionOffer = NetworkMessageTypes.msgMediaSessionOffer;
ExtensionMessageTypes.msgMediaSessionAnswer = NetworkMessageTypes.msgMediaSessionAnswer;
ExtensionMessageTypes.msgMediaSessionState = NetworkMessageTypes.msgMediaSessionState;
ExtensionMessageTypes.msgStopScreenCapture = NetworkMessageTypes.msgStopScreenCapture;
ExtensionMessageTypes.msgUpdateConstantBitrate = NetworkMessageTypes.msgUpdateConstantBitrate;
ExtensionMessageTypes.msgDestroyMediaSession = NetworkMessageTypes.msgDestroyMediaSession;
ExtensionMessageTypes.msgGetOpenedTabs = 'extension.getOpenedTabs';
ExtensionMessageTypes.msgSetupTabCapture = 'extension.setupTabCapture';
ExtensionMessageTypes.msgExtensionPresent = 'extension.extensionPresent';
ExtensionMessageTypes.msgRoomChanged = 'extension.roomChanged';
ExtensionMessageTypes.msgWebrtcConnectionFailed = 'extension.webrtcConnectionFailed';
ExtensionMessageTypes.msgRestartWebrtcConnection = 'extension.restartWebrtcConnection';
ExtensionMessageTypes.msgUpdateExtensionState = 'extension.updateExtensionState';
ExtensionMessageTypes.msgTabContentChanged = NetworkMessageTypes.msgTabContentChanged;
ExtensionMessageTypes.msgStartScreencast = 'extension.startScreencast';
ExtensionMessageTypes.msgScreencastStarted = 'extension.screencastStarted';
ExtensionMessageTypes.msgScreencastController = 'extension.screencastController';
ExtensionMessageTypes.msgAnalyticEvent = 'extension.analyticEvent';
ExtensionMessageTypes.msgRequestStealRemote = 'extension.requestStealRemote';

ExtensionMessageTypes.msgShowFeedback = 'extension.showFeedbackForm';
ExtensionMessageTypes.msgShowFAQs = 'extension.showFAQPage';

ExtensionMessageTypes.msgReplaceStreams = 'extension.replaceStreams';
ExtensionMessageTypes.msgRefreshRoomData = 'extension.refreshRoomData';

ExtensionMessageTypes.msgGetMyRoomUrl = 'room.getMyRoomUrl';
ExtensionMessageTypes.msgGetMySpaces = 'space.getSpacesForCredentials';
ExtensionMessageTypes.msgCreateSpaceRoom = 'space.createSpaceRoom';

module.exports = ExtensionMessageTypes;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

const NetworkMessageTypes = {};
NetworkMessageTypes.msgDisplayNotification = 'session.displayNotification';

// Friends
NetworkMessageTypes.msgFriendUpdate = 'session.friendUpdate';
NetworkMessageTypes.msgGetFriends = 'user.getFriends';
NetworkMessageTypes.msgGetWantToBeMyFriend = 'user.getWantToBeMyFriend';
NetworkMessageTypes.msgGetOnlineFriendPresenceData = 'presence.getOnlineFriendsClient';

// Authorization
NetworkMessageTypes.msgWelcome = 'authorization.welcome';

// Authentication
NetworkMessageTypes.msgRegister = 'authorization.register';
NetworkMessageTypes.msgLogin = 'authorization.login';
NetworkMessageTypes.msgLoginWithPhoneNumber = 'authorization.loginWithPhoneNumber';
NetworkMessageTypes.msgAuthorize = 'authorization.authorize';
NetworkMessageTypes.msgLogout = 'authorization.logout';
NetworkMessageTypes.msgResetPassword = 'authorization.resetPassword';
NetworkMessageTypes.msgVerifyResetToken = 'authorization.verifyResetToken';
NetworkMessageTypes.msgResetPasswordWithToken = 'authorization.resetPasswordWithToken';
NetworkMessageTypes.msgUpdatePassword = 'authorization.updatePassword';
NetworkMessageTypes.resendVerificationEmail = 'authorization.resendVerificationEmail';
NetworkMessageTypes.msgThirdParty = 'authorization.thirdParty';
NetworkMessageTypes.msgIsAvailable = 'authorization.isAvailable';
NetworkMessageTypes.msgUpdateRbEye = 'authorization.updateRbEye';
NetworkMessageTypes.msgValidateUserName = 'authorization.validateUserName';
NetworkMessageTypes.msgValidateEmailAddress = 'authorization.validateEmailAddress';
NetworkMessageTypes.msgValidatePassword = 'authorization.validatePassword';
NetworkMessageTypes.msgRequestPasswordResetTokenWithPhoneNumber = 'authorization.requestPasswordResetTokenWithPhoneNumber';
NetworkMessageTypes.msgResetPasswordWithSmsCode = 'authorization.resetPasswordWithSmsCode';

// Code Links
NetworkMessageTypes.msgUseCodeLink = 'invite.useCodeLink';
NetworkMessageTypes.msgGetCodeLinkData = 'invite.getCodeLinkData';
NetworkMessageTypes.msgCreateInviteToSpaceLink = 'invite.createInviteToSpaceLink';

// Invite Email
NetworkMessageTypes.msgCreateInviteToScreencastLink = 'invite.createInviteToScreencastLink';
NetworkMessageTypes.msgCreateInviteToRoomLink = 'invite.createInviteToRoomLink';
NetworkMessageTypes.msgCreateInviteToRabbitLink = 'invite.createInviteToRabbitLink';
NetworkMessageTypes.msgCreateInviteToFriendLink = 'invite.createInviteToFriendLink';
NetworkMessageTypes.msgCheckInviteToFriendLink = 'invite.checkInviteToFriendLink';
NetworkMessageTypes.msgConsumeInviteToFriendLink = 'invite.consumeInviteToFriendLink';
NetworkMessageTypes.msgGetInviteLinkParams = 'invite.getInviteLinkParams';
NetworkMessageTypes.msgSendInviteEmails = 'invite.sendInviteEmails';
NetworkMessageTypes.msgInviteSent = 'invite.inviteSent';
NetworkMessageTypes.msgInviteFriendToRoom = 'invite.inviteFriendToRoom';
NetworkMessageTypes.msgInviteUsersToRoom = 'invite.inviteUsersToRoom';
NetworkMessageTypes.msgFlagLinkAsNotUsed = 'invite.flagLinkAsNotUsed';

NetworkMessageTypes.msgFacebookProfile = 'facebook_profile';

// User

NetworkMessageTypes.msgGetProfile = 'profile.getProfile';
NetworkMessageTypes.msgGetUserProfile = 'profile.getUserProfile';
NetworkMessageTypes.msgUpdateProfile = 'profile.updateProfile';
NetworkMessageTypes.msgChangePassword = 'profile.changePassword';
NetworkMessageTypes.msgClearPendingEmail = 'profile.clearPendingEmail';
NetworkMessageTypes.msgRemoveProfileImage = 'profile.removeProfileImage';
NetworkMessageTypes.resendVerificationSms = 'profile.resendVerificationSms';
NetworkMessageTypes.msgSearchForUsername = 'profile.searchProfile';
NetworkMessageTypes.msgSearchForProfiles = 'profile.searchForProfiles';
NetworkMessageTypes.msgGetRabbitUsersFromContacts = 'profile.getRabbitUsersFromContacts';
NetworkMessageTypes.msgGetProfileToken = 'profile.getProfileToken';
NetworkMessageTypes.msgSetOnlineStatusSetting = 'profile.setOnlineStatusSetting'; // online visibility/invisibility
NetworkMessageTypes.msgSetHideMeSetting = 'profile.setHideMeSetting'; // protected profile setting
NetworkMessageTypes.msgAddBookmark = 'bookmarks.addBookmark';
NetworkMessageTypes.msgDeleteBookmark = 'bookmarks.deleteBookmark';
NetworkMessageTypes.msgFetchAllBookmarks = 'bookmarks.fetchAllBookmarks';
NetworkMessageTypes.msgReplaceAllBookmarks = 'bookmarks.replaceAllBookmarks';
NetworkMessageTypes.msgReplaceBookmark = 'bookmarks.replaceBookmark';
NetworkMessageTypes.msgBookmarkCurrentRoomContentUrl = 'bookmarks.bookmarkCurrentRoomContentUrl';
NetworkMessageTypes.msgDeleteAccount = 'user.deleteAccount';

NetworkMessageTypes.msgFlagUser = 'userFlag.addFlag';

NetworkMessageTypes.msgGetContentForYou = 'contentSourceRanking.getContentForYou';

NetworkMessageTypes.msgUpdateNewLookOnboarding = 'uxProfile.updateNewLookOnboarding';
NetworkMessageTypes.msgSetScreencastQualityTrialExpiration = 'uxProfile.setScreencastQualityTrialExpiration';
NetworkMessageTypes.msgUpdateUxProfile = 'uxProfile.updateUxProfile';

NetworkMessageTypes.msgSetInterestTagIds = 'user.setInterestTagIds';
NetworkMessageTypes.msgGetInterestTags = 'content.tagsUserCanSelect';
NetworkMessageTypes.msgGetLiveRoomTags = 'content.tagsForLiveRooms';
NetworkMessageTypes.msgGetLiveRoomTagsHttp = '/tagsForLiveRooms';

// user 'oplog' emitted by server
NetworkMessageTypes.msgUserSelfMessage = 'user.UserSelfMessage';

// Error
NetworkMessageTypes.msgError = 'error';
NetworkMessageTypes.msgAccessDenied = 'access_denied';

// Campaign
NetworkMessageTypes.msgSubscribeToWebsiteList = 'campaign.subscribeToWebsiteList';
NetworkMessageTypes.msgSubscribeToInterestedList = 'campaign.subscribeToInterestedList';

// Url Shortener
NetworkMessageTypes.msgShortenUrl = 'urlShortener.shortenUrl';

// Conversations
NetworkMessageTypes.msgConversation = 'messaging.conversation';
NetworkMessageTypes.msgGetConversation = 'messaging.getConversation';
NetworkMessageTypes.msgGetConversations = 'messaging.getConversations';
NetworkMessageTypes.msgConversationUserAdded = 'messaging.conversationUserAdded';
NetworkMessageTypes.msgConversationUserRemoved = 'messaging.conversationUserRemoved';
NetworkMessageTypes.msgConversationUsersAdded = 'messaging.conversationUsersAdded';
NetworkMessageTypes.msgGetConversationWithUsers = 'messaging.getConversationWithUsers';

NetworkMessageTypes.msgConversationCacheSync = 'messaging.conversationCacheSync';

NetworkMessageTypes.msgConversationMessage = 'messaging.conversationMessage';
NetworkMessageTypes.msgSendConversationMessage = 'messaging.sendConversationMessage';
NetworkMessageTypes.msgRequestConversationMessages = 'messaging.requestConversationMessages';
NetworkMessageTypes.msgGetUnreadConversations = 'messaging.getUnreadConversations';

NetworkMessageTypes.msgSendMessageUnregisteredUser = 'messaging.sendMessageUnregisteredUser';

NetworkMessageTypes.msgMarkConversationLastReadTimestamp = 'messaging.markConversationLastReadTimestamp';
NetworkMessageTypes.msgSetLastMessageRead = 'messaging.setLastMessageRead';
NetworkMessageTypes.msgMarkHistoryReset = 'messaging.markLastHistoryReset';

NetworkMessageTypes.msgSendConversationActivity = 'messaging.sendConversationActivity';
NetworkMessageTypes.msgConversationActivity = 'messaging.conversationActivity';

NetworkMessageTypes.msgCreateStatus = 'messaging.createStatus';
NetworkMessageTypes.msgDeleteStatus = 'messaging.deleteStatus';
NetworkMessageTypes.msgDeleteConversationMessage = 'messaging.deleteConversationMessage';
NetworkMessageTypes.msgUpdateConversationMessage = 'messaging.updateConversationMessage';

NetworkMessageTypes.msgLikeConversationMessage = 'messaging.likeConversationMessage';

NetworkMessageTypes.msgRequestConversationMessageFromNotification = 'messaging.requestConversationMessageFromNotification';
NetworkMessageTypes.msgSetMuteConversation = 'messaging.setMuteConversationForUser';

// Group Chat
NetworkMessageTypes.msgCreateGroupConversation = 'messaging.createGroupConversation';
NetworkMessageTypes.msgAddUsersToGroupConversation = 'messaging.addUsersToGroupConversation';
NetworkMessageTypes.msgLeaveGroupConversation = 'messaging.leaveGroupConversation';
NetworkMessageTypes.msgDeleteGroupConversation = 'messaging.deleteGroupConversation';
NetworkMessageTypes.msgKickFromGroupConversation = 'messaging.kickFromGroupConversation';
NetworkMessageTypes.msgSetConversationName = 'messaging.setConversationName';

// Notifications
NetworkMessageTypes.msgNotification = 'notification.notification';
NetworkMessageTypes.msgDeleteNotification = 'notification.deleteNotification';
NetworkMessageTypes.msgSystemNotification = 'notification.systemNotification';
NetworkMessageTypes.msgSystemMaintenance = 'notification.systemMaintenance';
NetworkMessageTypes.msgSystemNuke = 'notification.systemNuke';
NetworkMessageTypes.msgDeleteAllUserNotifications = 'notification.deleteAllUserNotifications';

NetworkMessageTypes.msgNotificationMarkAsRead = 'notification.markAsRead';
NetworkMessageTypes.msgNotificationMarkAsToasted = 'notification.markAsToasted';
NetworkMessageTypes.msgFlagAction = 'notification.flagAction';
NetworkMessageTypes.msgGetUserWithProfileForNotification = 'notification.getUserWithProfileForNotification';

// Session Subscription
NetworkMessageTypes.msgResynchronize = 'subscription.resynchronize';
NetworkMessageTypes.msgSynchronize = 'subscription.synchronize';
NetworkMessageTypes.msgSubscriptionEntityDeleted = 'subscription.entityDeleted';
NetworkMessageTypes.msgSubscriptionFieldsUpdated = 'subscription.fieldsUpdated';
NetworkMessageTypes.msgSubscriptionValuesAdded = 'subscription.valuesAdded';
NetworkMessageTypes.msgSubscriptionValuesRemoved = 'subscription.valuesRemoved';

// Rooms
NetworkMessageTypes.msgGetRoomInfo = 'room.getRoomInfo';
NetworkMessageTypes.msgCreateRoom = 'room.createRoom';
NetworkMessageTypes.msgLeaveRoom = 'room.leaveRoom';
NetworkMessageTypes.msgTestAndEnterRoom = 'room.testAndEnterRoom';
NetworkMessageTypes.msgDoneWithRooms = 'room.doneWithRooms';
NetworkMessageTypes.msgKickOutUser = 'room.kickOutUser';
NetworkMessageTypes.msgKickedOut = 'room.kickedOut';
NetworkMessageTypes.msgEndChat = 'room.endChat';
NetworkMessageTypes.msgChatEnded = 'room.chatEnded';
NetworkMessageTypes.msgAddUsernameToRoom = 'room.addUsernameToRoom';
NetworkMessageTypes.msgRequestLockedRoomAccess = 'room.requestLockedRoomAccess';
NetworkMessageTypes.msgLockedRoomAccessGranted = 'room.lockedRoomAccessGranted';
NetworkMessageTypes.msgRequestFullRoomAccess = 'room.requestFullRoomAccess';
NetworkMessageTypes.msgFullRoomAccessGranted = 'room.fullRoomAccessGranted';
NetworkMessageTypes.msgTabContentChanged = 'room.tabContentChanged';
NetworkMessageTypes.msgSetRoomDescription = 'room.setRoomDescription';
NetworkMessageTypes.msgSetRoomMedia = 'room.setRoomMedia';
NetworkMessageTypes.msgAddRoomModerator = 'room.addRoomModerator';
NetworkMessageTypes.msgRemoveRoomModerator = 'room.removeRoomModerator';

NetworkMessageTypes.msgLockRoom = 'room.lockRoom';
NetworkMessageTypes.msgUnlockRoom = 'room.unlockRoom';
NetworkMessageTypes.msgLockRoomForNonFriends = 'room.lockRoomForNonFriends';

NetworkMessageTypes.msgJoinRoom = 'room.joinRoom';
NetworkMessageTypes.msgStopMonitoringNetworkStatus = 'room.stopMonitoringNetworkStatus';
NetworkMessageTypes.msgSetSelfcast = 'room.setSelfcast';
NetworkMessageTypes.msgRoomState = 'room.roomState';

NetworkMessageTypes.subscriptionUserEvents = 'userEvents';
NetworkMessageTypes.msgRoomFull = 'room.roomFull';
NetworkMessageTypes.msgUserJoinedFullGroup = 'room.userJoinedFullGroup';

NetworkMessageTypes.msgLikeRoom = 'room.likeRoom';
NetworkMessageTypes.msgRoomReaction = 'room.reaction';
NetworkMessageTypes.msgClearRoomConversation = 'room.clearRoomConversation';
NetworkMessageTypes.msgGetTrendingTitles = 'liveRooms.getTrendingTitles';

NetworkMessageTypes.msgClearRoomUserGroup = 'room.clearRoomUserGroup';

// Live Rooms
NetworkMessageTypes.msgGetLiveRooms = 'liveRooms.getLiveRooms';
NetworkMessageTypes.msgGetLiveRoomsForGroup = 'liveRooms.getLiveRoomsForGroup';
NetworkMessageTypes.msgToggleFeatured = 'liveRooms.toggleFeatured';
NetworkMessageTypes.msgShowContentNotAllowed = 'liveRooms.showContentNotAllowed';
NetworkMessageTypes.msgShowGoLivePrompt = 'liveRooms.showGoLivePrompt';
NetworkMessageTypes.msgShowFeaturePrompt = 'liveRooms.showFeaturePrompt';
NetworkMessageTypes.msgAddCustomTitle = 'liveRooms.addCustomTitle';
NetworkMessageTypes.msgGetSearchLiveRoomsHistory = 'liveRooms.getSearchLiveRoomsHistory';
NetworkMessageTypes.msgFlagRoomInappropriate = 'liveRooms.flagRoomInappropriate';
NetworkMessageTypes.msgGetJoinedRoomsHistory = 'room.getJoinedRoomsHistory';
NetworkMessageTypes.msgGetLiveRoomDescriptionForModerator = 'liveRooms.getLiveRoomDescriptionForModerator';

// Suggested/Recommended content
NetworkMessageTypes.msgGetContentSuggestions = 'contentSourceRanking.getRecommendedContentForTags';
NetworkMessageTypes.msgGetContentSuggestionsHttp = '/getRecommendedContentForTags';

// Session
NetworkMessageTypes.msgScreencastKilled = 'session.screencastKilled';
NetworkMessageTypes.msgNagOrder = 'session.nagOrder';
NetworkMessageTypes.msgParticipationSettings = 'session.participationSettings';
NetworkMessageTypes.msgCreateAndAuthorizeSession = 'session.createAndAuthorize';
NetworkMessageTypes.msgForceClean = 'session.forceClean';
NetworkMessageTypes.msgContactDetails = 'session.contactDetails';
NetworkMessageTypes.msgParticipationStart = 'session.participationStart';
NetworkMessageTypes.msgIdleStatus = 'session.idleStatus';
NetworkMessageTypes.msgWebAppState = 'session.webAppState';
NetworkMessageTypes.msgToggleStreamPaused = 'session.toggleStreamPaused';

NetworkMessageTypes.msgStartScreenCapture = 'web.startScreenCapture';
NetworkMessageTypes.msgStopScreenCapture = 'web.stopScreenCapture';
NetworkMessageTypes.msgTakeScreencaptureControl = 'web.takeScreencaptureControl';
NetworkMessageTypes.msgReleaseScreencaptureControl = 'web.releaseScreencaptureControl';
NetworkMessageTypes.msgControlClaimedByOwner = 'web.controlClaimedByOwner';
NetworkMessageTypes.msgUpdateClipboardScreenCaptureSession = 'web.updateClipboardScreenCaptureSession';
NetworkMessageTypes.msgScreencastControlTaken = 'web.screencastControlTaken';
NetworkMessageTypes.msgControlRequestedScreenCaptureSession = 'web.screencastControlRequested';
NetworkMessageTypes.msgRequestScrencaptureControl = 'web.requestScrencaptureControl';
NetworkMessageTypes.msgSwitchVideoQuality = 'web.switchVideoQuality';
NetworkMessageTypes.msgScreencastIdleStatus = 'web.screencastIdleStatus';

NetworkMessageTypes.msgStartBroadcast = 'broadcast.startBroadcast';
NetworkMessageTypes.msgStopBroadcast = 'broadcast.stopBroadcast';

NetworkMessageTypes.msgCreateMediaSession = 'web.createMediaSession';
NetworkMessageTypes.msgDestroyMediaSession = 'web.destroyMediaSession';
NetworkMessageTypes.msgStartStreamingMediaSession = 'web.startStreamingMediaSession';
NetworkMessageTypes.msgStopStreamingMediaSession = 'web.stopStreamingMediaSession';
NetworkMessageTypes.msgUpdateStreamingMediaSession = 'web.updateStreamingMediaSession';
NetworkMessageTypes.msgResetMediaSession = 'web.resetMediaSession';
NetworkMessageTypes.msgMediaSessionOffer = 'web.mediaSessionOffer';
NetworkMessageTypes.msgMediaSessionAnswer = 'web.mediaSessionAnswer';
NetworkMessageTypes.msgMediaSessionState = 'web.mediaSessionState';
NetworkMessageTypes.msgSetMediaQuality = 'web.setMediaQuality';
NetworkMessageTypes.msgNewMediaQuality = 'web.newMediaQuality';

NetworkMessageTypes.msgSetMediaBitrate = 'web.setMediaBitrate';
NetworkMessageTypes.msgInvalidWebrtcCall = 'web.invalidWebrtcCall';
NetworkMessageTypes.msgUpdateStreamingMediaSession = 'web.updateStreamingMediaSession';
NetworkMessageTypes.msgToggleVideochat = 'web.toggleVideochat';
NetworkMessageTypes.msgUpdateConstantBitrate = 'web.updateConstantBitrate';
NetworkMessageTypes.msgRestrictedContentAccessed = 'web.restrictedContentAccessed';

NetworkMessageTypes.msgGetIceServers = 'webConfig.getIceServers';

NetworkMessageTypes.msgWebrtcAnswerClient = 'web.newMediaSessionAnswerClient';
NetworkMessageTypes.msgWebrtcOfferClient = 'web.newMediaSessionOfferClient';
NetworkMessageTypes.msgWebrtcAnswerServer = 'web.newMediaSessionAnswerServer';
NetworkMessageTypes.msgWebrtcOfferServer = 'web.newMediaSessionOfferServer';
NetworkMessageTypes.msgNewMediaSessionRestart = 'web.newMediaSessionRestart';

NetworkMessageTypes.msgSendFriendRequest = 'user.sendFriendRequest';
NetworkMessageTypes.msgAcceptFriendRequest = 'user.acceptFriendRequest';
NetworkMessageTypes.msgRejectFriendRequest = 'user.rejectFriendRequest';
NetworkMessageTypes.msgRemoveFriend = 'user.removeFriend';
NetworkMessageTypes.msgBlockUser = 'user.blockUser';
NetworkMessageTypes.msgUnblockUser = 'user.unblockUser';

NetworkMessageTypes.msgContentRestrictionRequest = 'content.contentRestrictionRequest';
NetworkMessageTypes.msgContentRestrictionAnswer = 'content.contentRestrictionAnswer';

NetworkMessageTypes.msgChangeCountry = 'session.changeCountry';
NetworkMessageTypes.msgIceCandidates = 'session.iceCandidates';

NetworkMessageTypes.msgGetFriendSuggestions = 'friendSuggestions.getFriendSuggestions';
NetworkMessageTypes.msgRejectUserIdFromSuggestions = 'friendSuggestions.rejectUserIdFromSuggestions';
NetworkMessageTypes.msgGetFriendSuggestionsWithCustomInfo = 'friendSuggestions.getFriendSuggestionsWithCustomInfo';

NetworkMessageTypes.msgYoutubeGetPopular = 'youtube.getPopular';
NetworkMessageTypes.msgYoutubeSearch = 'youtube.search';
NetworkMessageTypes.msgContentSearch = 'content.searchContent';

NetworkMessageTypes.msgSetWantsAudioVideo = 'session.setWantsAudioVideo';

NetworkMessageTypes.msgRegisterDevice = 'devices.registerDevice';
NetworkMessageTypes.msgUnregisterDevice = 'devices.unregisterDevice';
// Keep the following it is used by MOBILE!
NetworkMessageTypes.msgUpdateDevice = 'devices.updateDevice';

NetworkMessageTypes.msgGetEventImagePreviewAndTitle = 'scheduling.getImagePreviewAndTitle';
NetworkMessageTypes.msgScheduleEvent = 'scheduling.scheduleEvent';
NetworkMessageTypes.msgCancelEvent = 'scheduling.cancelEvent';
NetworkMessageTypes.msgRescheduleEvent = 'scheduling.rescheduleEvent';
NetworkMessageTypes.msgGetScheduledEvents = 'scheduling.getScheduledEvents';
NetworkMessageTypes.msgGetScheduledEventsForGroup = 'scheduling.getScheduledEventsForGroup';
NetworkMessageTypes.msgRSVPToEvent = 'scheduling.rsvpToEvent';
NetworkMessageTypes.msgJoinGroupAndRSVPToEvent = 'scheduling.joinGroupAndRSVPToEvent';
NetworkMessageTypes.msgStartEvent = 'scheduling.startEvent';
NetworkMessageTypes.msgGetEventAttendees = 'scheduling.getEventAttendees';
NetworkMessageTypes.msgGetPublicEvent = 'scheduling.getPublicEvent';
NetworkMessageTypes.msgPopupUpStartEvent = 'scheduling.popupUpStartEvent';
NetworkMessageTypes.msgGetContentCalendarEvents = 'scheduling.getCalendarEvents';
NetworkMessageTypes.msgFlagEventInappropriate = 'scheduling.flagEventInappropriate';

NetworkMessageTypes.msgCreateUserGroup = 'userGroups.createGroup';
NetworkMessageTypes.msgGetUserGroups = 'userGroups.getGroups';
NetworkMessageTypes.msgGetMyUserGroups = 'userGroups.getMyGroups';
NetworkMessageTypes.msgGetGroupMembers = 'userGroups.getGroupMembers';
NetworkMessageTypes.msgJoinGroup = 'userGroups.joinGroup';
NetworkMessageTypes.msgLeaveGroup = 'userGroups.leaveGroup';
NetworkMessageTypes.msgCheckGroupMembership = 'userGroups.checkGroupMembership';
NetworkMessageTypes.msgDeleteGroup = 'userGroups.deleteGroup';
NetworkMessageTypes.msgDeleteGroupForAdmin = 'userGroups.deleteGroupForAdmin';
NetworkMessageTypes.msgMarkGroupInvisible = 'userGroups.markGroupInvisible';
NetworkMessageTypes.msgDeleteGroupActivity = 'userGroups.deleteGroupActivity';
NetworkMessageTypes.msgKickUserFromGroup = 'userGroups.kickUserFromGroup';
NetworkMessageTypes.msgInviteGroupToRoom = 'userGroups.inviteGroupToRoom';
NetworkMessageTypes.msgGetGroupInfoByNamedId = 'userGroups.getGroupInfoByNamedId';

// spaces
NetworkMessageTypes.msgCreateSpace = 'space.createSpace';
NetworkMessageTypes.msgCreateAutoSpaceOfOne = 'space.createAutoSpaceOfOne';
NetworkMessageTypes.msgUpdateSpace = 'space.updateSpace';
NetworkMessageTypes.msgDeleteSpace = 'space.deleteSpace';
NetworkMessageTypes.msgJoinSpace = 'space.joinSpace';
NetworkMessageTypes.msgLeaveSpace = 'space.leaveSpace';
NetworkMessageTypes.msgRemoveSpaceMember = 'space.removeSpaceMember';
NetworkMessageTypes.msgBanSpaceMember = 'space.banSpaceMember';
NetworkMessageTypes.msgUnbanSpaceMember = 'space.unbanSpaceMember';
NetworkMessageTypes.msgSubscribeToSpace = 'space.subscribeToSpace';
NetworkMessageTypes.msgUnsubscribeFromSpace = 'space.unsubscribeFromSpace';
NetworkMessageTypes.msgGetSpaces = 'space.getSpaces';
NetworkMessageTypes.msgGetSpaceRooms = 'room.getSpaceRooms';
NetworkMessageTypes.msgGetOplogsForSpace = 'space.getOplogsForSpace';
NetworkMessageTypes.msgGetSpaceMembers = 'space.getSpaceMembers';
NetworkMessageTypes.msgGetBannedSpaceMembers = 'space.getBannedSpaceMembers';
NetworkMessageTypes.msgMakeUserAdministrator = 'space.makeUserAdministrator';
NetworkMessageTypes.msgSpaceMessage = 'space.spaceMessage';
NetworkMessageTypes.msgCreateSpaceRoom = 'space.createSpaceRoom';
NetworkMessageTypes.msgGetSpaceOnlineSessions = 'space.getSpaceOnlineSessions';
NetworkMessageTypes.msgGetProviders = 'space.getProviders';
NetworkMessageTypes.msgGetAllSpaceNotificationsPreference = 'space.getAllSpaceNotificationsPreference';
NetworkMessageTypes.msgSetAllSpaceNotificationsPreference = 'space.setAllSpaceNotificationsPreference';

// channels
NetworkMessageTypes.msgCreateChannel = 'space.createChannel';
NetworkMessageTypes.msgUpdateChannel = 'space.updateChannel';
NetworkMessageTypes.msgDeleteChannel = 'space.deleteChannel';

// shared contents
NetworkMessageTypes.msgPlaySharedContent = 'space.playSharedContent';
NetworkMessageTypes.msgCreateSharedContent = 'space.createSharedContent';
NetworkMessageTypes.msgPlayContentFromLaunchpad = 'space.playContentFromLaunchpad';
NetworkMessageTypes.msgPlayContentFromUrl = 'space.playContentFromUrl';
NetworkMessageTypes.msgGetSharedContentsInSpace = 'space.getSharedContentsInSpace';
NetworkMessageTypes.msgGetAllSharedContentProviders = 'space.getAllSharedContentProviders';
NetworkMessageTypes.msgRetrySharedContentRecording = 'sharedContent.retrySharedContentRecording';
NetworkMessageTypes.msgCheckUrlForSupportedProvider = 'space.checkUrlForSupportedProvider';

// reelgood

NetworkMessageTypes.msgSearchContentFromReelgood = 'reelgood.searchContent';
NetworkMessageTypes.msgGetMostPopularContentsFromReelgood = 'reelgood.getMostPopularContents';
NetworkMessageTypes.msgGetDetailsForContentFromReelgood = 'reelgood.getDetailsForContent';
NetworkMessageTypes.msgGetDetailsForSeasonFromReelgood = 'reelgood.getDetailsForSeason';

// giphy

NetworkMessageTypes.msgSearchGiphy = 'giphy.search';
NetworkMessageTypes.msgGetTrendingsFromGiphy = 'giphy.getTrendings';
NetworkMessageTypes.msgPostGiphy = 'messaging.postGiphy';

// content credentials
NetworkMessageTypes.msgSaveCredentials = 'credential.saveCredentials';
NetworkMessageTypes.msgGetCredentials = 'credential.getCredentials';
NetworkMessageTypes.msgDeleteCredentials = 'credential.deleteCredentials';
NetworkMessageTypes.msgCredentialStateChanged = 'credential.credentialStateChanged';

// tags
NetworkMessageTypes.msgGetAllTags = 'content.tagsAll';

// user characteristics
NetworkMessageTypes.msgUpdateOnboardingCardProgress = 'userCharacteristics.updateOnboardingCardProgress';

// feed
NetworkMessageTypes.msgEnsureFollowing = 'feed.ensureFollowing';
NetworkMessageTypes.msgGetActivity = 'feed.getActivity';
NetworkMessageTypes.msgDeleteActivity = 'feed.removeActivityFromAllFeeds';
NetworkMessageTypes.msgSubscribeFeed = 'feed.subscribe';
NetworkMessageTypes.msgUnsubscribeFeed = 'feed.unsubscribe';
NetworkMessageTypes.msgGetFeed = 'feed.get';
NetworkMessageTypes.msgPost = 'feed.post';
NetworkMessageTypes.msgUpdateFeed = 'feed.update';
NetworkMessageTypes.msgFollowUser = 'feed.followUser';
NetworkMessageTypes.msgNewUserMoment = 'feed.newUserMoment';

// search
NetworkMessageTypes.msgGetSearchGlobalHistory = 'search.getSearchGlobalHistory';
NetworkMessageTypes.msgSearchGlobal = 'search.searchGlobal';
NetworkMessageTypes.msgSearchLiveRooms = 'liveRooms.searchLiveRooms';
NetworkMessageTypes.msgSearchUserGroups = 'userGroups.searchUserGroups';
NetworkMessageTypes.msgGetSearchSuggestions = 'liveRooms.getSearchSuggestions';
NetworkMessageTypes.msgGetUserGroupSearchSuggestions = 'userGroups.getUserGroupSearchSuggestions';
NetworkMessageTypes.msgGetSearchUserGroupsHistoryy = 'userGroups.getSearchUserGroupsHistory';
NetworkMessageTypes.msgSearchScheduledEvents = 'scheduling.searchScheduledEvents';
NetworkMessageTypes.msgGetSearchEventsSuggestions = 'scheduling.getSearchSuggestions';
NetworkMessageTypes.msgGetSearchEventsHistory = 'scheduling.getSearchScheduledEventsHistory';

NetworkMessageTypes.msgGetLiveStats = 'liveRooms.getLiveStats';

NetworkMessageTypes.msgGetSubscriptionType = 'streams.getSubscriptionType';

NetworkMessageTypes.msgSetAutoscaleEnabled = 'admin.setAutoscaleEnabled';
NetworkMessageTypes.msgSetLowCaptureThreshold = 'admin.setLowCaptureThreshold';
NetworkMessageTypes.msgSetHighCaptureThreshold = 'admin.setHighCaptureThreshold';
NetworkMessageTypes.msgCheckAppVersion = 'admin.checkAppVersion';

// client event subscriptions
NetworkMessageTypes.msgUnsubscribeFromEvent = 'clientEventSubscription.unsubscribe';
NetworkMessageTypes.msgSubscribeToMessages = 'messaging.subscribeToMessages';
NetworkMessageTypes.msgSubscribeToMessagesBatched = 'messaging.subscribeToMessagesBatched';
NetworkMessageTypes.msgSubscribeToTyping = 'messaging.subscribeToTyping';

NetworkMessageTypes.msgGetHistoricalScreencastContentForAdmin = 'room.getHistoricalScreencastContentForAdmin';

NetworkMessageTypes.msgGetVerizonStats = 'room.getVerizonStats';
// interests
NetworkMessageTypes.msgSetRoomInterests = 'liveRooms.setRoomInterests';
NetworkMessageTypes.msgGetOpenRoomsForInterest = 'liveRooms.getOpenRoomsForInterest';
NetworkMessageTypes.msgGetAllInterests = 'interest.getAllInterests';
NetworkMessageTypes.msgGetInterestDefinition = 'interest.getInterestDefinition';
NetworkMessageTypes.msgGettAllInterests = 'interest.getAllInterests';

NetworkMessageTypes.msgPlayAvSource = 'avSource.playAVSource';

NetworkMessageTypes.msgStreamerStatusChanged = 'streamer.statusChanged';
// Promo Slider
NetworkMessageTypes.msgGetPromoSlider = 'slider.getPromoSlider';
NetworkMessageTypes.msgUpdatePromoSlider = 'slider.createPromoSlider';
NetworkMessageTypes.msgStartPromoSlider = 'slider.startPromoSlider';
NetworkMessageTypes.msgEndPromoSlider = 'slider.endPromoSlider';
NetworkMessageTypes.msgRemoveRoomFromPromoSlider = 'slider.removeRoomFromPromoSlider';
NetworkMessageTypes.msgAddRoomToPromoSlider = 'slider.addRoomToPromoSlider';

module.exports = NetworkMessageTypes;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

	appStarted: 'AppStarted',

	story: 'story',
	registerSuccess: 'registerSuccess',
	registerFailure: 'registerFailure',
	updateProfileSuccess: 'updateProfileSuccess',
	updateProfileFailure: 'updateProfileFailure',
	sessionCreated: 'sessionCreated',
	deviceFingerprintSet: 'deviceFingerprintSet',
	sessionAuthenticated: 'sessionAuthenticated',
	sessionLoggedOut: 'sessionLoggedOut',
	sessionJoinedGroup: 'sessionJoinedGroup',
	sessionActive: 'sessionActive',
	sessionLeftGroup: 'sessionLeftGroup',
	groupCreated: 'groupCreated',
	roomCreated: 'roomCreated',
	sessionDeleted: 'sessionDeleted',
	groupDeleted: 'groupDeleted',
	roomDeleted: 'roomDeleted',
	routeChanged: 'routeChanged',
	sceneChanged: 'sceneChanged',
	uiInteraction: 'uiInteraction',
	screencastWatching: 'clientScreencastWatching',
	screencastStopped: 'clientScreencastStopped',
	tabcastWatching: 'clientTabcastWatching',
	tabcastStop: 'clientTabcastStop',
	tabcastQueued: 'clientTabcastQueued',
	userRegistered: 'registerSuccess',
	sessionEnteredRoom: 'sessionEnteredRoom',
	sessionStartedLiveRoom: 'sessionStartedLiveRoom',
	inRoomAlone: 'inRoomAlone',
	analyticsSessionJoinedRoom: 'analyticsSessionJoinedRoom',
	analyticsSessionLeftRoom: 'analyticsSessionLeftRoom',
	sessionTrackLeftRoom: 'sessionTrackLeftRoom',
	sessionTrackSessionEnds: 'sessionTrackSessionEnds',
	linkCreated: 'linkCreated',
	friendRequest: 'friendRequest',
	becameFriend: 'becameFriend',
	RTT: 'RTT',
	initialRTT: 'InitialRTT',
	normalRTT: 'NormalRTT',
	lowBandwidthBannerShown: 'LowBandwidthBannerShown',
	screencastConnectionFailure: 'screencastConnectionFailure',
	uploadFailure: 'uploadFailure',
	downloadFailure: 'downloadFailure',
	screencastConnectionIssue: 'screencastConnectionIssue',
	downloadIssue: 'downloadIssue',
	uploadIssue: 'uploadIssue',
	screencastConnectionSuccess: 'screencastConnectionSuccess',
	uploadSuccess: 'uploadSuccess',
	downloadSuccess: 'downloadSuccess',
	enteredBasicMode: 'EnteredBasicMode',
	retryPopupShown: 'RetryPopupShown',
	retryClicked: 'RetryClicked',
	retrySuccess: 'RetrySuccess',
	retryFailure: 'RetryFailure',

	watchingWithSomeone: 'watchingWithSomeone', // Not used anymore but kept to not break prod on deployment
	watchingTabcaptureWithSomeone: 'WatchingTabcaptureWithSomeone',
	watchingScreencastWithSomeone: 'WatchingScreencastWithSomeone',

	// those are client generated
	clientScreenView: 'clientScreenView',
	clientLeaveChat: 'clientLeaveChat',
	clientGoToRoomFromFriendList: 'clientGoToRoomFromFriendList',
	clientContactFind: 'clientContactFind',
	clientTappedHomeVideo: 'clientTappedHomeVideo',
	clientStartChatHomePage: 'clientStartChatHomePage',
	startedSelfcast: 'startedSelfcast',
	clientStartedSelfcast: 'clientStartedSelfcast',
	clientScreencastQueued: 'clientScreencastQueued',
	clientScreencastStart: 'clientScreencastStart',
	clientUserAcquired: 'clientUserAcquired',
	clientChatGroupSizeChanged: 'clientChatGroupSizeChanged',
	clientClickedNotificationBanner: 'clientClickedNotificationBanner',
	notificationInteracted: 'notificationInteracted',
	notificationSent: 'notificationSent',
	notificationFailedToSend: 'notificationFailedToSend',

	startScreencast: 'startScreencast',

	// below are from
	// /Volumes/Rabbit-Source/rabbit/rabbit-node/coco/site/www/lib/rabbit/core/AnalyticsEventTypes.js

	keyErrorConnectionLost: 'clientErrorConnectionLost',

	// Robot events indicate that an automated script is trying to use the site
	keyRobotEmailInvite: 'clientRobotEmailInvite',
	keyRobotFeedback: 'clientRobotFeedback',
	keyRobotSignup: 'clientRobotSignup',
	keyRobotLock: 'clientRobotLock',
	keyRobotFull: 'clientRobotFull',

	keyScreencastError: 'clientScreencastError',
	keyScreencastNavigate: 'clientScreencastNavigate',
	keyScreencastNavigateError: 'clientScreencastNavigateError',
	keyScreencastNavigateSuccess: 'clientScreencastNavigateSuccess',
	keyScreencastQueued: 'clientScreencastQueued',
	keyScreencastReleaseControl: 'clientScreencastReleaseControl',
	keyScreencastStart: 'clientScreencastStart',
	keyScreencastStartSuccess: 'clientScreencastStartSuccess',
	keyScreencastStop: 'clientScreencastStop',
	keyScreencastStopped: 'clientScreencastStopped',
	keyScreencastTakeControl: 'clientScreencastTakeControl',
	keyScreencastWatching: 'clientScreencastWatching',

	keyTabcastWatching: 'clientTabcastWatching',
	keyTabcastStarting: 'clientTabcastStart',
	keyTabcastContentChanged: 'clientTabcastContentChanged',
	keyTabcastQueued: 'clientTabcastQueued',
	keyTabcastStop: 'clientTabcastStop',
	keyTabcastStopped: 'clientTabcastStopped',

	keySigninSubmit: 'clientSigninSubmit',

	keyChatGroupSizeChanged: 'clientChatGroupSizeChanged',
	keyChatting: 'clientChatting',

	keyEnterFullScreen: 'clientEnterFullScreen',

	keyHideBubbles: 'clientHideBubbles',
	keyShowBubbles: 'clientShowBubbles',

	keyStartedSelfcast: 'startedSelfcast',

	keyInvitedFriendFromFriendsList: 'invitedFriendFromFriendsList',

	keyContactFind: 'clientContactFind',
	keyFriendSuggestion: 'clientFriendSuggestion',

	keyCreatedGroupChat: 'clientCreatedGroupChat',
	keyViewedGroupChat: 'clientViewedGroupChat',
	keyPostedGroupChat: 'clientPostedGroupChat',
	keyLeftGroupChat: 'clientLeftGroupChat',
	keyDeletedGroupChat: 'clientDeletedGroupChat',

	keyEnteredMyRoom: 'clientEnteredMyRoom',
	keyEnteredSomeoneElseRoom: 'clientEnteredSomeoneElseRoom',
	keyUserAcquired: 'clientUserAcquired',
	keyInRoomWithFriends: 'clientInRoomWithFriends',
	keyInATextChatWithFriends: 'clientInATextChatWithFriends',
	keyHomeViewed: 'HomeViewed',
	keyEventsViewed: 'EventsViewed',
	keyRoomsViewed: 'RoomsViewed',
	keyGroupsViewed: 'GroupsViewed',

	keyClickedCamera: 'ClickedCamera',
	keyClickedMic: 'ClickedMic',

	keyPostedToActivityFeed: 'clientPostedToActivityFeed',

	keyPostedReaction: 'PostedReaction',

	keyClickedFeatureAnnouncementActivity: 'clickedFeatureAnnouncementActivity',
	keyViewedPostPreviewMention: 'clientViewedPostPreviewMention',
	keyClickedGoToMyRoom: 'ClickedGoToMyRoom',
	keyClickedToRequestAccess: 'ClickedToRequestAccess',
	keyClickedToSendMessage: 'ClickedToSendMessage',
	keyClickedClearRoomChat: 'ClickedClearRoomChat',
	keyClickedPinEveryone: 'clientClickedPinEveryone',
	keyClickedUnpinEveryone: 'clientClickedUnpinEveryone',
	keyClickedSignUp: 'clientClickedSignUp',
	keyClickedSignIn: 'clientClickedSignIn',
	keyClickedDisableVideoChat: 'ClickedDisableVideoChat',
	keyClickedEnableVideoChat: 'ClickedEnableVideoChat',
	keysNewUserAutoRedirect: 'NewUserAutoRedirect',
	keysContentSuggestionView: 'ContentSuggestionView',

	keySignedUp: 'SignedUp',
	keySignedIn: 'SignedIn',

	keysClientEnterNamePromptShown: 'clientEnterNamePromptShown',
	keysClientAVPromptShown: 'clientAVPromptShown',
	keysClientInvitePromptShown: 'clientInvitePromptShown',
	keysClientFirstRoomShown: 'clientFirstRoomShown',
	keysClientGameStarted: 'clientGameStarted',
	keysClientGameJoined: 'clientGameJoined',

	keyPageView: 'clientPageView',

	keyReportModalShown: 'ReportModalShown',
	keyReportModalCompleted: 'ReportModalCompleted',
	keyReportModalClosed: 'ReportModalClosed',

	// rabbit pad
	keyClickedLauchpadTab: 'clientClickedLauchpadTab',
	keyClickedContent: 'ClickedContent',
	keyClickedSkip: 'ClickedSkip',

	// External Types
	keyTypeClickedSignUp: 'ClickedSignUp',
	keyClickedStartChat: 'ClickedStartChat',
	keyFriendSuggestionsShown: 'FriendSuggestionsShown',
	keyEnterNamePropmtShown: 'EnterNamePropmtShown',
	keysEnterNameAVPromptShown: 'EnterNameAVPromptShown',
	keysAVPromptShown: 'AVPromptShown',
	keysInvitePromptShown: 'InvitePromptShown',
	keysFirstRoomIntroShown: 'FirstRoomIntroShown',
	keysChromeExtPopupClosed: 'ChromeExtPopupClosed',
	keysChromeExtPopupClicked: 'ChromeExtPopupClicked',
	keysGameStarted: 'StartedGame',
	keysGameJoined: 'JoinedGame',
	keysRoomVisibiltyPopupEveryoneClicked: 'RoomVisibiltyPopupEveryoneClicked',
	keysInvitingSomebody: 'InvitingSomebody',

	// Experiment test
	keysSimpleOnboardingWelcomeShown: 'SimpleOnboardingWelcomeShown',
	keysSimpleOnboardingWatchShown: 'SimpleOnboardingWatchShown',
	keysSimpleOnboardingInviteMessageShown: 'SimpleOnboardingInviteMessageShown',
	keysSimpleOnboardingLaunchpadMessageShown: 'SimpleOnboardingLaunchpadMessageShown',
	keysSimpleOnboardingLaunchpadShown: 'SimpleOnboardingLaunchpadShown',
	keysSimpleOnboardingLiveRoomMessageShown: 'SimpleOnboardingLiveRoomMessageShown',
	keysSimpleOnboardingFeaturedMessageShown: 'SimpleOnboardingFeaturedMessageShown',
	keysSimpleOnboardingComplete: 'SimpleOnboardingComplete',

	keysTagSectionHomepage: 'TagSectionHomepage',
	keysClickedSuggestedContent: 'ClickedSuggestedContent',
	keysClickedTag: 'ClickedTag',
	keysTagResultEmpty: 'TagResultEmpty',

	keyTypePageView: 'PageView',

	// Room Nag
	keyRoomNagPopupViewed: 'RoomNagPopupViewed',
	keyRoomNagRoomJoined: 'RoomNagRoomJoined',
	keyRoomNagProfileClicked: 'RoomNagProfileClicked',
	keyRoomNagPopupClosed: 'RoomNagPopupClosed',
	keyRoomFullNagPopupViewed: 'RoomFullNagPopupViewed',
	keyRoomFullNagRoomJoined: 'RoomFullNagRoomJoined',
	keyRoomFullNagProfileClicked: 'RoomFullNagProfileClicked',
	keyRoomFullNagPopupClosed: 'RoomFullNagPopupClosed',

	keyHomeRoomClicked: 'HomeRoomClicked',
	keyInterestRoomClicked: 'InterestRoomClicked',
	keyHomeShowmoreClicked: 'HomeShowMoreClicked',
	keyInterestShowmoreClicked: 'InterestShowMoreClicked',
	keyRoomcardInterestpickerChangeModerator: 'RoomcardInterestpickerChangeModerator',

	keyRoomClicked: 'RoomClicked',
	keyShowMoreClicked: 'ShowMoreClicked',
	keySliderNavClicked: 'SliderNavClicked',
	keyShowAllCLicked: 'ShowAllCLicked',

	// External Categories
	keyCategorySignInUp: 'Sign in / up',
	keyCategoryWithFriends: 'With Friends',
	keyCategoryAVMonitoring: 'AVMonitoring',
	keyCategoryClickNavigation: 'Click - Navigation',
	keyCategoryError: 'Error',
	keyCategoryFeature: 'Feature',
	keyCategoryFindFriends: 'Find friends',
	keyCategoryHome: 'Home',
	keyCategoryNavigation: 'Navigation',
	keyCategorySession: 'Session',
	keyCategoryRoomType: 'Room type',
	keyCategoryUser: 'User',
	keyCategoryPopup: 'Popup',
	keyCategoryReferral: 'Referral',
	keyCategoryLaunchpad: 'Launchpad',
	keyCategoryInterests: 'Interests',
	keyCategoryScheduledEvents: 'ScheduledEvents',
	keyCategoryRoom: 'Room',
	keyCategoryFeed: 'Feed',
	keyCategoryRoomNag: 'RoomNag',
	keyCategoryRoomFullNag: 'RoomFullNag',
	keyCategorySearch: 'Search',
	keyCategorySurvey: 'Survey',
	keyRegFLow: 'RegFlow',

	// interests
	keyClickedAddInterests: 'ClickedAddInterests',
	keySeenInterestPicker: 'SeenInterestPicker',

	// interests fan chat
	keyInRoomclickInFanchat: 'InRoomclickInFanchat',
	keyInRoomclickOutFanchat: 'InRoomclickOutFanchat',
	keyClickInFanchat: 'ClickInFanchat',
	keyClickOutFanchat: 'ClickOutFanchat',
	keyCloseFanchat: 'CloseFanchat',

	// SURVEYS
	keySignInSurvey: 'ExitSurvey',
	keyHomeSignedInExitSurvey: 'HomeSignedInExitSurvey',
	keySignInIntentSurvey: 'IntentSurveyClosed',
	keyOwnRoomIntentSurvey: 'OwnRoomIntentSurvey',
	keyNotOwnRoomIntentSurvey: 'NotOwnRoomIntentSurvey',

	// Scheduled Events
	keyClickedToCreateEvent: 'ClickedToCreateEvent',
	keyCreatedEvent: 'CreatedEvent',
	keyCanceledEvent: 'CanceledEvent',
	keyClickedToRSVP: 'ClickedToRSVP',
	keyClickedToUndoRSVP: 'ClickedToUndoRSVP',
	keyShownStartEventPopup: 'ShownStartEventPopup',
	keyStartedEvent: 'StartedEvent',
	keySharedEventPopupShown: 'SharedEventPopupShown',
	keySharedEventPopupClosed: 'SharedEventPopupClosed',
	keyEventShared: 'EventShared',

	// FEED
	keyClickedShowUpdates: 'ClickedShowUpdates',
	keyPostedMoment: 'PostedMoment',
	keyLikedActivity: 'LikedActivity',
	keyCommentedActivity: 'CommentedActivity',

	// global search
	keySearchPageReached: 'SearchPageReached',
	keySearchSeeMoreRoomsClicked: 'SearchSeeMoreRoomsClicked',
	keySearchSeeMoreEventsClicked: 'SearchSeeMoreEventsClicked',
	keySearchSeeMoreGroupsClicked: 'SearchSeeMoreGroupsClicked',

	// Hotspots
	keyResetHotSpot: 'ResetHotSpot',
	keyHotSpotViewed: 'HotSpotViewed',

	// Compelte Profile
	keyCompleteProfileFlowStarted: 'CompleteProfileFlowStarted',
	keyCompleteProfilePictureCustomizeShown: 'CompleteProfilePictureCustomizeShown',
	keyCompleteProfilePictureImageUploaded: 'CompleteProfilePictureImageUploaded',
	keyCompleteProfilePictureSelfieTaken: 'CompleteProfilePictureSelfieTaken',
	keyCompleteProfileCancelled: 'CompleteProfileCancelled',
	keyCompleteProfileUserInfoError: 'CompleteProfileUserInfoError',

	// Interest Picker
	keyCompleteProfileDetailedInfoShown: 'CompleteProfileDetailedInfoShown',
	keyCompleteProfileDetailledInfoPrevious: 'CompleteProfileDetailedInfoPrevious',
	keyCompleteProfileDetailedInfoCompleted: 'CompleteProfileDetailedInfoCompleted',
	keyCompleteProfileInterestShown: 'CompleteProfileInterestShown',
	keyCompleteProfileInterestPrevious: 'CompleteProfileInterestPrevious',
	keyCompleteProfileInterestCompleted: 'CompleteProfileInterestCompleted',

	// Interest Tags
	keyUserExitedTaggedRoom: 'ExitedTaggedRoom',
	keyUserEnteredTaggedRoom: 'EnteredTaggedRoom',
	keySelectedInterestTag: 'SelectedInRoomInterestTag',
	keyAdminSelectedInterestTag: 'AdminSelectedInterestTag',
	keyAdminChangedInterestTags: 'AdminChangedInterestTag',
	keyUserChangedInterestTags: 'UserChangedInterestTag',

	keyInRoomOpenRoomTypeSelected: 'InRoomOpenRoomTypeSelected',
	keyChatUserFlag: 'ChatUserFlag',

	// SPACES
	keyPlayGroupContent: 'PlayGroupContent'
};

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17); // eslint-disable-line import/no-unresolved

const ExtensionController = __webpack_require__(15); // eslint-disable-line import/no-unresolved

class RabbitExtension {

	constructor() {
		this._controller = new ExtensionController();
	}

	initialize() {
		chrome.browserAction.onClicked.addListener(() => {
			if (this._controller) {
				this._controller.onClick();
			}
		});

		chrome.runtime.onMessageExternal.addListener((msg, sender) => {
			if (this._controller) {
				this._controller.onMessage(sender.tab.id, msg);
			}
		});

		chrome.runtime.onMessage.addListener((msg, sender) => {
			if (this._controller) {
				this._controller.onMessage(sender.tab.id, msg);
			}
		});

		chrome.runtime.onConnectExternal.addListener(connection => {
			if (this._controller) {
				this._controller.onWebpageConnection(connection);
			}
		});

		window.getController = () => {
			return this._controller;
		};
	}

}

const extension = new RabbitExtension();
extension.initialize();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Config {
	constructor() {
		this._server = new Map();
		this._env = '';
	}

	getEnvironment() {
		return this._env;
	}

	getServerHostUrl() {
		return this._server.get('hostUrl');
	}

	getServerDataHttp() {
		return this._server.get('dataHttp');
	}

	_processConfigData(data) {
		if (data.server && data.server.hostUrl) {
			this._server.set('hostUrl', data.server.hostUrl);
		}
		if (data.server && data.server.dataHttp) {
			this._server.set('dataHttp', data.server.dataHttp);
		}
		if (data.env) {
			this._env = data.env;
		}
	}

	loadConfigFile(fileName) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.onload = () => {
				let data = {};
				if (request.status === 200 && request.response) {
					try {
						data = JSON.parse(request.response);
					} catch (err) {
						// console.log(`Invalid json file: ${fileName}`);
					}
				}
				resolve(this._processConfigData(data));
			};

			request.onerror = () => {
				// console.log(`Error loading file: ${fileName}`);
				resolve(this._processConfigData({}));
			};

			request.open("GET", chrome.extension.getURL(fileName), true);
			request.send();
		});
	}
}

module.exports = Config;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

class ExtensionStates {}

ExtensionStates.Idle = 'idle';
ExtensionStates.Starting = 'starting';
ExtensionStates.Setup = 'setup';
ExtensionStates.Running = 'running';
ExtensionStates.Disabled = 'disabled';
ExtensionStates.Enabled = 'enabled';

module.exports = ExtensionStates;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

class Settings {
	constructor(values = {}) {
		this.width = this._ensureValue(values.width, 1280);
		this.height = this._ensureValue(values.height, 720);
		this.fps = this._ensureValue(values.fps, 24);
		this.bitrate = this._ensureValue(values.bitrate, 2000);
		this.presetOption = this._ensureValue(values.presetOption, 720);
	}

	getCurrentSettings() {
		return {
			width: this.width,
			height: this.height,
			fps: this.fps,
			bitrate: this.bitrate,
			presetOption: this.presetOption
		};
	}

	clone() {
		const settings = new Settings(this.getCurrentSettings());
		return settings;
	}

	saveSettings(newSettings) {
		return new Promise(resolve => {
			chrome.storage.sync.set(newSettings, () => {
				this.loadSettings().then(() => {
					resolve();
				});
			});
		});
	}

	loadSettings() {
		return new Promise(resolve => {
			chrome.storage.sync.get(null, values => {
				this.width = this._ensureValue(values.width, 1280);
				this.height = this._ensureValue(values.height, 720);
				this.fps = this._ensureValue(values.fps, 24);
				this.bitrate = this._ensureValue(values.bitrate, 2000);
				this.presetOption = this._ensureValue(values.presetOption, 720);
				resolve(values);
			});
		});
	}

	_ensureValue(value, defaultValue) {
		return Number(value === 0 ? 0 : value || defaultValue);
	}

}

module.exports = Settings;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

class WebpageConnection {
	constructor(connectionId, connection) {
		this._roomId = null;
		this._roomName = '';
		this._roomCreatorId = 0;
		this._roomCreatorAvatar = null;
		this._hasRemote = false;
		this._canStealRemote = false;
		this._connectionId = connectionId;
		this._connection = connection;
		this._hasScreencast = false;
		this._controllerUsername = '';
		this.onMessage = null;
		this._onMessage = null;
		this.onDisconnect = null;
		this._onDisconnect = null;
	}

	addOnMessageListener(listener) {
		if (this.onMessage) {
			// console.log('WebpageConnection: Only 1 onMessage listener allowed');
			return;
		}

		this.onMessage = listener;
		this._onMessage = event => {
			if (this.onMessage) {
				this.onMessage(this, event);
			}
		};

		this._connection.onMessage.addListener(this._onMessage.bind(this));
	}

	removeOnMessageListener() {
		this.onMessage = null;
		this._connection.onMessage.removeListener(this._onMessage.bind(this));
	}

	addOnDisconnectListener(listener) {
		if (this.onDisconnect) {
			// console.log('WebpageConnection: Only 1 onDisconnect listener allowed');
			return;
		}

		this.onDisconnect = listener;
		this._onDisconnect = event => {
			this._connection = null;
			if (this.onDisconnect) {
				this.onDisconnect(this, event);
			}
		};

		this._connection.onDisconnect.addListener(this._onDisconnect.bind(this));
	}

	removeOnDisconnectListener() {
		this.onDisconnect = null;
		if (this._connection) {
			this._connection.onDisconnect.removeListener(this._onDisconnect.bind(this));
		}
	}

	getConnectionId() {
		return this._connectionId;
	}

	send(msg) {
		if (!this._connection) {
			// console.log('WebpageConnection: No Connection');
			return;
		}

		this._connection.postMessage(msg);
	}

	getTabId() {
		if (this._connectionId) {
			return this._connectionId;
		}
		if (this._connection) {
			return this._connection.sender.tab.id;
		}

		return -1;
	}

	getRoomId() {
		return this._roomId;
	}

	setRoomId(roomId) {
		this._roomId = roomId;
	}

	getRoomName() {
		return this._roomName;
	}

	userHasRemote() {
		return this._hasRemote;
	}

	canStealRemote() {
		return this._canStealRemote;
	}

	hasScreencast() {
		return this._hasScreencast;
	}

	setRoomData(_roomData) {
		const roomData = _roomData || {};
		this._roomName = roomData.roomName;
		this._roomId = roomData.roomId;
		this._roomCreatorId = roomData.creatorId;
		this._roomCreatorAvatar = roomData.creatorAvatar;
		this._hasScreencast = roomData.hasScreencast;
		this._hasRemote = roomData.hasRemote;
		this._canStealRemote = roomData.canStealRemote;
		this._controllerUsername = roomData.controllerUsername;
		this._tabId = this.getTabId();
	}

	getRoomData() {
		return {
			roomId: this._roomId,
			roomName: this._roomName,
			roomCreatorId: this._roomCreatorId,
			roomCreatorAvatar: this._roomCreatorAvatar,
			hasScreencast: this._hasScreencast,
			hasRemote: this._hasRemote,
			canStealRemote: this._canStealRemote,
			controllerUsername: this._controllerUsername,
			tabId: this._tabId
		};
	}

	disconnect() {
		if (this._connection) {
			this.removeOnDisconnectListener();
			this.removeOnMessageListener();
			this._connection.disconnect();
			this._connection = null;
		}
	}
}

module.exports = WebpageConnection;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

const defaultConstraints = {
	mandatory: {},
	optional: [{ googCpuOveruseDetection: true }, { googCpuOveruseEncodeUsage: true }, { googCpuUnderuseThreshold: 40 }, { googCpuOveruseThreshold: 65 }, { googImprovedWifiBwe: true }, { googSuspendBelowMinBitrate: false }, { googSkipEncodingUnusedStreams: true }]
};

class WebrtcSession {
	constructor(webrtcId, iceServers, stream) {
		this._webrtcId = webrtcId;
		this._iceServers = iceServers;
		this._stream = stream;
		this.onSignalingStateChange = null;
		this.onIceConnectionStateChange = null;
		this.onIceCandidate = null;

		this._createPeerConnection();
	}

	_createPeerConnection() {
		const configuration = {
			iceServers: this._iceServers
		};

		this._peerConnection = new webkitRTCPeerConnection(configuration, defaultConstraints);
		this._peerConnection.onsignalingstatechange = this._onSignalingStateChange.bind(this);
		this._peerConnection.oniceconnectionstatechange = this._onIceConnectionStateChange.bind(this);
		this._peerConnection.onicecandidate = this._onIceCandidate.bind(this);
		this._peerConnection.addStream(this._stream);
	}

	_onSignalingStateChange() {
		// console.log('_onSignalingStateChange: ' + JSON.stringify(this.getConnectionState()));
		if (this.onSignalingStateChange) {
			this.onSignalingStateChange();
		}
	}

	_onIceConnectionStateChange() {
		// console.log('_onIceConnectionStateChange: ' + JSON.stringify(this.getConnectionState()));
		if (this.onIceConnectionStateChange) {
			this.onIceConnectionStateChange();
		}
	}

	_onIceCandidate(evt) {
		if (this.onIceCandidate && evt && evt.candidate) {
			this.onIceCandidate(evt.candidate);
		}
	}

	setRemoteDescription(sessionDescription) {
		if (!this._peerConnection) {
			// console.log('setRemoteDescription : no _peerConnection');
			return;
		}

		return new Promise((resolve, reject) => {
			this._peerConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription));
			resolve(sessionDescription);
		});
	}

	setLocalDescription(sessionDescription) {
		if (!this._peerConnection) {
			// console.log('setLocalDescription : no _peerConnection');
			return;
		}

		return new Promise((resolve, reject) => {
			this._peerConnection.setLocalDescription(new RTCSessionDescription(sessionDescription));
			resolve(sessionDescription);
		});
	}

	createAswer() {
		if (!this._peerConnection) {
			// console.log('createAswer : no _peerConnection');
			return;
		}

		return new Promise((resolve, reject) => {
			this._peerConnection.createAnswer(answer => {
				resolve(answer);
			}, error => {
				// console.log('createAswer error: ' + JSON.stringify(error));
				reject(error);
			});
		});
	}

	getConnectionState() {
		if (!this._peerConnection) {
			// console.log('getConnectionState : no _peerConnection');
			return null;
		}
		const connectionState = new Map();
		connectionState['signalingState'] = this._peerConnection.signalingState;
		connectionState['iceConnectionState'] = this._peerConnection.iceConnectionState;
		connectionState['iceGatheringState'] = this._peerConnection.iceGatheringState;

		return connectionState;
	}

	destroy() {
		if (!this._peerConnection) {
			return;
		}

		this.onSignalingStateChange = null;
		this.onIceConnectionStateChange = null;
		this.onIceCandidate = null;
		this._peerConnection.onsignalingstatechange = null;
		this._peerConnection.oniceconnectionstatechange = null;
		this._peerConnection.onicecandidate = null;
		this._peerConnection.close();
		this._peerConnection = null;
		this._webrtcId = null;
		this._iceServers = null;
		this._stream = null;
	}

	getWebrtcId() {
		return this._webrtcId;
	}
}

WebrtcSession.IceConnectionStates = {
	New: 'new',
	Checking: 'checking',
	Connected: 'connected',
	Completed: 'completed',
	Failed: 'failed',
	Disconnected: 'disconnected',
	Closed: 'closed'
};

module.exports = WebrtcSession;

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".icon16 {\n  background-image: url(" + __webpack_require__(38) + ");\n}\n.icon19 {\n  background-image: url(" + __webpack_require__(39) + ");\n}\n.icon32 {\n  background-image: url(" + __webpack_require__(40) + ");\n}\n.icon48 {\n  background-image: url(" + __webpack_require__(41) + ");\n}\n.icon128 {\n  background-image: url(" + __webpack_require__(37) + ");\n}\n", ""]);

// exports


/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/rabbit-128px.png";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/rabbit-16px.png";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/rabbit-19px.png";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/rabbit-32px.png";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/rabbit-48px.png";

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(47);
var util = __webpack_require__(46);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(50);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)(module), __webpack_require__(52)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(48);
exports.encode = exports.stringify = __webpack_require__(49);


/***/ }),
/* 51 */,
/* 52 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);