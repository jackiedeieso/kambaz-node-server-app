import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = async (username, password) => {
  console.log("🧪 DAO attempting to match:", { username, password });

  const user = await model.findOne({ username, password });
  console.log("🔍 Mongo returned:", user);
  return user;
};

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
};

export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); 
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};