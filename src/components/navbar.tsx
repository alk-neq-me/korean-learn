import { Feather } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { HStack, IconButton } from "native-base";
import { useCallback } from "react";
import { RootScreenParamList } from "..";

export default function Navbar() {
	const navigation = useNavigation<DrawerNavigationProp<RootScreenParamList>>();
	const handleMenuButton = useCallback(() => {
		navigation.openDrawer();
	}, []);
	
	const handleFavOpen = useCallback(() => {
		navigation.navigate("Fav");
	}, []);
	
	return (
		<HStack justifyContent="space-between">
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
	);
};