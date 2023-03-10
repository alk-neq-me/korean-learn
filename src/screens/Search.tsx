import { StatusBar } from "native-base";
import { useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Masthead from "../components/masthead";
import Searchbar from "../components/searchbar";

export default function Search() {
	const offset = useRef(new Animated.Value(0)).current;
	
	return (
		<SafeAreaView style={{flex:1}}>
			<StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
			<Masthead
				animatedValue={offset}
				image={require("../../assets/images/searching-data.png")}
				title="Search"
			>
				<Searchbar />
			</Masthead>
		</SafeAreaView>
	)
};
