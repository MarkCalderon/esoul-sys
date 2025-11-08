import { Response } from 'express';

interface OkResponseOptions {
  res: Response;
  message?: string;
  payload: any;
}

export function sendOkResponse({ res, payload, message }: OkResponseOptions) {
  res.status(200).json({ success: true, payload, message });
}

export function sendForbiddenResponse(res: Response, message: string) {
  res.status(403).json({ success: false, message });
}

export function sendServerError(res: Response, message: string) {
  res.status(500).json({ success: false, error: message });
}
