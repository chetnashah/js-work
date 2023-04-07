

## Common issues

### Notification prompt not letting tests run

You would see:
```
23:34:47.151 detox[29797] INFO:  [APP_STATUS] The app is busy with the following tasks:
• There are 1 work items pending on the dispatch queue: "Main Queue (<OS_dispatch_queue_main: com.apple.main-thread>)".
• Run loop "Main Run Loop" is awake.
```
when you run:
```
detox test --configuration ios.sim.release --headless --verbose --debug-synchronization 5000 -l trace --record-videos all
```

The solution is to start test like this:
```js
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        notifications: "YES"
      }
    });
  });
```