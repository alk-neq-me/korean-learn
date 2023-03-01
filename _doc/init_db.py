import sqlite3
from sqlite3 import Connection, Cursor

conn: Connection = sqlite3.connect("./assets/database.db")
cur: Cursor = conn.cursor()


def execut(sql: str) -> None:
    cur.execute(sql)
    conn.commit()


def dropIfExists(table: str) -> None:
    execut(f"DROP TABLE IF EXISTS {table}")


def basic() -> None:
    dropIfExists("basic_sections")
    dropIfExists("basic")

    execut("""
        CREATE TABLE basic(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section VARCHAR(25) NOT NULL
        )
    """)
    execut("""
        CREATE TABLE basic_sections(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            korea TEXT NOT NULL,
            romaji TEXT NOT NULL,
            mean TEXT NOT NULL,
            basic_id INTEGER NOT NULL,
            FOREIGN KEY(basic_id) REFERENCES basic(id)
        )
    """)

    execut("""
        INSERT INTO basic(section) VALUES
            ('ဗျည်း'),
            ('သရ'),
            ("အသက်ဗျည်း"),
            (ပေါင်းစပ်ဗျည်း'),
            ('ပေါင်းစပ်သရ')
    """)
    execut("""
        INSERT INTO basic_sections(korea, romaji, mean, basic_id) VALUES
            ("K", "g (gi-yeok)", "gg", 1),
            ("N", "n (ni-neok)", "nn", 1),
            ("Ang-Yo", "an neo", "hello", 2)
    """)
    # ရေး နည်း


def speaking() -> None:
    pass


def grammar() -> None:
    pass


# Tesk, Game


def prepare():
    execut("PRAGMA foreign_keys = ON")
    basic()


def read():
    for row in cur.execute("""
        SELECT * FROM basic_sections
        JOIN basic
        ON basic_sections.basic_id = basic.id
    """):
        print(row)
    return


if __name__ == "__main__":
    prepare()
    read()
