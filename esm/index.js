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

export default (template, prefix, svg) => {
  const text = [];
  const {length} = template;
  for (let i = 1; i < length; i++) {
    const chunk = template[i - 1];
    text.push(attr.test(chunk) && isNode(template, i) ?
      chunk.replace(
        attr,
        (_, $1, $2) => `${prefix}${i - 1}=${$2 || '"'}${$1}${$2 ? '' : '"'}`
      ) :
      `${chunk}<!--${prefix}${i - 1}-->`
    );
  }
  text.push(template[length - 1]);
  const output = text.join('').trim();
  return svg ? output : output.replace(selfClosing, regular);
};
