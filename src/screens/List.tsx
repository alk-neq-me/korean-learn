import { RouteProp } from "@react-navigation/native";
import { FlatList } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, RefreshControl, SafeAreaView } from "react-native";
import { RootScreenParamList } from "..";
import ExpandableListItem from "../components/expandable-list-item";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { useStateContext } from "../context";
import { getFavoriteList, getListByLibraryId, searchList, toggleFavorite } from "../context/actions/list.actions";
import useDebounce from "../hooks/use-debounce";

type Props = {
  route?: RouteProp<RootScreenParamList, "List">;
};

export default function List(props: Props) {
	const screenMode = props.route?.params.screenMode;
	const {
		state: {
			list
		},
		dispatch
	} = useStateContext();
	const [searchWord, setSearchWord] = useState<string>("");
	const debouncedSearchValue = useDebounce(searchWord);
	const [expendedList, setExpendedList] = useState<number|undefined>(undefined);
	
	const onToggleExpend = useCallback((id_: number) => {
		if (id_ === expendedList) {
			setExpendedList(undefined);
			return;
		};
		setExpendedList(id_);
	}, [expendedList]);
	
	
	useEffect(() => {
		if (debouncedSearchValue || screenMode === "search") {
			dispatch(searchList(debouncedSearchValue.toLowerCase()));
		};
	}, [debouncedSearchValue, screenMode]);
	
	const offset = useRef(new Animated.Value(0)).current;
	
	const rows = list.rows;
	const loading = list.loading;
	const error = list.error;
	
	const handleChangeSearchInput = useCallback((word: string) => {
		setSearchWord(word);
	}, []);
	
	const getTitle = useCallback(() => {
		if (!screenMode) return "Book";
		if (screenMode === "list") return rows[0]?.library_name || "List";
		if (screenMode === "favorite") return "Favorite";
		if (screenMode === "search") return "Search";

		const _unreachable: never = screenMode;
		return "Book";
	}, [screenMode, rows[0]?.library_name]);
	
	const handleToggleFavorite = useCallback((id_: number) => {
		dispatch(toggleFavorite(id_));
	}, []);
	
	const onRefresh = useCallback(() => {
		if (!screenMode) return;
		const id_ = rows[0].library_id;
		if (id_ && screenMode === "list") dispatch(getListByLibraryId(id_));
		if (screenMode === "favorite") {
			dispatch(getFavoriteList());
			return;
		};
		if (screenMode === "search") {
			console.log("Search");
			return;
		};
	}, [rows[0]?.library_id, screenMode]);
	
	if (error) return (
		<FullErrorPage error={error} />
	);
	
	if (loading) return (
		<FullLoading />
	)
	
	return (
		<SafeAreaView>
			<Masthead animatedValue={offset} image={require("../../assets/images/trajectory-education.png")} title={getTitle()}>
				{screenMode
					? screenMode === "list" || screenMode == "favorite"
						? <Navbar />
						: null
					: null
				}
				{screenMode
					? screenMode === "search"
						? <Searchbar searchWord={searchWord} handleChangeSearchInput={handleChangeSearchInput} />
						: null
					: null
				}
			</Masthead>
			<FlatList
				data={rows}
        contentContainerStyle={{
					paddingTop: 230,
					paddingHorizontal: 10,
        }}
				scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {y: offset} } }],
          { useNativeDriver: false }
        )}
				showsVerticalScrollIndicator={false}
				renderItem={(info) => (
					<ExpandableListItem expendedList={expendedList} onToggleExpend={onToggleExpend} list={info.item} handleToggleFavorite={handleToggleFavorite} />
				)}
				refreshControl={
					<RefreshControl refreshing={loading} progressViewOffset={230} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
		);
};
