redux notes:

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

### redux-actions library

Created to aid with utility helpers around redux FSA actions
to reduce boilerplate

Useful functions provided by redux-actions library
* createAction(type, payloadCreator = Identity) : create actions using this function
* handleAction(type, reducer, defaultState) : wraps reducers so that it handles actions of only a certain type

