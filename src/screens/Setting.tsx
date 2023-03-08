import { NotificationAction, NotificationContentInput } from "expo-notifications";
import { Box } from "native-base";
import { Button, View } from "react-native";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useNotification } from "../hooks/use-notification";

export default function() {
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
  
	return (
		<View>
      <Masthead
        image={require("../../assets/images/study-literature.png")}
        title="Settings"
      >
        <Navbar />
      </Masthead>
      
      <Box p={2}>
  			<Button title="setting - notification"
  				onPress={async () => {
  					await pushNoti();
  				}}
  			/>
      </Box>
		</View>
	);
};
