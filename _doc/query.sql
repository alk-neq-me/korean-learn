PRAGMA foreign_keys = ON;

-- DROP
drop table if exists choose;
drop table if exists list;
drop table if exists library;
drop table if exists header;

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

create table choose(
  id integer primary key,
  library_id integer,
  list_id integer,
  word text not null,
  foreign key(library_id) references library(id),
  foreign key(list_id) references list(id)
);



-- INSERT
insert into header(name) values
 ("basic"),
 ("speaking"),
 ("grammar"),
 ("settings")
;

insert into library(header_id, section) values
  (1, "ဗျည်း"),     -- basic
  (1, "သရ" ),      -- basic
  (2, "တွေ့စုံခြင်း")   -- speaking
;

insert into list(library_id, korea, romaji, mean) values
  (1, "ㄱ (기역)", "g (gi yeok)", "ဂ (ဂီရော့)"),
  (1, "ㄴ (니은)", "n (ni eun)", "န (နီ အွန်း)"),
  
  (2, "ㅏ", "a", "အာ")
;

insert into choose(library_id, list_id, word) values
  (1, 1, "ㄴ (니은)"),
  (1, 1, "ㄷ (디귿)"),
  (1, 1, "ㅅ (시옷)"),

  (2, 3, "ㅏ"),
  (2, 3, "ㅣ"),
  (2, 3, "ㅕ")
;