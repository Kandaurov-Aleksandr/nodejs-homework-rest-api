const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controller/index')
const guard = require('../../helpers/guard')

router.get('/', guard, ctrlContact.getContacts)
router.get('/:contactId', guard, ctrlContact.getById)
router.post('/', guard, ctrlContact.addNewContact)
router.delete('/contactId', guard, ctrlContact.deleteContact)
router.patch('/:contactId', guard, ctrlContact.update)

module.exports = router
