
https://www.youtube.com/watch?v=MCi6AZMkxcU

## Counters

## Simple version (using setInterval) + increment in-memory variable

```js
let seconds = 0;
setInterval(() => {
    seconds++;
    updateUI(seconds);
}, 1000);
```

Issue: `setInterval` and `setTimeout` are not guarenteed to run at correct time if main thread is blocked/busy.
Also in the spec, setInterval is literally equivalent to nested setTimeout.
These drifts are also massively exaggereted when `tab is backgrounded` i.e. main thread does not get chance to run much when backgrounded.
There is also a chance that user is not seeing the correct time elapsed in seconds, because we
have no chance of recording/correcting the time lost in event loop processing.

## setInterval + Date.now() for current time

```js
const start = Date.now();

setInterval(() => {
    const elapsed = Date.now() - start;
    const seconds = Math.floor(elapsed/1000);
    updateUI(seconds);
},1000);
```

Better than previous:
Even if we loose scheduling time on event loop due to event loop business, we do not have
wrong time calculation, because we are referring to a monotonic clock to correct ourself and know
the elapsed time (some of which we might have lost).

As a result of this phenomenon: UI might see a jump in counter e.g. from 16 -> 18 directly when we could not schedule it for more than a second.

## requestanimation frame + Date.now()

Instead of setInterval, we prefer `requestAnimationFrame`, for scheduling callback.

Pros: rAF runs even when in background.
Cons: **High cpu usage.**, we are scheduling 60 times a second, which is a lot.

`requestAnimationFrame` - The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.

**Note: requestAnimationFrame is one shot** - to use it for many paints, you should have it recursive.
And the rate of callbacks will roughly be every 16 ms which is paint rate for 60fps.

Here is a recursive requestAnimationFrame:
```js
function paint(){
    console.log('hola');
    // have early return here to detect animation over and prevent infinite loop
    requestAnimationFrame(paint);// recursive to schedule callback for next paint.
}
paint(); //trigger starting point
```

Actual technique:
```js
const start = Date.now();
function frame(){
    const elapsed = Date.now() - start;
    const seconds = Math.floor(elapsed/1000);
    updateUI(seconds);
    requestAnimationFrame(frame);// recursively reschedule
}
frame();
```

Even `element.animate(...).onFinish()` api does not work because it is roughly scheduled at the same
rate as `requestAnimationFrame`.

## best way

Use `setTimeout + requestAnimationFrame` both for scheduling, 
Use `document.timeline.currentTime` for document start time.
`raF` frame callback will get a frame time that is relative to `document.timeline.currentTime`.

TODO dig deeper into this:

```js
const start = document.timeline.currentTime;
function frame() {

}
```

