import { Box, Text, Spinner, VStack } from "native-base";
import { useRef } from "react";
import { Animated } from "react-native";
import Masthead from "./masthead";
import Navbar from "./navbar";

export default function FullLoading() {
	const offset = useRef(new Animated.Value(0)).current;
	
	return (
		<VStack h="full" position="relative">
			<Masthead
				animatedValue={offset}
				image={require("../../assets/images/trajectory-education.png")}
				title="Loading..."
			>
				<Navbar />
			</Masthead>
			<Box h="full" display="flex" justifyContent="center" position="absolute" left={0} right={0}>
				<Spinner size="lg" />
				<Text fontSize="xl" textAlign="center">Loading...</Text>
			</Box>
		</VStack>
	);
};
