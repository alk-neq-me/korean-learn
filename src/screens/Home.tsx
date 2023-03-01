import { SafeAreaView, Platform, NativeModules } from 'react-native';
import { RootScreenParamList } from '..';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useCallback, useEffect } from 'react';
import { useStateContext } from '../context';
import { allClean, fetchLibrary, fetchList } from '../context/actions';
import { Box, StatusBar, Text, Button, FlatList, Pressable } from 'native-base';

type Props = {
  navigation: DrawerNavigationProp<RootScreenParamList, "Home">;
  // route: RouteProp<RootScreenParamList, "Home">;
};

const Home = (props: Props) => {
  const { navigation } = props;
  const {state, dispatch} = useStateContext();
  
  useEffect(() => {
    dispatch(fetchLibrary());
  }, []);
  
  const navigate = useCallback((id_: number) => {
    dispatch(fetchList(id_));
    navigation.navigate("List");
  }, []);
  
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? NativeModules.StatusBarManager.HEIGHT : 0
    }}>
      <StatusBar />
      <FlatList
        horizontal
        data={state.library}
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
      <Button onPress={() => dispatch(allClean())}>Clean</Button>
    </SafeAreaView>
  )
};

export default Home;
