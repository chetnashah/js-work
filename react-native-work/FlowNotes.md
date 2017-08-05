
Javascript has 5 primitive types:

| JS type      | Flow type |
|--------------|-----------|
| null         |  null     |
| undefined    |  void     |
| number       |  number   |
| string       |  string   |
| boolean      |  boolean  |

### Maybe types
Mabye types: They can be a given type or null or void indicated by ```?type``` e.g. ```?string```

```
let k : ?number = 3;
k = null; //type checks
k = undefined; //type checks

i.e. ?number = number | null | void
```

### Optional function parameters

Although syntax feels similar to above, it has vastly different meaning, the parameter is optional
```
function acceptsOptionalString(name?: string){

}

acceptsOptionalString(undefined); //typechecks
acceptsOptionalString(); //typechecks
acceptsOptionalString("haha"); //typechecks
acceptsOptionalString(null); //type error!!
```


### Mixed types
mixed allows you to take a value with any type
but one must type check it before using it

### Any types
If we want to opt out of using type checker, we
should use any.
* Do not confuse any with mixed.



### Nominal and structural typing!