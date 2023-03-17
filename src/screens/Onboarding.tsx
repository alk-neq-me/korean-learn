import { FlatList } from 'native-base';
import { useRef, useState } from 'react';
import { View, StyleSheet, ImageSourcePropType, Animated, ViewToken } from 'react-native';
import NextButton from '../components/next-button';
import OnboardingItem from '../components/onboarding-item';
import Paginator from '../components/paginator';
import { useStateContext } from '../context';
import { initialApp } from '../context/actions/settings.actions';
import slides from '../utilits/slides';


export type Item = {
  id: string,
  title: string,
  description: string,
  image: ImageSourcePropType
};

export default function Onboarding() {
  const { dispatch } = useStateContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;


  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== null)
      setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const sildesRef = useRef<any>(null);

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      sildesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      dispatch(initialApp());
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={sildesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
  }
});
