import { Response } from 'express';
import { TestServices } from '../services/tests.services.js';
import { IUserAuthStatusRequest } from '../types/user-types.js';
export class TaskController {
  constructor(private testService: TestServices) {}

  async httpGetAllTasks(req: IUserAuthStatusRequest, res: Response) {
    if (req.user) {
      const { email } = req.user;
      const data = await this.testService.getAllTests(email);
      return res.status(200).json({ data });
    }
  }

  async httpGetTaskById(req: IUserAuthStatusRequest, res: Response) {
    if (req.user && req.params) {
      const { id } = req.params;
      const { email } = req.user;
      const data = await this.testService.getTestById(id, email);

      return res.status(200).json({ data });
    }
  }
  async httpSubmitTest(req: IUserAuthStatusRequest, res: Response) {
    if (req.user && req.body) {
      const values = req.body;
      const { email } = req.user;
      const result = await this.testService.submitTest(values, email);
      return res.status(200).json({ result });
    } else {
      console.error('User not found');
      return res.status(401).json({ error: 'User not found' });
    }
  }
}

const taskController = new TaskController(new TestServices());
export default taskController;
