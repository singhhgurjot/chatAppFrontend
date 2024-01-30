/**
 * @format
 */
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); //Hide warnings

LogBox.ignoreAllLogs(); //Hide all warning notifications on front-end
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
