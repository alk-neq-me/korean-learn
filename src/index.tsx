import { createDrawerNavigator } from "@react-navigation/drawer";
import SlideBar from "./components/slide-bar";
import Detail from "./screens/Details";
import Home from "./screens/Home";

export type RootScreenParamList = {
	Home: undefined;
	Detail: undefined;
}

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={props => <SlideBar {...props} />}
			screenOptions={{
				headerShown: true,
				drawerType: 'back',
				overlayColor: "rgba(0,0,0,.8)"
			}}
		>
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Detail" component={Detail} />
		</Drawer.Navigator>
	);
};
