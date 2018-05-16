
### Basics

#### Store :


Creating a store requires a rootReducer and initialState
```
const store = createStore(reducer, defaultState);
```

Store maintains state, get state from store
using 
```
store.getState()
```
Subscribe changes to state in store using
```
store.subscribe(observer)
```

#### Reducers:

A reducer handles actions to immutably change
given state.
A reducer signature always looks like 
```
(previousState, action) => newState
```

#### Role of combineReducers:

Take in multiple reducers with corresponding keys, and return a reducer, which when used, call each input reducer whose results are stored in the respective keys. e.g
``` js
const rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer});
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ... 
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
```

#### Selectors:

a function that knows how to extract a specific piece of data from the store. Like a lens.
Usually colocated with reducers.

#### "connect"-ing redux state to React UI

Technically, a container component is just a React component that uses `store.subscribe()` to read a part of the Redux state tree and supply props to a presentational component it renders. You could write a container component by hand, but we suggest instead generating container components with the React Redux library's connect() function, which provides many useful optimizations to prevent unnecessary re-renders.

To use `connect()`, you need to define a special function called `mapStateToProps` that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping.
You would also pass in second argument `mapDispatchToProps` inside connect if it is defined.

#### Role of "bindActionCreators" and dispatching actions from react ui to redux

`mapdispatchtoprops` is a function that takes in argument dispatch and should return props. the returned props have as keys, the function that dispatch actions to redux. The main idea is make action creators available to component as props e.g. `this.props.selectBook()` would automatically send an action through the redux.

```
bindActionCreaters:: 
ObjectWithActionCreators, dispatch -> PropsForComponentOfSameShape

mapDispatchToProps::
dispatch -> ObjectWithActionCreators
```

When we are using bindActionCreators and mapDispatchToProps, there is no need of manually calling dispatch.

### Data flow/lifecycle for redux in app

1. You call store.dispatch(action) **Note** - Every action is passed to all the reducers.
2. Redux store calls reducer function it was given.
3. Root reducer combines output of multiple reducers into single state tree
4. Redux store saves complete state tree given by rootReducer and can be retrived via store.getState()

### ES6 computed property syntax

We use ES6 computed property syntax so we can update state[action.subreddit] with Object.assign() in a concise way. This:
```
return Object.assign({}, state, {
  [action.subreddit]: posts(state[action.subreddit], action)
})
```

is equivalent to this:
```
let nextState = {}
nextState[action.subreddit] = posts(state[action.subreddit], action)
return Object.assign({}, state, nextState)
```

### Actions

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
**All reducers are called when an action is dispatched**

### Asynchronous actions

For any API request, you'll want to dispatch 3 actions:
1. An action informing reducers that request began.
2. An action informing reducers that request finished successfully.
3. An action informing reducers that request failed.

One can define seperate types for each :
```
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

### Reddit app state shape 

```
{
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
```

### Reasons for normalizing state shape

Over time app will grow such that there will be
duplicate/nested state all over the place
and we would like to store it in a manner such as database. (e.g. user have posts which have comments which are given by users). Eventually all data in app will result in a graph. And relational model can emulate all possible graphs.

So the root state would consider tables for each
type of data e.g. user, posts, comments etc.
where the table is list of records by id.
and all of them refer each other only by Id.

Immutable updates require path copying and deeply
nested + more duplicated data will involve lot of
copying updating etc.

Normalization will result in overall flatter tree

### Concepts of normalizing data

* Each type e.g. user, comment, post etc. gets its own table
* Each table data is an object with a key allIds which is array of all ids, and a key byId whose value is an object where all the keys are ids of individual items and values are items themselves.
```
e.g. 
users : {
  byId: {
    "10001": {
      id: "10001",
      name: "JohnAha",
      age: "52"
    },
    "10002" : {
      id: "10002",
      name: "KateBaha",
      age: "66"
    }
  },
  allIds: ["10001", "10002"]
}
```

* Any references to individual items should be done using Id only

* The array of ids should be used to indicate ordering


### Our actions

#### Synchronous actions

User interaction generated actions:
SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT

Network related actions, but also simple action cretors (return objects):
REQUEST_POSTS, RECEIVE_POSTS

### Redux Thunk middleware

By using this specific middleware,
an action creator can return a function (which takes in dispatch) instead of an action object. This way, action creator becomes a thunk.

When action creator returns a function instead of object,
that function will get executed by redux thunk middleware.

This function doesn't need to be pure; it is thus allowed to have side effects, including executing asynchronous API calls. The function can also dispatch actions—like those synchronous actions

### What are redux middlewares?

It provides a control over an action between dispatching an action, and the moment it reaches
a reducer. Think of them as action interceptors and modifiers. 
People use redux middleware for logging,
crash reporting, talking to an asynchronous API, routing
and more.

Without middleware, Redux store only supports synchronous data flow.


### redux-promise middleware library

Helps us handle async stuff like ajax requests in our application.
Requirements: incoming promise should be FSA compliant, and the payload should be promise.
If it receives an Flux Standard Action whose payload is a promise, it does not immediately move it forward, 
but it will either
dispatch a copy of the action with the resolved value of the promise, and set status to success.
dispatch a copy of the action with the rejected value of the promise, and set status to error.

As a result the reducers of the associated type directly see the data instead of a promise.


### A standard action (also known as FSA - flux standard action)
A standard action
1. must be an object
2. must have type property
3. may have payload/error property

e.g.
```
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

### writing your own redux middlware

Remember the job of a middleware is to modify, route, block, transform or pass-thru actions.
A typical middleware looks like following:
```js
export default function({ dispatch }) {
    return next => action => {
        console.log('action = ', action);
        // do middleware specific stuff
        // if you want to go to next middleware call next with action
        next(action);
    }
}
```

**Note** - `dispatch` vs `next`, `next` just forwards action to the next middleware, where as using `dispatch` with an action starts from the very first middleware.

### redux-actions library

Created to aid with utility helpers around redux FSA actions
to reduce boilerplate

Useful functions provided by redux-actions library
* createAction(type, payloadCreator = Identity) : create actions using this function
* handleAction(type, reducer, defaultState) : wraps reducers so that it handles actions of only a certain type

