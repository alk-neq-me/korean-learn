import { AntDesign } from "@expo/vector-icons";
import { Box, FlatList, IconButton, Pressable, Text } from "native-base";
import { useCallback } from "react";
import FullErrorPage from "../../components/full-error";
import FullLoading from "../../components/full-loading";
import Masthead from "../../components/masthead";
import Navbar from "../../components/navbar";
import { useStateContext } from "../../context";
import { toggleFavorite } from "../../context/actions/list.actions";

export default function List() {
	const {
		state: {
			list
		},
		dispatch
	} = useStateContext();
	
	const rows = list.rows;
	const loading = list.loading;
	const error = list.error;
	
	const title = rows[0]?.library_name || "Book";
	
	const handleToggleFavorite = useCallback((id_: number) => {
		dispatch(toggleFavorite(id_));
	}, []);
	
	if (loading) return (
		<FullLoading />
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
							onPress={() => handleToggleFavorite(info.item.id)}
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
