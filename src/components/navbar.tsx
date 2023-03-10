import { Feather } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { HStack, IconButton, StatusBar } from "native-base";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootScreenParamList } from "..";
import { useStateContext } from "../context";
import { getFavoriteList } from "../context/actions/list.actions";

export default function Navbar() {
	const navigation = useNavigation<DrawerNavigationProp<RootScreenParamList>>();
	const handleMenuButton = useCallback(() => {
		navigation.openDrawer();
	}, []);
	const { dispatch } = useStateContext();
	
	const handleFavOpen = useCallback(() => {
		dispatch(getFavoriteList());
		navigation.navigate("List", { screenMode: "favorite" });
	}, []);
	
	const handleSearchOpen = useCallback(() => {
		navigation.navigate("List", { screenMode: "search" });
	}, []);
	
	return (
		<SafeAreaView style={{padding:3}}>
			<StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
			<HStack flexDirection="row" justifyContent="space-between">
				<IconButton
					onPress={handleMenuButton}
					borderRadius={100}
					_icon={{
						as: Feather,
						name: "menu",
						size: 6,
						color: "white"
					}}
				/>
				<HStack>
					<IconButton
						borderRadius={100}
						onPress={handleSearchOpen}
						_icon={{
							as: Feather,
							name: "search",
							size: 6,
							color: "white"
						}}
					/>
					<IconButton
						borderRadius={100}
						onPress={handleFavOpen}
						_icon={{
							as: Feather,
							name: "heart",
							size: 6,
							color: "white"
						}}
					/>
				</HStack>
			</HStack>
		</SafeAreaView>
	);
};
