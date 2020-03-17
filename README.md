# <em>µ</em>parser

[![Build Status](https://travis-ci.com/WebReflection/uparser.svg?branch=master)](https://travis-ci.com/WebReflection/uparser) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/uparser/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/uparser?branch=master)

The _[µhtml](https://github.com/WebReflection/uhtml#readme)_ and _[µcontent](https://github.com/WebReflection/ucontent#readme)_ template parser.

```js
import parse from 'uparser';

const html = template => parse(template, 'secret', false);
const svg = template => parse(template, 'secret', true);

html`<div />`; // <div></div>
svg`<rect />`; // <rect />
```
