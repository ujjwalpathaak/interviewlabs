import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";

export const addUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    // console.log(request.body)
    //finds existing user for same email
    let exist = await User.findOne({ email });
    //if user exists
    if (exist) {
      console.log("user already exists");
      return response.status(201).json({ error: "User already exists" });
    }
    //Hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // console.log("new user added");
    return response.status(200).json(newUser);
  } catch (error) {
    console.log("error adding new user", error);
    return response.status(203).json(error.msg);
  }
};

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("User Logged in");
      response.status(200).json(user);
    } else {
      console.log("No such user exists");
      response.status(201).json("No such user exists");
    }
  } catch (error) {
    response.status(202).json(error);
  }
};
