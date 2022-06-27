// const mongoURI = require("./keys").mongoURI
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log('calling')

    // mongodb+srv://usamaVaival:<password>@cluster0.saaqadd.mongodb.net/?retryWrites=true&w=majority


    const url = `
    mongodb://localhost:27017`

    let conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected....");
  } catch (err) {
    console.error('err',err.message); 
    process.exit(1);
  }
};
mongoose.Promise = global.Promise;
module.exports = { connectDB };
   