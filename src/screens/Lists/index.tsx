import { AntDesign } from "@expo/vector-icons";
import { Box, FlatList, IconButton, Pressable, Spinner, Text } from "native-base";
import { useCallback } from "react";
import FullErrorPage from "../../components/full-error";
import Masthead from "../../components/masthead";
import Navbar from "../../components/navbar";
import { useStateContext } from "../../context";

export default function List() {
	const {
		state: {
			list
		},
	} = useStateContext();
	
	const rows = list.rows;
	const loading = list.loading;
	const error = list.error;
	
	const title = rows[0]?.library_name || "Book";
	
	const handleFav = useCallback((id_: number) => {
		// dispatch(toggleFav(id_));
		console.log(id_);
	}, []);
	
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
	
	if (error) return (
		<FullErrorPage error={error} />
	)
	
	return (
		<Box>
			<Masthead image={require("../../../assets/images/trajectory-education.png")} title={title}>
				<Navbar />
			</Masthead>
			<FlatList
				data={rows}
				display="flex"
				renderItem={(info) => (
					<Pressable
						p={2}
						bg="blue.200"
						m={1}
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						borderRadius={5}
					>
						<Box>
							<Text>{info.item.korea}</Text>
							<Text>{info.item.mean}</Text>
						</Box>
						<IconButton 
							borderRadius={100}
							onPress={() => handleFav(info.item.id)}
							_icon={{
								as: AntDesign,
								name: info.item.fav ? "heart" : "hearto"
							}}
						/>
					</Pressable>
				)}
			/>
		</Box>
	);
};
