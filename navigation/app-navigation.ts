import {
  CommonActions,
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import type {
  RootNavigationProp,
  RootStackParamList,
} from "../types/navigation";

type RouteName = keyof RootStackParamList;
type RouteParams<Route extends RouteName> = RootStackParamList[Route];
type NavigationArgs<Route extends RouteName> =
  undefined extends RouteParams<Route>
    ? [routeName: Route, params?: RouteParams<Route>]
    : [routeName: Route, params: RouteParams<Route>];

export const appNavigationRef =
  createNavigationContainerRef<RootStackParamList>();

const runWhenReady = (action: () => void) => {
  if (appNavigationRef.isReady()) {
    action();
  }
};

export const appNavigation = {
  navigate<Route extends RouteName>(...args: NavigationArgs<Route>) {
    const [routeName, params] = args;
    runWhenReady(() => {
      appNavigationRef.dispatch(
        CommonActions.navigate({ name: routeName, params }),
      );
    });
  },

  replace<Route extends RouteName>(...args: NavigationArgs<Route>) {
    const [routeName, params] = args;
    runWhenReady(() => {
      appNavigationRef.dispatch(StackActions.replace(routeName, params));
    });
  },

  resetTo<Route extends RouteName>(...args: NavigationArgs<Route>) {
    const [routeName, params] = args;
    runWhenReady(() => {
      appNavigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
      );
    });
  },

  goBack() {
    runWhenReady(() => {
      if (appNavigationRef.canGoBack()) {
        appNavigationRef.goBack();
      }
    });
  },

  backOrReplace<Route extends RouteName>(...args: NavigationArgs<Route>) {
    runWhenReady(() => {
      if (appNavigationRef.canGoBack()) {
        appNavigationRef.goBack();
        return;
      }

      const [routeName, params] = args;
      appNavigationRef.dispatch(StackActions.replace(routeName, params));
    });
  },

  getCurrentRouteName() {
    return appNavigationRef.getCurrentRoute()?.name as RouteName | undefined;
  },
};

export const useAppNavigationHandler = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return {
    navigate<Route extends RouteName>(...args: NavigationArgs<Route>) {
      const [routeName, params] = args;
      navigation.dispatch(CommonActions.navigate({ name: routeName, params }));
    },

    replace<Route extends RouteName>(...args: NavigationArgs<Route>) {
      const [routeName, params] = args;
      navigation.dispatch(StackActions.replace(routeName, params));
    },

    resetTo<Route extends RouteName>(...args: NavigationArgs<Route>) {
      const [routeName, params] = args;
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
      );
    },

    goBack() {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    },

    backOrReplace<Route extends RouteName>(...args: NavigationArgs<Route>) {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      }

      const [routeName, params] = args;
      navigation.dispatch(StackActions.replace(routeName, params));
    },
  };
};
