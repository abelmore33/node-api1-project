// BUILD YOUR SERVER HERE
// import server
const express = require("express");
const User = require("./users/model");

const api = "/api/users";

// instance of express
const server = express();
// global middleware
server.use(express.json());

// endpoints

server.get(`/api/users`, async (req, res) => {
  try {
    const user = User.find();
    console.log(user);
  } catch (err) {
    res.status(500).json({ message: `Bad Request ${err.message}` });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
