
validator = (req, res, next) => {
  let errors = []
  if (req.body.username.length <= 3 || req.body.username.length >= 21) errors.push('Username length should be between 4 an 20 characters!')
  if (req.body.passwordOne.length <= 3 || req.body.passwordOne.length >= 21) errors.push('Password length should be between 4 an 20 characters!')
  if (req.body.passwordOne !== req.body.passwordTwo) errors.push('Passwords must match!')
  if (!/\d/.test(req.body.passwordOne)) errors.push('Password must include atleast one number!')
  if (errors.length) {
    res.json({success: false, errors})
  } else {
    next()
  }
}

module.exports = validator