import { Request, Response } from 'express';
const { sendServerError, sendOkResponse } = require('../../core/responses');
const Reservation = require("./reservation.model");

export const getReservations = async (res: Response) => {
  try {
    const reservations = await Reservation.find();
    return sendOkResponse({ res, payload: reservations });
  } catch (error) {
    return sendServerError(res, 'Failed to fetch reservations');
  }
};

export const saveReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.create(req.body);
    sendOkResponse({ res, payload: reservation });
  } catch (error) {
    sendServerError(res, 'Failed to create reservation');
  }
};

export const getReservation = async(req: Request, res: Response) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    sendOkResponse({ res, payload: reservation });
  } catch (error) {
    sendServerError(res, 'Failed to fetch reservation');
  }
};

export const updateReservation = async(req: Request, res: Response) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    sendOkResponse({ res, payload: reservation });
  } catch (error) {
    sendServerError(res, 'Failed to update reservation');
  }
};

export const deleteReservation = async(req: Request, res: Response) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    sendOkResponse({ res, payload: { message: 'Reservation deleted successfully' } });
  } catch (error) {
    sendServerError(res, 'Failed to delete reservation');
  }
};