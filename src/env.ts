export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  app: {
    name: process.env.APP_NAME || '',
    port: process.env.PORT || 3000,
  },
  mongo: {
    ip: process.env.Mongo_Ip,
    user: process.env.Mongo_User,
    password: process.env.Mongo_Password,
    db: process.env.Mongo_Db,
  },
};
