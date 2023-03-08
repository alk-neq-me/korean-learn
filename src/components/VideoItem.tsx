import { Box, Image, Text, Pressable } from "native-base";
import { useCallback } from "react";
import { useStateContext } from "../context";
import { Music } from "../context/type";

type Props = {
	video: Music;
	openModal?: () => void;
}

export default function VideoItem(props: Props) {
	const { video, openModal } = props;
	const { dispatch } = useStateContext();
	
	const handleClickVideo = useCallback(() => {
		// dispatch(initSelectedVideo(video?.id_));
		if (openModal) openModal();
	}, []);

	return (
		<Pressable
			m={2}
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="flex-start"
			onPress={handleClickVideo}
		>
			<Image
				borderRadius="7"
				source={{
					uri: video.thumbnails
				}}
				alt={video.title}
				size="xl"
			/>
			<Box m={2}>
				<Text
					fontSize="md"
				>
					{video.title}
				</Text>
				<Text>{video.description}</Text>
			</Box>
		</Pressable>
	);
};
