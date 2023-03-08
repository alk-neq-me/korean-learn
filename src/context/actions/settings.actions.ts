import { BackHandler } from "react-native";
import { cleanService } from "../../services/settings.service";

export const exitApp = () => async () => {
	BackHandler.exitApp();
};

export const allClean = () => async () => {
	cleanService();
};
