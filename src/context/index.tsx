import { createContext, useContext, useReducer } from "react";
import { LibraryState, ListState, MusicListState, MusicState, SettingsState, UnpackType } from "./type";

export type State = {
  library: LibraryState;
  list: ListState;
  musicList: MusicListState;
  selectedVideo: MusicState;

  settings: SettingsState;  // TODO new feature for theme & settings
};

export type ActionTypeEnum =
  /// Library
  | "REQUEST_LIBRARY"
  | "SUCCESS_LIBRARY"
  | "FETCH_ERROR_LIBRARY"

  /// List
  | "REQUEST_LIST"
  | "SUCCESS_LIST"
  | "FETCH_ERROR_LIST"
  | "TOGGLE_FAV_LIST"
  | "SET_AUDIO_LIST"
  | "CLEAR_ALL_RECORDS_LIST"

  /// Music List
  | "REQUEST_MUSIC_LIST"
  | "SUCCESS_MUSIC_LIST"
  | "FETCH_ERROR_MUSIC_LIST"

  /// Music
  | "REQUEST_SELECTED_MUSIC"
  | "SUCCESS_SELECTED_MUSIC"
  | "FETCH_ERROR_SELECTED_MUSIC"
  | "TOGGLE_PLAY_MUSIC"
  | "PLAY_SELECTED_MUSIC"
  | "PAUSE_SELECTED_MUSIC"
  | "READY_SELECTED_MUSIC"
  | "LOAD_ERROR_SELECTED_MUSIC"

  /// Settings
  | "REQUEST_SETTINGS"
  | "SUCCESS_SETTINGS"
  | "UPDATE_SETTINGS"
  | "INITIAL_APP_SETTINGS"
  | "UNINITIAL_APP_SETTINGS"
  | "FETCH_ERROR_SETTINGS"
  ;

type Payload =
  | string  	// error string
  | UnpackType<LibraryState, "rows"> // success Library
  | UnpackType<ListState, "rows"> 		// success List
  | UnpackType<ListState, "rows">[0] 		// update record List
  | UnpackType<MusicListState, "rows"> 		// success Music List
  | UnpackType<SettingsState, "setting"> 		// success Settings List
  | Partial<UnpackType<SettingsState, "setting">> 		// update Settings List
  | number 		// id_
  | UnpackType<MusicState, "music">  		// create Music
  | string		// error fetch for selected music

type Action =
  | { type: ActionTypeEnum; }
  | { type: ActionTypeEnum; payload: Payload; };

export type Dispatch = (action: Action) => void;

export type AnyFunc = (...arg: any[]) => any;

type DispatchAsync = <T extends AnyFunc>(fn: T) => void;

export type ActionAsync = (dispatch: Dispatch, state?: State) => void;


type StateContextType = {
  state: State,
  dispatch: DispatchAsync,
};

type Props = {
  children: React.ReactNode;
};

function getBaseState<T, K extends keyof T>(key: K, value: T[K]): T {
  return {
    loading: false,
    error: undefined,
    [key]: value
  } as T;
};

const initialState: State = {
  library: getBaseState<LibraryState, "rows">("rows", []),
  list: getBaseState<ListState, "rows">("rows", []),
  musicList: getBaseState<MusicListState, "rows">("rows", []),

  selectedVideo: getBaseState<MusicState, "music">("music", {
    playing: false,
    videoId: "",
    title: "",
  }),

  settings: getBaseState<SettingsState, "setting">("setting", {
    font_size: "md",
    is_show_romaji: false,
    native_text_color: "black",
    schedule: "1h",
    theme: "light",
    initial_app: false
  }),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    /// Library
    case "REQUEST_LIBRARY":
      return {
        ...state,
        library: { ...state.library, loading: true, error: undefined }
      };
    case "SUCCESS_LIBRARY":
      return {
        ...state,
        library: { ...state.library, loading: false, rows: ("payload" in action) ? action.payload as UnpackType<LibraryState, "rows"> : state.library.rows }
      };
    case "FETCH_ERROR_LIBRARY":
      return {
        ...state,
        library: { ...state.library, loading: false, error: ("payload" in action) ? action.payload as string : state.library.error }
      };

    /// List
    case "REQUEST_LIST":
      return {
        ...state,
        list: { ...state.list, loading: true, error: undefined }
      };
    case "SUCCESS_LIST":
      return {
        ...state,
        list: { ...state.list, loading: false, rows: ("payload" in action) ? action.payload as UnpackType<ListState, "rows"> : state.list.rows }
      };
    case "FETCH_ERROR_LIST":
      return {
        ...state,
        list: { ...state.list, loading: false, error: ("payload" in action) ? action.payload as string : state.list.error }
      };
    case "TOGGLE_FAV_LIST":
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          rows: ("payload" in action)
            ? state.list.rows.map(list => list.id === action.payload as number ? { ...list, fav: !list.fav } : list)
            : state.list.rows
        }
      };
    case "SET_AUDIO_LIST":
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          rows: ("payload" in action)
            ? state.list.rows.map(list => list.id === (action.payload as UnpackType<ListState, "rows">[0]).id ? ({ ...list, record: (action.payload as UnpackType<ListState, "rows">[0]).record }) : list)
            : state.list.rows
        }
      };
    case "CLEAR_ALL_RECORDS_LIST":
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: undefined,
          rows: state.list.rows.map(row => ({
            ...row,
            record: undefined
          }))
        }
      }

    /// Music List
    case "REQUEST_MUSIC_LIST":
      return {
        ...state,
        musicList: { ...state.musicList, loading: true, error: undefined }
      };
    case "SUCCESS_MUSIC_LIST":
      return {
        ...state,
        musicList: { ...state.musicList, loading: false, rows: ("payload" in action) ? action.payload as UnpackType<MusicListState, "rows"> : state.musicList.rows }
      };
    case "FETCH_ERROR_MUSIC_LIST":
      return {
        ...state,
        musicList: { ...state.musicList, loading: false, error: ("payload" in action) ? action.payload as string : state.library.error }
      };

    /// Music
    case "REQUEST_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: true,
          error: undefined
        }
      };
    case "SUCCESS_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: true,
          error: undefined,
          music: ("payload" in action) ? action.payload as UnpackType<MusicState, "music"> : state.selectedVideo.music
        }
      };
    case "FETCH_ERROR_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: false,
          error: ("payload" in action) ? action.payload as string : state.selectedVideo.error
        }
      };
    case "TOGGLE_PLAY_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: false,
          error: undefined,
          music: { ...state.selectedVideo.music as UnpackType<MusicState, "music">, playing: !state.selectedVideo.music?.playing }
        }
      };
    case "PLAY_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: false,
          error: undefined,
          music: { ...state.selectedVideo.music as UnpackType<MusicState, "music">, playing: true }
        }
      };
    case "PAUSE_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: false,
          error: undefined,
          music: { ...state.selectedVideo.music as UnpackType<MusicState, "music">, playing: false }
        }
      };
    case "READY_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: false,
        }
      };
    case "LOAD_ERROR_SELECTED_MUSIC":
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          loading: false,
          error: ("payload" in action) ? action.payload as string : undefined,
        }
      };


    /// Settings
    case "REQUEST_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: true,
          error: undefined
        }
      };
    case "SUCCESS_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          error: undefined,
          setting: ("payload" in action) ? { ...state.settings.setting, ...action.payload as UnpackType<SettingsState, "setting"> } : state.settings.setting
        }
      };
    case "INITIAL_APP_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          error: undefined,
          setting: {
            ...state.settings.setting,
            initial_app: false
          }
        }
      };
    case "UNINITIAL_APP_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          error: undefined,
          setting: {
            ...state.settings.setting,
            initial_app: true
          }
        }
      };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          error: undefined,
          setting: ("payload" in action) ? { ...state.settings.setting, ...action.payload as Partial<UnpackType<SettingsState, "setting">> } : state.settings.setting
        }
      };
    case "FETCH_ERROR_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          error: ("payload" in action) ? action.payload as string : undefined
        }
      };

    default:
      const _unreachable: never = action.type;
      console.error({ _unreachable });
      return state;
  };
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = (props: Props) => {
  const { children } = props;
  const [state, stateDispatch] = useReducer(reducer, initialState);

  const dispatch = <T extends AnyFunc>(fn: T) => {
    fn(stateDispatch, state);
  };

  const context = { state, dispatch };

  return <StateContext.Provider value={context}>
    {children}
  </StateContext.Provider>
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) throw new Error("Please Provide with StateContextProvider");

  return context;
};
