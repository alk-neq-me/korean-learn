import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { HStack, IconButton, Input, StatusBar } from "native-base";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootScreenParamList } from "..";

type Props = {
	searchWord: string;
	handleChangeSearchInput: (word: string) => void;
};

export default function Searchbar(props: Props) {
	const { searchWord, handleChangeSearchInput } = props;
	
	const navigation = useNavigation<DrawerNavigationProp<RootScreenParamList>>();
	
	const onClearSearchText = useCallback(() => {
		handleChangeSearchInput("");
	}, []);
	
	const navigateBack = useCallback(() => {
		navigation.goBack();
	}, []);
	
	return (
		<SafeAreaView style={{flex:1}}>
			<StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
			<HStack pr={2} justifyContent="space-between" position="relative" w="full" alignItems="center">
				<IconButton
					borderRadius={100}
					onPress={navigateBack}
					_icon={{
						as: AntDesign,
						name: "arrowleft",
						color: "white",
						size: "lg"
					}}
				/>
				<Input 
					w="300px"
					placeholder="Search..." 
					placeholderTextColor="white"
					color="white"
					fontSize="lg"
					variant="underlined"
					size="sm"
					value={searchWord}
					onChangeText={handleChangeSearchInput}
					InputRightElement={
						searchWord ? <IconButton 
							onPress={onClearSearchText}
							rounded={100}
							_icon={{
								as:AntDesign,
								name: "close",
								color: "white",
								size: "lg"
							}} 
						/>
					: <HStack/>}
				/>
			</HStack>
		</SafeAreaView>
	);
};
