
const mongoose = require('mongoose');
// console.log("mongoose Initiated")


const connectDB = async () => {
  console.log("coneeeeeeeeeeeeeeeeeee");
  console.log(process.env.MONGO_DB_LOCAL);
  const conn = await mongoose.connect(process.env.MONGO_DB_LOCAL, {
  // const conn = await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`mongodb connected: ${conn.connection.host}`);
};
module.exports = connectDB;
