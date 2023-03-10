import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Button, Box, } from "native-base";
import { useCallback, useRef } from "react";
import { Animated } from "react-native";
import { RootScreenParamList } from "..";
import Masthead from "./masthead";

type Props = {
	error?: string;
}

export default function FullErrorPage(props: Props) {
	const { error } = props;
	const offset = useRef(new Animated.Value(0)).current;
	const navigation = useNavigation<DrawerNavigationProp<RootScreenParamList>>();
	
	const handleHome = useCallback(() => {
		navigation.navigate("Home");
	}, []);

	return (
		<VStack h="full">
			<Masthead
				animatedValue={offset}
				image={require("../../assets/images/trajectory-education.png")}
				title="Error"
			>
			</Masthead>
			<VStack bg="red.50" h="560px" justifyContent="center" p={3}>
				<Box>
					<Text fontSize="xl" textAlign="center" color="red.300">{error || "Unknown Error"}</Text>
					<Button variant="ghost" mt={5} onPress={handleHome}>Go Home</Button>
				</Box>
			</VStack>
		</VStack>
	);
};
