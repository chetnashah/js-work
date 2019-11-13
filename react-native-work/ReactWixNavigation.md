

### NavigationReactNativeHost

Defines `NavigationReactNativeHost extends ReactNativeHost` which adds `Navigation` in the default list of packages by overriding `getPackages`.

### NavigationApplication

Creation points and access points for `ReactNativeHost` and `ReactGateway`, instantiates `NavigationReactNativeHost` mentioned above when `get/createNativeHost` are used.

### Component Registry

Analogous to `AppRegistry.registerComponent`, it is a hashmap from `name/string` to a component.

### Navigation interface

Methods like `push, pop, setRoot ... ` etc form navigation interface.

All of these are forwarded to native code as commands. All of which end up in `NavigationModule.java`
NavigationModule makes use of `layoutFactory` and `ViewControllers`, and forwards most of the commands to
`Navigator`.

### Navigator (Core logic)



### NavigationActivity

Builds directly on top of `AppCompatActivity` instead of using `ReactActivity` or otherwise

Holds a reference to `protected Navigator navigator;` which has the crux of the business logic.

Like `ReactActivity`, it passes all the callbacks to `ReactGateway` instead of a `ReactDelegate`.

Important parts are `onCreate` and `onPostCreate`:
```java
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addDefaultSplashLayout();
        navigator = new Navigator(this,
                new ChildControllersRegistry(),
                new ModalStack(this),
                new OverlayManager(),
                new RootPresenter(this)
        );
        navigator.bindViews();
        getReactGateway().onActivityCreated(this);
    }

    @Override
    public void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        navigator.setContentLayout(findViewById(android.R.id.content));
    }

```

### InstanceManager

Wherever InstanceManager is required, it is compensated by using `host.getReactInstanceManager`.

### ReactGateway

```java
	private final ReactNativeHost host;
	private final NavigationReactInitializer initializer;
```

### ReactView extends ReactRootView

`ReactView extends ReactRootView `
Constructor accepts a `reactInstanceManager` from outside.
Has a private method `start` called on constructor of the view:
```java
    public ReactView(final Context context, ReactInstanceManager reactInstanceManager, String componentId, String componentName) {
		super(context);
		this.reactInstanceManager = reactInstanceManager;
		this.componentId = componentId;
		this.componentName = componentName;
		jsTouchDispatcher = new JSTouchDispatcher(this);
		start();
	}

	private void start() {
		setEventListener(reactRootView -> {
            reactRootView.setEventListener(null);
            isAttachedToReactInstance = true;
        });
		final Bundle opts = new Bundle();
		opts.putString("componentId", componentId);
		startReactApplication(reactInstanceManager, componentName, opts);
	}
```

### ViewController

