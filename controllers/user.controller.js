import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";

export const addUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    let exist = await User.findOne({ email });
    if (exist) {
      return response.status(201).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return response.status(200).json(newUser);
  } catch (error) {
    return response.status(203).json(error.msg);
  }
};

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return response.status(200).json(user);
    } else {
      return response.status(201).json("No such user exists");
    }
  } catch (error) {
    return response.status(202).json(error);
  }
};
