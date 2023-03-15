PRAGMA foreign_keys = ON;

-- DROP
drop table if exists list;
drop table if exists library;
drop table if exists header;
drop table if exists settings;

-- CREATE
create table header(
  id integer primary key autoincrement,
  name varchar(25) unique
);

create table library(
  id integer primary key autoincrement,
  section varchar(25) not null,
  header_id integer,
  foreign key(header_id) references header(id)
);

create table list(
  id integer primary key autoincrement,
  korea varchar(25) not null,
  romaji varchar(25),
  mean text not null,
  fav boolean default false,
  record string,
  library_id integer not null,
  foreign key(library_id) references library(id)
);

create table settings(
  id integer primary key autoincrement,
  font_size integer not null,
  is_show_romaji boolean not null,
  native_text_color varchar(25) not null,
  schedule varchar(25) not null,
  theme varchar(25) not null,
  initial_app boolean not null
);

-- INSERT
insert into header(name) values
 ("basic"),
 ("speaking"),
 ("grammar")
;

insert into library(header_id, section) values
  (1, "ဗျည်း"),     -- basic
  (1, "သရ" ),      -- basic

  (2, "တွေ့စုံခြင်း"),   -- speaking

  (3, "introduction")  -- 3 grammar
;

insert into list(library_id, korea, romaji, mean) values
  (1, "ㄱ (기역)", "g (gi yeok)", "ဂ (ဂီရော့)"),     -- 1 ဗျည်း
  (1, "ㄴ (니은)", "n (ni eun)", "န (နီ အွန်း)"),    -- 1 ဗျည်း
  
  -- TODO - change library id 
  (2, "ㅏ", "a", "အာ"),     -- 2 - သရ  

  -- TODO - change library id 
  (3, "안녕하세요", "annyeonghaseyo", "မဂ်လာပါ")  -- 3 - တွေ့စုံခြင်း
;


insert into settings(font_size, is_show_romaji, native_text_color, schedule, theme, initial_app) values
  (12, false, "blue", "1h", "light", true);

