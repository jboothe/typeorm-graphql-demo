import * as path from "path";
import { mergeResolvers, fileLoader } from "merge-graphql-schemas";
import userResolver from "./user.resolvers";
import simpleResolver from "./simple.resolvers";

// const resolversArray = [userResolver, simpleResolver];

const resolversArray = fileLoader(path.join(__dirname, "./**/*.resolvers.*"));

const resolvers = mergeResolvers(resolversArray);
console.log("resolvers", resolvers);

export default resolvers;
