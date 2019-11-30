# level-tier

Minimalistic LevelUP utility for namespacing keys and facilitating blazing fast
range queries.

## Caveat

You might want to zero pad numerical values (such as arbitrary timestamps) to
have a uniform length if using them as parts of a namespaced key. Failing to do
so might result in unexpected ordering, as emphasised by the example below.

`'10' < '2' // -> true`

`'10' < '02' // -> false`

level-tier will warn if using numbers as namespace keys.

## Uniform length timestamp padding

level-tier includes a convenience method that produces uniform length timestamps.

```js
  leveltier.now();

  // Date.now() :        1575146509497
  // level.now(): 00000001575146509497
```

This function also accepts a timestamp to pad when creating a range Key. 
Putting this together, writing and retrieval would look like this

```js
    // writing data
      const key = leveltier(['data', leveltier.now()])
      mydb.put(key, data)
    
    // retrieving data after some lower bound
      const startkey = leveltier.gte(['data', leveltier.now({timestamp:1575156550378})])
      mydb.createReadStream({gt:startkey})
```

## Important note

This module is a minimalistic and naive implementation namespacing
lexicographical keys. It simply uses `\x00` and `\uffff` as lower and upper 
bounds. Allowing user input to determine the keys and not stripping out the 
delimiter characters could result in the NoSQL equivalent of an SQL injection 
attack. For this reason any characters corresponding to the upper or lower bounds 
will be stripped from the namespaced keys.

## Other solutions

For a robust solutions when it comes to "binary serialization of arbitrarily complex
structures that sort element-wise", see
[deanlandolt/bytewise](https://github.com/deanlandolt/bytewise).

# Examples

Import the module

```js
var leveltier = require('level-tier')
```

## Creating namespaced key

```js
leveltier(['alice', Date.now()]); // -> alice\x001452853068222
```

## Creating range start key

The following constructs a start key that can be used as the `gte` option
when creating a read stream in LevelUP.

```js
leveltier.gte(['alice']); // -> alice\x00
```

## Creating range end key

The following constructs an end key that can be used as the `lte` option when
creating a read stream in LevelUP.

```js
leveltier.lte(['alice']); // -> alice\x00\uffff
```

## Parsing a key

```js
leveltier.parse('alice\x001452853068222'); // -> ['alice', '1452853068222']
```

## Test

Run unit tests;

`$ npm test`

# License

[MIT](LICENSE)
