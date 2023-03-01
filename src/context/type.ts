export type Library = {
	id: number;
	section: string;
	header_id: number;
}

export type List = {
  id: number;
  korea: string;
  romaji: string;
  mean: string;
  fav: boolean;
  record?: string;
	library_id?: number;
};
