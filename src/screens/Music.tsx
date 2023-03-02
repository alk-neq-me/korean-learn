import { NotificationAction } from "expo-notifications";
import { Box, Button } from "native-base";
import { useRef } from "react";
import YoutubeIframe, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { useNotification } from "../hooks/use-notification";

export default function() {
  const videoRef = useRef<YoutubeIframeRef|null>(null);
  const { Notifications } = useNotification();
  
  const pushNoti = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }
      }
    });
    
    const actions: NotificationAction[] = [
      { 
        buttonTitle: "",
        identifier: "play",
        options: {
          opensAppToForeground: false
        }
      },
      { 
        buttonTitle: "Pause",
        identifier: "pause",
        options: {
          opensAppToForeground: false
        }
      },
      { 
        buttonTitle: "Stop",
        identifier: "stop",
        options: {
          opensAppToForeground: false
        }
      },
    ];
    
    Notifications.setNotificationCategoryAsync("playback", actions);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Now playing",
        body: "Olivia Rodrigo",
        sound: true,
        sticky: false,
        categoryIdentifier: "playback",
      },
      trigger: null
    });
  };
  
  return (
    <Box p={2} w="full" h="full">
      <YoutubeIframe
        ref={videoRef}
        height={300}
        videoId="ZmDBbnmKpqQ"
      />
      <Button onPress={pushNoti}>Play</Button>
    </Box>
  );
};
