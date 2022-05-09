var uparser = (function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  const elements = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g;
  const attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g;
  const holes = /[\x01\x02]/g;

  // \x01 Node.ELEMENT_NODE
  // \x02 Node.ATTRIBUTE_NODE

  /**
   * Given a template, find holes as both nodes and attributes and
   * return a string with holes as either comment nodes or named attributes.
   * @param {string[]} template a template literal tag array
   * @param {string} prefix prefix to use per each comment/attribute
   * @param {boolean} svg enforces self-closing tags
   * @returns {string} X/HTML with prefixed comments or attributes
   */
  var index = (template, prefix, svg) => {
    let i = 0;
    return template
            .join('\x01')
            .trim()
            .replace(
              elements,
              (_, name, attrs, selfClosing) => {
                let ml = name + attrs.replace(attributes, '\x02=$2$1').trimEnd();
                if (selfClosing.length)
                  ml += (svg || empty.test(name)) ? ' /' : ('></' + name);
                return '<' + ml + '>';
              }
            )
            .replace(
              holes,
              hole => hole === '\x01' ?
                ('<!--' + prefix + i++ + '-->') :
                (prefix + i++)
            );
  };

  exports["default"] = index;

  return exports;

})({}).default;
