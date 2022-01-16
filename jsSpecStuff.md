

### specification types

Types that only occur in the spec

#### Completion Record is a specification type

A Completion Record is a “record” — a data type which has a fixed set of named fields. A Completion Record has three fields:

`[[Type]]`: One of: normal, break, continue, return, or throw. All other types except normal are abrupt completions.
`[[Value]]`: The value that was produced when the completion occurred, for example, the return value of a function or the exception (if one is thrown).
`[[Target]]`: Used for directed control transfers.

 an algorithm throws an exception, it means returning a Completion Record with `[[Type]]` `throw` whose `[[Value]]` is the `exception object`.


  `? Foo()` is equivalent to `ReturnIfAbrupt(Foo())`


### `! Foo()`
Similarly, Let val be `! Foo()` is equivalent to:
```
Let val be Foo().
Assert: val is not an abrupt completion.
Set val to val.[[Value]].
```

### `Return ? Foo()`
`Return ? Foo()` expands to:

```
Let temp be Foo().
If temp is an abrupt completion, return temp.
Set temp to temp.[[Value]].
Return NormalCompletion(temp).
```

### Property Descriptor is a specification type

Data Property Descriptors store the value of the property directly in the [[Value]] field. Accessor Property Descriptors store the accessor functions in fields [[Get]] and/or [[Set]]