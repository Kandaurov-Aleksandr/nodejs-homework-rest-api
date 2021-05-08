const express = require('express')
const router = express.Router()
const ctrlUser = require('../../controller/users')
const guard = require('../../helpers/guard')
const { validateUser } = require('../../helpers/validation')
const upload = require('../../helpers/fileUpload')

router.post('/signup', validateUser, ctrlUser.reg)
router.post('/login', validateUser, ctrlUser.login)
router.post('/logout', guard, ctrlUser.logout)
router.get('/current', guard, ctrlUser.current)
router.patch('/avatars', guard, upload.single('avatar'), ctrlUser.avatar)
module.exports = router
