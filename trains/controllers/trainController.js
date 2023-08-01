const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Company = require('../models/companyModel')
const Train = require('../models/trainModel')
const bcrypt = require('bcryptjs')

const register = asyncHandler(async (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode  } = req.body

  if (!companyName || !ownerName || !rollNo || !ownerEmail || !accessCode) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  if(accessCode !== 'FKDLjg'){
    res.status(400)
    throw new Error('Invalid Access Code')
  }

  const salt = await bcrypt.genSalt(10)
  const clientSecret = await bcrypt.hash(accessCode, salt)

  const company = await Company.create({
    companyName,
    ownerName,
    rollNo,
    ownerEmail,
    accessCode,
    clientSecret: clientSecret,
  })

  if (company) {
    res.status(201).json({
      companyName: company.companyName,
      clinetID: company.id,
      clientSecret,
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

const auth = asyncHandler(async (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, clientID, clientSecret   } = req.body

  if (!companyName || !ownerName || !rollNo || !ownerEmail || !clientSecret || !clientID) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const company = await Company.findById(clientID)

  if (company && (clientSecret === company.clientSecret)) {
    res.json({
      toekn_type: 'Bearer',
      access_token: generateToken(company._id),
      expires_in: '30d'
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

const trains = asyncHandler(async (req, res) => {

  await Train.create(
    {
      trainName: "Chennai Exp",
      trainNumber: "2344",
      departureTime: {
          Hours:21,
          Minutes:35,
          Seconds:0
      },
      seatsAvailable: {
          Sleeper:3,
          AC:1,
      },
      price: {
          Sleeper:2,
          AC:1,
      },
      delayedBy: 15,
    }
  )

  await Train.create(
    {
      trainName: "Hyderabad Exp",
      trainNumber: "2341",
      departureTime: {
          Hours:23,
          Minutes:55,
          Seconds:0
      },
      seatsAvailable: {
          Sleeper:6,
          AC:7,
      },
      price: {
          Sleeper:554,
          AC:1854,
      },
      delayedBy: 5,
    }
  )

  await Train.create(
    {
      trainName: "Delhi Door Hai Exp",
      trainNumber: "2343",
      departureTime: {
          Hours:9,
          Minutes:45,
          Seconds:0
      },
      seatsAvailable: {
          Sleeper:32,
          AC:1,
      },
      price: {
          Sleeper:1,
          AC:723,
      },
      delayedBy: 3,
    }
  )

  const trains = await Train.find({ })

  res.status(200).json(trains)
})

const train = asyncHandler(async (req, res) => {
  const train = await Train.find({trainNumber : req.params.id})

  if (train.length === 0) {
    res.status(400)
    throw new Error('Train not found')
  }

  res.status(200).json(train)
})


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = { register, auth, trains, train }