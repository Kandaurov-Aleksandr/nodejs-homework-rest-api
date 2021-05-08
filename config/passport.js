const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { findUserById } = require('../model/users')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await findUserById({ _id: payload.id })
      if (!user) {
        return done(new Error('User not found'))
      }
      return done(null, user)
    } catch (err) {
      done(err)
    }
  })
)
