
https://redux.js.org/tutorials/fundamentals/part-8-modern-redux

https://redux-toolkit.js.org/tutorials/quick-start

https://redux-toolkit.js.org/tutorials/typescript

## Slice file

Similar to ducks pattern.
We mut most logic related with feature like:
1. state shape
2. reducers

It automatically generates **action creators** based on reducer functions.
We will export **action creators** and **selectors** and **reducers** from this file.

Redux Toolkit has a createSlice API that will help us simplify our Redux reducer logic and actions. createSlice does several important things for us:

1. We can write the case reducers as functions inside of an object, instead of having to write a switch/case statement
2. The reducers will be able to write shorter immutable update logic
3. All the action creators will be generated automatically based on the reducer functions we've provided

eg.
```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  entities: [],
  status: null
}

const todosSlice = createSlice({
  name: 'todos',// slice name used for managing this slice reducers and actions
  initialState,
  reducers: {
    // no switch case needed, these fn names act as action names
    todoAdded(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.entities.push(action.payload)
    },
    todoToggled(state, action) {
      const todo = state.entities.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todosLoading(state, action) {
      return {
        ...state,
        status: 'loading'
      }
    }
  }
})

export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions

export default todosSlice.reducer
```

## Uses immer under the hood for immutability

Simpler reducers with `immer` library.

## Custom typed hooks

We will create custom typed hooks for each of the selectors we export from the slice file.
This is preferred style over using mapstatetoprops/mapdispatchtoprops in our components.

## Store file

We will create a store file that will create a store and export it.
We use `configureStore` instead of `createStore` to create the store.

## Thunks

We will create thunks for each of the async actions we want to perform.
We will use `createAsyncThunk` to create the thunk.


### createAsyncThunk

The thunk / promise pattern is so common, this convention is converted to an api as follows:
1. a action is automatically dispatched before executing the function
2. the function should return a promise
3. a action is automatically dispatched after the promise is resolved/rejected
```js

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  // action dispatched before rnning the function
  const response = await client.get('/fakeApi/todos')
  return response.todos
  // action dispatched after running the function for resolved/rejected cases
})
```