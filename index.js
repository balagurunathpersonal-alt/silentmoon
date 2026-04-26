import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import App from "./App";
import { configureNotifications } from "./services/notification-service";

configureNotifications();

AppRegistry.registerComponent("main", () => App);
