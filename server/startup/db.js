const mongoose = require('mongoose');

module.exports = function () {
  let DB = process.env.DATABASE;

  if (!DB) console.log("No DB in .env");
  else
    mongoose.connect(DB)
    .then(() => console.log(`Connected to database`))
    .catch(err => {
      console.log(err)
    });
};