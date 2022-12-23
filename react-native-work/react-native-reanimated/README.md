

## v2

https://blog.swmansion.com/reanimated-2-0-stable-release-is-out-564c9c910891

https://blog.swmansion.com/introducing-reanimated-2-752b913af8b3

https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/migration

Reanimated library enables you to create animations and interactions that run on UI thread for improved performance and interactiveness of your app.

api inspiration - https://developers.google.com/web/updates/2018/10/animation-worklet

### reanimated worklets

The ultimate goal of worklets was for them to define small pieces of JavaScript code that we run when updating view properties or reacting to events on the UI thread. 

A natural construct in JavaScript for such a purpose was a simple method. With Reanimated 2.x we spawn a secondary JS context on the UI thread that then is able to run JavaScript functions. 

The only thing that is needed is for that function to have 'worklet' directive at the top:

```js
function someWorklet(){
    'worklet';
    console.log('hey I am running on ui thread');
}
```

