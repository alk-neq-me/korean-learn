import { NotificationAction, NotificationContentInput } from "expo-notifications";
import { Box, Button, Switch, useColorMode, useColorModeValue } from "native-base";
import { useRef } from "react";
import { Animated } from "react-native";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useStateContext } from "../context";
import { allClean } from "../context/actions/settings.actions";
import useNotification from "../hooks/use-notification";

export default function() {
  const { Notifications } = useNotification();
  const {dispatch} = useStateContext();
  const offset = useRef(new Animated.Value(0)).current;
  
  const { colorMode, toggleColorMode } = useColorMode();

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
  
	return (
		<Box bg={useColorModeValue("white", "gray.700")} h="full">
      <Masthead
        animatedValue={offset}
        image={require("../../assets/images/study-literature.png")}
        title="Settings"
      >
        <Navbar />
      </Masthead>
      
      <Box pt={230} px={5}>
        <Button onPress={() => dispatch(allClean())}>All Clean</Button>
        <Switch onToggle={toggleColorMode} isChecked={colorMode === "light"} />
      </Box>
		</Box>
	);
};
