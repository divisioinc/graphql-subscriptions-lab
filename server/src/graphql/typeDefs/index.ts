import { mergeTypeDefs } from "@graphql-tools/merge";

import User from "./User";
import Post from "./Post";
import Comment from "./Comment";

export default mergeTypeDefs([User, Post, Comment]);
