export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-ts-node-api',
  jwtSecret: process.env.JWT_SECRET || '$RS8k=0o',
  port: process.env.PORT || 5050
}
