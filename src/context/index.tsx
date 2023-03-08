import { createContext, useContext, useReducer } from "react";
import { Library, LibraryState, List, ListState, Music, MusicState, SettingsState } from "./type";

export type State = {
	library: LibraryState;
	list: ListState;
	selectedVideo: MusicState;
	
	settings: SettingsState;  // TODO new feature for theme & settings
};

export enum ActionTypeEnum {
	/// Library
	REQUEST_LIBRARY = "REQUEST",
	SUCCESS_LIBRARY = "SUCCESS_LIBRARY",
	FETCH_ERROR_LIBRARY = "FETCH_ERROR_LIBRARY",
	
	/// List
	REQUEST_LIST = "REQUEST_LIST",
	SUCCESS_LIST = "FETCH_LIST",
	FETCH_ERROR_LIST = "FETCH_ERROR_LIST",
	TOGGLE_FAV_LIST = "TOGGLE_FAV_LIST",
	
	/// Music
	REQUEST_SELECTED_MUSIC = "REQUEST_SELECTED_MUSIC",
	SUCCESS_SELECTED_MUSIC = "SUCCESS_SELECTED_MUSIC",
	FETCH_ERROR_SELECTED_MUSIC = "FETCH_ERROR_SELECTED_MUSIC",
	TOGGLE_SELECTED_MUSIC = "TOGGLE_SELECTED_MUSIC",
};

type Payload = 
	| string  	// error string
	| Library[] // success Library
	| List[] 		// success List
	| number 		// id_
	| Music  		// create Music

type Action = 
	| { type: ActionTypeEnum; }
	| { type: ActionTypeEnum; payload: Payload; };

export type Dispatch = (action: Action) => void;
	
type DispatchAsync = <T extends AnyFunc>(fn: T) => void;

export type ActionAsync = (dispatch: Dispatch, state?: State) => void;


type StateContextType = {
	state: State,
	dispatch: DispatchAsync,
};

type Props = {
	children: React.ReactNode;
};

type AnyFunc = (...arg: any[]) => any;

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
	selectedVideo: getBaseState<MusicState, "music">("music", undefined),
	
	settings: getBaseState<SettingsState, "setting">("setting", {
		fontSize: 12,
		isShowRomaji: true,
		nativeTextColor: "black",
		schedule: "1h",
		theme: "light"
	}),
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		/// Library
		case ActionTypeEnum.REQUEST_LIBRARY:
			return {
				...state,
				library: { ...state.library, loading: true, error: undefined }
			};
		case ActionTypeEnum.SUCCESS_LIBRARY:
			return {
				...state,
				library: { ...state.library, loading: false, rows: ("payload" in action) ? action.payload as Library[] : state.library.rows }
			};
		case ActionTypeEnum.FETCH_ERROR_LIBRARY:
			return {
				...state,
				library: { ...state.library, loading: false, error: ("payload" in action) ? action.payload as string : state.library.error }
			};
	
		/// List
		case ActionTypeEnum.REQUEST_LIST:
			return {
				...state,
				list: { ...state.list, loading: true, error: undefined }
			};
		case ActionTypeEnum.SUCCESS_LIST:
			return {
				...state,
				list: { ...state.list, loading: false, rows: ("payload" in action) ? action.payload as List[] : state.list.rows }
			};
		case ActionTypeEnum.FETCH_ERROR_LIST:
			return {
				...state,
				list: { ...state.list, loading: false, error: ("payload" in action) ? action.payload as string : state.list.error }
			};
		case ActionTypeEnum.TOGGLE_FAV_LIST:
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
	
		/// Music
		case ActionTypeEnum.REQUEST_SELECTED_MUSIC:
			return {
				...state,
				selectedVideo: {
					...state.selectedVideo,
					loading: true,
					error: undefined
				}
			};
		case ActionTypeEnum.SUCCESS_SELECTED_MUSIC:
			return {
				...state,
				selectedVideo: {
					...state.selectedVideo,
					loading: false,
					error: undefined,
					music: ("payload" in action) ? action.payload as Music : state.selectedVideo.music
				}
			};
		case ActionTypeEnum.FETCH_ERROR_SELECTED_MUSIC:
			return {
				...state,
				selectedVideo: {
					...state.selectedVideo,
					loading: false,
					error: ("payload" in action) ? action.payload as string : state.selectedVideo.error
				}
			};
		case ActionTypeEnum.TOGGLE_SELECTED_MUSIC:
			return {
				...state,
				selectedVideo: {
					...state.selectedVideo,
					loading: false,
					error: undefined,
					music: ("payload" in action)
						? { ...state.selectedVideo.music as Music, playing: !state.selectedVideo.music?.playing }
						: state.selectedVideo.music
				}
			};
	
		default:
			const _unreachable: never = action.type;
			console.error({ _unreachable });
			return state;
	};
};

const StateContext = createContext<StateContextType|undefined>(undefined);

export const StateContextProvider = (props: Props) => {
	const { children } = props;
	const [state, stateDispatch] = useReducer(reducer, initialState);
	
	const dispatch = <T extends AnyFunc>(fn: T) => {
		fn(stateDispatch, state);
	};
	
	const context = {state, dispatch};
	
	return <StateContext.Provider value={context}>
		{children}
	</StateContext.Provider>
};

export const useStateContext = () => {
	const context = useContext(StateContext);
	
	if (!context) throw new Error("Please Provide with StateContextProvider");
	
	return context;
};
