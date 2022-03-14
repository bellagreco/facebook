const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config('../.env');



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: { 
    type: String 
  },
  posts: {
    type: Array,
    required: true
  },
  profilePicture: {
    data: Buffer,
    type: String,
    required: false
  },
  profileCover: {
    data: Buffer,
    type: String,
    required: false
  },
  pictures: {
    data: Buffer,
    type: Array,
    required: false
  },
  information: {
    networks: {
      type: String,
      required: false
    },
    relationshipStatus: {
      type: String,
      required: false
    },
    birthday: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    website: {
      type: String,
      required: false
    },
  }, 
  status: {
    type: String,
    required: false
  },
});

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY, {
		expiresIn: "60s",
	});
	return token;
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
