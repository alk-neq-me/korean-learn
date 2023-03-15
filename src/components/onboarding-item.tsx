import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, Image } from 'native-base';
import { Item } from '../screens/Onboarding';

type Props = {
  item: Item
};

export default function OnboardingItem(props: Props) {
  const { item } = props;
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image width={300} alt="kr-app" source={item.image} style={[styles.image, { resizeMode: 'contain' }]} />

      <View style={{ flex: 0.4 }}>
        <Text fontWeight={800} fontSize={28} mb={10} px={2} textAlign="center" color="secondary.900">{item.title}</Text>
        <Text fontWeight={300} textAlign="center" px={12} color="mute">{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
})
