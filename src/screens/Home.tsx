import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View, BackHandler, Alert, SafeAreaView, Platform, NativeModules } from 'react-native';
import { RootScreenParamList } from '..';
import { addList, allClean, fetchList, removeList, exitApp, toggleFav, useStateContext } from '../context';
import { List } from '../context/type';

type Props = {
  navigation: DrawerNavigationProp<RootScreenParamList, "Home">;
};

const Home = (props: Props) => {
  const { navigation } = props;
  const {state, dispatch} = useStateContext();
  
  useEffect(() => {
    dispatch(fetchList());
  }, []);
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure want to exit?', [
        {
          text: "Cancel",
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: "YES",
          onPress: () => dispatch(exitApp()),
        }
      ]);
      return true;
    };
    
    const backhandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    return () => backhandler.remove();
  }, []);
  
  const onChange = () => {
    const data: List = {
      id: `${Date.now()}`,
      title: `Hello, Today ${(new Date()).getDate()}`,
      fav: false,
    }
    dispatch(addList(data));
  };
  
  const handleFav = (id_: string) => () => {
    dispatch(toggleFav(id_));
  };
  
  const handleRemove = (id_: string) => () => {
    dispatch(removeList(id_));
  };
  
  const handleExit = () => {
    dispatch(exitApp());
  };
  
  const handleClear = () => {
    dispatch(allClean());
  };
  
  // const onNavigate = (to: keyof RootScreenParamList) => () => {
  //   try {
  //     navigation.navigate(to);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const onNavigate = () => {
    try {
      navigation.navigate("Detail");
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <SafeAreaView style={{
      display: "flex",
      flexDirection: "column",
      flex: 10,
      paddingTop: Platform.OS === "android" ? NativeModules.StatusBarManager.HEIGHT : 0
    }}>
      <StatusBar />
      <Button title="exit" onPress={handleExit} />
      <Button title="all clean" onPress={handleClear} />
      <FlatList
        data={state.list}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item}) => (
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 20,
          }}>
            <Text>{item.title}</Text>
            <Pressable onPress={handleFav(item.id)} style={{
              ...styles.button,
              backgroundColor: item.fav ? "lightblue" : "white"
            }}>
              <Text>Fav</Text>
            </Pressable>
            <Pressable onPress={handleRemove(item.id)} style={styles.button}>
              <Text>Remove</Text>
            </Pressable>
          </View>
        )}
      />
      
      <View>
        <Pressable onPress={onNavigate} style={styles.button}>
          <Text>Detail</Text>
        </Pressable>
        <Pressable onPress={onChange} style={styles.button}>
          <Text>Add</Text>
        </Pressable>
      </View>
      
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lightblue',
  },
});

export default Home;
