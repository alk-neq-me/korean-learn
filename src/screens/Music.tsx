import { Box, FlatList, Spinner, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { temp_backend_musics } from "../../_doc/temp";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import VideoItem from "../components/VideoItem";
import ViewVideo from "../components/view-video";
import useModal from "../hooks/use-modal";

export default function() {
  const [refreshing, setRefreshing] = useState(true);
  const { state: modalState, toggleModal, closeModal } = useModal();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  
  const load = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };
  
  const handleToggleModal = useCallback(() => toggleModal(), []);
  
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
      
      {refreshing 
        ? (   
        <VStack alignItems="center" justifyContent="center" h="590px" m={2}>
          <Spinner size="lg" />
        </VStack>
        )
        : (
        <FlatList 
          data={temp_backend_musics}
          renderItem={(info) => (
            <VideoItem video={info.item} openModal={handleToggleModal} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={load} />
          }
        />
        )
      }
    </Box>
  );
};
/*
    <Box p={2} w="full" h="full">
    </Box>
*/
