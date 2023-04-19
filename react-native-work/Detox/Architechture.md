

The mobile app itself, usually running on a simulator/emulator. A regular native build of your app is installed and executed on the device. Your app is usually built once before the tests start running.

The test suite, running on Node.js, using a test runner like Jest. The tests are normally written in JavaScript. Because the tests are asynchronous in nature (every test line requires to access the app and wait for a response), the tests rely heavily on async-await.

The two parts are usually running in separate processes on your machine. It is also possible to run the two parts on different machines. Communication between the two parts takes place over the network using a web socket.

**In practice, to make the communication more resilient, both parts are implemented as clients and communicate with a Detox server that acts as proxy. This allows some nice behaviors like allowing one side to disconnect (during a simulator boot for example or app restart) without disconnecting the other side and losing its state.**


## Native client

This is part of the build app/apk bundled as library and runs on device/simulator

ios - https://github.com/wix/Detox/tree/master/detox/ios
android - https://github.com/wix/Detox/tree/master/detox/android



## Test server

This is node-js code running test logic

https://github.com/wix/Detox/tree/master/detox/src

This will make use of tools like jest etc to enable test running

## Mediator server

https://github.com/wix/Detox/tree/master/detox/src/server

A small web socket server, running in a Node.js process on the host computer, used to connect between the tester and the client. Normally, the tester starts a server on a randomized session id and an available port, and sends the session and port to the client app as a launch argument.

## Device drivers

APIs to control native devices/simulators emulators via tools like `xcrun simctl`/`adb` - https://github.com/wix/Detox/tree/master/detox/src/devices/common/drivers

