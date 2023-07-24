

## Pure Android exception handling

```java
        Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread paramThread, Throwable paramThrowable) {
                Log.e("Alert","Lets See if it Works !!!");
            }
        });

```

## How sentry does it?

https://github.com/getsentry/sentry-java/blob/main/sentry/src/main/java/io/sentry/UncaughtExceptionHandlerIntegration.java#L77

## How Datadog does it?

https://github.com/DataDog/dd-sdk-android/blob/develop/dd-sdk-android-core/src/main/kotlin/com/datadog/android/error/internal/DatadogExceptionHandler.kt#L102

