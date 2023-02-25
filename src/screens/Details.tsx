import { Button, FlatList, NativeModules, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { useStateContext } from "../context";

const Detail = () => {
	const {
		state,
	} = useStateContext();

	const show = () => {
		console.log(state.fav);
	}
	
	return (
    <SafeAreaView style={{
      display: "flex",
      flexDirection: "column",
      paddingTop: Platform.OS === "android" ? NativeModules.StatusBarManager.HEIGHT : 0
    }}>
      <StatusBar />
			<View>
				<Text>Favoites</Text>
				
				<Button title="show state" onPress={show} />
				
				<FlatList
					data={state.fav}
					keyExtractor={(_, index) => `${index}`}
					renderItem={({item}) => (
						<View>
							<Text>{item.id}</Text>
						</View>
					)}
				/>
			</View>
    </SafeAreaView>
	);
};


export default Detail;
