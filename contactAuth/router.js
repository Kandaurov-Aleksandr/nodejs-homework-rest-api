const { Router } = require('express')
const { registrationController, loginController, logoutController } = require('./controllers')
const { registrationValidatorMiddleware } = require('./validator')
const { checkAuthTokenMiddleware } = require('./middleware')

const authRouter = Router()

authRouter.post('/register', registrationValidatorMiddleware, registrationController)
authRouter.post('/login', registrationValidatorMiddleware, loginController)
authRouter.post('/logout', checkAuthTokenMiddleware, logoutController)

module.exports = authRouter