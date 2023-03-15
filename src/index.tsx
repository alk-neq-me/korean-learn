import { createDrawerNavigator } from "@react-navigation/drawer";
import SlideBar from "./components/slide-bar";
import Home from "./screens/Home";
import Music from "./screens/Music";
import Grammar from './screens/Grammar';
import Setting from "./screens/Setting";
import About from "./screens/About";
import List from "./screens/List";
import Quiz from "./screens/Quiz";
import Onboarding from "./screens/Onboarding";
import { useStateContext } from "./context";

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
    state: {
      settings: {
        setting: {
          initial_app
        }
      }
    }
  } = useStateContext();

  return (
    <Drawer.Navigator
      initialRouteName={initial_app ? "Onboarding" : "Home"}
      drawerContent={props => <SlideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "back",
        overlayColor: "rgba(0,0,0,.5)",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Onboarding" component={Onboarding} />
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
