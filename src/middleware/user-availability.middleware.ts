/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../schemes/user.schema.js';

export const isUserExist = async (user: { id: string; email: string }) => {
  const userCheck = await User.findOne({ email: user.email });
  if (!userCheck) {
    const newUser = new User({
      id: user.id,
      email: user.email,
    });
    await newUser.save();
  }
};
