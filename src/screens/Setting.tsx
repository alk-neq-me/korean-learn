// import { NotificationAction, NotificationContentInput } from "expo-notifications";
import { Button, useColorModeValue, FlatList, Box, useColorMode, Switch } from "native-base";
import { Alert } from 'react-native';
import { useCallback, useRef, useState } from "react";
import { Animated } from "react-native";
import FullErrorPage from "../components/full-error";
import FullLoading from "../components/full-loading";
import Masthead from "../components/masthead";
import ModalList from "../components/modal-list";
import Navbar from "../components/navbar";
import SettingsItem from "../components/settings-item";
import { useStateContext } from "../context";
import { allClean, updateSettings } from "../context/actions/settings.actions";
import { deleteAllRecords } from "../context/actions/list.actions";

export type SettingsField = {
  id: string;
  label: string;
  event?: () => void;
  secondary_label?: string | undefined;
  right_element?: (column: SettingsField) => React.ReactNode;
};

export type ModalListState = {
  rows: Array<string>;
  isOpen: boolean;
  header: "Font_Size" | "Schedule" | "Native_Color" | "Show_Romaji";
}

export default function() {
  const { dispatch,
    state: {
      settings
    }
  } = useStateContext();
  const offset = useRef(new Animated.Value(0)).current;

  const { toggleColorMode, colorMode } = useColorMode();

  const [modalListState, setModalListState] = useState<ModalListState>({ header: "Font_Size", isOpen: false, rows: [] });

  const setting = settings.setting;
  const loading = settings.loading;
  const error = settings.error;

  const fontSizeFields: (typeof setting.font_size)[] = ["xs", "sm", "md", "lg", "xl"];
  const scheduleFields: (typeof setting.schedule)[] = ["1h", "3h", "5h", "15m", "30m", "disable"];
  const nativeColorFields: (typeof setting.native_text_color)[] = ["blue", "pink", "gray", "teal", "black", "green", "orange", "purple"];

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
      event: () => setModalListState({ header: "Font_Size", isOpen: true, rows: fontSizeFields }),
      secondary_label: setting.font_size.toString()
    },
    {
      id: "2",
      label: "Dark mode",
      secondary_label: colorMode || setting.theme,
      right_element: (column) => {
        return (
          <Switch isChecked={colorMode === "dark"} onToggle={() => {
            toggleColorMode();
            dispatch(updateSettings({ theme: column.secondary_label as "dark" | "light" }))
          }} />
        )
      }
    },
    {
      id: "3",
      label: "Schedule",
      event: () => setModalListState({ header: "Schedule", isOpen: true, rows: scheduleFields }),
      secondary_label: setting.schedule
    },
    {
      id: "4",
      label: "Native color",
      event: () => setModalListState({
        header: "Native_Color",
        isOpen: true,
        rows: nativeColorFields
      }),
      secondary_label: setting.native_text_color
    },
    {
      id: "5",
      label: "Show Romaji",
      secondary_label: setting.is_show_romaji ? "Yes" : "No",
      right_element: (_) => {
        return <Switch isChecked={setting.is_show_romaji} onToggle={() => dispatch(updateSettings({ is_show_romaji: !setting.is_show_romaji }))} />
      }
    },
    {
      id: "6",
      label: "Clear all record files",
      event: () => {
        Alert.alert(
          "Delete",
          "Clear all recorded sounds?",
          [
            {
              text: "No",
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: () => dispatch(deleteAllRecords())
            }
          ],
          {
            cancelable: true,
          }
        )
      }
    },

    {
      id: "10",
      label: "clear all data favorite list, scross etc,..",
      event: () => { },
      right_element: (_column) => {
        return <Button onPress={() => dispatch(allClean())}>Delete</Button>
      }
    },
  ];

  const handleOnCloseModalList = useCallback(() => {
    setModalListState((prev: ModalListState) => ({ ...prev, isOpen: false }));
  }, []);

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
          <SettingsItem item={info.item} />
        )}
      />
      <ModalList isOpen={modalListState.isOpen} header={modalListState.header} onClose={handleOnCloseModalList} rows={modalListState.rows} />
    </Box>
  );
};
