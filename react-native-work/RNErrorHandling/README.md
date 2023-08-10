

## js error handling

RN exposes a global object known as "ErrorUtils" - https://github.com/facebook/react-native/blob/main/packages/react-native/ReactCommon/cxxreact/ErrorUtils.h#L13

It is exposed in JS via https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/vendor/core/ErrorUtils.js

It is used in `Sentry` e.g. https://github.com/getsentry/sentry-react-native/blob/main/src/js/integrations/reactnativeerrorhandlers.ts#L199

It is used in `Datadog` e.g. https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/core/src/rum/instrumentation/DdRumErrorTracking.tsx#L49

It is used in `react-native-exception-handler` e.g.
https://github.com/a7ul/react-native-exception-handler/blob/master/index.js#L15


## setupErrorHandling & ExceptionsManager

### setupErrorHandling.js sets up error handling on RN side to use ExceptionsManager

```js
if (!global.__fbDisableExceptionsManager) {
  const handleError = (e: mixed, isFatal: boolean) => {
    try {
      console.log('setupErrorHandling invoking HandleError');
      ExceptionsManager.handleException(e, isFatal);
    } catch (ee) {
      console.log('Failed to print error: ', ee.message);
      throw e;
    }
  };

  const ErrorUtils = require('../vendor/core/ErrorUtils');
  console.log('setting ErrorUtils.setGlobalHandler to handleError');
  ErrorUtils.setGlobalHandler(handleError);
}
```

### ExceptionsManager.js

This has an export - `handleException`, which internally does a bunch of processing and:
1. in `__DEV__` mode, add to LogBox.
2. otherwise forward to NativeExceptionsManager.

## error-guard



