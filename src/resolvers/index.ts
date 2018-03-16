import { mergeResolvers } from "merge-graphql-schemas";
import userResolver from "./user.resolvers";
import simpleResolver from "./simple.resolvers";

const resolversArray = [userResolver, simpleResolver];

const resolvers = mergeResolvers(resolversArray);
// console.log("resolvers", resolvers);

export default resolvers;
