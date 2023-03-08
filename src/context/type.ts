export type Library = {
	id: number;
	section: string;
	header_id: number;
};

export type List = {
  id: number;
  korea: string;
  romaji: string;
  mean: string;
  fav: boolean;
  record?: string;
	library_id?: number;
	library_name?: string;
};

export type Music = {
	id_?: string;
	title: string;
	description?: string;
	videoId: string;
	thumbnails?: string;	
	playing: boolean;
	video_loading: boolean;
};

export type Settings = {
	theme: 
		| "light"
		| "dark";
	schedule: 
		| "disable"
		| "15m"
		| "30m"
		| "1h"
		| "3h"
		| "5h";
	nativeTextColor: 
		| "black"
		| "blue"
		| "green"
		| "orange"
		| "pink"
		| "purple"
		| "gray"
		| "teal";
	fontSize: number;  // 14px to 23px
	isShowRomaji: boolean;
};

/// ---------  Application State  ---------

export type BaseType = {
	loading: boolean;
	error?: string;
};

export type ListState = BaseType & { rows: Array<List> };

export type LibraryState = BaseType & { rows: Array<Library> };

export type MusicState = BaseType & { music?: Music };

export type SettingsState = BaseType & { setting: Settings };
