export default {
  app: {
    port: process.env.SERVER_PORT,
  },
  db: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: "1d",
  },
};
