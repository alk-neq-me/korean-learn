import { Animated, SafeAreaView } from 'react-native';
import { RootScreenParamList } from '..';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useCallback, useEffect, useRef } from 'react';
import { useStateContext } from '../context';
import { Box, Text, FlatList, Pressable, ScrollView, useColorModeValue } from 'native-base';
import Masthead from '../components/masthead';
import Navbar from '../components/navbar';
import FullLoading from '../components/full-loading';
import FullErrorPage from '../components/full-error';
import { getLibraries } from '../context/actions/library.actions';
import { getListByLibraryId } from '../context/actions/list.actions';

type Props = {
  navigation: DrawerNavigationProp<RootScreenParamList, "Home">;
  // route: RouteProp<RootScreenParamList, "Home">;
};

const Home = (props: Props) => {
  const { navigation } = props;
  const {
    state: {
      library
    },
    dispatch
  } = useStateContext();
  const offset = useRef(new Animated.Value(0)).current;
  
  const rows = library.rows;
  const loading = library.loading;
  const error = library.error;
  
  useEffect(() => {
    dispatch(getLibraries({
      filter: {}
    }));
  }, []);
  
  const navigate = useCallback((id_: number) => {
    dispatch(getListByLibraryId(id_));
    navigation.navigate("List", { screenMode: "list" });
  }, []);
  
  if (loading) {
    return (
      <FullLoading />
    );
  };
  
  if (error) {
    return (
      <FullErrorPage error="404" />
    )
  }
  
  return (
		<SafeAreaView>
      <Masthead
        image={require("../../assets/images/online-exam.png")}
        title="Home"
        animatedValue={offset}
      >
        <Navbar />
      </Masthead>
      <ScrollView
        display="flex"
        bg="orange.300"
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingTop: 230,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {y: offset} } }],
          { useNativeDriver: false }
        )}
      >
        <Box
          bg={useColorModeValue("white", "gray.700")}
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
        >
          {[1, 2, 3].map((header, index) => (
            <FlatList
              key={index}
              py={4}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={rows.filter(row => row.header_id === header)}
              renderItem={(info) => (
                <Pressable onPress={() => navigate(info.item.id)}>
                  <Box
                    bg="yellow.200"
                    px="76px"
                    py="50px"
                    m={2}
                    borderRadius={20}
                    shadow={2}
                  >
                    <Text>{ info.item.section }</Text>
                  </Box>
                </Pressable>
              )}
            />
          ))}
          <Box p="100px" bg="orange.300" borderRadius={20} m={2}>Test</Box>
          <Box p="100px" bg="orange.300" borderRadius={20} m={2}>Test</Box>
          <Box p="100px" bg="orange.300" borderRadius={20} m={2}>Test</Box>
          <Box p="100px" bg="orange.300" borderRadius={20} m={2}>Test</Box>
          <Box p="100px" bg="orange.300" borderRadius={20} m={2}>Test</Box>
          <Box p="100px" bg="orange.300" borderRadius={20} m={2}>Test</Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Home;
