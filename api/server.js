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
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.post("/api/users", async (req, res) => {
  User.insert(req.body)
    .then((newUser) => {
      if (!newUser.name || !newUser.bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else {
        res.status(201).json(newUser);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

server.delete("/api/users/:id", async (req, res) => {
  User.remove(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(deletedUser);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified id does not exist" });
    } else if (!name || !bio) {
      res.status(400).json({ message: "Please provide name and bio" });
    } else {
      const updatedUser = await User.update(id, { name, bio });
      res.status(200).json(updatedUser);
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
