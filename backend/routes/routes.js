const router = require('express').Router();
const controller = require('../controller/controller')
const validator = require('../middleware/validator')
const authenticate = require('../middleware/authenticate')

router.post('/signup', validator, controller.signUp)
router.post('/login', controller.logIn)
router.put('/buy', authenticate, controller.buyItem)
router.put('/sell', authenticate, controller.sellItem)
router.patch('/gold/:value', authenticate, controller.addGold)
router.patch('/health/:action/:value', authenticate, controller.manageHealth)
router.get('/user/:name', controller.getUser)
router.get('/leaderboard', controller.getLeaderboard)

module.exports = router