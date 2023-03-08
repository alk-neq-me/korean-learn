import { Box, Heading, Image, VStack } from "native-base";
import { ImageSourcePropType } from "react-native";

type Props = {
	children: React.ReactNode;
	title: string;
	image: ImageSourcePropType;
}

export default function Masthead(props: Props) {
	const { children, image, title } = props;
	
	return (
		<VStack h="200px" bg="orange.300"
			borderBottomRightRadius={20}
			borderBottomLeftRadius={20}
		>
			<Box
				position="absolute"
				left={0}
				right={0}
				pl={20}
				bottom={0}
			>
				<Image
					w="full"
					h="200px"
					source={image}
					alt="masthead image"
				/>
			</Box>
			{children}
			<Box flex={1} />
			<Heading color="white" p={6} size="xl">
				{title}
			</Heading>
		</VStack>
	);
};
