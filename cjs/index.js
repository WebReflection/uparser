'use strict';
const attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
const node = /<[a-z][^>]+$/i;
const notNode = />[^<>]*$/;
const selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
const trimEnd = /\s+$/;

const isNode = (template, i) => (
    0 < i-- && (
    node.test(template[i]) || (
      !notNode.test(template[i]) && isNode(template, i)
    )
  )
);

const regular = (original, name, extra) => empty.test(name) ?
                  original : `<${name}${extra.replace(trimEnd,'')}></${name}>`;

module.exports = (template, prefix, svg) => {
  let i = template.length;
  const text = [template[--i]];
  while (i) {
    const chunk = template[--i];
    if (attr.test(chunk) && isNode(template, i + 1))
      text.unshift(chunk.replace(attr, (_, $1, $2) =>
        `${prefix}${i}=${$2 || '"'}${$1}${$2 ? '' : '"'}`));
    else
      text.unshift(chunk, `<!--${prefix}${i}-->`);
  }
  const output = text.join('').trim();
  return svg ? output : output.replace(selfClosing, regular);
};
