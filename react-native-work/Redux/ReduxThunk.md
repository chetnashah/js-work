https://daveceddia.com/what-is-a-thunk/

## What is a thunk?

A peice of code that does delayed work. essentially a function reference.

## What is main role of redux-thunk?

A middleware that allows logic to run (that interacts with the store) but still out of the reducer pipeline.

## Why actions (as objects are not sufficient) ?

Actions are just objects. As far as Redux is concerned, out of the box actions must be plain objects, and they must have a type property. Aside from that, they can contain whatever you want – anything you need to describe the action you want to perform.

Actions look like this:

```js
// 1. plain object
// 2. has a type
// 3. whatever else you want
{
  type: "USER_LOGGED_IN",
  username: "dave"
}
```

## Why we have action creators?

Instead of writing the action object yourself, you call the function, which returns the object. **If you need to dispatch the same action in multiple places around your app, writing action creators will make your job easier.**

## Why we have thunks?

We come up with a common question - where do we make the API request?

Since reducers are pure, we cannot make the API request inside the reducer. We can only make the API request in the action creator.

But, if we make the API request in the action creator, we have to wait for the API request to finish before we can dispatch the action. This means that we have to wait for the API request to finish before we can update the state.

Ideally there would be two actions
1. start_fetch action
2. fetch success/failure action

## Redux thunk implementation

```js
// standard middleware definition, with 3 nested functions:
// 1) Accepts `{dispatch, getState}`
// 2) Accepts `next`
// 3) Accepts `action`
const thunkMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(dispatch, getState)
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action)
  }
```

## Thunk action creators

Just like action creators help create action objects,
thunk action creators help create thunk functions.

e.g.
```js
// fetchTodoById is the "thunk action creator"
export function fetchTodoById(todoId) {
  // fetchTodoByIdThunk is the "thunk function"
  return async function fetchTodoByIdThunk(dispatch, getState) {
    const response = await client.get(`/fakeApi/todo/${todoId}`)
    dispatch(todosLoaded(response.todos))
  }
}
```
Its usage in a component:
```js
function TodoComponent({ todoId }) {
  const dispatch = useDispatch()

  const onFetchClicked = () => {
    // Calls the thunk action creator, and passes the thunk function to dispatch
    dispatch(fetchTodoById(todoId))
  }
}
```

## What will thunk middleware do?

Keep non-objects out of redux reducer pipeline, and run logic/effects as specified.

## Full example - API data fetching

```js
function fetchData(someValue) {
    // access to dispatch and state
  return (dispatch, getState) => {
    dispatch(requestStarted())

    myAjaxLib.post('/someEndpoint', { data: someValue }).then(
      response => dispatch(requestSucceeded(response.data)),
      error => dispatch(requestFailed(error.message))
    )
  }
}
```