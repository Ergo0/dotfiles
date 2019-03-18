function LP_getElementByXPath(e,t){return e||(e=LP_derive_doc())?LP_lookupElementByXPath(e,t):null}function LP_getElementsByXPath(e,t){return e||(e=LP_derive_doc())?LP_lookupElementsByXPath(e,t):null}function LP_createXPathFromElement(e,t){if(!e&&!(e=LP_derive_doc()))return null;if(!t)return null;var n=null,a=LP_eltmap_get(e,t);if(void 0!==a&&null!==a&&a.uniqid)return a.uniqid;var i,o;for(segs=[];t&&1==t.nodeType;t=t.parentNode)if(t.hasAttribute("id")){try{var l=e.querySelectorAll("#"+t.id)}catch(e){l=[]}if(1==l.length&&l[0]==t)return segs.unshift('id("'+t.getAttribute("id")+'")'),n=segs.join("/"),LP_eltmap_set(e,t,{uniqid:n}),n;for(var r=t.parentNode?t.parentNode.children:[],u=0,s=0;s<r.length&&(void 0!==r[s].hasAttribute&&r[s].hasAttribute("id")&&r[s].id==t.id&&u++,!(u>1));s++);if(u>1){for(i=1,o=t.previousSibling;o;o=o.previousSibling)o.localName==t.localName&&i++;segs.unshift(t.localName.toLowerCase()+"["+i+"]")}else segs.unshift(t.localName.toLowerCase()+'[@id="'+t.getAttribute("id")+'"]')}else if(t.hasAttribute("name"))segs.unshift(t.localName.toLowerCase()+'[@name="'+t.getAttribute("name")+'"]');else if(t.hasAttribute("action")&&"FORM"==t.nodeName.toUpperCase())segs.unshift(t.localName.toLowerCase()+'[@action="'+t.getAttribute("action")+'"]');else if(t.hasAttribute("class"))segs.unshift(t.localName.toLowerCase()+'[contains(@class,"'+t.getAttribute("class")+'")]');else{for(i=1,o=t.previousSibling;o;o=o.previousSibling)o.localName==t.localName&&i++;segs.unshift(t.localName.toLowerCase()+"["+i+"]")}return n=segs.length?"/"+segs.join("/"):null,LP_eltmap_set(e,t,{uniqid:n}),n}function LP_lookupElementByXPath(e,t){return e&&e.documentElement?g_isfirefox&&e&&!e.defaultView?null:"undefined"==(g_isfirefox?typeof e.defaultView.XPathEvaluator:typeof XPathEvaluator)?null:(g_isfirefox?new e.defaultView.XPathEvaluator:new XPathEvaluator).evaluate(t,e.documentElement,null,g_isfirefox?e.defaultView.XPathResult.FIRST_ORDERED_NODE_TYPE:XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue:null}function LP_lookupElementsByXPath(e,t){var n=[];if(!e||!e.documentElement)return n;if("undefined"==(g_isfirefox?typeof e.defaultView.XPathEvaluator:typeof XPathEvaluator))return n;var a=(g_isfirefox?new e.defaultView.XPathEvaluator:new XPathEvaluator).evaluate(t,e.documentElement,null,g_isfirefox?e.defaultView.XPathResult.ORDERED_NODE_ITERATOR_TYPE:XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);if(a)for(var i=a.iterateNext();i;)i&&n.push(i),i=a.iterateNext();return n}if(void 0===Node)var Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};function LP_getXPath(e){var t,n=9,a=[],i="",o=function(e){var t,n=1;if(2==e.nodeType)return null;for(t=e.previousSibling;t;t=t.previousSibling)t.nodeName==e.nodeName&&++n;return n};if(r(e))return"/";for(;e&&!r(e);e=2==e.nodeType?e.ownerElement:e.parentNode){switch(t=a[a.length]={},e.nodeType){case 1:t.name="text()";break;case 2:t.name="@"+e.nodeName;break;case 7:t.name="processing-instruction()";break;case 8:t.name="comment()";break;case 3:t.name=e.nodeName}t.position=o(e)}for(var l=a.length-1;l>=0;l--)i+="/"+(t=a[l]).name,null!=t.position&&(i+="["+t.position+"]");return i;function r(e){return"undefined"!=typeof Document?e instanceof Document:e&&e.nodeType==n}}
//# sourceMappingURL=sourcemaps/xpath.js.map