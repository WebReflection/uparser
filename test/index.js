const parse = require('../cjs');

console.assert(parse(['<div />'], '!') === '<div></div>');
console.assert(parse(['<div />'], '!', true) === '<div />');
console.assert(parse(['<div test="', '" />'], '!') === '<div !0="test"></div>');
console.assert(parse(['<div test=', ' />'], '!') === '<div !0="test"></div>');
console.assert(parse(['<div>', '</div>'], '!') === '<div><!--!0--></div>');
console.assert(parse(['<div> test="', '"</div>'], '!') === '<div> test="<!--!0-->"</div>');
console.assert(parse(['test="', '"<br />'], '!') === 'test="<!--!0-->"<br />');
