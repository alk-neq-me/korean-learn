import json
import scheme
from sqlite3 import Connection, Cursor, connect 


header_data: str = "./data/header.json"
library_data: str = "./data/library.json"
list_data: str = "./data/list.json"

conn: Connection = connect("test.db")
cur: Cursor = conn.cursor()


def create_header() -> None:
  cur.execute("DROP TABLE IF EXISTS header")
  conn.commit()
  cur.execute("""
              create table header(
                id integer primary key autoincrement,
                name varchar(25) unique
              );
              """)
  conn.commit()
  with open(header_data, mode='r') as fp:
    rows = json.load(fp)["rows"]
    for raw in rows:
      row: scheme.HeaderScheme = scheme.HeaderScheme(**raw)
      cur.execute("INSERT INTO header (name) VALUES (?)", (
        row.name
        ))
      conn.commit()


def create_library() -> None:
  cur.execute("DROP TABLE IF EXISTS library")
  conn.commit()
  cur.execute("""
              create table library(
                id integer primary key autoincrement,
                section varchar(25) not null,
                header_id integer,
                foreign key(header_id) references header(id)
              );
              """)
  conn.commit()
  with open(library_data, mode='r') as fp:
    rows = json.load(fp)["rows"]
    for raw in rows:
      row: scheme.LibraryScheme = scheme.LibraryScheme(**raw)
      cur.execute("INSERT INTO library (section, header_id) VALUES (?, ?)", (
        row.section, row.header_id
        ))
      conn.commit()


def create_list() -> None:
  cur.execute("DROP TABLE IF EXISTS list")
  conn.commit()
  cur.execute("""
              CREATE TABLE list (
                id integer primary key autoincrement,
                korea varchar(25) not null,
                romaji varchar(25),
                mean text not null,
                fav boolean default false,
                record string,
                library_id integer not null,
                foreign key(library_id) references library(id)
              )
              """)
  conn.commit()
  with open(list_data, mode='r') as fp:
    rows = json.load(fp)["rows"]
    for raw in rows:
      row: scheme.ListScheme = scheme.ListScheme(**raw)
      cur.execute("INSERT INTO list (korea, romaji, mean, fav, record, library_id) VALUES (?, ?, ?, ?, ?, ?)", (
        row.korea, row.romaji, row.mean, row.fav, row.record, row.library_id
        ))
      conn.commit()


create_list()
