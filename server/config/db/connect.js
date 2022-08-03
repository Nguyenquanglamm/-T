const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mobai", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to  Successfully");
  } catch (error) {
    console.log("Connected to  fail");
  }
}

module.exports = { connect };