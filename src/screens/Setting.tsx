// import { NotificationAction, NotificationContentInput } from "expo-notifications";
import { Button, useColorMode, useColorModeValue, FlatList, HStack, Box, Text, VStack } from "native-base";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { useRef } from "react";
import { Animated, useWindowDimensions } from "react-native";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useStateContext } from "../context";
import { allClean, unInitialApp } from "../context/actions/settings.actions";
// import { allClean } from "../context/actions/settings.actions";
// import useNotification from "../hooks/use-notification";

export type SettingsField = {
  id: string;
  label: string;
  secondary_label?: string | undefined;
  right_element?: (column: SettingsField) => React.ReactNode;
};

export default function() {
  const { dispatch,
    state: {
      settings
    }
  } = useStateContext();
  const offset = useRef(new Animated.Value(0)).current;
  const { colorMode, toggleColorMode } = useColorMode();

  const setting = settings.setting;
  const loading = settings.loading;
  const error = settings.error;


  if (loading) {
    return (
      <FullLoading />
    );
  };

  if (error) {
    return (
      <FullErrorPage error={error} />
    );
  }

  /*
  const { Notifications } = useNotification();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    }),
  });

  
  const actions: NotificationAction[] = [
    {
      buttonTitle: "some",
      identifier: "some-action",
      textInput: {
        submitButtonTitle: "submit",
        placeholder: "Placeholder"
      }
    }
  ];
  
  Notifications.setNotificationCategoryAsync("music-player", actions);

  const notiContent: NotificationContentInput = {
    title: "with action",
    body: "for music",
    categoryIdentifier: "music-player",
    sound: "default"
  };
  
  const pushNoti = async () => {
    await Notifications.scheduleNotificationAsync({
      content: notiContent,
      trigger: {
        seconds: 2,
      },
    });
  };
  */

  const fields: SettingsField[] = [
    {
      id: "1",
      label: "Font Size",
      secondary_label: setting.font_size.toString(),
      right_element: (column) => {
        return (
          <Button>{column.id}</Button>
        );
      }
    },

    {
      id: "10",
      label: "clear all data favorite list, scross etc,..",
      right_element: (_column) => {
        return <Button onPress={() => dispatch(allClean())}>Delete</Button>
      }
    }
  ];

  const { width } = useWindowDimensions()

  return (
    <Box bg={useColorModeValue("white", "gray.700")} h="full">
      <Masthead
        animatedValue={offset}
        image={require("../../assets/images/study-literature.png")}
        title="Settings"
      >
        <Navbar />
      </Masthead>

      <FlatList
        data={fields}
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingTop: 230,

        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        renderItem={(info) => (
          <HStack w={width} p={2} borderBottomWidth={1} borderColor="gray.200" alignItems="center" justifyContent="space-between">
            <VStack>
              <Text>{info.item.label}</Text>
              {info.item.secondary_label && <Text>{info.item.secondary_label}</Text>}
            </VStack>
            {info.item.right_element && info.item.right_element(info.item)}
          </HStack>
        )}
      />
    </Box>
  );
};
