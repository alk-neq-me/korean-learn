import { RouteProp } from "@react-navigation/native";
import { Recording } from "expo-av/build/Audio";
import { FlatList } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, RefreshControl, SafeAreaView } from "react-native";
import * as FileSystem from 'expo-file-system';
import { RootScreenParamList } from "..";
import ExpandableListItem from "../components/expandable-list-item";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Audio } from "expo-av";
import { createAudio } from "../context/actions/list.actions";
import { useStateContext } from "../context";
import { getFavoriteList, getListByLibraryId, searchList, toggleFavorite } from "../context/actions/list.actions";
import useDebounce from "../hooks/use-debounce";
import { ListState, UnpackType } from "../context/type";

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
  const [expendedList, setExpendedList] = useState<number | undefined>(undefined);
  const [recording, setRecording] = useState<Recording | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const soundRef = useRef(new Audio.Sound());

  const offset = useRef(new Animated.Value(0)).current;

  const rows = list.rows;
  const loading = list.loading;
  const error = list.error;

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(async (state: any) => {
        if (state.didJustFinish) {
          await soundRef.current.unloadAsync();
          setIsPlaying(false);
        }
      })
    };
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, [soundRef]);

  useEffect(() => {
    setExpendedList(undefined);
    if (screenMode === "search") {
      dispatch(searchList(debouncedSearchValue.toLowerCase()));
    };
  }, [debouncedSearchValue, screenMode]);


  const startRecording = async (list: UnpackType<ListState, "rows">[0]) => {
    if (list.record) {
      console.log("first delete");
      await FileSystem.deleteAsync(list.record);
    }
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HEIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      console.log("Recording error", err);
    };
  };

  async function stopRecording(list: UnpackType<ListState, "rows">[0]) {
    console.log("stop")
    setRecording(undefined);
    if (!recording) return;
    await recording.stopAndUnloadAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false
    });
    const uri = recording.getURI() || undefined;
    dispatch(createAudio(list, uri));
  };

  async function handlePlayAudio(list: UnpackType<ListState, "rows">[0]) {
    if (!list.record || !soundRef.current) return;
    try {
      await soundRef.current.loadAsync({ uri: list.record }, {}, true);
      const playerStatus = await soundRef.current.getStatusAsync();
      console.log("play load", playerStatus);
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          soundRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.log(err)
    };
  };

  async function handleStopPlayAudio() {
    try {
      const playerStatus = await soundRef.current.getStatusAsync();
      if (playerStatus.isLoaded === true) {
        await soundRef.current.unloadAsync();
      }
      setIsPlaying(false);
    } catch (err) { };
  };

  const onToggleExpend = useCallback((id_?: number) => {
    if (id_ === expendedList) {
      setExpendedList(undefined);
      return;
    };
    setExpendedList(id_);
  }, [expendedList]);

  const handleChangeSearchInput = useCallback((word: string) => {
    setSearchWord(word);
  }, []);

  const getTitle = useCallback(() => {
    if (!screenMode) return "Book";
    if (screenMode === "list") return rows[0]?.library_name || "List";
    if (screenMode === "favorite") return "Favorite";
    if (screenMode === "search") return "Search";

    const _unreachable: never = screenMode;
    console.warn({ _unreachable });
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
            ? rows[0]?.library_id
              ? <Navbar section={rows[0].library_id} />
              : null
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
          backgroundColor: "#fff",
          paddingTop: 229,
          paddingHorizontal: 0,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
        renderItem={(info) => (
          <ExpandableListItem
            expendedList={expendedList}
            onToggleExpend={onToggleExpend}
            list={info.item}
            handleToggleFavorite={handleToggleFavorite}

            isPlaying={isPlaying}
            startRecording={startRecording}
            stopRecording={stopRecording}
            handlePlayAudio={handlePlayAudio}
            handleStopPlayAudio={handleStopPlayAudio}
            recording={recording}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} progressViewOffset={230} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};
