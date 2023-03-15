from dataclasses import dataclass


@dataclass
class HeaderScheme:
  id: int
  name: str


@dataclass
class LibraryScheme:
  id: int
  header_id: int
  section: str


@dataclass
class ListScheme:
  korea: str
  romaji: str
  mean: str
  fav: bool
  record: str
  library_id: int


@dataclass
class SettingsScheme:
  font_size: int
  is_show_romaji: bool
  native_text_color: str
  schedule: str
  theme: str
  initial_app: bool
