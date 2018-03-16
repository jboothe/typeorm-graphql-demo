import { getConnection } from "typeorm";
import { Profile } from "./../entity/Profile";
import { User } from "./../entity/User";

export default {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findOneById(id, { relations: ["profile"] });
      console.log("user", user);
      return user;
    },
    users: () => User.find({ relations: ["profile"] })
  },

  Mutation: {
    createUser: async (_, args) => {
      console.log("args", args);
      const profile = Profile.create({ ...args.profile });
      await profile.save();
      const user = User.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        age: args.age,
        profileId: profile.id
      });

      await user.save();

      return { ...user, profile };
    },

    updateUser: async (_, { id, ...args }) => {
      try {
        await User.updateById(id, args);
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    deleteUser: async (_, { id }) => {
      try {
        await User.removeById(id);
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    /**
       * This shows off TypeORM's Query Builder
       */
    deleteUserConditionally: async (_, { id }) => {
      try {
        const deleteQuery = getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id= :id", { id });

        if (id === 5) {
          deleteQuery.andWhere("email = :email", { email: "bob@bob.com" });
        }
        await deleteQuery.execute();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    }
  }
};
