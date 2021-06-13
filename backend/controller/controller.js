const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/model')

signUp = async (req, res) => {
  let password = await bcrypt.hash(req.body.passwordOne, 10);

  let user = new User({
    username: req.body.username,
    password: password,
    image: req.body.image,
  })

  try {
    let alreadyExists = await User.findOne({username: req.body.username})
    if (alreadyExists) throw 'User with such name already exists!'
    let createdUser = await user.save()
    res.json({success: true, createdUser})
  } catch(error) {
    let errors = [error]
    res.json({success: false, errors})
  }
}

logIn = async (req, res) => {
  try {
    let user = await User.findOne({username: req.body.username})
    if (!user) throw 'User does not exist!'
    let passwordMatching = await bcrypt.compare(req.body.password, user.password)
    if (!passwordMatching) throw 'Incorrect credentials!'
    let token = jwt.sign(user.id, process.env.JWT_PASSWORD)
    res.json({success: true, user, token})
  } catch(error) {
    let errors = [error]
    res.json({success: false, errors})
  }
}

buyItem = (req, res) => {
  if (req.user.gold >= req.body.price) {
    let finalGold = req.user.gold - req.body.price;
    User.findOneAndUpdate({_id: req.user._id}, {$push: {inventory: req.body}, gold: finalGold}, {new: true}, (err, result) => {
      if (err) return res.json({success: false, err})
      res.json({success: true, user: result})
    })
  } else {
    res.json({success: false, message: 'Not enough gold!'})
  }
}

sellItem = (req, res) => {
  let finalGold = req.user.gold + req.body.sell;
  User.findOneAndUpdate({_id: req.user._id}, {$pull: {inventory: {id: req.body.id}}, gold: finalGold}, {new: true}, (err, result) => {
    if (err) return res.json({success: false, err})
    res.json({success: true, user: result})
  })
}

manageHealth = (req, res) => {
  let current = parseInt(req.user.health)
  let value = parseInt(req.params.value)
  let finalHp = req.params.action === 'add' ? current + value : current - value
  if (finalHp >= 100) finalHp = 100
  if (finalHp <= 0) finalHp = 0
  User.findByIdAndUpdate(req.user._id, {health: finalHp}, {new: true}, (err, result) => {
    if (err) return res.json({success: false, err})
    res.json({success: true, user: result})
  })
}

getUser = (req, res) => {
  User.findOne({username: req.params.name}, (err, result) => {
    res.json({
      health: result.health,
      gold: result.gold,
      inventory: result.inventory,
      username: result.username,
      image: result.image
    })
  })
}

getLeaderboard = (req, res) => {
  User.find({})
  .sort({gold: 'desc'})
  .select({
    username: 1,
    gold: 1,
    _id: 0
  })
  .exec((err, result) => {
    if (err) return res.json({success: true, err})
    res.json({success: true, result})
  })
}

module.exports = {
  signUp,
  logIn,
  buyItem,
  sellItem,
  manageHealth,
  getUser,
  getLeaderboard
}