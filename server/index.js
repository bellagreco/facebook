const express = require("express");
const app = express();
const router = require("express").Router();

const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const jwt = require('jsonwebtoken')
const cors = require('cors')

require('dotenv').config('./.env');

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



// app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://isabellasgreco:isabella@cluster0.0ikon.mongodb.net/facebook?retryWrites=true&w=majority')

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/getProfile", async (req, res) => {
  const email = req.query.email;
  UserModel.findOne({ email: email }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });

});

app.post("/createUser", async (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new UserModel({
    name: name, lastname: lastname, email: email, password: password, status: null, profilePicture:null, profileCover: null ,information: {
      networks: null,
      relationshipStatus: null,
      birthday: null,
      city: null,
      website: null

    }
  });
  const token = jwt.sign(
    { user_id: newUser._id, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1800s",
    }
  );
  // save user token
  newUser.token = token;

  await newUser.save();
  res.send('Deu');
});


app.post("/createPost", (req, res) => {
  const email = req.query.email;
  console.log(email)
  UserModel.findOne({ email: email }, (err, result) => {

    if (err) {
      console.log(err)
    } else {
      console.log(result.posts)
      const user = result.posts
      user.push(req.body.post)

      // result.posts = new newPost

      result.save();
      res.status(201).json(result);
    }
  });
});


app.post("/updateInfo", (req, res) => {
  const email = req.query.email;
  console.log(email)
  UserModel.findOne({ email: email }, (err, result) => {

    if (err) {
      console.log(err)
    } else {
      console.log(result.posts)
      const info = result.information
      const networks = req.body.networks;
      const relationshipStatus = req.body.relationshipStatus;
      const birthday = req.body.birthday;
      const city = req.body.city;
      const website = req.body.website;
      if (networks) {
        info.networks = networks;
      }
      if (relationshipStatus) {
        info.relationshipStatus = relationshipStatus;
      }
      if (birthday) {
        info.birthday = birthday;
      }
      if (city) {
        info.city = city;
      }
      if (website) {
        info.website = website;
      }
      // result.posts = new newPost

      result.save();
      res.status(201).json(result);
    }
  });
});

app.post("/updateProfilePicture", (req, res) => {
  const email = req.query.email;
  console.log(email)
  UserModel.findOne({ email: email }, (err, result) => {

    if (err) {
      console.log(err)
    } else {
      const profilePicture = req.body.profilePicture;
      let base64 = profilePicture.toString('base64');
    // console.log(base64.substr(0,200));
      console.log(base64)
      if (profilePicture) {
        result.profilePicture = base64;
      }
      // result.posts = new newPost

      result.save();
      res.status(201).json(result);
    }
  });
});

app.post("/updateCoverPicture", (req, res) => {
  const email = req.query.email;
  console.log(email)
  UserModel.findOne({ email: email }, (err, result) => {

    if (err) {
      console.log(err)
    } else {
      const profileCover = req.body.profileCover;
      let base64 = profileCover.toString('base64');
    // console.log(base64.substr(0,200));
      console.log(base64)
      if (profileCover) {
        result.profileCover = base64;
      }
      // result.posts = new newPost

      result.save();
      res.status(201).json(result);
    }
  });
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(401).send('Invalid email')
    } else if (user.password !== password) {
      return res.status(401).send(`Invalid password. ${user} The password is ${user.password} and you typed ${password}`)
    } else {
      const token = user.generateAuthToken();
      res.status(200).send({ data: token, message: "logged in successfully" });
      // res.send('Deu');

    }
  } catch (error) {
    res.status(500).send({ error, message: 'Something went wrong' })
  }
});


app.listen(3001, () => {
  console.log(process.env.TOKEN_KEY);
});
