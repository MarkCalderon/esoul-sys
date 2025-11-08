import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    electricity: {
      type: Boolean,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("reservations", reservationSchema);