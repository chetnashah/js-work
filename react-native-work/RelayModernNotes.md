

Network.execute is used to send queries and mutations.

RelayObservable is an important structure. Used for reactivity of data.

Main API is 
```
relayObservable.subscribe(Observer)
static RelayObservable.create(Source), Source must be a function
```
where Observer is object with next, error callbacks.



Useful promise related methods are `toPromise` and `fromPromise`, that provides interop between RelayObservable and promise.

 An Observer is an object of optional callback functions provided to
 .subscribe(). Each callback function is invoked when that event occurs.

``` js
export type Observer<-T> = {|
  +start?: ?(Subscription) => mixed,
  +next?: ?(T) => mixed,
  +error?: ?(Error) => mixed,
  +complete?: ?() => mixed,
  +unsubscribe?: ?(Subscription) => mixed,
|};
```

 A Sink is an object of methods provided by Observable during construction.
 The methods are to be called to trigger each event. It also contains a closed
 field to see if the resulting subscription has closed.
``` js
type Sink<-T> = {|
  +next: T => void,
  +error: (Error, isUncaughtThrownError?: boolean) => void,
  +complete: () => void,
  +closed: boolean,
|};
```

A Source is the required argument when constructing a new Observable. Similar
to a Promise constructor, this is a function which is invoked with a Sink,
and may return either a cleanup function or a Subscription instance (for use
when composing Observables).
``` js
type Source<+T> = (Sink<T>) => void | Subscription | (() => mixed);
```
Here is a simple example of a source passed in create:
``` js
function fromValue<T>(value: T): RelayObservable<T> {
  return RelayObservable.create(sink => {
    sink.next(value);
    sink.complete();
  });
}
```



/**
 * The shape of a GraphQL response as dictated by the
 * [spec](http://facebook.github.io/graphql/#sec-Response)
 */
export type GraphQLResponse =
  | {
      data: PayloadData,
      errors?: Array<PayloadError>,
    }
  | {
      data?: ?PayloadData,
      errors: Array<PayloadError>,
    };

/**
 * The data returned from Relay's execute function, which includes both the
 * raw GraphQL network response as well as any related client metadata.
 */
export type ExecutePayload = {|
  // The operation executed
  operation: ConcreteOperation,
  // The variables which were used during this execution.
  variables: Variables,
  // The response from GraphQL execution
  response: GraphQLResponse,
  // Default is false
  isOptimistic?: boolean,
|};

/**
 * A function that returns an Observable representing the response of executing
 * a GraphQL operation.
 */
export type ExecuteFunction = (
  request: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables?: ?UploadableMap,
) => RelayObservable<ExecutePayload>;

/**
 * A function that executes a GraphQL operation with request/response semantics.
 *
 * May return an Observable or Promise of a plain GraphQL server response, or
 * a composed ExecutePayload object supporting additional metadata.
 */
export type FetchFunction = (
  request: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: ?UploadableMap,
) => ObservableFromValue<ExecutePayload> | ObservableFromValue<GraphQLResponse>;

/**
 * A function that executes a GraphQL subscription operation, returning one or
 * more raw server responses over time.
 *
 * May return an Observable, otherwise must call the callbacks found in the
 * fourth parameter.
 */
export type SubscribeFunction = (
  request: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  observer?: LegacyObserver<GraphQLResponse>,
) =>
  | RelayObservable<ExecutePayload>
  | RelayObservable<GraphQLResponse>
  | Disposable;