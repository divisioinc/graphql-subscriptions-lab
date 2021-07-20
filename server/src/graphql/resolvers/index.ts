import { mergeResolvers } from "@graphql-tools/merge";

import User from "./User";

const resolvers = [User];

export default mergeResolvers(resolvers);
