import { createDrawerNavigator } from "@react-navigation/drawer";
// import SlideBar from "./components/slide-bar";
import Home from "./screens/Home";
import Music from "./screens/Music";
import Grammar from './screens/Grammar';
import Setting from "./screens/Setting";
import List from "./screens/Lists";

type ScreenParams = {
	isMain?: boolean
} | undefined;

export type RootScreenParamList = {
	Home: ScreenParams;
	List: ScreenParams;
	
	Music: ScreenParams;
	Grammar: ScreenParams;
	Setting: ScreenParams;
}

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			// drawerContent={props => <SlideBar {...props} />}
			screenOptions={{
				headerShown: true,
				drawerType: "back",
				overlayColor: "rgba(0,0,0,.8)"
			}}
		>
			<Drawer.Screen name="Home" component={Home} initialParams={{ isMain: true }} />
			<Drawer.Screen name="List" component={List} initialParams={{ isMain: true }} />
			<Drawer.Screen name="Music" component={Music} initialParams={{ isMain: false }} />
			<Drawer.Screen name="Grammar" component={Grammar} initialParams={{ isMain: false }} />
			<Drawer.Screen name="Setting" component={Setting} initialParams={{ isMain: false }} />
		</Drawer.Navigator>
	);
};
