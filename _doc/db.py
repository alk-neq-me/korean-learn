from sqlite3 import Connection, Cursor, connect

cnn: Connection = connect("test.db")
cur: Cursor = cnn.cursor()

with open("query.sql", mode="r") as fp:
	query = fp.read()
	cur.executescript(query)
	cnn.commit()


for row in cur.execute("""
	SELECT * FROM list 
    WHERE romaji LIKE "%" || ? || "%" OR korea LIKE "%" || ? || "%"
""", ("", "")):
	print(row)


for r in cur.execute("SELECT * FROM settings"):
    print(r)
