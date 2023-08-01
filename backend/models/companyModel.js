const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true],
    },
    ownerName: {
      type: String,
      required: [true],
    },
    rollNo: {
      type: String,
      required: [true],
      unique: true,
    },
    ownerEmail: {
      type: String,
      required: [true],
    },
    accessCode: {
      type: String,
      required: [true],
    },
    clientSecret: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Company', companySchema)