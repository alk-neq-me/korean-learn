import { SafeAreaView } from 'react-native';
import { RootScreenParamList } from '..';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useCallback, useEffect } from 'react';
import { useStateContext } from '../context';
import { Box, StatusBar, Text, Button, FlatList, Pressable, ScrollView } from 'native-base';
import Masthead from '../components/masthead';
import Navbar from '../components/navbar';
import FullLoading from '../components/full-loading';
import FullErrorPage from '../components/full-error';
import { getLibraries } from '../context/actions/library.actions';
import { allClean } from '../context/actions/settings.actions';
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
    navigation.navigate("List");
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
      <StatusBar />
      <Masthead
        image={require("../../assets/images/online-exam.png")}
        title="Home"
      >
        <Navbar />
      </Masthead>
      <ScrollView h="xl">
        {[1, 2, 3].map((header, index) => (
          <FlatList
            key={index}
            py={4}
            borderBottomWidth={2} borderBottomColor="gray.300"
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
        <Button onPress={() => dispatch(allClean())}>Clean</Button>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Home;
