
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IReservation extends Document {
  name: string;
  userId: Schema.Types.ObjectId;
  areaId: Schema.Types.ObjectId;
  electricity: boolean;
  dateStart: Date;
  dateEnd: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


const reservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    areaId: { type: Schema.Types.ObjectId, required: true },
    electricity: { type: Boolean, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const Reservation: Model<IReservation> = mongoose.model<IReservation>("reservations", reservationSchema);
export default Reservation;