type User = {
  id: string;
  name: string;
  age: number;
  isAdmin: boolean;
};

const users: User[] = [
  { id: "1", name: "bob", age: 19, isAdmin: true },
  { id: "2", name: "pp", age: 18, isAdmin: true },
  { id: "3", name: "kk", age: 18, isAdmin: false }
];

const filter: Partial<User> = { id: "1", isAdmin: false };

const search = users.filter(user => {
  let isMatch = true;
  for (const key in filter) {
    if (user[key as keyof User] !== filter[key as keyof Partial<User>]) {
      isMatch = false;
      break;
    };
  };
  return isMatch;
});

console.log(search)
