export default function createQueryFilter<T extends Object>(
	query_: string,
	filter: T,
	mode: "filter" | "search" = "filter",
	extra?: string | undefined
): [string, Array<T[Extract<keyof T, string>]>] {
	if (Object.keys(filter).length === 0) return [query_, []];
	
	let query = query_ + " WHERE";
	let values: Array<T[Extract<keyof T, string>]> = [];
	let isFirst = true;
	
	for (const key in filter) {
		if (isFirst) {
			query += ` ${key} ${ mode === "filter" ? "=" : "LIKE" } ${mode === "filter" ? "?" : "'%' || ? || '%'"}`;
			isFirst = false;
		} else {
			query += ` ${mode === "filter" ? "AND" : "OR"} ${key} ${mode === "filter" ? "=" : "LIKE"} ${mode === "filter" ? "?" : "'%' || ? || '%'"}`;
		}
		if (filter.hasOwnProperty(key)) {
			const typedKey = key as Extract<keyof T, string>;
			values.push(filter[typedKey]);
		};
	};
	
	if (extra) query += ` ${extra}`;
	
	return [query, values];
};

/** DEGUB
* type User = {id: number, name: string};
* const filter: Partial<User> = {name: "bob", id: 2};
* 
* const [query, args] = createQueryFilter("SELECT * FROM user", filter);
* const _queryArgs: Array<User[Extract<keyof User, string>]> = args; // as Array<User[Extract<keyof User, string>]>
* console.log(query, args)
*/
