import { Divider, FlatList, Heading, HStack, IconButton, Spinner, Text, VStack } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useStateContext } from "../context";
import YoutubeIframe from "react-native-youtube-iframe";
import VideoItem from "./video-item";
import { useCallback } from "react";
import { errorMusic, pauseMusic, playMusic, readyMusic } from "../context/actions/music.actions";

type Props = {
	onClose: () => void;
}

export default function ViewVideo(props: Props) {
	const {onClose} = props;
	const {
		state: {
			musicList,
			selectedVideo,
		},
		dispatch
	} = useStateContext();
	
	const music = selectedVideo.music;
	const loading = musicList.loading;
	const error = musicList.error;
	
	const rows = [...musicList.rows].filter(list => list.id_ !== music.id_);
	
	if (!music || loading) return (
		<VStack h="full" alignItems="center" justifyContent="center">
			<Spinner size="lg" />
		</VStack>
	)
	
	const handleOnChangeStateVideo = useCallback((status: string) => {
		if (status === "playing") {
			dispatch(playMusic());
		};
		if (status === "paused") {
			dispatch(pauseMusic());
		};
		if (status === "video cued") {
			dispatch(readyMusic());
		}
	}, []);
	
	const handelOnReadyVideo = useCallback(() => {
		dispatch(readyMusic());
	}, []);
	
	const handelOnErrorVideo = useCallback((error: string) => {
		dispatch(errorMusic(error));
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
				{(selectedVideo.loading) && (
					<VStack h={200} alignItems="center" justifyContent="center" bg="gray.200" borderRadius="10px" mb={4}>
						<Spinner size="lg" />
					</VStack>
				)}
				{selectedVideo.error && (
					<VStack h={200} alignItems="center" justifyContent="center" bg="gray.200" borderRadius="10px" mb={4}>
						<Text color="red.300">{error}</Text>
					</VStack>
				)}
				<YoutubeIframe
					height={(selectedVideo.loading || error) ? 0 : 230}
					onReady={handelOnReadyVideo}
					onError={handelOnErrorVideo}
					videoId={music.videoId}
					// play={music.playing}
					onChangeState={handleOnChangeStateVideo}
					forceAndroidAutoplay
				/>
				<VStack>
					<Heading>{music.title}</Heading>
					<Text>{music.description}</Text>
				</VStack>
			</VStack>
			
			<Divider />
			
			<FlatList
				data={rows}
				renderItem={(info) => (
          <VideoItem video={info.item} />
				)}
			/>
		</VStack>
	);
};
