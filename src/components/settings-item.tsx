import { HStack, Pressable, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import { SettingsField } from "../screens/Setting";

type Props = {
  item: SettingsField;
}

export default function SettingsItem(props: Props) {
  const { item } = props;
  const { width } = useWindowDimensions();

  return (
    <HStack w={width} borderBottomColor="mute" borderBottomWidth={.2} alignItems="center" justifyContent="space-between" p={2}>
      <Pressable w="300px" h="full" onPress={item.event && item.event}>
        <Text>{item.label}</Text>
        {item.secondary_label && <Text>{item.secondary_label}</Text>}
      </Pressable>
      {item.right_element && item.right_element(item)}
    </HStack>
  )
}
