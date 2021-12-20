/*! (c) Andrea Giammarchi - ISC */
const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
const elements = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g;
const attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x00/g;
const holes = /\x00=?/g;

export default (template, prefix, svg) => {
  let i = 0;
  return template
          .join('\x00')
          .replace(
            elements,
            (_, name, attrs, selfClosing) => {
              let ml = name + attrs.replace(attributes, '\x00=$2$1').trimEnd();
              if (selfClosing.length)
                ml += (svg || empty.test(name)) ? ' /' : ('></' + name);
              return '<' + ml + '>';
            }
          )
          .replace(
            holes,
            hole => hole.length > 1 ?
              (prefix + i++ + '=') :
              ('<!--' + prefix + i++ + '-->')
          );
};
