self.uparser=function(e){"use strict";
/*! (c) Andrea Giammarchi - ISC */const r=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,t=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g,a=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,n=/[\x01\x02]/g;return e.default=(e,c,s)=>{let u=0;return e.join("").replace(t,((e,t,n,c)=>{let u=t+n.replace(a,"=$2$1").trimEnd();return c.length&&(u+=s||r.test(t)?" /":"></"+t),"<"+u+">"})).replace(n,(e=>""===e?"\x3c!--"+c+u+++"--\x3e":c+u++))},e}({}).default;
