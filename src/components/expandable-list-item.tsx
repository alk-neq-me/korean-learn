import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { VStack, Text, IconButton, HStack, Pressable } from "native-base";
import * as Clipboard from 'expo-clipboard';
import { useCallback } from "react";
import { ListState, UnpackType } from "../context/type";

type Props = {
	list: UnpackType<ListState, "rows">[0];
	handleToggleFavorite: (id_: number) => void;
	expendedList: number|undefined;
	onToggleExpend: (id_: number) => void;
};

export default function ExpandableListItem(props: Props) {
	const { list, handleToggleFavorite, expendedList, onToggleExpend } = props;
	
	const handleCopy = useCallback(() => {
		Clipboard.setStringAsync(list.korea);
	}, []);

	return (
		<VStack
			bg="blue.200"
			overflow="hidden"
			w="full"
			my={1}
			p={2}
			borderRadius={5}
			justifyContent="flex-start"
			alignItems="flex-start"
		>
			<HStack w="full" alignItems="center" justifyContent="space-between">
				<Pressable w="90%" p={1} display="flex" justifyContent="flex-start" onPress={() => onToggleExpend(list.id)}>
					<Text fontSize="md" color="primary.600" mb={2}>{list.korea}</Text>
				</Pressable>
				<IconButton
					borderRadius={100}
					onPress={() => handleToggleFavorite(list.id)}
					_icon={{
						as: AntDesign,
						name: list.fav ? "heart" : "hearto"
					}}
				/>
			</HStack>

			<HStack w="full" display={expendedList === list.id ? "flex" : "none"} alignItems="center" justifyContent="space-between">
				<VStack space={1} alignItems="flex-start">
					<Text fontSize="sm" color="green.500">{list.romaji}</Text>
					<Text fontSize="sm" color="black">{list.mean}</Text>
					<HStack>
						<IconButton
							borderRadius={100}
							_icon={{
								as: Feather,
								name: "mic",
								color: "gray.600",
							}}
						/>
						{list.record && <IconButton
							borderRadius={100}
							_icon={{
								as: FontAwesome5,
								name: "play",
							}}
						/>}
					</HStack>
				</VStack>
				<IconButton
					borderRadius={100}
					onPress={handleCopy}
					_icon={{
						as: Feather,
						name: "copy",
						color: "gray.600",
					}}
				/>
			</HStack>

		</VStack>
	);
};
