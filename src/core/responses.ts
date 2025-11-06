import { Response } from 'express';

interface OkResponseOptions {
  res: Response;
  payload: any;
}

export function sendOkResponse({ res, payload }: OkResponseOptions) {
  res.status(200).json({ success: true, payload });
}

export function sendServerError(res: Response, message: string) {
  res.status(500).json({ success: false, error: message });
}
