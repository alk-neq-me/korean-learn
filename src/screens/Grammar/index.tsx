import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { Text } from 'react-native';
import Intro from "./Intro";

export type GrammarScreenParamList = {
  Intro: undefined;
  Part2: undefined;
};

const Part2 = () => (<Text>Part2</Text>);

export default function() {
  const Stack = createStackNavigator();
  
  return (
    <Stack.Navigator
			initialRouteName="Intro"
			screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#fdba74",
        },
        headerTintColor: '#fff',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Part2" component={Part2} />
    </Stack.Navigator>
  );
};
