import { Box, Heading, Pressable, Text } from "native-base";
import { Linking } from "react-native";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";

const link = "https://marco-exexx.vercel.app";

export default function About() {
	const goLink = () => {
		Linking.openURL(link);
	};
	
	return (
		<Box>
			<Masthead
				image={require("../../assets/images/study-literature.png")}
				title="About"
			>
				<Navbar />
			</Masthead>
			
			<Box h="full" display="flex" alignItems="center" justifyContent="center">
				<Heading>Developer <Pressable onPress={goLink}><Text>@marco.exex</Text></Pressable></Heading>
			</Box>
		</Box>
	);
}
