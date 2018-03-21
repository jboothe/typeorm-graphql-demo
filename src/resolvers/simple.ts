export default {
  Query: {
    beerMe: (_, { name }) => `Beer ${name || "Served"}`
  }
};
