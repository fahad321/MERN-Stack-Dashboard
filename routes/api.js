const express = require("express");

const router = express.Router();

const BlogPost = require("../models/users");

// Routes
router.get("/", (req, res) => {
  // console.log("Body:", req.body);
  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", daerrorta);
    });
});

router.post("/save", (req, res) => {
  console.log("Body:", req.body);
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    // BlogPost
    return res.json({
      msg: "Your data has been saved!!!!!!",
    });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "peterson",
    age: 5,
  };
  res.json(data);
});

router.post("/saves", (req, res) => {
  console.log("Body:", req.body);
  const data = req.body;
  BlogPost.find({ name: data.name, password: data.password })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", daerrorta);
    });
});

module.exports = router;
