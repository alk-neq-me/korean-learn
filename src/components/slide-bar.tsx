import { DrawerContentComponentProps } from "@react-navigation/drawer";
import {Pressable, Text, VStack } from "native-base";
import { RootScreenParamList } from "..";

export default function SlideBar(props: DrawerContentComponentProps) {
	const { navigation } = props;
	const pagesField: (keyof RootScreenParamList)[] = ["Home", "Music", "Grammar", "Setting"];
	
	const navigate = (to: keyof RootScreenParamList) => () => {
		navigation.navigate(to)
	};
	
	return (
		<VStack
			m={2}
		>
			{pagesField.map((field, index) => (
				<Pressable key={index} onPress={navigate(field)}
					color="black"
					_hover={{
						bg: "blue.300"
					}}
					p={2}
					borderRadius={4}
					m={1}
				>
					<Text>{field}</Text>
				</Pressable>
			))}
		</VStack>
	);
};
