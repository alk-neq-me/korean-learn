import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { VStack, Text, IconButton, HStack, Pressable, useToast } from "native-base";
import * as Clipboard from 'expo-clipboard';
import { useCallback } from "react";
import { ListState, UnpackType } from "../context/type";
import { Recording } from "expo-av/build/Audio";
import { useStateContext } from "../context";

type Props = {
  list: UnpackType<ListState, "rows">[0];
  handleToggleFavorite: (id_: number) => void;
  expendedList: number | undefined;
  onToggleExpend: (id_?: number) => void;

  recording: Recording | undefined;
  startRecording: (list: UnpackType<ListState, "rows">[0]) => Promise<void>;
  stopRecording: (list: UnpackType<ListState, "rows">[0]) => Promise<void>;
  isPlaying: boolean;

  handlePlayAudio: (list: UnpackType<ListState, "rows">[0]) => Promise<void>;
  handleStopPlayAudio: () => Promise<void>;
};

export default function ExpandableListItem(props: Props) {
  const { list, handleToggleFavorite, expendedList, onToggleExpend, recording, startRecording, stopRecording, isPlaying, handleStopPlayAudio, handlePlayAudio } = props;
  const { state: {
    settings: {
      setting: {
        is_show_romaji
      }
    }
  } } = useStateContext();

  const toast = useToast();

  const handleCopy = useCallback(() => {
    toast.show({
      description: `Copied ${list.korea}`
    });
    Clipboard.setStringAsync(list.korea);
  }, []);

  return (
    <VStack
      overflow="hidden"
      w="full"
      p={2}
      justifyContent="flex-start"
      alignItems="flex-start"
      borderBottomWidth={0.2}
      borderColor="gray.500"
    >
      <HStack w="full" alignItems="center" justifyContent="space-between">
        <Pressable w="90%" p={1} display="flex" justifyContent="flex-start" onPress={() => onToggleExpend(list.id)}>
          <Text fontSize="xl" color="primary.600" mb={2}>{list.korea}</Text>
        </Pressable>
        <IconButton
          borderRadius={100}
          onPress={() => handleToggleFavorite(list.id)}
          _icon={{
            as: AntDesign,
            name: list.fav ? "heart" : "hearto"
          }}
        />
      </HStack>

      <HStack w="full" display={expendedList === list.id ? "flex" : "none"} alignItems="center" justifyContent="space-between">
        <VStack space={1} alignItems="flex-start">
          <Text fontSize="sm" color="green.500"
            display={is_show_romaji ? "flex" : "none"}
          >{list.romaji}</Text>
          <Text fontSize="sm" color="black">{list.mean}</Text>
          <HStack alignItems={"center"}>
            <IconButton
              borderRadius={100}
              onPress={recording ? () => stopRecording(list) : () => startRecording(list)}
              _icon={{
                as: FontAwesome5,
                name: recording ? "stop-circle" : "microphone",
                color: "gray.600",
              }}
            />
            {list.record && <IconButton
              borderRadius={100}
              onPress={isPlaying ? handleStopPlayAudio : () => handlePlayAudio(list)}
              _icon={{
                as: FontAwesome5,
                name: isPlaying ? "pause" : "play",
                color: "gray.600",
              }}
            />}
          </HStack>
        </VStack>
        <IconButton
          borderRadius={100}
          onPress={handleCopy}
          _icon={{
            as: Feather,
            name: "copy",
            color: "gray.600",
          }}
        />
      </HStack>

    </VStack>
  );
};
