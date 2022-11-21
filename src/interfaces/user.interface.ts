export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  receiveEmails?: boolean;
  scopes?: [string];
}