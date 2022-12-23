https://docs.swmansion.com/react-native-gesture-handler/docs/

## v2 release  notes

https://blog.swmansion.com/introducing-gesture-handler-2-0-50515f1c4afc

making this new release fully compatible with version 1 (all the APIs from version 1 stay the same).

### compatibility with re-animated v2

Gesture Handler 2.0 is closely integrated with Reanimated 2. 

If both libraries are installed, functions set as callbacks to events will be automatically treated as Reanimated’s worklets and GestureDetector will default to utilizing them for synchronous event delivery.

Unfortunately, there is one trade off we had to make when designing this new API and it does no longer work with Reanimated 1 and with React Native’s Animated Events (you could still use that approach via the old Gesture Handler API if you can’t migrate to Reanimated 2 at the moment).

One of the main reasons behind this decision is the fact that worklets allow for synchronous communication with the native code which brings us to the most important feature of this release

### detecting gestures

One of the frequent use cases for our library is to monitor a number of concurrent gestures over a single view (e.g., pan, pinch, rotation of an image). 

To achieve this with the old API you’d have to nest a number of gesture-specific components often interleaved with react-native’s Views. 

In Gesture Handler 2 we are taking a different approach with a new GestureDetector component capable of recognizing all types of gestures.

e.g.
```js
const tap = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    console.log('Yay, double tap!');
  });

return (
  <View>
    <GestureDetector gesture={tap}>
      {children}
    </GestureDetector>
  </View>
);
```