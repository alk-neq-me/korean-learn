import { NavigationContainer } from "@react-navigation/native";
import { StateContextProvider } from "../context";

type Props = {
	children: React.ReactNode;
};

export default function AppContainer(props: Props) {
	const { children } = props;
	
	return (
		<NavigationContainer>
			<StateContextProvider>
				{children}
			</StateContextProvider>
		</NavigationContainer>
	);
};
