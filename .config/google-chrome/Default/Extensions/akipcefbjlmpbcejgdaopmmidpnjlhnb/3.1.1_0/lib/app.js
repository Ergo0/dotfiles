let enabled = false;
let spooflist = [];
const fetchOptions = {
  method: "GET",
  credentials: "include"
};
const version = chrome.runtime.getManifest().version;
const browserName = "chrome";

const _fetch = async (url, text = false) => {
  return await fetch(`${url}?browser=${browserName}&version=${version}`, fetchOptions)
    .then(response => text ? response.text() : response.json());
};

const openTab = url => chrome.tabs.create({ url });

const turnIcon = mode => {
  chrome.browserAction.setIcon({ path: `data/${mode}-64.png` });
  chrome.browserAction.setTitle({ title: `Media Hint: ${mode.toUpperCase()}` });
};

const enableProxies = async () => {
  let userStatus = await _fetch("https://mediahint.com/testuser.json");
  if (userStatus.signed_in) {
    if (userStatus.expired) {
      openTab("https://mediahint.com/account/plan");
    } else {
      let instructions = await _fetch("https://mediahint.com/proxies.json");
      spooflist = instructions.spoof.map(spoof => {
        spoof.regex = spoof.regex.map(regex => new RegExp(regex));
        return spoof;
      });
      let pacScript = await _fetch("https://mediahint.com/default.pac", true);
      chrome.proxy.settings.set({
        value: {
          mode: "pac_script",
          pacScript: {
            data: pacScript,
          },
          rules: {
            bypassList: ["<local>", "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "127.0.0.0/24", "*.local", "localhost.*"]
          }
        },
        scope: "regular"
      });
      turnIcon("on");
      enabled = true;
    }
  } else {
    if (userStatus.verified == undefined) openTab("https://mediahint.com/login");
  }
};

const disableProxies = () => {
  chrome.proxy.settings.set({
    value: {
      mode: "system"
    },
    scope: "regular"
  });
  turnIcon("off");
  enabled = false;
};

const toggleProxy = () => {
  if (!enabled) enableProxies();
  else disableProxies();
};

const parseMessage = (message, sender) => {
  if (/^https:\/\/mediahint\.com/.test(sender.url)){
    if (message.logged_in) enableProxies();
    if (message.logged_out) disableProxies();
  }
};

const spoofHeaders = details => {
  if (!enabled) return {};
  let spoofs = spooflist.filter(spoof => spoof.regex.some(regex => regex.test(details.url)));
  if (spoofs.length == 0) return {};
  let requestHeaders = details.requestHeaders;
  spoofs.forEach(spoof => {
    requestHeaders.forEach((header, index) => {
      if (header.name == spoof.header) requestHeaders.splice(index, 1);
    });
    if (spoof.method !== "remove") {
      requestHeaders.push({
        name: spoof.header,
        value: spoof.data
      });
    }
  });
  return { requestHeaders };
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  spoofHeaders,
  { urls: ["<all_urls>"] },
  ['requestHeaders', 'blocking']
);
chrome.runtime.onMessageExternal.addListener(parseMessage);
chrome.browserAction.onClicked.addListener(toggleProxy);

toggleProxy();