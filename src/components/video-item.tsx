import { Image, Text, Pressable, VStack } from "native-base";
import { useCallback } from "react";
import { useStateContext } from "../context";
import { initMusic } from "../context/actions/music.actions";
import { MusicState, UnpackType } from "../context/type";

type Props = {
	video: UnpackType<MusicState, "music">;
	openModal?: () => void;
}

export default function VideoItem(props: Props) {
	const { video, openModal } = props;
	const {
		dispatch
	} = useStateContext();
	
	const handleClickVideo = useCallback(() => {
		dispatch(initMusic(video));
		if (openModal) openModal();
	}, [openModal, video]);
	
	return (
		<Pressable
			m={2}
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="flex-start"
			onPress={handleClickVideo}
		>
			<VStack
				width={150}
				height={24}
				justifyContent="center"
			>
				<Image
					borderRadius="7"
					source={{
						uri: video.thumbnails
					}}
					alt={video.title.slice(0,10) + "..."}
					size="xl"
					width="full"
					height="full"
				/>
			</VStack>
			<VStack alignItems="flex-start" m={2} maxW="200px">
				<Text fontSize="md">
					{video.title}
				</Text>
				<Text fontSize="xs" color="gray.500">Description: {video.description}</Text>
			</VStack>
		</Pressable>
	);
};
