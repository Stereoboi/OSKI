/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IUserAuthStatusRequest extends Request {
  user?: {
    id?: string;
    email?: string;
  };
  body: any;
  params: any;
}
