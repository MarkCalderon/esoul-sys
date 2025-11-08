import { Request, Response, NextFunction } from 'express';
const { sendServerError, sendOkResponse } = require('../../core/responses');
import Reservation, { IReservation } from "./reservation.model";

export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations: IReservation[] = await Reservation.find();
    return sendOkResponse({ res, payload: reservations });
  } catch (error) {
    return sendServerError(res, 'Failed to fetch reservations');
  }
};

export const saveReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation: IReservation = await Reservation.create(req.body);
    sendOkResponse({ res, payload: reservation });
  } catch (error) {
    sendServerError(res, 'Failed to create reservation');
  }
};

export const getReservation = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation: IReservation | null = await Reservation.findById(req.params.id);
    sendOkResponse({ res, payload: reservation });
  } catch (error) {
    sendServerError(res, 'Failed to fetch reservation');
  }
};

export const updateReservation = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation: IReservation | null = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    sendOkResponse({ res, payload: reservation });
  } catch (error) {
    sendServerError(res, 'Failed to update reservation');
  }
};

export const deleteReservation = async(req: Request, res: Response, next: NextFunction) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    sendOkResponse({ res, payload: { message: 'Reservation deleted successfully' } });
  } catch (error) {
    sendServerError(res, 'Failed to delete reservation');
  }
};