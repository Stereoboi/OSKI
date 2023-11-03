import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const answersSchema = new Schema({
  testId: String,
  answers: [String],
});

const AnswersModel = mongoose.model('answers', answersSchema);

export default AnswersModel;
