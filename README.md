# level-tier

Minimalistic LevelUP utility for namespacing keys and facilitating blazing fast
range queries.

The concept of namespacing when using key/value stores facilitates very efficient
range queries. For a good explanation of namspacing and lexicographical key
sorting in LevelDB/LevelUP, see
[Lexicographical Key Sorting in LevelDB](http://luke.xxx/post/52916123542/lexicographical-key-sorting-in-leveldb).

## Caveat

You might want to zero pad numerical values (such as arbitrary timestamps) to
have a uniform length if using them as parts of a namespaced key, as seen in the
following example.

`'10' < '2' // -> true`

`'10' < '02' // -> false`

## Important note

This module is a minimalistic and naive implementation namespacing
lexicographical keys. It simply uses `\x00` and `\xff` as lower and upper bounds.
Allowing user input to determine the keys and not stripping out the delimiter
characters could result in the NoSQL equivalent of an SQL Injection Attack
(see [LevelDB and Node: Getting Up and Running](http://dailyjs.com/2013/05/02/leveldb-and-node-2/#recommendeddelimiters)).

For a more robust solutions for "binary serialization of arbitrarily complex
structures that sort element-wise", see
[deanlandolt/bytewise](https://github.com/deanlandolt/bytewise).

# Examples

Import the module

```js
var leveltier = require('level-tier')
```

## Creating namespaced key

```js
leveltier(['alice', new Date().toISOString()]); // -> alice\x002016-01-15T09:32:19.118Z
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
leveltier.lte(['alice']); // -> alice\x00\xff
```

## Parsing a key

```js
leveltier.parse('alice\x002016-01-15T09:32:19.118Z'); // -> ['alice', '2016-01-15T09:32:19.118Z']
```

## Test

Run unit tests;

`$ npm test`

# License

[MIT](LICENSE)
