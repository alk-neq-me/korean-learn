import { Box, FlatList, Spinner, VStack } from "native-base";
import { useCallback } from "react";
import { Modal } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { temp_backend_musics } from "../../_doc/temp";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import VideoItem from "../components/VideoItem";
import ViewVideo from "../components/view-video";
import { useStateContext } from "../context";
import useModal from "../hooks/use-modal";

export default function() {
  const {
    state: {
      selectedVideo
    },
  } = useStateContext();
  const { state: modalState, toggleModal, closeModal } = useModal();
  
  const loading = selectedVideo.loading;
  const error = selectedVideo.error;
  
  const onRefresh = () => {
  };
  
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
    <Box w="full" h="full" position="relative">
      <Modal
        animated={true}
        animationType="slide"
        visible={modalState}
      >
        <ViewVideo onClose={closeModal} />
      </Modal>
      
      <Masthead
        image={require("../../assets/images/online-teaching.png")}
        title="Music"
      >
        <Navbar />
      </Masthead>
      
      <FlatList 
        data={temp_backend_musics}
        renderItem={(info) => (
          <VideoItem video={info.item} openModal={handleToggleModal} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </Box>
  );
};
