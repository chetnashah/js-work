

## js error handling

RN exposes a global object known as "ErrorUtils" - https://github.com/facebook/react-native/blob/main/packages/react-native/ReactCommon/cxxreact/ErrorUtils.h#L13

It is exposed in JS via https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/vendor/core/ErrorUtils.js

It is used in `Sentry` e.g. https://github.com/getsentry/sentry-react-native/blob/main/src/js/integrations/reactnativeerrorhandlers.ts#L199

It is used in `Datadog` e.g. https://github.com/DataDog/dd-sdk-reactnative/blob/develop/packages/core/src/rum/instrumentation/DdRumErrorTracking.tsx#L49

It is used in `react-native-exception-handler` e.g.
https://github.com/a7ul/react-native-exception-handler/blob/master/index.js#L15


