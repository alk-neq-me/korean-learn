import { AntDesign } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { Box, FlatList, IconButton, Pressable, Text } from "native-base";
import { useCallback } from "react";
import { RefreshControl } from "react-native";
import { RootScreenParamList } from "..";
import FullErrorPage from "../components/full-error";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useStateContext } from "../context";
import { getListByLibraryId, toggleFavorite } from "../context/actions/list.actions";

type Props = {
  route?: RouteProp<RootScreenParamList, "List">;
};

export default function List(props: Props) {
	const isFavorite = props.route?.params.isFavorite;
	
	const {
		state: {
			list
		},
		dispatch
	} = useStateContext();
	
	const rows = list.rows;
	const loading = list.loading;
	const error = list.error;
	
	const title = 
		!isFavorite 
		? (rows[0]?.library_name || "Book")
		: "Favorite";
	
	const handleToggleFavorite = useCallback((id_: number) => {
		dispatch(toggleFavorite(id_));
	}, []);
	
	const onRefresh = useCallback(() => {
		const id_ = rows[0].library_id;
		if (id_) dispatch(getListByLibraryId(id_));
	}, [rows[0]?.library_id]);
	
	if (error) return (
		<FullErrorPage error={error} />
	)
	
	return (
		<Box>
			<Masthead image={require("../../assets/images/trajectory-education.png")} title={title}>
				<Navbar />
			</Masthead>
			<FlatList
				data={
					!isFavorite ? rows : rows.filter(row => row.fav)
				}
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
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={onRefresh} />
				}
			/>
		</Box>
	);
};
