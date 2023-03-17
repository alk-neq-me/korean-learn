import { createDrawerNavigator } from "@react-navigation/drawer";
import SlideBar from "./components/slide-bar";
import Home from "./screens/Home";
import Music from "./screens/Music";
import Grammar from './screens/Grammar';
import Setting from "./screens/Setting";
import About from "./screens/About";
import List from "./screens/List";
import Quiz from "./screens/Quiz";
import { useStateContext } from "./context";
import { useEffect } from "react";
import { initSettings } from "./context/actions/settings.actions";
import { getLibraries } from "./context/actions/library.actions";

export type RootScreenParamList = {
  Home: undefined;
  Onboarding: undefined;
  List: { screenMode: "list" | "favorite" | "search" };

  Music: undefined;
  Grammar: undefined;
  Quiz: { section: number, isAll: boolean };
  Setting: undefined;

  About: undefined;
}

const Drawer = createDrawerNavigator();

export default function App() {
  const {
    dispatch,
  } = useStateContext();

  useEffect(() => {
    dispatch(initSettings());
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      drawerContent={props => <SlideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "back",
        overlayColor: "rgba(0,0,0,.5)",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="List" component={List} initialParams={{ screenMode: "list" }} />
      <Drawer.Screen name="Music" component={Music} />
      <Drawer.Screen name="Grammar" component={Grammar} />
      <Drawer.Screen
        name="Quiz"
        component={Quiz}
        initialParams={{ section: 1, isAll: true }}
      />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};
