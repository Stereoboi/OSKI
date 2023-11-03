/* eslint-disable @typescript-eslint/no-explicit-any */
import Test from '../schemes/test.schema.js';
import AnswersModel from '../schemes/answers.schema.js';
import { CustomError } from '../helpers/custom.error.js';
import { TestAnswers } from '../types/test-types.js';

export class TestServices {
  async getAllTests(email?: string) {
    // const dbReqResult = await Test.find({ plan: 'starter' });
    const dbReqResult = await Test.aggregate([
      // Перший крок: фільтрація за plan
      { $match: { plan: 'starter' } },
      //  фільтрація completed_by за email
      {
        $addFields: {
          completed_by: {
            $filter: {
              input: '$completed_by',
              as: 'completedUser',
              cond: { $eq: ['$$completedUser.user', email] },
            },
          },
        },
      },
    ]);
    if (!dbReqResult.length) {
      throw new CustomError('No matching records found', 404);
    }
    return dbReqResult;
  }

  async getTestById(id: string, email?: string) {
    const dbReqResult = await Test.aggregate([
      {
        $match: { testId: id },
      },
      {
        $addFields: {
          completed_by: {
            $filter: {
              input: '$completed_by',
              as: 'completedUser',
              cond: { $eq: ['$$completedUser.user', email] },
            },
          },
        },
      },
    ]);
    if (!dbReqResult) {
      throw new CustomError('No matching records found', 404);
    }
    return dbReqResult;
  }

  async submitTest(values: TestAnswers, email?: string) {
    console.log(values);

    const { testId, answers } = values;

    // шукаємо в БД відповіді на тест для перевірки результату
    const dbAnswers = await AnswersModel.findOne({ testId: testId });

    //редюсом проходимось по масивах і підраховуємо правильні результати
    const calculateTestResults = answers.reduce((correctCount: number, answer: string, index: number) => {
      const userAnswer = answer.toLowerCase();
      const correctAnswer = dbAnswers?.answers[index].toLowerCase();

      return userAnswer === correctAnswer ? correctCount + 1 : correctCount;
    }, 0);

    // знаходжу тест за testId
    const test = await Test.findOne({ testId: testId });

    if (!test) {
      throw new CustomError('Test not found', 404);
    }

    // Перевірка, чи користувач вже пройшов цей тест
    const userCompletedTest = test.completed_by.find((user) => user.user === email);

    if (!userCompletedTest) {
      //записуємо в об'єкт Тестс користувача який пройшшов тест,
      //його результат та дані для подальшого унеможливлювання повторного проходження тесту
      await Test.findOneAndUpdate(
        { testId: testId },
        {
          $push: {
            completed_by: {
              user: email,
              mark: `${calculateTestResults} out of ${answers.length}`,
              answers: answers,
              status: 'completed',
            },
          },
        },
        { new: true },
      );
    } else {
      throw new CustomError('You have already completed this test', 302);
    }

    const response = `correct answers ${calculateTestResults} from ${answers.length}`;

    return response;
  }
}
