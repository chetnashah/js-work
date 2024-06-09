## `npm publish` primarily used

### Which files go in the package?

The `.npmignore` file is used to specify which files and directories should be excluded from your package when it is published to the npm registry. This file works similarly to `.gitignore`, but it is specifically for npm to determine what should not be included in the package that gets published.

Also `files` field in `package.json` is considered.

### Which One to Use?

#### Use .npmignore if:

You prefer to include everything by default and exclude only specific files or directories.
Your project structure is complex, and you have more files to exclude than to include.

#### Use the files field if:

You prefer to exclude everything by default and include only specific files or directories.
Your project structure is simple, and you have fewer files to include in the package.
You want a more explicit and clear declaration of included files, which can be beneficial for readability and maintainability.

#### Combining Both

You can use both .npmignore and the files field together, but it's generally redundant. If both are present, the files field takes precedence, and .npmignore will be ignored.
