import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { StateContextProvider } from "../context";
import theme from "../theme";

type Props = {
	children: React.ReactNode;
};

export default function AppContainer(props: Props) {
	const { children } = props;
	
	return (
		<NavigationContainer>
			<StateContextProvider>
				<NativeBaseProvider theme={theme}>
					{children}
				</NativeBaseProvider>
			</StateContextProvider>
		</NavigationContainer>
	);
};
