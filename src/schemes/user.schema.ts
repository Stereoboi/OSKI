import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Set name for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
});

const User = mongoose.model('user', userSchema);

export default User;
