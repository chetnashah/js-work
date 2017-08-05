
### Navigation Views

* Navigation views are presentation components that take a router and a navigation prop, and can display several screens, as specified by the navigation.state.


### Navigator
A navigator is a component that has a router in it,
ReactNavigation provides a few standard Navigators: StackNavigator, DrawerNavigator and TabNavigator.
A screen/navigator in a navigator has access to its route via this.props.navigation.state.



* Standard Navigators
For each screen in standard Navigator, your screen (& nested navigator) will receive navigation prop object which has :
  1. navigate(helper) - go to other screen.(internally does dispatch action)
  2. setParams(helper) - make changes to route's params (internally does dispatch action)
  3. goBack(helper) - internally does dispatch action
  4. state - screen's current state/routes.
  5. dispatch(navigateAction) - send action to router installed with this navigator.

* Navigation Actions: These are standard actions that can be sent to router using dispatch method above
Using navigation actions:
```
import { NavigationActions } from 'react-navigation'
// make navigateAction using NavigationActions methods 
this.props.navigation.dispatch(navigateAction);
```

methods on NavigationActions to generate actions:
  1. navigate
  2. reset
  3. back
  4. setParams

* Redux integration notes:
Only your top level router needs to be integrated with redux
since all other routers are inside it.

* Routers:
As we know navigator are components that have a router installed.
and navigators are composable, so also routers are composable,
and can delegate to child routers.

* To handle your app's navigation state in redux, you can pass your own navigation prop to a navigator. Your navigation prop must provide the current state, as well as access to a dispatcher to handle navigation options.

* Even though work is delegated to an external reducer, we can delegate that work back to main reducer via router: Each navigation router effectively has a reducer, called getStateForAction

* Keep in mind that when a navigator is given a navigation prop, it relinquishes control of its internal state. That means you are now responsible for persisting its state, handling any deep linking, integrating the back button, etc.

* Navigation prop that a navigator gets : The navigation prop passed down to a navigator only includes state and dispatch. This is the current state of the navigator, and an event channel to send action requests. All navigators are controlled components: they always display what is coming in through props.navigation.state, and their only way to change the state is to send actions into props.navigation.dispatch

* Navigation state is automatically passed down from one navigator to another when you nest them. Note that in order for a child navigator to receive the state from a parent navigator, it should be defined as a screen.

* The two crucial parts are state & dispatch , rest (goback, navigate etc) can be generated using : 
```
addNavigationHelpers({ dispatch, state });
```

* Routers take route config for initialization :
```
const MyStackRouter = StackRouter({
  // this is RouteConfig
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}, {
  initialRouteName: 'Home',
})
```



* Passing props to a particual screen:
```
Home: { screen: props => <Home {...props} {...myProps} /> }
```

## Custom Navigator

A barebones crude navigator : 
1. router is installed.
2. crude logic is implemented to take, state, navigation and decide which component to show based on router. (This is well managed via a navigationView : see below)
```
class MyNavigator extends React.Component {
  static router = MyRouter;
  render() {
    const { state, dispatch } = this.props.navigation;
    const { routes, index } = state;

    // Figure out what to render based on the navigation state and the router:
    const Component = MyRouter.getComponentForState(state);

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch, state: routes[index] };
    // If we want, we can also tinker with the dispatch function here, to limit
    // or augment our children's actions

    // Assuming our children want the convenience of calling .navigate() and so on,
    // we should call addNavigationHelpers to augment our navigation prop:
    childNavigation = addNavigationHelpers(childNavigation);

    return <Component navigation={childNavigation} />;
  }
}

``` 

### createNavigator

* Combining together a router and a navigation view, using createNavigator :
```
const MyApp = createNavigator(MyRouter)(MyView);
```

which expands into :
```
const MyApp = ({ navigation }) => (
  <MyView router={MyRouter} navigation={navigation} />
);
MyApp.router = MyRouter;
```


