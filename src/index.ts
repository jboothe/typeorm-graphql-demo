import "reflect-metadata";
// import { createConnection, getConnection } from "typeorm";
import { IResolvers } from "graphql-yoga/dist/src/types";
import { GraphQLServer } from "graphql-yoga";

import * as path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
const typesArray = fileLoader(path.join(__dirname, "./typeDefs"));
const typesMerged = mergeTypes(typesArray, { all: false });
const resolversArray = fileLoader(path.join(__dirname, "./resolvers"))
const resolvers = mergeResolvers(resolversArray);

const server = new GraphQLServer({
  typeDefs: typesMerged, //  "./src/schema.graphql",
  resolvers
});

server.start(() => console.log("Server is running on localhost:4000"));


// createConnection().then(() => {
// });

// const resolvers: IResolvers = {
//   Query: {
//     beerMe: (_, { name }) => `Beer ${name || "Served"}`,
//     user: async (_, { id }) => {
//       const user = await User.findOneById(id, { relations: ["profile"] });
//       console.log("user", user);
//       return user;
//     },
//     users: () => User.find({ relations: ["profile"] })
//   },

//   Mutation: {
//     createUser: async (_, args) => {
//       console.log("args", args);
//       const profile = Profile.create({ ...args.profile });
//       await profile.save();
//       const user = User.create({
//         firstName: args.firstName,
//         lastName: args.lastName,
//         email: args.email,
//         age: args.age,
//         profileId: profile.id
//       });

//       await user.save();

//       return { ...user, profile };
//     },

//     updateUser: async (_, { id, ...args }) => {
//       try {
//         await User.updateById(id, args);
//       } catch (err) {
//         console.log(err);
//         return false;
//       }
//       return true;
//     },

//     deleteUser: async (_, { id }) => {
//       try {
//         await User.removeById(id);
//       } catch (err) {
//         console.log(err);
//         return false;
//       }
//       return true;
//     },

//     /**
//      * This shows off TypeORM's Query Builder
//      */
//     deleteUserConditionally: async (_, { id }) => {
//       try {
//         const deleteQuery = getConnection()
//           .createQueryBuilder()
//           .delete()
//           .from(User)
//           .where("id= :id", { id });

//         if (id === 5) {
//           deleteQuery.andWhere("email = :email", { email: "bob@bob.com" });
//         }
//         await deleteQuery.execute();
//       } catch (err) {
//         console.log(err);
//         return false;
//       }
//       return true;
//     }
//   }
// };

// Below is basic usage of TypeORM out of the box
// We're using TypeORM with GraphQL instead

// createConnection().then(async connection => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);
//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);
//     console.log("Here you can setup and run express/koa/any other framework.");
// }).catch(error => console.log(error));
