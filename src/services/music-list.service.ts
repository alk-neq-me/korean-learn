import { temp_backend_musics } from "../../_doc/temp";
import { Dispatch } from "../context";

export default class MusicListService {
	static async getMusicList(dispatch: Dispatch): Promise<void> {
		const musicList = temp_backend_musics;
		dispatch({ type: "SUCCESS_MUSIC_LIST", payload: musicList });
	};
};
