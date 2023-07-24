
## How does DataDog do it?

Datadog uses PLCrashreporter - https://github.com/microsoft/plcrashreporter#example

## How does Sentry do it?

### For NSException

https://github.com/getsentry/sentry-cocoa/blob/main/Sources/SentryCrash/Recording/Monitors/SentryCrashMonitor_NSException.m#L134

### For cpp exception

It uses standard C++ API: https://en.cppreference.com/w/cpp/error/set_terminate

https://github.com/getsentry/sentry-cocoa/blob/main/Sources/SentryCrash/Recording/Monitors/SentryCrashMonitor_CPPException.cpp#L207C19-L207C19

### For signal

Use the `signal` function to install handlers for BSD signals.

https://github.com/getsentry/sentry-cocoa/blob/main/Sources/SentryCrash/Recording/Monitors/SentryCrashMonitor_Signal.c#L123

https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man3/signal.3.html

