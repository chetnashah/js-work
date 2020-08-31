
### js string

JS string is immutable,
You can get chars via `str[idx]` or `str.charAt(idx)`.

You cannot set chars using above notation.
Your only option is to replace/split etc.

Useful methods:

#### substr(start[,length])

returns a new string starting from start and counting upto `length` number of charachters.

#### substring(startIdx[, endIdx])

Different from `substr` mentioned above, 
returns string containing chars from `startIdx` upto but not including `endIndex`.

#### str.concat(str1[, ... strN])

A new string containing the combined text of the strings provided.

#### str.match vs str.search

`str.search(regexp)` : The index of the first match between the regular expression and the given string, or -1 if no match was found.
When you want to know whether a pattern is found, and also know its index within a string, use search(). (If you only want to know if it exists, use the similar test() method on the RegExp prototype, which returns a boolean.)
```js
let str = "hey JudE"
let re = /[A-Z]/g
let reDot = /[.]/g
console.log(str.search(re))    // returns 4, which is the index of the first capital letter "J"
console.log(str.search(reDot)) // returns -1 cannot find '.' dot punctuation
```

`str.match(regexp)`: An Array whose contents depend on the presence or absence of the global (g) flag, or null if no matches are found.

* If the g flag is used, all results matching the complete regular expression will be returned, but capturing groups will not.
* if the g flag is not used, only the first complete match and its related capturing groups are returned. In this case, the returned item will have additional properties as described below.

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

On the `regexp` side we have methods known as `test` and `exec`.

### replace

`const newStr = str.replace(regexp|substr, newSubstr|function)`
The `replace()` method returns a new string with some or all matches of a pattern replaced by a replacement. 

The `pattern` can be a `string` or a `RegExp`, and the replacement can be a string or a function to be called for each match. **If pattern is a string, only the first occurrence will be replaced.**
```js
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

const regex = /dog/gi;

console.log(p.replace(regex, 'ferret'));
// expected output: "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"

console.log(p.replace('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
```

### slice vs substring

What they have in common:

    If `start` equals `stop`: returns an empty string
    If stop is omitted: extracts characters to the end of the string
    If either argument is greater than the string's length, the string's length will be used instead.

Distinctions of substring():

    If start > stop, then substring will swap those 2 arguments.
    If either argument is negative or is NaN, it is treated as if it were 0.

Distinctions of slice():

    If start > stop, slice() will return the empty string. ("")
    If start is negative: sets char from the end of string, exactly like substr() in Firefox. This behavior is observed in both Firefox and IE.
    If stop is negative: sets stop to: string.length – Math.abs(stop) (original value), except bounded at 0 (thus, Math.max(0, string.length + stop)) as covered in the ECMA specification.

