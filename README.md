# <em>µ</em>parser

[![Build Status](https://travis-ci.com/WebReflection/uparser.svg?branch=master)](https://travis-ci.com/WebReflection/uparser) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/uparser/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/uparser?branch=master)

The [uhtml](https://github.com/WebReflection/uhtml#readme) template parser.

```js
import parse from 'uparser';

const tag = template => parse(template, 'secret');

tag`<div />`; // <div></div>
```
