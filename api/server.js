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
    const user = await User.find();
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    res.status(500).json({ message: `Error Finding Users` });
  }
});

server.get(`/api/users/:id`, async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "User not found" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
