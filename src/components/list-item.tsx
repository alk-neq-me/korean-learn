import { Pressable, Text, Box } from "native-base";

type Props = {
	label: string;
	secondaryLabel?: string;
	rightElement?: () => React.ReactElement;
	leftElement?: () => React.ReactElement;
};

export default function ListItem(props: Props) {
	const { label, secondaryLabel, rightElement, leftElement } = props;
	
	return (
		<Pressable
			p={2}
			bg="blue.200"
			m={1}
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			borderRadius={5}
		>
			{leftElement && leftElement()}
			<Box>
				<Text>{label}</Text>
				<Text>{secondaryLabel}</Text>
			</Box>
			{rightElement && rightElement()}
		</Pressable>
	);
};
