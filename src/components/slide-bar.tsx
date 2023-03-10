import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { RootScreenParamList } from "..";

export default function SlideBar(props: DrawerContentComponentProps) {
	const { navigation } = props;
	const pagesField: (keyof RootScreenParamList)[] = ["Home", "Music", "Grammar", "Setting"];
	
	return (
		<DrawerContentScrollView {...props}>
			{pagesField.map((field, index) => (
				<DrawerItem key={index} label={field} onPress={() => navigation.navigate(field)} />
			))}
		</DrawerContentScrollView>
	)
	
};
