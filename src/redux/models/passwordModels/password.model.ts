export interface Email {
  email: string;
}

export interface User {
  id: string | null;
  password: string;
}

export interface Password {
  user: User;
}
