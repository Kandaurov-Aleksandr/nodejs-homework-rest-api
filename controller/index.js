const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../model/index')

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: contacts
    })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        coded: 200,
        data: {
          contact
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
}

const addNewContact = async (req, res, next) => {
  const { name, email, phone } = req.body

  try {
    if (!name || !email || !phone) {
      let errorMessage = 'missing required '
      if (!name) {
        errorMessage += 'name field'
      }
      if (!email) {
        errorMessage += 'email field'
      }
      if (!phone) {
        errorMessage += 'phone field'
      }
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: errorMessage,
      })
    } else {
      const newContact = await addContact(req.body)
      return res.json({
        status: 'success',
        code: 201,
        data: newContact
      })
    }
  } catch (err) {
    next(err)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      res.json({
        status: 'contact deleted',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        meassage: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
}
const update = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (!req.body) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing field',
      })
    }
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        coded: 404,
        meassage: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getContacts,
  getById,
  addNewContact,
  deleteContact,
  update,
}
