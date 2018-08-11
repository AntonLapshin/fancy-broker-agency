import randomDelay from "helpers/randomDelay";

export default randomDelay(data =>
  data.map(item => ({
    ...item,
    name: item.name.first + " " + item.name.last,
    tags: item.tags.join(","),
    friends: item.friends.map(f => f.name).join(",")
  }))
);
