import { FlatList } from "native-base";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Modal, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import VideoItem from "../components/video-item";
import ViewVideo from "../components/view-video";
import { useStateContext } from "../context";
import { getMusicList } from "../context/actions/music-list.actions";
import useModal from "../hooks/use-modal";

export default function() {
  const {
    state: {
      musicList
    },
    dispatch
  } = useStateContext();
  const { state: modalState, toggleModal, closeModal } = useModal();
  const offset = useRef(new Animated.Value(0)).current;
  
  const rows = musicList.rows;
  const loading = musicList.loading;
  const error = musicList.error;
  
  useEffect(() => {
    dispatch(getMusicList());
  }, []);
  
  const onRefresh = useCallback(() => {
    dispatch(getMusicList());
  }, []);
  
  const handleToggleModal = useCallback(() => toggleModal(), []);
  
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
  
  return (
		<SafeAreaView style={{flex:1}}>
      <Modal
        animated={true}
        animationType="slide"
        visible={modalState}
        onRequestClose={closeModal}
      >
        <ViewVideo onClose={closeModal} />
      </Modal>
      
      <Masthead
        animatedValue={offset}
        image={require("../../assets/images/online-teaching.png")}
        title="Music"
      >
        <Navbar />
      </Masthead>
      
      <FlatList 
        data={rows}
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingTop: 200,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {y: offset} } }],
          { useNativeDriver: false }
        )}
        renderItem={(info) => (
          <VideoItem video={info.item} openModal={handleToggleModal} />
        )}
        refreshControl={<RefreshControl refreshing={loading} progressViewOffset={200} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};
