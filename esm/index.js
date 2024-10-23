import { VOID_ELEMENTS } from 'domconstants/re';

const elements = /<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g;
const attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g;
const holes = /[\x01\x02]/g;

// \x01 Node.ELEMENT_NODE
// \x02 Node.ATTRIBUTE_NODE

/**
 * Given a template, find holes as both nodes and attributes and
 * return a string with holes as either comment nodes or named attributes.
 * @param {string[]} template a template literal tag array
 * @param {string} prefix prefix to use per each comment/attribute
 * @param {boolean} xml enforces self-closing tags
 * @returns {string} X/HTML with prefixed comments or attributes
 */
export default (template, prefix, xml) => {
  let i = 0;
  return template
    .join('\x01')
    .trim()
    .replace(
      elements,
      (_, name, attrs, selfClosing) => `<${
          name
        }${
          attrs.replace(attributes, '\x02=$2$1').trimEnd()
        }${
          selfClosing ? (
            (xml || VOID_ELEMENTS.test(name)) ? ' /' : `></${name}`
          ) : ''
        }>`
    )
    .replace(
      holes,
      hole => hole === '\x01' ? `<!--${prefix + i++}-->` : (prefix + i++)
    )
  ;
};
