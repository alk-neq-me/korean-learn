import { AntDesign } from "@expo/vector-icons";
import { FlatList, VStack, Text, IconButton } from "native-base";
import { useEffect } from "react";
import ListItem from "../components/list-item";
// import ListItem from "../components/list-item";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useStateContext } from "../context";

export default function FavList() {
	const {state: {list}, dispatch} = useStateContext();
	
	useEffect(() => {
		// dispatch(getFavList());
	}, []);
	
	return (
		<VStack>
			<Masthead
				image={require("../../assets/images/trajectory-education.png")}
				title="favourite"
			>
				<Navbar />
			</Masthead>
			
			{/*
			<FlatList
				data={list}
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
			*/}
		</VStack>
	);
};
