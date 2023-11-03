import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionId: String,
  text: String,
  options: [String],
  // correctAnswer: String,
});

const completedBySchema = new Schema({
  user: String,
  mark: String,
  answers: [String],
  status: String,
});

const testSchema = new Schema({
  _id: {
    $oid: String,
  },
  testId: String,
  title: String,
  description: String,
  questions: [questionSchema],
  plan: {
    type: String,
    enum: ['starter', 'pro', 'business'],
  },
  completed_by: [completedBySchema],
});

const Test = mongoose.model('test', testSchema);

export default Test;
