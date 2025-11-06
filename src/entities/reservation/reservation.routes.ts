const express = require("express");
const router = express.Router();

import {
  saveReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} from "./reservation.controller";

router.post("/", saveReservation);
router.get("/", getReservations);
router.get("/:id", getReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

module.exports = router;
