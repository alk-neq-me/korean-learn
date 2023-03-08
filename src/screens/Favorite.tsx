import { AntDesign } from "@expo/vector-icons";
import { FlatList, VStack, Text, IconButton } from "native-base";
import { useEffect } from "react";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import ListItem from "../components/list-item";
// import ListItem from "../components/list-item";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useStateContext } from "../context";
import { getFavoriteList,  } from "../context/actions/list.actions";

export default function FavList() {
	const {state: {list}, dispatch} = useStateContext();
	
	const rows = list.rows;
	const loading = list.loading;
	const error = list.error;
	
	if (loading) {
		return (
			<FullLoading />
		)
	}
	
	if (error) {
		return (
			<FullErrorPage error={error} />
		)
	}
	
	useEffect(() => {
		dispatch(getFavoriteList());
	}, []);
	
	return (
		<VStack>
			<Masthead
				image={require("../../assets/images/trajectory-education.png")}
				title="favourite"
			>
				<Navbar />
			</Masthead>
			
			<FlatList
				data={rows}
				renderItem={(info) => (
					<ListItem
						label={info.item.mean}
						rightElement={() => (
							<IconButton
								_icon={{
									as: AntDesign,
									name: info.item.fav ? "heart" : "heart"
								}}
							/>
						)}
					/>
				)}
			/>
		</VStack>
	);
};
