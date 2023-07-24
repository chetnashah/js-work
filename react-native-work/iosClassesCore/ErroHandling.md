
## Exceptions vs errors

https://raygun.com/blog/ios-exceptions-and-errors/

### Exception
Exception - exceptions cause applications to crash if left unhandled.

Properties:
1. `name` identifies the type of exception that has occurred
2. `reason` is a short explanation of why the exception has been thrown. For example “+[Class Selector] unrecognized selector sent to class 0x10866fb88”.
3. `userInfo` is an NSDictionary of additional information that can help to debug the problem

### Error
`Error` - exceptions. They don’t get thrown, and they don’t cause the application to crash. Instead, they are created to hold information about a failure, and then bubbled up through calling methods where it may be ‘handled’ in some way such as displaying a message to the user. Failures that result in errors being created can be considered common or even expected issues.

A lot of the built-in cocoa errors are related to file system issues – such as files not being found, or running out of memory while writing. errors in iOS are represented by the NSError class which provides these 3 properties:

1. `domain`: is a high level grouping of errors.
2. `code`: is used to distinguish different types of errors within a domain.
3. `userInfo`: is an NSDictionary containing additional information about the error.


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

