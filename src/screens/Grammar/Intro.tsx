import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Button, VStack } from "native-base";
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
    <VStack p={2}>
      <Button onPress={navigate("Part2")}>Part 2</Button>
    </VStack>
  );
};
