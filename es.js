/*! (c) Andrea Giammarchi - ISC */
const e=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,r=/<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g,t=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,a=/[\x01\x02]/g;
/*! (c) Andrea Giammarchi - ISC */var n=(n,l,c)=>{let i=0;return n.join("").trim().replace(r,((r,a,n,l)=>{let i=a+n.replace(t,"=$2$1").trimEnd();return l.length&&(i+=c||e.test(a)?" /":"></"+a),"<"+i+">"})).replace(a,(e=>""===e?"\x3c!--"+l+i+++"--\x3e":l+i++))};export{n as default};
