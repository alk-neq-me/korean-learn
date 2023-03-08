import { Button, Divider, FlatList, Heading, HStack, IconButton, Spinner, Text, VStack } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { temp_backend_musics } from "../../_doc/temp";
import { useStateContext } from "../context";
import YoutubeIframe from "react-native-youtube-iframe";
import VideoItem from "./VideoItem";
import { useCallback, useRef } from "react";
import { useNotification } from "../hooks/use-notification";
import { NotificationAction } from "expo-notifications";
import { readyMusic } from "../context/actions/music.actions";

type Props = {
	onClose: () => void;
}

export default function ViewVideo(props: Props) {
	const {onClose} = props;
	const {
		state: {
			selectedVideo
		},
		dispatch
	} = useStateContext();
	
	const music = selectedVideo.music;
	const loading = selectedVideo.loading;
	const error = selectedVideo.error;
	
	const { Notifications } = useNotification();
	const notiRef = useRef<string>("");
	
  const pushNoti = async () => {		
		Notifications.dismissNotificationAsync(notiRef.current);
		
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
        buttonTitle: "Pause",
        identifier: "playPauseVideo",
        options: {
          opensAppToForeground: false
        }
      }
    ];
    
    Notifications.setNotificationCategoryAsync("playback", actions);
    
    notiRef.current = await Notifications.scheduleNotificationAsync({
      content: {
        title: music?.title,
        body: music?.description,
        sound: true,
        sticky: false,
        categoryIdentifier: "playback",
      },
      trigger: null
    });
  };
  
	
	if (!music || loading) return (
		<VStack h="full" alignItems="center" justifyContent="center">
			<Spinner size="lg" />
		</VStack>
	)
	
	const rows = [...temp_backend_musics].sort((a,b) => {
		if (a.id_ === music?.id_) return -1;
		if (b.id_ === music?.id_) return 1;
		return 1;
	});
	
	const handleOnChangeStateVideo = useCallback((status: string) => {
		console.log(status)
		if (status === "playing") {
			// dispatch(fetchMusicChange({ ...music, loading: false, error: undefined, playing: true }));
			pushNoti();
		};
		if (status === "paused") {
			// dispatch(fetchMusicChange({ ...music, loading: false, error: undefined, playing: false }));
		};
	}, []);
	
	const handelOnReadyVideo = useCallback(() => {
		dispatch(readyMusic());
	}, []);
	
	const handelOnErrorVideo = useCallback((error: string) => {
		// dispatch(fetchMusicChange({ ...music, loading: false, error }));
	}, []);
	
	return (
		<VStack
			p={2}
			space={2}
			h="full"
		>
			<HStack
				alignItems="center"
				justifyContent="flex-end"
			>
				<IconButton
					variant="ghost"
					_icon={{
						as: AntDesign,
						name: "close"
					}}
					onPress={onClose}
				/>
			</HStack>
			
			<VStack position="relative">
				{music.video_loading && (
					<VStack h={200} alignItems="center" justifyContent="center" bg="gray.200" borderRadius="10px" mb={4}>
						<Spinner size="lg" />
					</VStack>
				)}
				{error && (
					<VStack h={200} alignItems="center" justifyContent="center" bg="gray.200" borderRadius="10px" mb={4}>
						<Text color="red.300">{error}</Text>
					</VStack>
				)}
				<YoutubeIframe
					height={(music.video_loading || error) ? 0 : 230}
					onReady={handelOnReadyVideo}
					onError={handelOnErrorVideo}
					videoId={music.videoId}
					play={music.playing}
					onChangeState={handleOnChangeStateVideo}
				/>
				<VStack>
					<Heading>{music.title}</Heading>
					<Text>{music.description}</Text>
					<Button
						// onPress={() => dispatch(fetchMusicChange({ ...selectedVideo, playing: !selectedVideo.playing }))}
					>{music.playing ? "Pause" : "Play"}</Button>
				</VStack>
			</VStack>
			
			<Divider />
			
			<FlatList
				data={rows.slice(1)}
				renderItem={(info) => (
          <VideoItem video={info.item} />
				)}
			/>
		</VStack>
	);
};
