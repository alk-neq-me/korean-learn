import { Box, Heading, Image, VStack } from "native-base";
import { Animated, ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
	children: React.ReactNode;
	title: string;
	image: ImageSourcePropType;
	animatedValue: Animated.Value;
}

export default function Masthead(props: Props) {
	const { children, image, title, animatedValue } = props;
	const insets = useSafeAreaInsets();
	
	const headerHeight = animatedValue?.interpolate({
		inputRange: [0, 200 + insets.top],
		outputRange: [200 + insets.top, insets.top + 50],
		extrapolate: 'clamp'
	});
  
	const headerOpacity = animatedValue?.interpolate({
		inputRange: [0, 120 + insets.top],
		outputRange: [1 + insets.top, 0],
		extrapolate: "clamp"
	})
	
	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				height: headerHeight,
				backgroundColor: "red",
			}}
		>
			<VStack
				h="full"
				bg="orange.300"
			>
				<Animated.View
					style={{
						opacity: headerOpacity,
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 0
					}}
				>
					<Box pl={20}>
						<Image
							w="full"
							h="200px"
							source={image}
							alt="masthead image"
						/>
					</Box>
				</Animated.View>
				{children}
				<Box flex={1} />
				<Animated.View style={{ opacity: headerOpacity }}>
					<Heading color="white" p={6} size="xl">
						{title}
					</Heading>
				</Animated.View>
			</VStack>
		</Animated.View>
	);
};
