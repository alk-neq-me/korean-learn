import { Pressable, Text } from "native-base";

type Props = {
	label: string;
	secondaryLabel?: string;
	onPress: () => void;
	leftIcon?: React.ReactElement;
	rightIcon?: React.ReactElement;
};

export default function ListItem(props: Props) {
	const { label, secondaryLabel, onPress, leftIcon, rightIcon } = props;
	
	return (
		<Pressable
			w="full"
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			onPress={onPress}
		>
			{ leftIcon && leftIcon }
			{ <Text>{label}</Text> }
			{ secondaryLabel && <Text>{secondaryLabel}</Text> } 
			{ rightIcon && rightIcon }
		</Pressable>
	);
};
