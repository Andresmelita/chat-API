const router = require('express').Router()
const authServices = require('./auth.services')

router.post('/login', authServices.postLogin) //ok
router.post('/recovery-password', authServices.postRecoveryToken)

module.exports = router
