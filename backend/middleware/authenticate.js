const jwt = require('jsonwebtoken')
const User = require('../model/model')

authenticate = (req, res, next) => {
  let decodedID = jwt.verify(req.header('token'), process.env.JWT_PASSWORD)
  User.findOne({_id: decodedID}, (err, result) => {
    if (!result) return res.json({success: false})
    req.user = result
    next()
  })
}

module.exports = authenticate