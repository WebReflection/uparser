var uparser=function(t){"use strict";function u(t,c){return 0<c--&&(e.test(t[c])||!a.test(t[c])&&u(t,c))}function i(t,c,e){return n.test(c)?t:"<".concat(c).concat(e.replace(r,""),"></").concat(c,">")}var s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,n=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,e=/<[a-z][^>]+$/i,a=/>[^<>]*$/,f=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,r=/\s+$/;return t.default=function(c,a,t){for(var e=[],n=c.length,r=1;r<n;r++)!function(n){var t=c[n-1];e.push(s.test(t)&&u(c,n)?t.replace(s,function(t,c,e){return"".concat(a).concat(n-1,"=").concat(e||'"').concat(c).concat(e?"":'"')}):"".concat(t,"\x3c!--").concat(a).concat(n-1,"--\x3e"))}(r);e.push(c[n-1]);var o=e.join("").trim();return t?o:o.replace(f,i)},Object.defineProperty(t,"__esModule",{value:!0}),t}({}).default;