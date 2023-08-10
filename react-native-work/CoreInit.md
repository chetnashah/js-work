

## Core inits the useful polyfills

Happens as a part of `Libraries/Core/InitializeCore.js`.

```js
const start = Date.now();

require('./setUpGlobals');
require('./setUpPerformance');
require('./setUpSystrace');
require('./setUpErrorHandling'); // register ExceptionsManager
require('./polyfillPromise');
require('./setUpRegeneratorRuntime');
require('./setUpTimers');
require('./setUpXHR');
require('./setUpAlert');
require('./setUpNavigator');
require('./setUpBatchedBridge');
require('./setUpSegmentFetcher');
if (__DEV__) {
  require('./checkNativeVersion');
  require('./setUpDeveloperTools');
  require('../LogBox/LogBox').install();
}

const GlobalPerformanceLogger = require('../Utilities/GlobalPerformanceLogger');
// We could just call GlobalPerformanceLogger.markPoint at the top of the file,
// but then we'd be excluding the time it took to require the logger.
// Instead, we just use Date.now and backdate the timestamp.
GlobalPerformanceLogger.markPoint(
  'initializeCore_start',
  GlobalPerformanceLogger.currentTimestamp() - (Date.now() - start),
);
GlobalPerformanceLogger.markPoint('initializeCore_end');
```