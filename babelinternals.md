Array spread `[...arr]` expands to `[].concat(arr)`

### Creating your own babel preset

1. create `package.json` with name starting with `babel-preset-` i..e
`babel-preset-my-awesome-preset`.

2. Just return an object with list of presets and list of plugins

```js
module.exports = () => ({
    presets: [
        require("@babel/babel-preset-abc")
    ],
    plugins: [
        require("@babel/babel-plugin-123"),
        [require("@babel/babel-plugin-235"), { loose: true }]
    ]
})
```

sometimes you can also return override config. e.g.

```js
module.exports = () => ({
    overrides: [
        {
            plugins: [
                        require("@babel/babel-plugin-123"),
            ]
        }
    ]
})
```
