import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useCallback } from "react";
import { Linking, Share } from "react-native";
import { RootScreenParamList } from "..";

const sharedUri = "https://play.google.com/store/apps/details?id=com.marcoexexx.marco&hl=en_US&gl=US"

export default function SlideBar(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const pagesField: (keyof RootScreenParamList)[] = ["Home", "Music", "Grammar", "Quiz", "Setting"];

  const handleShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `My Korean Learning Application is nice, ${sharedUri}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else { };
      } else if (result.action === Share.dismissedAction) { };
    } catch (err) {
      console.error("Failed Share", err);
    };
  }, []);

  const handleRateMe = useCallback(() => {
    Linking.openURL(sharedUri);
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      {pagesField.map((field, index) => (
        <DrawerItem key={index} label={field} onPress={() => navigation.navigate(field)} />
      ))}
      <DrawerItem label="Share" onPress={handleShare} />
      <DrawerItem label="Rate me" onPress={handleRateMe} />
    </DrawerContentScrollView>
  )

};
