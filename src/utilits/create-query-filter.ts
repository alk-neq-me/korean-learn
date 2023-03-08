export default function createQueryFilter<T extends Object>(query_: string, filter: T): [string, Array<T[Extract<keyof T, string>]>] {
	if (Object.keys(filter).length === 0) return [query_, []];
	
	let query = query_ + " WHERE";
	let values: Array<T[Extract<keyof T, string>]> = [];
	let isFirst = true;
	
	for (const key in filter) {
		if (isFirst) {
			query += ` ${key} = ?`;
			isFirst = false;
		} else {
			query += ` AND ${key} = ?`;
		}
		if (filter.hasOwnProperty(key)) {
			const typedKey = key as Extract<keyof T, string>;
			values.push(filter[typedKey]);
		};
	};
	
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
