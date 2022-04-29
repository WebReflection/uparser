const parse = require('../cjs');

const expect = (comp, result) => {
  console.assert(comp === result, `expected "${result}" but got "${comp}"`);
};

expect(parse(['<div />'], '!'), '<div></div>');
expect(parse(['<div />'], '!', true), '<div />');
expect(parse(['<div test="', '" />'], '!'), '<div !0="test"></div>');
expect(parse(['<div\n\ttest="', '"\n/>'], '!'), '<div\n\t!0="test"></div>');
expect(parse(['<div test=', ' />'], '!'), '<div !0=test></div>');
expect(parse(['<div a=', ' b=', ' />'], '!'), '<div !0=a !1=b></div>');
expect(parse(['<div>', '</div>'], '!'), '<div><!--!0--></div>');
expect(parse(['<div>', '=</div>'], '!'), '<div><!--!0-->=</div>');
expect(parse(['<div> test="', '"</div>'], '!'), '<div> test="<!--!0-->"</div>');
expect(parse(['<div> a="', '" b="', '"</div>'], '!'), '<div> a="<!--!0-->" b="<!--!1-->"</div>');
expect(parse(['test="', '"<br />'], '!'), 'test="<!--!0-->"<br />');
