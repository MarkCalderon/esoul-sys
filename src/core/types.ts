export interface RouteError extends Error {
  status?: number;
}

export interface IJWTResponse {
  id: string;
  role: string;
  iat: number;
  exp: number;
};