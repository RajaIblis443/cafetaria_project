export interface UserInterface {
  id: string;
  email: string;
  name: string;
  telephone: string;
  password?: string;
  role?: string;
  created_at: Date;
}
