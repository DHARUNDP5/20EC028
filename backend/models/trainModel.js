const mongoose = require('mongoose')

const trainSchema = mongoose.Schema(
  {
    trainName: {
      type: String,
      required: [true],
    },
    trainNumber: {
      type: String,
      required: [true],
    },
    departureTime: {
        Hours:{
            type: Number,
            required: [true],
        },
        Minutes:{
            type: Number,
            required: [true],
        },
        Seconds:{
            type: Number,
            required: [true],
        }
    },
    seatsAvailable: {
        Sleeper:{
            type: Number,
            required: [true],
        },
        AC:{
            type: Number,
            required: [true],
        },
    },
    price: {
        Sleeper:{
            type: Number,
            required: [true],
        },
        AC:{
            type: Number,
            required: [true],
        },
    },
    delayedBy: {
      type: Number,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Train', trainSchema)