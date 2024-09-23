const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6
const { Schema } = mongoose
const { Subscription } = require('../../helpers/constants')

const usersSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: (v) => /\S+@\S+\.\S+/.test(v),
        message: (props) => `${props.value} invalid email`,
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String,
      default: null
    }
  },
  { versionKey: false, timestamps: true }
)

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR))
  next()
})

usersSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', usersSchema)
module.exports = User
