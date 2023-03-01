from sqlite3 import connect

cnn = connect("sqlite.db")
cur = cnn.cursor()

with open("query.sql", mode="r") as fp:
	query = fp.read()
	cur.executescript(query)
	cnn.commit()


for row in cur.execute("SELECT * FROM library"):
	print(row)
