var uparser = (function (exports) {
  'use strict';

  var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  var empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  var node = /<[a-z][^>]+$/i;
  var notNode = />[^<>]*$/;
  var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
  var trimEnd = /\s+$/;

  var isNode = function isNode(template, i) {
    return 0 < i-- && (node.test(template[i]) || !notNode.test(template[i]) && isNode(template, i));
  };

  var regular = function regular(original, name, extra) {
    return empty.test(name) ? original : "<".concat(name).concat(extra.replace(trimEnd, ''), "></").concat(name, ">");
  };

  var index = (function (template, prefix, svg) {
    var i = template.length;
    var text = [template[--i]];

    while (i) {
      var chunk = template[--i];
      if (attr.test(chunk) && isNode(template, i + 1)) text.unshift(chunk.replace(attr, function (_, $1, $2) {
        return "".concat(prefix).concat(i, "=").concat($2 || '"').concat($1).concat($2 ? '' : '"');
      }));else text.unshift(chunk, "<!--".concat(prefix).concat(i, "-->"));
    }

    var output = text.join('').trim();
    return svg ? output : output.replace(selfClosing, regular);
  });

  exports.default = index;

  return exports;

}({}).default);
