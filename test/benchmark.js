const parse = require('../cjs');
const tag = template => template;

console.log('\x1b[1m');
const [result] = test(1, 'cold');
test(5, 'hot');
console.log('\x1b[0m\x1b[2m');
console.log(result.trim());
console.log('\x1b[0m');

function test(times, name) {
  const results = [];
  console.time(name);
  for (let i = 0; i < times; i++) results.push(parse(tag`
<html>
  <head>
    <title>${'title'}</title>
    <meta name=${'name'} value=${'value'} />
  </head>
  <body class="${'some class'}">
    <div id=${'id'}>
      <span class=${'class'} />
      ${Math.random()}
    </div>
  <body>
</html>
`, 'prefix'));
  console.timeEnd(name);
  return results;
}