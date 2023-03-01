import { Box, FlatList, Spinner, Text } from "native-base";
import { useStateContext } from "../../context";

export default function List() {
	const { state } = useStateContext();
	
	const rows = state.list;
	const loading = state.loading;
	
	if (loading) return (
		<Box
			h="full"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
		>
			<Spinner size="lg" />
		</Box>
	)
	
	return (
		<Box>
			<FlatList
				data={rows}
				renderItem={(info) => (
					<Box p={2} bg="blue.300">
						<Text>{info.item.korea}</Text>
						<Text>{info.item.mean}</Text>
					</Box>
				)}
			/>
		</Box>
	);
};
