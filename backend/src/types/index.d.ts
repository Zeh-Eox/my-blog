export interface RegisterUser {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  createdAt: Date;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    createdAt: Date;
  };
}