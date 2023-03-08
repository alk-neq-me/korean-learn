import { VStack, Text, Button, Box, } from "native-base";
import Masthead from "./masthead";

type Props = {
	error?: string;
}

export default function FullErrorPage(props: Props) {
	const { error } = props;

	return (
		<VStack h="full">
			<Masthead
				image={require("../../assets/images/trajectory-education.png")}
				title="Error"
			>
			</Masthead>
			<VStack bg="red.50" h="560px" justifyContent="center" p={3}>
				<Box>
					<Text fontSize="xl" textAlign="center" color="red.300">{error || "Unknown Error"}</Text>
					<Button variant="ghost" mt={5}>Go Home</Button>
				</Box>
			</VStack>
		</VStack>
	);
};
