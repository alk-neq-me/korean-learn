import { DrawerNavigationProp } from "@react-navigation/drawer";
import { View, Text, Button } from "react-native";
import { GrammarScreenParamList } from ".";

type Props = {
  navigation: DrawerNavigationProp<GrammarScreenParamList, "Intro">;
};

export default function(props: Props) {
  const { navigation } = props;
  
  const navigate = (path: keyof GrammarScreenParamList) => () => {
    navigation.navigate(path);
  };
  
  return (
    <View>
      <Text>Intro</Text>
      <Button title="part2" onPress={navigate("Part2")} />
    </View>
  );
};
