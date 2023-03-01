import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { NativeModules, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";
import { RootScreenParamList } from "..";

export default function SlideBar(props: DrawerContentComponentProps) {
	const { navigation } = props;
	
	const navigate = (to: keyof RootScreenParamList) => () => {
		navigation.navigate(to)
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			<View style={{
				flex: 1,
				alignItems: "flex-start",
				flexDirection: "column",
				padding: 20
			}}>
				<Pressable onPress={navigate("Home")} style={styles.button}>
					<Text>Home</Text>
				</Pressable>
				<Pressable onPress={navigate("Detail")} style={styles.button}>
					<Text>Favoites</Text>
				</Pressable>
				<Pressable onPress={navigate("Music")} style={styles.button}>
					<Text>Music</Text>
				</Pressable>
				<Pressable onPress={navigate("Setting")} style={styles.button}>
					<Text>Setting</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: Platform.OS === "android" ? NativeModules.StatusBarManager.HEIGHT : 0,
	},
	button: {
		borderRadius: 5,
		backgroundColor: "lightblue",
		padding: 10,
		margin: 10
	}
});
