export interface RouteError extends Error {
  status?: number;
}

export interface UserIO {
  id: string;
  role: string;
  iat: number;
  exp: number;
};