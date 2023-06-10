

export interface loginState {
  token: string | null;
  loading: boolean;
  error: string | null;
} 

export interface LoginCredentials{
  email: string;
  password: string;
}